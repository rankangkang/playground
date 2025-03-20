/**
 * 当然，也可用正则
 * @param {string} sentence
 * @return {number}
 */
let countValidWords = function (sentence) {
  const tokens = sentence.split(' ').filter(Boolean)
  const markSet = new Set(['!', ',', '.'])
  // 分割后直接使用正则匹配也行，正则如下
  // /^([,.!]|([a-z]+)(-[a-z]+)?[,.!]?)$/g
  return tokens.reduce((r, token) => {
    if (/\d/.test(token)) {
      // 有数字
      return r
    }

    const nums = token.split('').reduce(
      (r, char) => {
        if (char === '-') {
          r.dash++
        }
        if (markSet.has(char)) {
          r.marks++
        }
        return r
      },
      { dash: 0, marks: 0 },
    )
    if (token.startsWith('-') || token.endsWith('-') || nums.dash > 1) {
      // 连字符开头或结尾，同时多个连字符
      return r
    }

    if (
      nums.marks > 1 ||
      (nums.marks === 1 && !markSet.has(token.at(-1))) ||
      (token.length > 1 && markSet.has(token.at(-1)) && token.at(-2) === '-')
    ) {
      // 标点符号数量大于 1，或存在标点时，不在结尾，同时不跟 ‘-’ 连接
      return r
    }

    return r + 1
  }, 0)
}

console.log(
  countValidWords(
    ` 62   nvtk0wr4f  8 qt3r! w1ph 1l ,e0d 0n 2v 7c.  n06huu2n9 s9   ui4 nsr!d7olr  q-, vqdo!btpmtmui.bb83lf g .!v9-lg 2fyoykex uy5a 8v whvu8 .y sc5 -0n4 zo pfgju 5u 4 3x,3!wl  fv4   s  aig cf j1 a i  8m5o1  !u n!.1tz87d3 .9    n a3  .xb1p9f  b1i a j8s2 cugf l494cx1! hisceovf3 8d93 sg 4r.f1z9w   4- cb r97jo hln3s h2 o .  8dx08as7l!mcmc isa49afk i1 fk,s e !1 ln rt2vhu 4ks4zq c w  o- 6  5!.n8ten0 6mk 2k2y3e335,yj  h p3 5 -0  5g1c  tr49, ,qp9 -v p  7p4v110926wwr h x wklq u zo 16. !8  u63n0c l3 yckifu 1cgz t.i   lh w xa l,jt   hpi ng-gvtk8 9 j u9qfcd!2  kyu42v dmv.cst6i5fo rxhw4wvp2 1 okc8!  z aribcam0  cp-zp,!e x  agj-gb3 !om3934 k vnuo056h g7 t-6j! 8w8fncebuj-lq    inzqhw v39,  f e 9. 50 , ru3r  mbuab  6  wz dw79.av2xp . gbmy gc s6pi pra4fo9fwq k   j-ppy -3vpf   o k4hy3 -!..5s ,2 k5 j p38dtd   !i   b!fgj,nx qgif `,
  ),
)
