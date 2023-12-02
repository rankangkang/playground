import concurrentRun from './node_modules/concurrent/index.js'

/**
 * @typedef {{ chunk: number; concurrency: number }} Config
 * @typedef {{ index: number; chunk: Blob; hash: string, loaded: number }} Chunk
 */

export class SliceUploader {
  /** @type {Config} */
  __config
  /** @type {Chunk[]} */
  __chunks
  /** @type {File} */
  __file
  __uploadId

  /** @type {Map<string, Chunk>} */
  __uploading = new Map()
  /** @type {Map<string, Chunk>} */
  __finished = new Map()

  /**
   *
   * @param {File} file
   * @param {Partial<Config> | undefined} opt
   */
  constructor(file, opt = {}) {
    this.__file = file
    this.__chunks = []
    this.__config = Object.assign({ chunk: 1024 * 1024, concurrency: 1 }, opt)
  }

  sliceBlob() {
    const file = this.__file
    const chunkNum = Math.ceil(file.size / this.__config.chunk)
    const chunkSize = this.__config.chunk
    for (let i = 0; i < chunkNum; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, file.size)
      const slice = file.slice(start, end)
      this.__chunks.push({ index: i, chunk: slice, loaded: 0 })
    }
  }

  // TODO: 获取上传标识
  async prepare() {
    // 做一些预备工作，文件切片，获取上传id
    this.sliceBlob()
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const resp = await fetch('/prepare', {
      body: JSON.stringify({ fileName: this.__file.name, fileSize: this.__file.size, hash: '' }),
      headers,
      method: 'post',
    })
    const json = await resp.json()
    console.log(json)
    if (json.uploadId) {
      this.__uploadId = json.uploadId
    }
  }

  /**
   * 上传单个切片
   * @param {Chunk} chunk
   * @param {} uploader
   */
  async uploadChunk(chunk, url, onProgress) {
    const fd = new FormData()
    fd.set('uploadId', this.__uploadId)
    fd.set('index', chunk.index)
    fd.set('hash', chunk.hash)
    fd.set('chunk', chunk.chunk)
    const reporter = () => {
      return this.progress
    }
    return requestFormData({
      url,
      data: fd,
      onProgress({ loaded, total }) {
        chunk.loaded = loaded
        onProgress?.(reporter())
      },
    })
  }

  // 并发上传所有切片
  upload(onProgress) {
    if (!onProgress) {
      onProgress = (progress) => {
        console.log('percentage:', progress)
      }
    }
    const reqs = this.__chunks.map((chunk) => {
      return async () => {
        // 加入上传中池子
        this.__uploading.set(chunk.index, chunk)
        const res = this.uploadChunk(chunk, '/chunk', onProgress)
        // 移除上传中池子
        this.__uploading.clear(chunk.index)
        // 添加至上传完成的池子
        this.__finished.set(chunk.index, chunk)
        return res
      }
    })
    return concurrentRun(reqs, this.__config.concurrency, {
      returnWhileReject: true,
      logger: false
    })
  }

  async merge() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const resp = await fetch('/merge', {
      body: JSON.stringify({ uploadId: this.__uploadId }),
      headers,
      method: 'post',
    })
    const json = await resp.json()
    console.log(json)
  }

  // 计算 progress
  get progress() {
    const uploaded = this.__chunks.reduce((total, chunk) => {
      return total + (chunk.loaded || 0)
    }, 0)
    const percentage = Number.prototype.toFixed.call((Number(uploaded) / this.__file.size) * 100, 2)
    return percentage > 100 ? 100 : percentage
  }
}

function requestFormData(options = {}) {
  const { url, method = 'POST', onProgress, data = null } = options
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE) {
        resolve(xhr.responseText)
      }
    })
    xhr.upload.addEventListener('progress', (e) => {
      // 调用 onProgress 并将数据传递给它
      onProgress?.({
        loaded: e.loaded,
        total: e.total,
      })
    })
    xhr.open(method, url)
    xhr.send(data)
  })
}
