// 使用示例

import axios from 'axios'

import { createHttpClient, HttpMethods } from './http-client'

// 1. 定义服务类型
const UserService = {
  getPosts: {
    path: '/posts',
    method: HttpMethods.GET,
    request: {
      params: {} as { userId: string },
    },
    response: {} as Array<{
      userId: number
      id: number
      title: string
      body: string
    }>,
  },
}

// 2. 创建基础客户端
const axiosInstance = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com',
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  console.log('Request:', config.url)
  return config
})

// 3. 创建服务客户端
const userClient = createHttpClient(UserService)(axiosInstance)

// 4. 使用强类型方法
async function main() {
  try {
    // 创建用户
    const r = await userClient.getPosts({
      params: { userId: '1' },
    })
    console.log('Response:', r.data[0])
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
