//module.exports = jest.mock(() => (cb, timeout) => async () => cb());
module.exports = (cb, timeout) => async () => cb();
