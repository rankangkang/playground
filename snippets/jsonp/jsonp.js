/**
 * 通过 script 标签发送请求，取得数据后删除对应的 script 标签，并调用 callback
 * 只能发送 get 请求
 * @param {string} url
 * @param {Object} data
 * @param {Function} callback
 */
function jsonp(url, data, callback) {
  const symbol = 'jsonp' + Date.now()
  const script = document.createElement('script')

  // 组装 url
  let uri = url.includes('?') ? url : url + '?'
  let params
  const dataKeys = Object.keys(data)
  if (data && dataKeys.length > 0) {
    params =
      dataKeys.map((key) => `${key}=${encodeURIComponent(data[key])}`).join('&') +
      '&callback=' +
      symbol
  } else {
    params = 'callback=' + symbol
  }
  uri += params

  window[symbol] = function (data) {
    delete window[symbol]
    document.removeChild(script)
    callback(data)
  }

  script.src = uri
  document.body.appendChild(script)
}
