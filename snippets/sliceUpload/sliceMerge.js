// import { fileURLToPath } from 'node:url'
import path from 'node:path'

import fse from 'fs-extra'

// // // esm 模块下使用 __dirname 与 __pathname
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export async function mergeSlices(folderPath, dstFileName) {
  let filePaths = await fse.readdir(folderPath)
  filePaths = filePaths.sort((a, b) => Number(a) - Number(b))
  const dstPath = path.join(folderPath, dstFileName)
  const writeStream = fse.createWriteStream(dstPath, { autoClose: true })
  for (const p of filePaths) {
    // 按顺序合并
    await new Promise((resolve, reject) => {
      const readStream = fse.createReadStream(path.join(folderPath, p))
      readStream.pipe(writeStream, { end: false })
      readStream.on('end', () => {
        resolve()
        readStream.close()
      })
      readStream.on('error', (e) => {
        reject(e)
        readStream.close()
      })
    })
  }
  writeStream.end(() => {
    Promise.all(filePaths.map((p) => fse.unlink(path.join(folderPath, p))))
  })
  return dstPath
}

// const targerDir = path.join(__dirname, 'tmp', '445a59f2-8af9-4ec3-9ad1-a3cc77688723')
// mergeSlices(targerDir, "test.jpeg")
