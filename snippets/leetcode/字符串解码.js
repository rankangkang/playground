/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stack = []
  const root = new StringPart()
  stack.push(root)

  for (let i = 0; i < s.length; i++) {
    const ch = s.charAt(i)
    if (ch === '[') {
      stack.push()
    }

    if (isNumber(ch)) {}
  }
};

function isNumber(s) {
  return !isNaN(Number(s))
}

class StringPart {
  constructor() {
    this.repeat = 1
    this.snippet = ''
  }

  decode() {
    let r = ''
    for (let i = 0; i < this.repeat; i++) {
      r += this.snippet;
    }
    return r;
  }
}