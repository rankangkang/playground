fetch('https://cams.wpseco.cn/inner/api/v2/component/add', {
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    pragma: 'no-cache',
    'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
  },
  referrer: 'https://cams.wpseco.cn/remake/app/09fd1f85-6f17-4c6d-be67-78156741796c/component/add',
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: '{"type":"service","serviceName":"testABC","name":"testABC","desc":"dsfds","appId":"09fd1f85-6f17-4c6d-be67-78156741796c"}',
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
})

function uuid(len = 8) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

new Array(20).fill(0).forEach(async () => {
  const uid = uuid()
  await fetch('https://cams.wpseco.cn/inner/api/v2/component/add', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
    },
    referrer:
      'https://cams.wpseco.cn/remake/app/09fd1f85-6f17-4c6d-be67-78156741796c/component/add',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `{"type":"service","serviceName":"test${uid}","name":"test${uid}","appId":"09fd1f85-6f17-4c6d-be67-78156741796c"}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  })
})
