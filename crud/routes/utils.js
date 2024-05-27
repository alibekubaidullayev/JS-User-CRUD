module.exports = {
  getInt: (input) => {
    const match = input.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  },
};
