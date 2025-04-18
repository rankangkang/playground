/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#canvas')
// 获取2d上下文
const ctx = canvas.getContext('2d')
const DISTANCE = 200

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    // 添加速度属性
    this.vx = (Math.random() - 0.5) * 2 // 初始随机速度
    this.vy = (Math.random() - 0.5) * 2
    // 最大速度限制
    this.maxSpeed = 1
  }

  setCtx(ctx) {
    this.ctx = ctx
    return this
  }

  draw() {
    if (!this.ctx) {
      console.info('ctx is not set')
      return this
    }

    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
    this.ctx.fillStyle = `rgba(255, 255, 255, 1)`
    this.ctx.fill()
    return this
  }

  update() {
    // 添加随机加速度（模拟风的效果）
    const ax = (Math.random() - 0.5) * 0.1
    const ay = (Math.random() - 0.5) * 0.1

    // 更新速度
    this.vx += ax
    this.vy += ay

    // 限制速度大小
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed
      this.vy = (this.vy / speed) * this.maxSpeed
    }

    // 更新位置
    this.x += this.vx
    this.y += this.vy

    // 边界检查和反弹
    if (this.x < 0) {
      this.x = 0
      this.vx *= -0.5 // 反弹时损失一些能量
    } else if (this.x > canvas.width) {
      this.x = canvas.width
      this.vx *= -0.5
    }

    if (this.y < 0) {
      this.y = 0
      this.vy *= -0.5
    } else if (this.y > canvas.height) {
      this.y = canvas.height
      this.vy *= -0.5
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class Graph {
  points = []
  /**
   * @type {CanvasRenderingContext2D}
   */
  ctx
  constructor(size = 50) {
    this.points = Array.from(
      { length: size },
      () => new Point(getRandom(0, canvas.width), getRandom(0, canvas.height)),
    )
  }

  setCtx(ctx) {
    this.ctx = ctx
    this.points.forEach((point) => {
      point.setCtx(ctx)
    })
    return this
  }

  /**
   * 计算两点之间的距离
   * @param {Point} p1
   * @param {Point} p2
   * @returns {number}
   */
  getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }

  lineTo(p1, p2) {
    const distance = this.getDistance(p1, p2)
    if (distance > DISTANCE) {
      return this
    }

    this.ctx.beginPath()
    this.ctx.moveTo(p1.x, p1.y)
    this.ctx.lineTo(p2.x, p2.y)
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${(DISTANCE - distance) / DISTANCE})`
    this.ctx.stroke()
    return this
  }

  updatePoints() {
    this.points.forEach((point) => point.update())
    return this
  }

  draw() {
    if (!this.ctx) {
      console.info('ctx is not set')
      return this
    }

    // 绘制下一帧前先清除
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 更新点的位置
    this.updatePoints()
    // 绘制每个组
    this.points.forEach((point, index) => {
      point.draw()
      this.points.slice(index + 1).forEach((point2) => {
        if (point === point2) return
        this.lineTo(point, point2)
      })
    })

    return this
  }
}

// 初始化时创建更多的点以获得更好的视觉效果
let graph
let rafId = null
function render() {
  graph.draw()
  rafId = requestAnimationFrame(render)
}

function bootstrap() {
  const update = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    if (rafId) {
      cancelAnimationFrame(rafId)
      render()
    }
  }
  window.addEventListener('resize', update)
  update()

  graph = new Graph(100).setCtx(ctx)
  requestAnimationFrame(render)
}

bootstrap()
