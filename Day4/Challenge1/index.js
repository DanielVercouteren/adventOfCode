let amountOfPasswords = 0;
let range = [168630, 718098]

const hasIncreasingDigits = (input) => input.toString() === input.toString().split('').sort((a, b) => a - b).join('')

const hasTwoAdjacentDigits = (input) => {
  input = input.toString().split('')
  let hasAdjacentDigits = false
  for (let i = 0; i < input.length; i++) {
    if(input[i + 1] === input[i]) {
      hasAdjacentDigits = true
    }
  }

  return hasAdjacentDigits
}

const run = () => {
  console.time('run')
  for(let i = range[0]; i != range[1]; i++ ) {
    if (hasTwoAdjacentDigits(i) && hasIncreasingDigits(i) && isNoLargerGroup(i)) {
      amountOfPasswords++
    }
  }

  console.log(amountOfPasswords)
  console.timeEnd('run')
}

run()
