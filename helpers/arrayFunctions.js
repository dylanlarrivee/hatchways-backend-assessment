// Combine two arrays without duplicates
const mergeArrays = (arr1, arr2) => {
    let result = arr1.concat(
        arr2.filter(item =>
        !JSON.stringify(arr1).includes(JSON.stringify(item))
   ));
   return result
}

// Sort an array 
function sortArray(array, sortByValue, direction) {
    if (direction == "asc" || !direction) {
        return array.sort((a, b) => (a[sortByValue] > b[sortByValue]) ? 1 : -1);
    } else {
        return array.sort((a, b) => (a[sortByValue] < b[sortByValue]) ? 1 : -1);
    }
  }

  module.exports = {
    mergeArrays,
    sortArray
  };