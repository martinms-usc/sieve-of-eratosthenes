
// Find nth prime number using sieve of eratosthenes

export default function nthPrime(n) {
  // accordint to Prime Number Theorem:
  // n * log(n) is approximate estimate of the cieling for n number of primes
  // similarly, for the first i integers, there will be approximately i/log(i) prime numbers
  // i.e. the nth prime number will be approximately n * log(n)
  // add extra for cushion because absolute error grows for larger values of n
  const max = Math.floor(1.25 * n * Math.log(n));

  // array
  // start with the assumption each number up to max is prime
  const primeBooleanArray = new Array(max).fill(true);

  // iterate from 2 up to sqrt(max) 
  // everything else will be marked off by other lower numbers
  for (let i = 2; i < Math.sqrt(max); i++) {
    // skip even numbers
    if (i > 2 && i % 2 === 0) continue;

    // if we haven't seen a factor of i yet
    // iterate from i^2 up to max, marking multiples of i false if necessary
    if (primeBooleanArray[i]) {
      for (let j = Math.pow(i, 2); j <= max; j += i) {
        if (primeBooleanArray[j]) {
          primeBooleanArray[j] = false;
        }
      }
    }
  }

  // reduce array of booleans into list of prime indices
  const primes = primeBooleanArray.reduce((primes, isPrime, i) => {
    if (isPrime && i > 0) primes.push(i);
    return primes;
  }, []);
  
  return primes[n]; // or just return the first n primes
}

const test = nthPrime(400);
console.log(test);