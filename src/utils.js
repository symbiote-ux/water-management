const parseInput = (input) => {
  let details = input.split('\r\n');
  const commands = details.map((a) => a.split(' '));
  return commands;
};

module.exports = { parseInput };
