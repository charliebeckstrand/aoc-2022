const path = require('path')
const fs = require('fs')

const input = fs
.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
.split('\n')

module.exports = input