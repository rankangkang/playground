const canvas = document.createElement('canvas')
const canvasCtx = canvas.getContext('2d')

/**
 * 测量文字宽度
 * @param {string} text
 * @param {string} font
 */
export function measureText(text, font) {
  if (font) {
    canvasCtx.font = font
  }

  const metrics = canvasCtx.measureText(text)
  return metrics.width
}

/**
 * 测量文字宽度
 * @param {string} text
 * @param {number} maxWidth
 * @param {Object} option
 * @param {number} option.fontSize
 * @param {string} option.fontFamily
 * @param {string} option.ellipsis
 */
export function ellipsisText(text, maxWidth, option = {}) {
  const { fontSize, fontFamily, ellipsis = '...' } = option
  let fontAttrs = []
  if (fontSize) {
    fontAttrs.push(`${fontSize}px`)
  }
  if (fontFamily) {
    fontAttrs.push(fontFamily)
  }

  const font = fontAttrs.join(' ')
  const textWidth = measureText(text, font)

  // 文字宽度小于容器宽度,直接返回
  if (textWidth <= maxWidth) {
    return text
  }

  // 二分查找
  // 二分查找合适的 middle 位置,取头尾两端等距的字符 (0->middle) 与 (length - middle -> length) + 占位的 ellipsis
  const originalText = text
  let start = 0
  let end = originalText.length

  while (start + 1 < end) {
    const middle = Math.floor((start + end) / 2)
    const newText = originalText.slice(0, middle) + ellipsis + originalText.slice(-middle)

    if (measureText(newText, font) <= maxWidth) {
      start = middle
    } else {
      end = middle
    }
  }

  const finalText = originalText.slice(0, start) + ellipsis + originalText.slice(-start)
  return finalText
}
