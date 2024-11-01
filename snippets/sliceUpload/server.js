import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import http from 'node:http'
import fse from 'fs-extra'
import formidable from 'formidable'
import { mergeSlices } from './sliceMerge.js'

// esm 模块下使用 __dirname 与 __pathname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TMP_PATH = path.join(__dirname, 'tmp')

/** @type {Map<string, { uploadId: string, hash: string, fileName: string }>} */
const db = new Map()

const app = http.createServer(async (req, res) => {
  log(req, res)

  if (req.url === '/' || req.url.endsWith('index.html')) {
    const index = await fse.readFile(path.join(__dirname, 'index.html'))
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(index.toString())
    return
  }

  if (req.url.endsWith('.js')) {
    const js = await fse.readFile(path.join(__dirname, req.url))
    res.writeHead(200, { 'Content-Type': 'text/javascript' })
    res.end(js.toString())
    return
  }

  await json(req, res)

  if (req.method.toUpperCase() === 'POST') {
    if (req.url === '/prepare') {
      await handlePrepare(req, res)
    } else if (req.url === '/chunk') {
      console.log('chunk')
      await handleChunk(req, res)
    } else if (req.url === '/merge') {
      await handleMerge(req, res)
    }
  }
})

/**
 * 处理 json 中间件
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function json(req, res) {
  return new Promise((resolve, reject) => {
    const contenType = req.headers['content-type'] || req.headers['Content-Type']
    if (req.method === 'POST' && contenType.includes('application/json')) {
      let body = ''

      // 设置编码，以便正确处理请求体中的特殊字符
      req.setEncoding('utf8')

      // 监听 data 事件以接收请求体数据块
      req.on('data', (chunk) => {
        body += chunk
      })

      req.on('error', (e) => {
        reject(e)
      })

      // 监听 end 事件以表示请求体数据接收完毕
      req.on('end', () => {
        // 在这里处理请求体数据
        try {
          req.body = JSON.parse(body)
          resolve()
        } catch (error) {
          reject(e)
        }
        resolve()
      })
    } else {
      resolve()
    }
  })
}

/**
 * 处理 json 中间件
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function log(req, res) {
  console.log('-->', req.method, req.url)
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
async function handlePrepare(req, res) {
  // 获取 uploadId
  const uploadId = randomUUID()
  db.set(uploadId, { uploadId, hash: '', fileName: req.body.fileName })
  await fse.mkdirp(path.join(TMP_PATH, uploadId))
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      uploadId,
    }),
  )
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
async function handleChunk(req, res) {
  const form = formidable()
  const [fields, files] = await form.parse(req)
  console.log(fields, files)
  const uploadId = fields.uploadId[0]
  const index = fields.index[0]
  const chunk = files.chunk[0]
  if (!uploadId) {
    res.statusCode = 403
    res.end('参数错误')
    return
  }

  const fielTmpName = path.join(TMP_PATH, uploadId, index)
  const writeStream = fse.createWriteStream(fielTmpName)
  const readStream = fse.createReadStream(chunk.filepath)
  readStream.pipe(writeStream)

  res.statusCode = 200
  res.end()
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
async function handleMerge(req, res) {
  // 合并切片
  const uploadId = req.body.uploadId
  const config = db.get(uploadId)
  if (!config) {
    res.writeHead(403)
    res.end('参数错误')
    return
  }

  const targetFolder = path.join(TMP_PATH, uploadId)
  const dstFileName = config.fileName
  const dstFilePath = await mergeSlices(targetFolder, dstFileName)
  res.writeHead(200)
  res.end(
    JSON.stringify({
      filePath: dstFilePath,
    }),
  )
}

app.listen(3030, () => {
  console.log('Server started on port 3030')
})
