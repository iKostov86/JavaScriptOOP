/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() {
    return function findPrimes(from, to) {
        function chekToError(number) {
            if (!number) throw Error;
        }

        var divisor,
            maxDivisor,
            isPrime,
            primes = [],
            i;

        if (from == 0) from = 0;
        else {
            from = +from;
            chekToError(from);
        }
        if (to == 0) to = 0;
        else {
            to = +to;
            chekToError(to);
        }

        for (i = from; i <= to; i += 1) {
            if (i < 2) {
                continue;
            }
            isPrime = true;
            maxDivisor = Math.sqrt(i);
            for (divisor = 2; divisor <= maxDivisor; divisor += 1) {
                if ((i % divisor) === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) primes.push(i);
        }
        return primes;
    };
}

module.exports = findPrimes;
