function get(obj, props) {
  props = props || [];
  if (typeof props === 'string') {
    // 匹配不是 [、]、.的连续字符串。^ 在 [] 中表示取反
    const regexp = /[^\[\].]+/g;
    props = props.match(regexp);
  }

  let result = obj;
  for (let i = 0; i < props.length; i++) {
    if (!result) {
      return result;
    }
    result = result[props[i]];
  }

  return result;
}

console.log(get({ a: { b: { c: 1 } } }, 'a.b.c')); // 1
console.log(get({ a: { b: { c: 1 } } }, 'a[b].d')); // undefined
console.log(get({ a: { b: { c: [1] } } }, 'a[b].c[0]')); // undefined