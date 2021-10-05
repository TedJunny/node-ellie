let count = 0;

function increase() {
  count++;
}

function getCount() {
  return count;
}

module.exports = {
  increase: increase,
  getCount: getCount,
};
console.log(module);
