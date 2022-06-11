const fs = require('fs');
const os = require('os');
const { parseInput } = require('./src/utils');
const WaterBoard = require('./src/waterBoard');

const main = () => {
  const fileName = process.argv[2];
  const content = fs.readFileSync(fileName, 'utf8').split(os.EOL);
  const commands = parseInput(content);
  const waterBoard = new WaterBoard(commands);
  const { totalVol, totalCost } = waterBoard.getBill();
  console.log(totalVol, totalCost);
};
main();
