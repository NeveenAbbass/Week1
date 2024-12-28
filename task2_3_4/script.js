
// Write a function that accepts an unknown number of arguments and returns their sum.
function sumNums(...args){
  let sum = 0;
  for(let i = 0; i<args.length; i++){
    sum +=args[i];
  }
  return sum;
}
console.log(sumNums(4,5,6,5,10));
// -----------------------------------------------------------------------------------------------------

// [5, 10, 15], [20, 25, 30] Create a function that combines 
// two arrays and log the max number in the newCombinedArray.

function combineAndMax(arr1, arr2){
  combined = [...arr1, ...arr2];
  let max = 0;
  for(let i = 0; i < combined.length; i++){
    if(combined[i] > max){
      max = combined[i];
    }
  }

  return combined, `the combined array is ${combined} and the max number is ${max}`
}
console.log(combineAndMax([5, 10, 15], [20, 25, 30]));
// --------------------------------------------------------------------------------------------------------

// { a: 1, b: { c: 2 } } Try to "Shallow copy" & "Deep copy" this object
// and in every time change the value of "c", then log the original and copied objects to see diff.
var original = { a: 1, b: { c: 2 } };

// shallow copying
var shallowCopy = original;
shallowCopy.b.c = 3;
console.log(`shallow copying ==> original object c = ${original.b.c}, copied object c = ${shallowCopy.b.c}`);

// deep copying
var obj = JSON.stringify(original);
var deepCopy = JSON.parse(obj);
deepCopy.b.c = 4;
console.log(`deep copying ==> original object c = ${original.b.c}, copied object c = ${deepCopy.b.c}`);
