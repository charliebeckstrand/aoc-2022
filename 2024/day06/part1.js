import grid from './input.js'

const map = grid.split('\n').map((row) => row.split(''))

const directions = new Map([
	['up', [-1, 0]],
	['right', [0, 1]],
	['down', [1, 0]],
	['left', [0, -1]]
])

const predictPath = () => {
	const guard = {
		direction: 'up',
		position: { row: 0, col: 0 }
	}

	const visited = new Set()

	// Find the starting position of the guard on the map and replace it with a dot
	map.forEach((row, rowIndex) => {
		const colIndex = row.indexOf('^')

		if (colIndex !== -1) {
			guard.position = { row: rowIndex, col: colIndex }
			map[rowIndex][colIndex] = '.'
		}
	})

	// Get the next direction based on the current direction
	const getNextDirection = (currentDirection) => {
		const directionsArray = [...directions.keys()]
		const nextIndex = (directionsArray.indexOf(currentDirection) + 1) % directionsArray.length

		return directionsArray[nextIndex]
	}

	/*
	 * Follow the path until the guard can't move anymore.
	 * 1. If the guard hits a wall, change the direction.
	 * 2. If the guard can move forward, update the position.
	 * 3. If the guard has visited a space before, stop.
	 */
	while (true) {
		visited.add(`${guard.position.row},${guard.position.col}`)

		const [dr, dc] = directions.get(guard.direction)
		const newRow = guard.position.row + dr
		const newCol = guard.position.col + dc

		if (newRow < 0 || newRow >= map.length || newCol < 0 || newCol >= map[0].length) break

		if (map[newRow][newCol] === '#') {
			guard.direction = getNextDirection(guard.direction)
		} else {
			guard.position = { row: newRow, col: newCol }
		}
	}

	return visited.size
}

console.log(predictPath())
