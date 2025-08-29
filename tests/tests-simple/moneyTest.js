import formatCurrency from "../utils/money.js";

// Test cases


// Basic test case: cases that are easy to test

/* Test name: They help in naming test cases*/

console.log('test suite: formatCurrency')

console.log('Convert cents into dollars:');

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('Works with 0:')

// Edge test case: Cases that are tricky to test

if (formatCurrency(0) === '0.00'){
  console.log('passed');
} else {
  console.log('failed');
}

console.log('Rounds up to the nearest cent:')


if (formatCurrency(2000.5) === '20.01'){
  console.log('passed');
} else {
  console.log('failed');
}

