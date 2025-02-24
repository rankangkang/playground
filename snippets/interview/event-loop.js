console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

async function asyncFunc() {
  console.log('3');
  await Promise.resolve();
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
}

// 👆🏻类似于👇🏻
// new Promise((resolve) => {
//   console.log('3')
//   resolve()
// }).then(() => {
//   console.log('4')
//   setTimeout(() => {
//     console.log('5')
//   }, 0)
// })

asyncFunc();

Promise.resolve().then(() => {
  console.log('6');
});

console.log('7');

// 1, 3, 7, 4, 6, 2, 5

