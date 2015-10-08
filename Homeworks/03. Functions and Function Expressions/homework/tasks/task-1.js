/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function solve() {
    return function sum(numbers) {
        var i,
            sum,
            len;
        if ((len = numbers.length) === 0) {
            return null;
        }
        sum = +numbers[0];
        for (i = 1; i < len; i += 1) {
            if(parseFloat(numbers[i])) {
                sum += +numbers[i];
            } else {
                throw Error;
            }
        }
        return sum;
    };
}

module.exports = sum;