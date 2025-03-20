/**
 * @param {string} pw
 */
function getScore(pw) {
  let score = 0
  const pwArray = pw.split('')
  // length
  if (pwArray.length <= 4) {
    score += 5
  } else if (pwArray.length <= 7) {
    score += 10
  } else {
    score += 25
  }

  // 字母
  const lowerCase = pwArray.some((ch) => ch >= 'a' && ch <= 'z')
  const upperCase = pwArray.some((ch) => ch >= 'A' && ch <= 'Z')
  if (lowerCase && upperCase) {
    score += 20
  } else if (lowerCase || upperCase) {
    score += 10
  }

  // 数字
  const numberCount = pwArray.reduce((r, ch) => {
    if (ch >= '0' && ch <= '9') {
      return r + 1
    }
    return r
  }, 0)
  if (numberCount <= 0) {
    score += 0
  } else if (numberCount <= 1) {
    score += 10
  } else {
    score += 20
  }

  // 符号
  const markCount = pwArray.reduce((r, ch) => {
    const charCode = ch.charCodeAt(0)
    if (
      (charCode >= 0x21 && charCode <= 0x2f) ||
      (charCode >= 0x3a && charCode <= 0x40) ||
      (charCode >= 0x5b && charCode <= 0x60) ||
      (charCode >= 0x7b && charCode <= 0x7e)
    ) {
      return r + 1
    }
    return r
  }, 0)
  if (markCount <= 0) {
    score += 0
  } else if (markCount <= 1) {
    score += 10
  } else {
    score += 25
  }

  // 奖励
  if (upperCase && lowerCase && numberCount && markCount) {
    score += 5
  } else if ((lowerCase || upperCase) && numberCount && markCount) {
    score += 3
  } else if ((lowerCase || upperCase) && numberCount) {
    score += 2
  }

  return score
}

function getLevel(score) {
  if (score >= 90) {
    return 'VERY_SECURE'
  }
  if (score >= 80) {
    return 'SECURE'
  }
  if (score >= 70) {
    return 'VERY_STRONG'
  }
  if (score >= 60) {
    return 'STRONG'
  }
  if (score >= 50) {
    return 'AVERAGE'
  }
  if (score >= 25) {
    return 'WEAK'
  }
  return 'VERY_WEAK'
}

function getPwLevel(pw) {
  console.log(getLevel(getScore(pw)))
}

getPwLevel('38$@NoNoN')
