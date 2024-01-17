'use strict'

class Query extends NodeList {
  // query  selector 数组
  constructor(selector, context) {
    // constructor 中返回，则 new 的结果为该返回值
    return Query.makeArray(selector, context)
  }

  /**
   *
   * @param {(el: HTMLElement, index: number) => void} func
   * @returns
   */
  each(func) {
    for (let i = 0; i < this.length; i++) {
      func.call(this, this[i], i)
    }

    return this
  }

  /**
   * 添加 class
   * @param {string} className
   * @returns
   */
  addClass(className) {
    return this.each(function (element) {
      if (!element.classList.contains(className)) {
        element.classList.add(className)
      }
    })
  }

  /**
   * 移除 class
   * @param {*} className
   * @returns
   */
  removeClass(className) {
    return this.each((element) => {
      if (element.classList.contains(className)) {
        element.classList.remove(className)
      }
    })
  }

  /**
   * 设置 style
   * @param {*} attrOrObj
   * @param {*} value
   * @returns
   */
  css(attrOrObj, value) {
    return this.each((element) => {
      if (typeof attrOrObj === 'object') {
        Object.entries(attrOrObj).forEach(([k, v]) => {
          element.style[k] = v
          // 以下方式无法工作
          // element.style.setProperty(k, v)
        })
      } else {
        element.style[attrOrObj] = value
      }
    })
  }

  static makeArray(selector, context) {
    const eles = context.querySelectorAll(selector)
    // eslint-disable-next-line no-proto
    eles.__proto__ = Query.prototype
    return eles
  }
}

function jQuery(selector, context = document.body) {
  // eslint-disable-next-line new-cap
  return new Query(selector, context)
}

jQuery.ajax = function (option = {}) {
  const {
    url,
    method,
    onSuccess,
    onError,
    onProgress,
    onUploadProgress,
    headers = {},
    body,
  } = option
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  // set header
  Object.entries(headers).forEach(([k, v]) => {
    xhr.setRequestHeader(k, v)
  })
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 200 && xhr.status < 400) {
      onSuccess?.(xhr.responseText)
    }
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 400) {
      onError?.(xhr)
    }
  }
  xhr.onprogress = onProgress
  xhr.upload.onprogress = onUploadProgress
  let body2send = body
  if (typeof body === 'object' && !(body instanceof FormData)) {
    body2send = JSON.stringify(body)
  }
  xhr.send(body2send)
}
;(function (window) {
  window.$ = window.jQuery = jQuery
})(window)
