const myPromisify = (fn) => (...args) => new Promise((resolve, reject) => {
  const customCallback = (err, ...results) => {
    if (err) return reject(err);
    return resolve(results.length === 1 ? results[0] : results);
  };
  args.push(customCallback);
  fn.call(this, ...args);
});

const myPromisifyAll = (object) => {
  Object.values(object).forEach((item) => {
    myPromisify(item)([4, 16, 25, 81]).then((result) => console.log(result));
 });
};

const object = {
  multiplyingNumbers: (arr, callback) => {
    if (!arr.length) return callback(new Error('Array is empty...'), null);
    const multipliedNumbers = arr.reduce((acc, val) => acc * val, 1);
    const message = `Multiplying result is ${multipliedNumbers}`;
    return callback(null, multipliedNumbers, message);
  },

  squareRoots: (arr, callback) => {
    if (!arr.length) return callback(new Error('Array is empty...'), null);
    const squaresOfNumbers = arr.map((num) => Math.sqrt(num));
    const message = `Squares of numbers ${squaresOfNumbers}`;
    return callback(null, squaresOfNumbers, message);
  },

  averageOfNumbers: (arr, callback) => {
    if (!arr.length) return callback(new Error('Array is empty...'), null);
    const average = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    const message = `Average of numbers ${average}`;
    return callback(null, average, message);
  },
};

myPromisifyAll(object);