const fs = require('fs');
const { parseInput } = require('./src/utils');
const WaterBoard = require('./src/waterBoard');

const main = () => {
  const fileName = process.argv[2];
  const content = fs.readFileSync(fileName, 'utf8');
  const commands = parseInput(content);
  const waterBoard = new WaterBoard(commands);
  const bill = waterBoard.getBill();
  console.log(bill);
};
main();
