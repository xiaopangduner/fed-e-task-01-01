const { MayBe, Container } = require('./support')
const fp = require('lodash/fp')
// 练习一
const maybe = MayBe.of([5, 6, 1])
const ex1 = y => {
  const fn = fp.flowRight(fp.map(val => fp.add(val)(y)))
  return maybe.map(fn)
}

console.log(ex1(2))

// 练习二
const xs = Container.of(['do','ray','me','fa','so','la','ti','do'])

const ex2 = () => {
  return xs.map(fp.first)._value
}

console.log(ex2())

// 练习三
const safeProp = fp.curry((x, o) => MayBe.of(o[x]))
const user = { id:2, name:'Albert' }

const ex3 = () => {
  return safeProp('name', user).map(fp.first)._value
}

console.log(ex3())

// 练习四
const ex4 = (n) => {
  return MayBe.of(n).map(parseInt)._value
}

console.log(ex4())
console.log(ex4('555'))