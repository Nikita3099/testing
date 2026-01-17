export function validateCard(number) {
  // Алгоритм Луна
  const arr = number.split('').reverse().map(n => parseInt(n));
  const sum = arr.reduce((acc, n, i) => {
    if (i % 2) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    return acc + n;
  }, 0);
  return sum % 10 === 0;
}

export function getCardType(number) {
  if (/^4/.test(number)) return 'visa';
  if (/^5[1-5]/.test(number)) return 'mastercard';
  if (/^220[0-4]/.test(number)) return 'mir';
  return '';
}
