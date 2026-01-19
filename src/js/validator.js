// src/js/validator.js

/**
 * Проверяет номер карты по алгоритму Луна (Luhn algorithm)
 * @param {string|number} number - номер карты (может содержать пробелы, дефисы)
 * @returns {boolean} true, если номер валидный по Луну
 */
export function validateCard(number) {
  // Убираем всё, кроме цифр
  number = String(number).replace(/\D/g, '');

  // Проверяем длину (стандартные карты 13–19 цифр)
  if (number.length < 13 || number.length > 19) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false; // самая правая цифра (контрольная) НЕ удваивается

  // Проходим справа налево
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9; // эквивалентно сумме цифр: 12 → 1+2=3
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble; // чередуем удвоение
  }

  return sum % 10 === 0;
}

/**
 * Определяет платёжную систему по префиксу номера карты
 * @param {string|number} number - номер карты
 * @returns {string} 'visa' | 'mastercard' | 'mir' | ''
 */
export function getCardType(number) {
  // Убираем всё, кроме цифр
  number = String(number).replace(/\D/g, '');

  // Пустой ввод
  if (number === '') {
    return '';
  }

  // Visa — начинается с 4
  if (/^4/.test(number)) {
    return 'visa';
  }

  // Mastercard — 51–55 или 222100–272099
  if (
    /^5[1-5]/.test(number) ||
    /^2(2[2-9][1-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(number)
  ) {
    return 'mastercard';
  }

  // Мир — 2200–2204
  if (/^220[0-4]/.test(number)) {
    return 'mir';
  }

  // Если не подошло ни одно правило
  return '';
}
