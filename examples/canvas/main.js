/**
 * 画两四边形
 * @param {HTMLCanvasElement} el
 */
export function drawRect(el) {
  const ctx = el.getContext('2d')

  ctx.fillStyle = 'rgb(200, 0, 0)'
  ctx.fillRect(10, 10, 50, 50)

  // // 画矩形边框
  // ctx.strokeRect(9, 9, 57, 52)
  // ctx.strokeStyle = 'rgb(0, 0, 200)'
  // ctx.strokeRect(11, 11, 53, 48)
  // ctx.strokeStyle = 'rgb(255, 255, 255)'

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
  ctx.fillRect(30, 30, 50, 50)

  ctx.strokeRect(0, 0, 150, 150)
  ctx.strokeStyle = 'rgb(0, 0, 0)'
  setTimeout(() => {
    console.log('清除区域')
    ctx.clearRect(35, 35, 25, 25)
  }, 3000)
}

/**
 * 画三角形
 * @param {HTMLCanvasElement} el
 */
export function drawTriangle(el) {
  const ctx = el.getContext('2d')

  ctx.beginPath()
  // 设置起点
  ctx.moveTo(0, 50)
  // lineTo 绘制直线
  ctx.lineTo(50, 75)
  ctx.lineTo(50, 25)
  ctx.closePath()
  // 填充
  ctx.fill()

  ctx.moveTo(150, 50)
  ctx.lineTo(100, 75)
  ctx.lineTo(100, 25)
  ctx.closePath()
  // 描边
  ctx.stroke()
}

/**
 * 画微笑
 * @param {HTMLCanvasElement} el
 */
export function drawSmile(el) {
  const ctx = el.getContext('2d')

  ctx.beginPath()
  // arc 绘制圆弧，给定原点
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // 绘制
  ctx.moveTo(110, 75)
  ctx.arc(75, 75, 35, 0, Math.PI, false) // 口 (顺时针)
  ctx.moveTo(65, 65)
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // 左眼
  ctx.moveTo(95, 65)
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼
  ctx.strokeStyle = 'blue'
  ctx.stroke()
}

/**
 * 画圆
 * @param {HTMLCanvasElement} el
 */
export function drawCircles(el) {
  let ctx = el.getContext('2d')

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.beginPath()
      let x = 25 + j * 50 // x 坐标值
      let y = 25 + i * 50 // y 坐标值
      let radius = 20 // 圆弧半径
      let startAngle = 0 // 开始点
      let endAngle = Math.PI + (Math.PI * j) / 2 // 结束点
      let anticlockwise = i % 2 !== 0 // 顺时针或逆时针

      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)

      if (i > 1) {
        ctx.fill()
      } else {
        ctx.stroke()
      }
    }
  }
}

/**
 * 二次贝塞尔
 * @param {HTMLCanvasElement} el
 */
export function drawQuadra(el) {
  let ctx = el.getContext('2d')

  // 二次贝塞尔曲线
  ctx.beginPath()
  ctx.moveTo(75, 25)
  ctx.quadraticCurveTo(25, 25, 25, 62.5)
  ctx.quadraticCurveTo(25, 100, 50, 100)
  ctx.quadraticCurveTo(50, 120, 30, 125)
  ctx.quadraticCurveTo(60, 120, 65, 100)
  ctx.quadraticCurveTo(125, 100, 125, 62.5)
  ctx.quadraticCurveTo(125, 25, 75, 25)
  ctx.stroke()
}

/**
 * 三次贝塞尔
 * @param {HTMLCanvasElement} el
 */
export function drawBezier(el) {
  let ctx = el.getContext('2d')

  // 三次贝塞尔曲线
  ctx.beginPath()
  ctx.moveTo(75, 40)
  ctx.bezierCurveTo(75, 40, 70, 25, 50, 25)
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5)
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120)
  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5)
  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25)
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40)
  ctx.fill()
}

export function drawPoint(ctx, x, y) {
  // ctx.beginPath()
  // ctx.moveTo(x, y)
  ctx.arc(x, y, 1, 0, Math.PI * 2)
  ctx.fill()
}

/**
 * 三次贝塞尔
 * @param {HTMLCanvasElement} el
 */
export function drawGame(el) {
  let ctx = el.getContext('2d')

  roundedRect(ctx, 12, 12, 150, 150, 15)
  roundedRect(ctx, 19, 19, 150, 150, 9)
  roundedRect(ctx, 53, 53, 49, 33, 10)
  roundedRect(ctx, 53, 119, 49, 16, 6)
  roundedRect(ctx, 135, 53, 49, 33, 10)
  roundedRect(ctx, 135, 119, 25, 49, 10)

  ctx.beginPath()
  ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false)
  ctx.lineTo(31, 37)
  ctx.fill()

  for (let i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 35, 4, 4)
  }

  for (let i = 0; i < 6; i++) {
    ctx.fillRect(115, 51 + i * 16, 4, 4)
  }

  for (let i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 99, 4, 4)
  }

  drawGhost(ctx)
}

// 封装的一个用于绘制圆角矩形的函数。
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x, y + radius)
  ctx.lineTo(x, y + height - radius)
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
  ctx.lineTo(x + width - radius, y + height)
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
  ctx.lineTo(x + width, y + radius)
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
  ctx.lineTo(x + radius, y)
  ctx.quadraticCurveTo(x, y, x, y + radius)
  ctx.stroke()
}

function drawGhost(ctx) {
  ctx.beginPath()
  ctx.moveTo(83, 116)
  ctx.lineTo(83, 102)
  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88)
  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102)
  ctx.lineTo(111, 116)
  ctx.lineTo(106.333, 111.333)
  ctx.lineTo(101.666, 116)
  ctx.lineTo(97, 111.333)
  ctx.lineTo(92.333, 116)
  ctx.lineTo(87.666, 111.333)
  ctx.lineTo(83, 116)
  ctx.fill()

  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.moveTo(91, 96)
  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101)
  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106)
  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101)
  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96)
  ctx.moveTo(103, 96)
  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101)
  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106)
  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101)
  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96)
  ctx.fill()

  ctx.fillStyle = 'black'
  ctx.beginPath()
  ctx.arc(101, 102, 2, 0, Math.PI * 2, true)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(89, 102, 2, 0, Math.PI * 2, true)
  ctx.fill()
}

/**
 * 三次贝塞尔
 * @param {HTMLCanvasElement} el
 */
export function drawWithPath2D(el) {
  const ctx = el.getContext('2d')

  const rect = new Path2D()
  rect.rect(10, 10, 50, 50)
  ctx.stroke(rect)

  const circle = new Path2D()
  circle.moveTo(125, 35)
  circle.arc(125, 35, 25, 0, -(Math.PI * 1.75), true)
  circle.lineTo(125, 35)
  ctx.stroke(circle)
  ctx.fill(circle)
}

/**
 * 画色板
 * @param {HTMLCanvasElement} el
 */
export function drawSwatches(el) {
  const ctx = el.getContext('2d')
  // ctx.globalAlpha = 0.5

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      // 保存原有画布配置，入栈操作
      ctx.save()
      const shape = new Path2D()
      // 需要先移动原点
      ctx.translate(j * 30, i * 15)

      // 相对原点画矩形
      shape.rect(0, 0, 30, 15)
      const lingrad = ctx.createLinearGradient(0, 0, 30, 0)
      lingrad.addColorStop(0, `rgb(${Math.floor(255 - 25.5 * i)}, ${Math.floor(255 - 25.5 * j)}, 0`)
      lingrad.addColorStop(
        1,
        `rgb(${Math.floor(255 - 25.5 * (i + 1))}, ${Math.floor(255 - 25.5 * (j + 1))}, 0)`,
      )

      ctx.fillStyle = lingrad
      ctx.fill(shape)
      // 移动原点
      // 还原画布配置，出栈操作
      ctx.restore()
    }
  }
}

/**
 * 画线
 * @param {HTMLCanvasElement} el
 */
export function drawLines(el) {
  const ctx = el.getContext('2d')
  for (let i = 0; i < 10; i++) {
    ctx.lineCap = i % 3 === 0 ? 'butt' : i % 3 === 1 ? 'round' : 'square'
    // 设置线宽
    ctx.lineWidth = i + 1
    ctx.beginPath()
    ctx.moveTo(5 + i * 14, 5)
    ctx.lineTo(5 + i * 14, 140)
    ctx.stroke()
  }
}

/**
 * 画渐变
 * @param {HTMLCanvasElement} el
 */
export function drawGradient(el) {
  const ctx = el.getContext('2d')
  // Create gradients
  let lingrad = ctx.createLinearGradient(0, 0, 0, 150)
  lingrad.addColorStop(0, '#00ABEB')
  lingrad.addColorStop(0.5, '#fff')
  lingrad.addColorStop(0.5, '#26C000')
  lingrad.addColorStop(1, '#fff')

  let lingrad2 = ctx.createLinearGradient(0, 50, 0, 95)
  lingrad2.addColorStop(0.5, '#000')
  lingrad2.addColorStop(1, 'rgba(0,0,0,0)')

  // assign gradients to fill and stroke styles
  ctx.fillStyle = lingrad
  ctx.strokeStyle = lingrad2

  // draw shapes
  ctx.fillRect(10, 10, 130, 130)
  ctx.strokeRect(50, 50, 50, 50)

  // radical
  // 创建渐变
  let radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30)
  radgrad.addColorStop(0, '#A7D30C')
  radgrad.addColorStop(0.9, '#019F62')
  radgrad.addColorStop(1, 'rgba(1,159,98,0)')

  let radgrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50)
  radgrad2.addColorStop(0, '#FF5F98')
  radgrad2.addColorStop(0.75, '#FF0188')
  radgrad2.addColorStop(1, 'rgba(255,1,136,0)')

  let radgrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40)
  radgrad3.addColorStop(0, '#00C9FF')
  radgrad3.addColorStop(0.8, '#00B5E2')
  radgrad3.addColorStop(1, 'rgba(0,201,255,0)')

  let radgrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90)
  radgrad4.addColorStop(0, '#F4F201')
  radgrad4.addColorStop(0.8, '#E4C700')
  radgrad4.addColorStop(1, 'rgba(228,199,0,0)')

  // 画图形
  ctx.fillStyle = radgrad4
  ctx.fillRect(0, 0, 150, 150)
  ctx.fillStyle = radgrad3
  ctx.fillRect(0, 0, 150, 150)
  ctx.fillStyle = radgrad2
  ctx.fillRect(0, 0, 150, 150)
  ctx.fillStyle = radgrad
  ctx.fillRect(0, 0, 150, 150)
}

/**
 * 画 pattern
 * @param {HTMLCanvasElement} el
 */
export function drawPattern(el) {
  const ctx = el.getContext('2d')

  // 创建新 image 对象，用作图案
  let img = new Image()
  img.src =
    'http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWOalS?ver=cc6e'
  img.onload = function () {
    // 创建图案
    let ptrn = ctx.createPattern(img, 'repeat')
    ctx.fillStyle = ptrn
    ctx.fillRect(0, 0, 150, 150)
  }
}

/**
 * 画文字阴影
 * @param {HTMLCanvasElement} el
 */
export function drawTextShadow(el) {
  const ctx = el.getContext('2d')

  ctx.beginPath()
  ctx.shadowOffsetX = -5
  ctx.shadowOffsetY = -5
  ctx.shadowBlur = 1
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'

  ctx.font = '20px Times New Roman'
  ctx.fillStyle = 'Black'
  ctx.fillText('Sample String', 5, 30)
  // 镂空字体
  ctx.strokeText('Storke String', 5, 60)
  ctx.closePath()

  ctx.beginPath()
  ctx.arc(50, 100, 30, 0, Math.PI * 2, true)
  ctx.arc(50, 100, 15, 0, Math.PI * 2, true)
  ctx.fill('evenodd')
  // ctx.fill('nonzero')

  // 预测量文本宽度
  const text = ctx.measureText('asdghdfsyugs dsgaydsa dgsyadgas')
  console.log('measure text object', text)
}

/**
 * 画图片
 * @param {HTMLCanvasElement} el
 */
export function drawImage(el) {
  const ctx = el.getContext('2d')
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 200, 0, 50, 100)
  }
  img.src =
    'http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWOalS?ver=cc6e'

  ctx.fillRect(0, 0, 150, 150) // 使用默认设置绘制一个矩形
  ctx.save() // 保存默认状态

  ctx.fillStyle = '#09F' // 在原有配置基础上对颜色做改变
  ctx.fillRect(15, 15, 120, 120) // 使用新的设置绘制一个矩形

  ctx.save() // 保存当前状态
  ctx.fillStyle = '#FFF' // 再次改变颜色配置
  ctx.globalAlpha = 0.5
  ctx.fillRect(30, 30, 90, 90) // 使用新的配置绘制一个矩形

  ctx.restore() // 重新加载之前的颜色状态
  ctx.fillRect(45, 45, 60, 60) // 使用上一次的配置绘制一个矩形

  ctx.restore() // 加载默认颜色配置
  ctx.save()
  ctx.scale(2, 0.5)
  ctx.fillRect(60, 60, 30, 30) // 使用加载的配置绘制一个矩形
  ctx.restore()

  // transform
  let sin = Math.sin(Math.PI / 6)
  let cos = Math.cos(Math.PI / 6)
  ctx.translate(100, 100)
  let c = 0
  for (let i = 0; i <= 12; i++) {
    c = Math.floor((255 / 12) * i)
    ctx.fillStyle = 'rgb(' + c + ',' + c + ',' + c + ')'
    ctx.fillRect(0, 0, 100, 10)
    ctx.transform(cos, sin, -sin, cos, 0, 0)
  }

  ctx.setTransform(-1, 0, 0, 1, 100, 100)
  ctx.fillStyle = 'rgba(255, 128, 255, 0.5)'
  ctx.fillRect(0, 50, 100, 100)
}

/**
 * 画太阳系
 * @param {HTMLCanvasElement} el
 */
export function drawSolarSystem(el) {
  let sun = new Image()
  let moon = new Image()
  let earth = new Image()

  function init() {
    sun.src =
      'https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_sun.png'
    moon.src =
      'https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_moon.png'
    earth.src =
      'https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_earth.png'
    window.requestAnimationFrame(draw)
  }

  function draw() {
    let ctx = el.getContext('2d')

    ctx.globalCompositeOperation = 'destination-over'
    ctx.clearRect(0, 0, 300, 300) // clear canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.strokeStyle = 'rgba(0,153,255,0.4)'
    ctx.save()
    ctx.translate(150, 150)

    // Earth
    let time = new Date()
    ctx.rotate(
      ((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds(),
    )
    ctx.translate(105, 0)
    ctx.fillRect(0, -12, 50, 24) // Shadow
    ctx.drawImage(earth, -12, -12)

    // Moon
    ctx.save()
    ctx.rotate(
      ((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds(),
    )
    ctx.translate(0, 28.5)
    ctx.drawImage(moon, -3.5, -3.5)
    ctx.restore()

    ctx.restore()

    ctx.beginPath()
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false) // Earth orbit
    ctx.stroke()

    ctx.drawImage(sun, 0, 0, 300, 300)

    window.requestAnimationFrame(draw)
  }

  init()
}

/**
 * 画全景照片
 * @param {HTMLCanvasElement} el
 */
export function drawPanorama(el) {
  const img = new Image()
  img.src =
    'https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations/capitan_meadows,_yosemite_national_park.jpg'

  let CanvasXSize = 800
  let CanvasYSize = 200
  let scale = 1.05
  let y = -4.5 // vertical offset

  let dx = 0.25
  let imgW
  let imgH
  let x = 0
  let clearX
  let clearY
  const ctx = el.getContext('2d')

  img.onload = function init() {
    imgW = img.width * scale
    imgH = img.height * scale

    if (imgW > CanvasXSize) {
      x = CanvasXSize - imgW
      clearX = imgW
    } else {
      clearX = CanvasXSize
    }

    if (imgH > CanvasYSize) {
      clearY = imgH
    } else {
      clearY = CanvasYSize
    }

    requestAnimationFrame(draw)
  }

  // 通过设置 图片起始横坐标 控制图片渲染
  function draw() {
    ctx.clearRect(0, 0, clearX, clearY)
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations

    if (imgW <= CanvasXSize) {
      if (x > CanvasXSize) {
        x -= imgW
      }

      if (x > 0) {
        ctx.drawImage(img, x - imgW, y, imgW, imgH)
      }

      if (x - imgW > 0) {
        ctx.drawImage(img, x - 2 * imgW, y, imgW, imgH)
      }
    } else {
      // reset, start from beginning
      if (x > CanvasXSize) {
        x = CanvasXSize - imgW
      }
      // draw aditional image
      if (x > CanvasXSize - imgW) {
        ctx.drawImage(img, x - imgW + 1, y, imgW, imgH)
      }
    }

    ctx.drawImage(img, x, y, imgW, imgH)
    x += dx

    requestAnimationFrame(draw)
  }
}
