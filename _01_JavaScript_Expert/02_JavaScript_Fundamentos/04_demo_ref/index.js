let counter = 0
let counter2 = counter
counter2++
console.log('Counter => ', counter)
console.log('Counter 2 => ', counter2)

console.log('---------------')

const item = { counter: 0 }
const item2 = item
item2.counter++
console.log('Item => ', item.counter)
console.log('Item 2 => ', item2.counter)

// deepStrictEqual(counter, 0)
// deepStrictEqual(counter2, 1)

// item2.counter++
// deepStrictEqual(item.counter, 1)
// item.counter++
// deepStrictEqual(item2.counter, 2)