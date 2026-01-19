import { validateCard, getCardType } from '../validator.js';

describe('validateCard — алгоритм Луна', () => {
  test('валидные номера должны проходить проверку', () => {
    expect(validateCard('4111111111111111')).toBe(true);
    expect(validateCard('5555555555554444')).toBe(true);
    expect(validateCard('4485275742308327')).toBe(true);
    expect(validateCard('2200000000000004')).toBe(true);
  });

  test('невалидные номера не проходят', () => {
    expect(validateCard('4111111111111112')).toBe(false);
    expect(validateCard('1234567890123456')).toBe(false);
  });

  test('игнорирует пробелы и нецифры', () => {
    expect(validateCard('4111 1111 1111 1111')).toBe(true);
    expect(validateCard('4111-1111-1111-1111')).toBe(true);
  });

  test('короткие/длинные номера — false', () => {
    expect(validateCard('41111111111')).toBe(false);
    expect(validateCard('411111111111111111111')).toBe(false);
  });
});

describe('getCardType — определение платёжной системы', () => {
  test('определяет Visa', () => {
    expect(getCardType('4111111111111111')).toBe('visa');
    expect(getCardType('4')).toBe('visa');
  });

  test('определяет Mastercard', () => {
    expect(getCardType('5555555555554444')).toBe('mastercard');
    expect(getCardType('2720991234567890')).toBe('mastercard');
  });

  test('определяет Mir', () => {
    expect(getCardType('2200123456789012')).toBe('mir');
  });

  test('неизвестные → пустая строка', () => {
    expect(getCardType('')).toBe('');
    expect(getCardType('6011111111111117')).toBe('');
  });
});
