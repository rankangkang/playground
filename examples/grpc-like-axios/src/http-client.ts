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

export type ServiceMethodDefinition = {
  path: string
  method: HttpMethods
  request?: {
    pathParams?: Record<string, any>
    body?: any
    searchParams?: Record<string, any> | string | string[][] | URLSearchParams
    headers?: Record<string, string>
  }
  response: any
}

export type HttpRequestExecutorConfig = {
  method: HttpMethods
  url: string
  body?: any
  headers?: Record<string, string>
}

// HttpRequestExecutor 接收泛型 TResponse，返回 Promise<TResponse>
// 这样用户实现时，返回值类型会被约束为具体的 response 类型
export type HttpRequestExecutor = <TResponse = any>(
  config: HttpRequestExecutorConfig,
) => Promise<TResponse>

type RequestConfigForDefinition<T extends ServiceMethodDefinition> = (T['request'] extends {
  pathParams: infer P
}
  ? { pathParams: P }
  : {}) &
  (T['request'] extends { body: infer B } ? { body: B } : {}) &
  (T['request'] extends { searchParams: infer Q } ? { searchParams: Q } : {}) & {
    headers?: Record<string, string>
  }

// ServiceClient 的每个方法返回 Promise<T[K]['response']>
// 调用 requestExecutor 时会传入 T[K]['response'] 作为泛型参数
export type ServiceClient<T extends Record<string, ServiceMethodDefinition>> = {
  [K in keyof T]: (config: RequestConfigForDefinition<T[K]>) => Promise<T[K]['response']>
}

export function createHttpClient<TService extends Record<string, ServiceMethodDefinition>>(
  serviceDefinition: TService,
): (requestExecutor: HttpRequestExecutor) => ServiceClient<TService> {
  return (requestExecutor) => {
    const client = {} as ServiceClient<TService>

    for (const methodName in serviceDefinition) {
      const definition = serviceDefinition[methodName]

      type ClientMethodType = TService[typeof methodName]
      client[methodName] = ((config: ClientMethodType['request']) => {
        const { pathParams, body, searchParams, headers } = config || {}
        let url = definition.path
        if (pathParams) {
          url = url.replace(/{(\w+)}/g, (_, key) => {
            if (!(pathParams as any)[key]) throw new Error(`Missing path param: ${key}`)
            return encodeURIComponent((pathParams as any)[key])
          })
        }

        const finalUrl = searchParams
          ? `${url}${url.indexOf('?') === -1 ? '?' : '&'}${new URLSearchParams(searchParams).toString()}`
          : url
        return requestExecutor<ClientMethodType['response']>({
          method: definition.method,
          url: finalUrl,
          body,
          headers,
        })
      }) as ServiceClient<TService>[typeof methodName]
    }
    return client
  }
}

const client = createHttpClient({
  greet: {
    method: HttpMethods.GET,
    path: '/greet/{name}',
    request: {
      pathParams: {
        name: '',
      },
      body: {
        message: '',
      },
    },
    response: {} as { code: number; message: string },
  },
  sayHello: {
    method: HttpMethods.POST,
    path: '/sayHello',
    request: {
      body: {
        name: '',
      },
    },
    response: {} as { data: string },
  },
})(async (config) => {
  console.log(config)
  return {
    code: 0,
    message: 'ok',
  } as any
})
