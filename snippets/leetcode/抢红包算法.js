// 拼手气抢红包算法

// 该算法算出来都是前面的大
class RedPacket {
  constructor(total, nums) {
    if (nums * 0.01 > total) {
      throw 'invalid red pocket'
    }

    this._money = total
    this._packetCount = nums
    this._remain = total
    this._count = nums
    this._packets = []
  }

  get packets() {
    return this._packets
  }

  qiang() {
    if (this._count <= 0) {
      return undefined
    }

    if (this._count === 1) {
      this._count--
      const m = this._remain
      this._packets.push(m)
      this._remain = 0
      return m
    }

    const ratio = Math.random() * (this._remain / this._money)
    let cGet = (this._money * ratio).toFixed(2)
    const tRemain = +(this._remain - cGet).toFixed(2)
    const allLeast = this._count * 0.01
    if (tRemain < allLeast) {
      cGet = +(this._remain - allLeast).toFixed(2)
      this._remain = allLeast
    } else {
      this._remain = tRemain
    }
    this._count--
    this.packets.push(cGet)
    return cGet
  }
}

const p = new RedPacket(10, 10)

for (let i = 0; i < 10; i++) {
  console.log(p.qiang())
}

console.log(p.qiang())
console.log(p.packets)
console.log(p.packets.reduce((res, m) => res + Number(m), 0))

class RedPacketBinary {
  constructor(total, nums) {
    if (nums * 0.01 > total) {
      throw 'invalid red pocket'
    }

    this._money = total
    this._packetCount = nums
    this._remain = total
    this._count = nums
    this._packets = []
  }

  get packets() {
    return this._packets
  }

  qiang() {
    if (this._count <= 0) {
      return undefined
    }

    if (this._count === 1) {
      this._count--
      const m = this._remain
      this._packets.push(m)
      this._remain = 0
      return m
    }

    // 二倍平均数，可保证每次抢到的数目相近
    const average = (this._remain / this._count) * 2
    const cGet = Number((Math.random() * average).toFixed(2))
    this._packets.push(cGet)
    this._remain -= cGet
    this._count--
    return cGet
  }
}

console.log('二倍平均数法')
const p2 = new RedPacketBinary(10, 10)

for (let i = 0; i < 10; i++) {
  console.log(p2.qiang())
}

console.log(p2.qiang())
console.log(p2.packets)
console.log(p2.packets.reduce((res, m) => res + Number(m), 0))
