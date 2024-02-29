# Verdaccio 私有 npm registry 指南

[Verdaccio](https://verdaccio.org/zh-cn/) 是一个基于 NodeJS的轻量级私有npm仓库。
本文的所述的 Verdaccio 版本为 V5。

## 启动

### npm 包方式启动

1. 本地全局安装 Verdaccio。

   ```bash
   npm install verdaccio -g
   ```

2. 使用命令启动

   ```bash
   verdaccio
   ```

   启动成功后，控制台会输出如下信息：

   ```plaintext
   warn --- config file  - /home/.config/verdaccio/config.yaml
   warn --- http address - http://localhost:4873/ - verdaccio/5.0.0
   ```

   第一行为默认配置文件地址，可根据需求修改配置并重新启动服务；第二行为 web http 服务地址，可通过该地址在浏览器访问 web ui。

至此，您已成功启动 Verdaccio，可以开始使用了~

### NodeJS API 启动

verdaccio 提供了 NodeJS api，这使得我们可以在 NodeJS 脚本中编程式的启动 verdaccio 服务。

```js
// main.js
const { runServer, parseConfigFile } = require('verdaccio')
const path = require('path')

const configPath = path.join(__dirname, 'config', 'config.yaml')
const config = parseConfigFile(configPath)

// 配置文件所在目录，仅需指定 config.yaml 所在目录即可
config.self_path = '/path/to/config'
// eg:
// config.self_path = '/home/npm/conf'
console.log(config)

runServer(config)
  .then(app => {
    app.listen(4873, (ev) => {
      // do somthing here...
    })
  })
```

更多信息详见 [Node.js API | Verdaccio](https://verdaccio.org/docs/verdaccio-programmatically)

### 容器化部署

verdaccio 提供了[官方镜像](https://hub.docker.com/r/verdaccio/verdaccio)，这使得我们可以以 docker 镜像的方式启动。（事实上，我们也可自行构建 verdaccio 镜像）

1. 拉取镜像

   ```bash
   docker pull verdaccio/verdaccio
   ```

2. 创建准备用于挂载的配置文件，并存放到合适的目录下。笔者的配置文件目录为：`/home/npm/deploy/conf`，storage（包缓存目录）目录为：`/home/npm/deploy/storage`，插件目录为：`/home/npm/deploy/plugins`
   使用 `-v`指令挂载目录到容器
   > 注意：Verdaccio 在容器内部以非 root 用户（UID = 10001）运行，如果您使用 bind Mount 覆盖默认值，则需要确保将 MORT 目录分配给正确的用户。 在该示例中，您需要运行 `sudo chown -r 10001:65533 /path/for/verdaccio`，否则程序运行时会报权限错误。
   > 注意：Verdaccio 有多种插件加载方式，本示例的 plugins 目录加载只是其中一种，详见插件一节：TODO:

   ```bash
   V_PATH=/home/npm/deploy; docker run \
     -it \
     --rm \
     --restart=always \
     --name verdaccio \
     -p 4873:4873 \
     -v $V_PATH/conf:/verdaccio/conf \
     -v $V_PATH/storage:/verdaccio/storage \
     -v $V_PATH/plugins:/verdaccio/plugins \
     verdaccio/verdaccio
   ```

   启动成功后，控制台将输出以下信息：

   ```plaintext
   info --- config file  - /verdaccio/conf/config.yaml
   info --- "crypt" algorithm is deprecated consider switch to "bcrypt". Read more: https://github.com/verdaccio/monorepo/pull/580
   info --- plugin successfully loaded: verdaccio-htpasswd
   info --- plugin successfully loaded: verdaccio-audit
   warn --- http address - http://0.0.0.0:4873/ - verdaccio/5.23.2
   ```

至此，verdaccio 容器化部署成功。

## 配置文件

verdaccio 使用配置文件进行配置，文件名称为 `config.yaml`。

### 用户验证

verdaccio 的用户身份验证方式取决于您使用的 auth 插件。
verdaccio 默认使用内建的 htpasswd 作为身份验证插件，也可指定您自行编写的身份验证插件。

### 包权限控制

> 当未指定自定义 auth 插件时，将会使用内建默认的 htpasswd 插件。
> 默认的 htpasswd 插件未实现 allow_access、allow_publish、allow_unpublish，当涉及到 access、publish 与 unpublish 权限控制时，将 fallback 到配置文件的 packages 配置项。
> 详见：https://verdaccio.org/docs/packages

verdaccio 默认配置文件的包权限配置如下：

```yaml
packages:
  # 可以使用通配符来匹配包名, 这个条件匹配的是作用域模块
  '@*/*':
    # 访问权限, 基本等用于是否可以被搜索到
    access: $all
    # 发布权限
    publish: $authenticated
    # 代理配置, 在模块缓存一节中会介绍
    proxy: npmjs
  '**': # 这个条件匹配所有模块
    proxy: npmjs # 定义的上行链路
```

verdaccio 的内置权限组有如下三种：

- `$all`：全部用户
- `$anonymous`：匿名用户，即未登录的用户
- `$authenticated`：已登陆用户

此外，已注册的用户名也可用于权限控制。
假如现在需要做如下权限控制：

- `kk` 包：仅用户 admin 可发布、不允许取消发布、仅登录用户可访问
- `@kk` scope 包：仅允许已登录用户发布/获取，不允许取消发布

对应的，有配置如下：

```yaml
packages:
  kk:
    access: $authenticated
    publish: wpsadmin
    # 不允许，则不设置该项，或直接注释
    unpublish: 
  "@kk/*":
    access: $authenticated
    publish: $authenticated
```

**若您接入了第三方权限校验插件，且该插件实现了access、publish、unpublish控制，则 `packages` 配置项的 access、publish 与 unpublish 配置无效，但 proxy 配置依然有效。**

## 插件

Verdaccio 是一个可插拔的应用，可通过插件扩展各方面的能力。

verdaccio 插件有5种类型，分别为：

- auth 插件：扩展鉴权能力，如接入不同的身份验证系统
- storage 插件：扩展存储能力，如接入对象存储
- middleware 插件：扩展端点
- ui 主题插件：扩展 web ui 主题样式
- filter 插件

### 插件安装

verdaccio 有多种插件安装方式，常用的有以下两种：

- 直接通过 npm 安装插件
- 通过 plugins 目录安装

插件命名规则为 `verdaccio-${plugin_name}`，安装完成后，需要在配置文件中声明后才能被加载使用。
假如现有一个插件 auth 插件名为 verdaccio-myauth，可通过如下方式声明

```yaml
auth:
  # 插件声明不需要带 verdaccio- 前缀
  myauth:
    # 插件配置
    foo: some value
    bar: some value
```

版本 `5.12.0` 后 scope 包也得到了支持，假如现有插件名为 `@kk/myauth`,可通过如下方式声明：

```yaml
auth:
  "@kk/myauth":
    foo: some value
    bar: some value
```

- auth 插件需要在配置文件的 `auth` 配置项声明：
  
  ```yaml
  # config.yaml
  auth:
    myauth:
      foo: some value
      bar: some value
  ```

- storage 插件需要在配置文件的 `store` 配置项下声明：
  
  ```yaml
  store:
    # mystore 插件
    mystore:
      data_path: /opt/storage
      db_path: /opt/db
  ```

- middleware 插件需要在配置文件的 `middlewares` 配置项下声明：
  
  ```yaml
  middlewares:
    # 默认的 audit 插件
    audit:
      enabled: true
    # mymiddleware 插件
    mymiddleware:
      enabled: true
  ```

- theme 插件需要在配置文件的 `theme` 配置项下声明：
  
  ```yaml
  theme:
    # mytheme 插件
    mytheme:
      main_color: "#fefefe"
  ```

插件加载时，会根据插件名先去 plugins 目录寻找并加载，未找到时才会尝试加载 npm 插件。

#### 通过 npm 安装插件

可通过全局安装的方式安装插件到全局 node_modules 中（全局 node_modules 中的包均以 global-style 安装）

```bash
npm install verdaccio-xxx -g
```

同理，若你在本地开发测试 verdaccio 插件，可以通过 `npm link` 的方式将包符号链接到全局 node_modules 中，以此实现插件安装的目的。

若你在一个 npm 项目中安装 verdaccio 插件，可以添加 `--global-style` 标记安装：

```bash
npm install --global-style verdaccio-xxx
```

#### 通过 plugins 目录安装

可将插件复制或链接到 verdaccio plugins 目录的方式实现插件安装，注意插件文件必须是正确的 npm 包结构。

verdaccio 的默认插件目录为 `/verdaccio/plugins`，也可在配置文件中通过 `plugins` 配置项进行自定义。

```yaml
# config.yaml
# 设置插件目录为 /opt/verdaccio/plugins 目录
plugins: /opt/verdaccio/plugins
```

然后将插件复制/链接到 plugins 目录

```bash
cp -r verdaccio-xxx /opt/verdaccio/plugins
```

随后便可在配置文件中声明并使用插件。

#### 实战

笔者曾经开发过几个 verdaccio 插件，这几个插件的代码均存放在一个 monorepo 仓库中（仓库使用 pnpm 作为包管理工具）；同时，我们使用 docker 运行 verdaccio，所以就需要将插件与 verdaccio 打入一个镜像中，同时把插件安装好。

项目结构如下：

```plaintext
verdaccio_plugins
├── packages  # 插件工程目录
│   ├── verdaccio-plugin1
│   ├── verdaccio-plugin2
│   ├── ....
│   └── verdaccio-pluginn
├── pnpm-workspace.yaml
├── Dockerfile
├── package.json
└── tsconfig.base.json
```

笔者的解决方案有二。

**方案一**：镜像构建时，使用 `pnpm link` 将所有的插件符号链接到全局 `node_modules`

```dokcerfile
FROM verdaccio/verdaccio
USER root

ADD . /opt/verdaccio-plugins
WORKDIR /opt/verdaccio-plugins

RUN set -e && npm config set registry https://registry.npmjs.org \
    && npm install pnpm -g \
    && pnpm install \
    && pnpm -r run build \
    && pnpm -r run link       # 每个插件均设置了 link script，脚本是：pnpm link
```

至此，插件便已经安装成功了。
如果你觉得不够稳妥，还可以将全局 `node_modules` 设置为 verdaccio 的插件目录

```yaml
plugins: $npm_prefix/lib/node_modules
```

**方案二**：镜像构建时，将各插件直接复制至 `/verdaccio/plugins` 目录

```dockerfile
FROM verdaccio/verdaccio
USER root

ADD . /opt/verdaccio-plugins
WORKDIR /opt/verdaccio-plugins

RUN mkdir -p /verdaccio/plugins
RUN set -e && npm config set registry https://registry.npmjs.org \
    && npm install pnpm -g \
    && pnpm install \
    && pnpm -r run build \
    && cp -r packages/ /verdaccio/plugins/      # 将packages目录下的插件复制至 /verdaccio/plugins 目录
```

#### 常用插件集成部署

##### minio

当使用 minio 作为 storage 存储时需要引入 verdaccio-minio 插件。

```bash
# 创建工作目录
mkdir -p /verdaccio/conf /verdaccio/storage
sudo chown --recursive 10001:65533 /verdaccio # 赋予目录 root 权限
cd /verdaccio

# 初始化 npm 项目并安装 verdaccio-minio 插件
npm init
npm install --global-style verdaccio-minio
```

创建 conf/config.yaml 文件

```yaml
plugins: /verdaccio/plugins
storage: /verdaccio/storage/data
store:
  minio:
    port: 9000
    endPoint: minio
    accessKey: your_access_key
    secretKey: your_secret_key
    useSSL: false

# other config
```

需要本地部署 minio，选择 docker-compose 方式组合启动 verdaccio 与 minio。
docker-compose.yaml：

```yaml
# docker-compose.yaml
version: '3.7'

services:
  verdaccio:
    image: verdaccio/verdaccio
    container_name: verdaccio-minio
    ports:
      - 4873:4873
    depends_on:
      - minio
    environment:
      VERDACCIO_PROTOCOL: http
      VERDACCIO_PORT: 4873
    networks:
      - verdaccio
    volumes:
      - ./conf:/verdaccio/conf
      - ./storage:/verdaccio/storage
      # 将 node_modules 挂载为 容器内verdaccio的plugins目录
      - ./node_modules:/verdaccio/plugins

  minio:
    image: minio/minio
    container_name: minio
    # 指定端口与数据存储目录
    command: server --console-address ':9001' /data
    volumes:
      - minio:/data
    ports:
      - 9000:9000
      - 9001:9001
    environment:
      MINIO_ACCESS_KEY: your_access_key
      MINIO_SECRET_KEY: your_secret_key
    networks:
      - verdaccio

volumes:
  minio:

networks:
  verdaccio:
```

##### s3

接入 aws oss 需引入 [verdaccio-aws-s3-storage](https://www.npmjs.com/package/verdaccio-aws-s3-storage) 插件。

接入方式同 minio，只不过 aws-s3 不能部署😂

```bash
# 全局安装
npm install -g verdaccio-aws-s3-storage

# 项目安装
npm install --global-style verdaccio-aws-s3-storage
```

配置如下：

```yaml
# config.yaml
store:
  aws-s3-storage:
    bucket: your-s3-bucket
    endpoint: your-endpoint.com
    accessKeyId: your-access-key-id
    secretAccessKey: your-secret-access-key
```

### 插件开发

详见：<https://verdaccio.org/docs/plugins>

#### auth 插件

[Auth plugin | Verdaccio](https://verdaccio.org/docs/plugin-auth)

verdaccio auth 插件需实现以下接口：

```ts
interface AllowAccess {
  name: string;
  version?: string;
  tag?: string;
}

interface PackageAccess {
  storage?: string;
  publish?: string[];
  proxy?: string[];
  access?: string[];
  unpublish?: string[];
}

// 回调第二个参数返回用户所属群组信息。用户名 username 会使用账号（npm adduser）使用的
type AuthCallback = (error: VerdaccioError | null, groups?: string[] | false) => void;
// 回调第二个参数，增加成功则返回用户名或true（htpasswd传的true），失败则返回false
type AuthUserCallback = (error: VerdaccioError | null, access?: boolean | string) => void;
// 回调第二个参数，校验通过传true，否则传false
type AuthAccessCallback = (error: VerdaccioError | null, access?: boolean) => void;

interface IPluginAuth<T> extends IPlugin<T> {
  // npm login
  authenticate(user: string, password: string, cb: AuthCallback): void;

  // npm adduser
  adduser?(user: string, password: string, cb: AuthUserCallback): void;

  // 修改密码
  changePassword?(user: string, password: string, newPassword: string, cb: AuthCallback): void;

  // 根据用户信息与包信息判断用户权限
  allow_publish?(user: RemoteUser, pkg: AllowAccess & PackageAccess, cb: AuthAccessCallback): void;
  allow_access?(user: RemoteUser, pkg: AllowAccess & PackageAccess, cb: AuthAccessCallback): void;
  allow_unpublish?(
    user: RemoteUser,
    pkg: AllowAccess & PackageAccess,
    cb: AuthAccessCallback
  ): void;

  // 禁用
  apiJWTmiddleware?(helpers: any): Function;
}
```

#### theme 插件

verdaccio 官方提供了一个默认的 ui 插件 `@verdaccio/theme-ui`，当未配置 theme 配置时，verdaccio 将使用默认的主题插件。

verdaccio 的 theme 插件包结构需满足以下要求：

```json
{
  "name": "verdaccio-theme-xxxx", // 插件名称必须以 verdaccio-theme- 开头
  "version": "1.0.0",
  "description": "my custom user interface",
  "main": "index.js", // 入口文件
}
```

其中，入口文件需要默认导出一个方法，结构如下：

```js
module.exports = () => {
  return {
    // location of the static files, webpack output
    staticPath: path.join(__dirname, 'static'),
    // webpack manifest json file
    manifest: require('./static/manifest.json'),
    // main manifest files to be loaded
    manifestFiles: {
      js: ['runtime.js', 'vendors.js', 'main.js'],
    },
  };
};
```

为什么需要导出这样的结构？我们对照 [`@verdaccio/theme-ui` 源码](https://github.com/verdaccio/verdaccio/tree/master/packages/plugins/ui-theme)一看便知。

是因为默认的 theme 插件使用 react 编写，且使用 webpack 构建，这么一看就清晰明了了。

如果你需要自定义 verdaccio 主题样式，而配置文件中的 web 配置又不能满足需求时，你可能就需要开发自己的 theme 插件了。不管你的插件使用什么框架构建（react或vue或其他），入口导出必须满足上述结构且正确，否则插件便不能被正确加载。

你可以在[这里](https://verdaccio.org/docs/plugin-theme/#build-structure)看到更加详细的信息。

##### theme 插件配置注入

web 配置会注入到 `window.__VERDACCIO_BASENAME_UI_OPTIONS` 对象中，改对象在浏览器全局上下文中可被访问到。

在插件 react 应用组件中可通过 `@verdaccio/components-ui` 导出的 `useConfig` 钩子获取。

> 注意：仅 web 配置项的配置会注入到 `window.__VERDACCIO_BASENAME_UI_OPTIONS` 对象中，theme 配置无法从该对象获取。

假如有以下配置

```yaml
web:
  foo: webfoo
  bar: webbar

theme:
  webui:
    foo: foo
    bar: bar
```

在 `window.__VERDACCIO_BASENAME_UI_OPTIONS` 仅能访问到 web 配置项注入的配置：

```js
console.log(window.__VERDACCIO_BASENAME_UI_OPTIONS)
// 输出如下：
{
  // ...
  "foo": "webfoo",
  "bar": "webbar"
}
```

theme 插件自己的配置无法在前端获取，配置文件中传入的 theme 配置无法传递到前端页面（官网说可以，实际上是不行的）。

若 theme 插件需要配置，可尝试将主题配置配置 web 配置项下：

```yaml
web:
  # ...
  # 以下配置可以通过 window.__VERDACCIO_BASENAME_UI_OPTIONS.webui 访问
  webui: # webui theme 配置
    foo: foo
    bar: bar

theme:
  webui:
    # 以下配置在前端应用中无法访问到
    foo: foo
    bar: bar
```

