// 定义状态常量，promise中有三个状态 pending、fulfilled和rejected
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// promise 是一个类
class MyPromise {
  // 在创建这个类的时候，需要传递一个执行器进去，执行器会立即执行
  constructor (executor) {
    // 使用try catch 捕捉执行器执行错误
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  // promise状态，pending => fulfilled || pending => rejected 状态确定后不可更改
  status = PENDING
  // 成功之后的值
  success = undefined
  // 失败之后的值
  error = undefined
  // 成功回调函数列表，可处理promise并发调用的情况
  successCallback = []
  // 失败回调函数列表
  failCallback = []

  // 箭头函数的this指向MyPromise
  resolve = success => {
    // 状态确定后不可更改
    if (this.status !== PENDING) return
    // 修改状态
    this.status = FULFILLED
    // 保存成功后的值
    this.success = success
    // 处理调用promise.all方法时成功回调函数
    while (this.successCallback.length) {
      this.successCallback.shift()()
    }
  }

  reject = error => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.error = error
    while (this.failCallback.length) {
      this.failCallback.shift()()
    }
  }

  // then有两个参数，分别是成功回调和失败回调
  then(successCallback, failCallback) {
    // 判断参数是否是回调函数，将then的参数修改为可选参数
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => { throw reason }
    // 当回调函数中使用了异步时，需要将回调函数的调用修改成Pomise对象
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FUFILLED) {
        try {
          setTimeout(() => {
            let x = successCallback(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }, 0)
        } catch (error) {
          reject(error)
        }
      } else if (this.status === REJECT) {
        setTimeout(() => {
          let x = failCallback(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        }, 0)
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            let x = successCallback(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            let x = failCallback(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }, 0)
        })
      }
    })
    return promise2
  }

  finally(callback){
    return this.then(value=>{
      return MyPromise.resolve(callback()).then(()=>value)
    },reason=>{
      return MyPromise.resolve(callback()).then(()=>{throw reason})
    })
  }

  catch(failCallback){
    return this.then(undefined,failCallback)
  }

  static all(array) {
    let result = []
    
    return new MyPromise((resolve, reject) => {
      let count = 0
      function addData(index,value){
        result[index] = value
        count++
        console.log(count,array.length)
        if(count === array.length){
          resolve(result) 
        }   
      }
      for(let i= 0;i<array.length;i++){
        let current = array[i]
        if(current instanceof MyPromise){
          current.then((value)=>{
            addData(i,value)
          },(reason)=>{
            reject(reason)
          })
        }else{
          addData(i,current)
        }
      }
    })
  }

  static resolve(value){
    if(value instanceof MyPromise){
      return value
    }
    return new MyPromise(resolve=>resolve(value))
  }
}

resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
      return reject(new TypeError("Chaining cycle detected for promise #<Promise>    "))
  }
  if (x instanceof MyPromise) {
      x.then(resolve, reject)
  } else {
      resolve(x)
  }
}

module.exports = MyPromise