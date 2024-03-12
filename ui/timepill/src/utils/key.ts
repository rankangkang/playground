export default function getKey(): string {
  let key = "";
  for(let i = 0; i < 4; i++) {
    let _k = ""
    for(let j = 0; j < 4; j++) {
      let t = Math.floor(Math.random() * (122 - 48) + 48);
      _k += String.fromCharCode(t);
    }
    key += ('-' + _k);
  }
  return key.slice(1);
}