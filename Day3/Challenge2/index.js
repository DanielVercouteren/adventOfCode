let fs = require('fs');
let input = fs.readFileSync('../input.txt', 'utf-8');

const [line1, line2] = input
  .split("\n")
  .map(list => list.split(","))

let touchedCoordinatesLine1
let touchedCoordinatesLine2
let intersections = []

const calculateCoordinates = (line) => {
  let coordinates = [{ x: 0, y: 0 }]
  for (const action of line) {
    const lastCoordinate = coordinates[coordinates.length - 1]
    const directionName = action[0]
    const steps = parseInt(action.substr(1))
    const axis = directionName === 'R' || directionName === 'L' ? 'x' : 'y'
    const direction = directionName === 'R' || directionName === 'U' ? 1 : -1
    let step = 1
    while (step <= steps) {
      const newCoordinate = { ...lastCoordinate }
      newCoordinate[axis] += step * direction
      coordinates.push(newCoordinate)
      step++
    }
  }
  return coordinates
}

const getDistanceLine = (resultCoordinate, coordinateList) => {
  let distance = 0;
  for(const {x, y} of coordinateList) {
    if( resultCoordinate.x === x && resultCoordinate.y === y) {
      return distance
    }
    distance++
  }
}

const calculateResistance = () => {
  let shortestDistance = Infinity
  for(const {x, y} of touchedCoordinatesLine1) {
    const isFound = touchedCoordinatesLine2.find(coordinate => x === coordinate.x && y === coordinate.y)
    if (isFound && x !== 0 && y !== 0) {

      const distanceLine1 = getDistanceLine(isFound, touchedCoordinatesLine1)
      const distanceLine2 = getDistanceLine(isFound, touchedCoordinatesLine2)
      const totalDistance = distanceLine1 + distanceLine2

      if (totalDistance < shortestDistance) {
        shortestDistance = totalDistance
      }
    }
  }

  return shortestDistance
}

run = () => {
  console.time('run')
  touchedCoordinatesLine1 = calculateCoordinates(line1)
  touchedCoordinatesLine2 = calculateCoordinates(line2)
  console.log(calculateResistance())
  console.timeEnd('run')
}

run()
