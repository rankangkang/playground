import { SliceUploader } from './sliceUpload.js'

/** @type  {File} */
let currentFile

const fileEl = document.querySelector('#file')
fileEl.addEventListener('change', (e) => {
  console.log(e.target.files)
  const file = e.target.files[0]
  if (file) {
    currentFile = file
  } else {
    currentFile = undefined
  }
})

const btnEl = document.querySelector('#btn')
btnEl.addEventListener('click', () => {
  if (currentFile && window.confirm('确定要上传？')) {
    handleUpload(currentFile)
  }
})

/**
 *
 * @param {File} file
 */
async function handleUpload(file) {
  const uploader = new SliceUploader(file, { concurrency: 3 })
  await uploader.prepare()
  await uploader.upload()
  if (window.confirm('所有分片已上传成功，是否要合并？')) {
    await uploader.merge()
    window.alert('合并完成')
  }
  window.alert('上传完成！')
}
