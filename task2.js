const fp = require('lodash/fp')
const _ = require('lodash')

const cars = [
  { name:'Ferrair FF', horsepower:660, dollar_value:700000, in_stock:true },
  { name:'Spyker C12 Zagato', horsepower:650, dollar_value:648000, in_stock:false },
  { name:'Jafuar XKR-S', horsepower:550, dollar_value:132000, in_stock:false },
  { name:'Audi R8', horsepower:525, dollar_value:114200, in_stock:false },
  { name:'Aston Martin One-77', horsepower:750, dollar_value:1850000, in_stock:true },
  { name:'Pagani Huayra', horsepower:700, dollar_value:1300000, in_stock:false }
]

// 练习一
const isLastInStock = (cars) => {
  const fn = fp.flowRight(fp.prop('in_stock'), fp.last)
  return fn(cars)
}

console.log(isLastInStock(cars))

// 练习二
const getFisrtCarName = (cars) => {
  const fn = fp.flowRight(fp.prop('name'), fp.first)
  return fn(cars)
}

console.log(getFisrtCarName(cars))

// 练习三
const _average = (xs) => {
  return fp.reduce(fp.add, 0, xs) / xs.length
}

const averageDollarValue = (cars) => {
  const fn = fp.flowRight(_average, fp.map(car => car.dollar_value))
  return(fn(cars))
}

console.log(averageDollarValue(cars))

// 练习四
const _underscore = fp.replace(/\W+/g, "_")

const sanitizeNames = (names) => {
  const fn1 = fp.flowRight(_underscore, fp.lowerCase)
  const fn2 = fp.flowRight(fp.map(name => fn1(name)))
  return fn2(names)
}

console.log(sanitizeNames(['Hello World']))