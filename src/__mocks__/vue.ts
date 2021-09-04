module.exports = {
  ...jest.requireActual('vue'),
  onMounted: jest.fn(),
  onBeforeUnmount: jest.fn(),
};
