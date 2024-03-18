/**
 * 请求
 * @param {{
 *  url?: string
 *  method?: string
 *  data?: any
 *  headers: Record<string, string>
 * }} options
 * @returns
 */
function request(options = {}) {
  options = Object.assign({}, { method: 'GET' }, options)
  return new Promise((resolve, reject) => {
    let { url, method, headers = {}, data } = options
    const xhr = new XMLHttpRequest()

    if (method.toUpperCase() === 'GET' && !data) {
      url = url.endsWith('?') ? url : url + '?'
      const search = Object.keys(data)
        .map(([key, val]) => `${key}=${val}`)
        .join('&')
      url += search
    }

    if (!headers) {
      Object.keys(headers).forEach(([key, val]) => {
        xhr.setRequestHeader(key, val)
      })
    }
    
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.responseText)
        }
      }
    })

    xhr.addEventListener('error', (e) => {
      reject(xhr.responseText)
    })

    xhr.open(method, url)

    if (method.toUpperCase() === 'GET') {
      xhr.send()
    } else if (headers['Content-Type'] && headers['Content-Type'].includes('application/json')) {
      xhr.send(JSON.stringify(data || {}))
    } else {
      xhr.send(data)
    }
  })
}
