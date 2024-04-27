// let a = [1, 2, 3, [4, 5, [6, 7, 8, [9, 10], 11], 12, [13, 14]], 15, [16]];

// Array.prototype.myReduce = function (callback, init) {
//   let returnData = init;
//   this.forEach((i, index, arr) => {
//     if (index === 0 && init === undefined) {
//       returnData = i;
//     } else {
//       returnData = callback(returnData, i, index, arr);
//     }
//   });

//   return returnData;
// };

// function flat(arr) {
//   return arr.myReduce((prev, current) => {
//     if (Array.isArray(current)) {
//       return [...prev, ...flat(current)];
//     } else {
//       return [...prev, current];
//     }
//   }, []);
// }

// let test = [];

// console.log(
//   test.reduce((prev, current) => {
//     return prev + current;
//   }, 3)
// );

// console.log(
//   test.myReduce((prev, current) => {
//     return prev + current;
//   }, 3)
// );

// // console.log(flat(a));

// const first = () =>
//   new Promise((resovle, reject) => {
//     console.log(1);
//     const p = new Promise((resovle, reject) => {
//       console.log(2);
//       setTimeout(() => {
//         console.log(3);
//         resovle(4);
//       }, 0);
//       resovle(5);
//     });
//     resovle(6);
//     p.then((arg) => {
//       console.log(arg);
//     });
//   });
// first().then((arg) => {
//   console.log(arg);
// });
// console.log(7);

// let limit = 0;
// let list = [];

// function sleep(time) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(1);
//     }, time);
//   });
// }

// a(sleep);
// a(sleep);
// a(sleep);
// a(sleep);
// a(sleep);
// a(sleep);

// async function a(request) {
//   if (!request && !list.length) {
//     return;
//   }

//   if (request) {
//     list.push(request);
//   }

//   if (limit === 3) {
//     return;
//   } else {
//     limit += 1;
//     let latestRequest = list.shift();
//     const res = await latestRequest(1000);
//     console.log(res);
//     limit -= 1;
//     a(null);
//   }
// }

// let sleepQueen = fetchWrapper(sleep);

// function fetchWrapper(request) {
//   let limit = 0;
//   let list = [];

//   async function innerFetch(params) {
//     if (!request && !list.length) {
//       return;
//     }

//     if (request) {
//       list.push(request);
//     }

//     if (limit === 3) {
//       return;
//     } else {
//       limit += 1;
//       let latestRequest = list.shift();
//       const res = await latestRequest(params);
//       limit -= 1;
//       innerFetch(null);
//       return res;
//     }
//   }

//   return innerFetch;
// }

let a = () => b;

const b = 1;

console.log(a());
