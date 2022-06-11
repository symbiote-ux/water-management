const parseInput = (input) => {
  const commands = input.map((a) => a.split(' '));
  return commands;
};

module.exports = { parseInput };
