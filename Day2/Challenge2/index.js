const expectedOutput = 19690720

calculateValue = (code, firstNumber, secondNumber) => {
  switch (code) {
    case 1:
      return firstNumber + secondNumber
    case 2:
      return firstNumber * secondNumber
  }
}

createInput = (verb, noun) => [1,verb,noun,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,5,23,1,23,6,27,2,9,27,31,1,5,31,35,1,35,10,39,1,39,10,43,2,43,9,47,1,6,47,51,2,51,6,55,1,5,55,59,2,59,10,63,1,9,63,67,1,9,67,71,2,71,6,75,1,5,75,79,1,5,79,83,1,9,83,87,2,87,10,91,2,10,91,95,1,95,9,99,2,99,9,103,2,10,103,107,2,9,107,111,1,111,5,115,1,115,2,119,1,119,6,0,99,2,0,14,0]

checkOutcome = (output) => output === expectedOutput

calculateResults = (noun, verb) => 100 * noun + verb

function run() {
  let verb, noun = 0

  for(let verb = 0; verb < 100; verb++) {
    for (let noun = 0; noun < 100; noun++) {
      let shouldContinue = true
      let input = createInput(verb, noun)
      let loop = 0

      while (shouldContinue) {
        const opcode = input[4 * loop]
        const firstIndex = input[4 * loop + 1]
        const secondIndex = input[4 * loop + 2]
        const replaceIndex = input[4 * loop + 3]

        if (opcode !== 99) {
          input[replaceIndex] = calculateValue(input[4 * loop], input[firstIndex], input[secondIndex])
          loop++
        } else {
          if (checkOutcome(input[0])) {
            console.log(`Result: ${calculateResults(verb, noun)}`)
          }
          shouldContinue = false
        }
      }
    }
  }

}
run()
