global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

global.localStorage = {
  setItem() {},
  getItem() {},
  removeItem() {},
  clear() {},
};
