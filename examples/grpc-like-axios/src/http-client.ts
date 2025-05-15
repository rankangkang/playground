import { type AxiosInstance } from 'axios'

// 基础类型定义
export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

type Response<T = any> = {
  data: T
  status: number
  statusText: string
  headers: any
}

// 类型定义辅助工具
type ServiceMethodDefinition = {
  path: string
  method: HttpMethods
  request?: {
    pathParams?: Record<string, any>
    body?: any
    params?: Record<string, number | string> | URLSearchParams
  }
  response: any
}

export type RequestConfigForDefinition<T extends ServiceMethodDefinition> = (T['request'] extends {
  params: infer P
}
  ? { params: P }
  : {}) &
  (T['request'] extends { body: infer B } ? { body: B } : {}) &
  (T['request'] extends { query: infer Q } ? { query: Q } : {}) & {
    headers?: Record<string, string>
  }

export type ServiceClient<T extends Record<string, ServiceMethodDefinition>> = {
  [K in keyof T]: (config: RequestConfigForDefinition<T[K]>) => Promise<Response<T[K]['response']>>
}

export function createHttpClient<TService extends Record<string, ServiceMethodDefinition>>(
  serviceDefinition: TService,
): (instance: AxiosInstance) => ServiceClient<TService> {
  return (instance) => {
    const client = {} as ServiceClient<TService>
    for (const methodName in serviceDefinition) {
      const definition = serviceDefinition[methodName]

      client[methodName] = ((config: any) => {
        const { pathParams, body, query, headers } = config || {}
        let url = definition.path
        if (pathParams) {
          url = url.replace(/{(\w+)}/g, (_, key) => {
            if (!(pathParams as any)[key]) throw new Error(`Missing path param: ${key}`)
            return encodeURIComponent((pathParams as any)[key])
          })
        }

        return instance.request({
          method: definition.method,
          url,
          data: body,
          params: query,
          headers,
        })
      }) as ServiceClient<TService>[typeof methodName]
    }
    return client
  }
}
