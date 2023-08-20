import emojis from "./emojipedia";

var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
function double(x) {
  return x * 2;
};

const doubles = numbers.map(double);

//Filter - Create a new array by keeping the items that return true.
function filer10(x) {
  return x < 10;
};

const lessThanTen = numbers.filter(filer10);


//Reduce - Accumulate a value by doing something to each item in an array.
numbers.reduce((accumulator, currentNumber) => {
  return accumulator + currentNumber;
});


//Find - find the first item that matches from an array.
const newNumber = numbers.find((num) => { return num > 10; });


//FindIndex - find the index of the first item that matches.

const meanings = emojis.filter((emoji) => {
  return emoji.meaning.substring(100);
})

console.log(meanings);
