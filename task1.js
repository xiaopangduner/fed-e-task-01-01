// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const a = 'hello'
//     resolve(a)
//   }, 10)
// })

// promise.then(result => {
//   return new Promise((resolve, reject) => {
//     return setTimeout(() => {
//       const b = 'lagou'
//       resolve(result + b)
//     }, 10)
//   })
// }).then(result => {
//   setTimeout(() => {
//     const c = 'I ♥ U'
//     console.log(result + c)
//   }, 10)
// })

const fn = msg => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(msg)
    }, 10)
  })
}

fn('hello').then(result => {
  return fn(result + 'lagou')
}).then(result => {
  return fn(result + 'I ♥ U')
}).then(result => {
  console.log(result)
})