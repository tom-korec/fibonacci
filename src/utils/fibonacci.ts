// for number n >= 0
// returns pair [fib(n), fib(n+1)]
function fibonacciFastDoubling(n: number): [bigint, bigint] {
  if (n == 0)
    return [0n, 1n];
  else {
    const [a, b] = fibonacciFastDoubling(Math.floor(n / 2));
    const c = a * (b * 2n - a);
    const d = a * a + b * b;

    if (n % 2 == 0)
      return [c, d];
    else
      return [d, c + d];
  }
}

export function fibonacci(n: number): bigint {
  if (n < 0){
    throw new Error("Negative n is not a valid argument");
  }

  if (Math.floor(n) !== n){
    throw new Error("Non-integer n is not a valid argument");
  }

  return fibonacciFastDoubling(n)[0];
}
