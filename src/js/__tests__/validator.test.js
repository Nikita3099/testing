import { isValidCard, getCardSystem } from '../validator.js';

test('Valid Visa card', () => {
  expect(isValidCard('4111111111111111')).toBe(true);
  expect(getCardSystem('4111111111111111')).toBe('Visa');
});

test('Valid MasterCard', () => {
  expect(isValidCard('5500000000000004')).toBe(true);
  expect(getCardSystem('5500000000000004')).toBe('MasterCard');
});

test('Valid Mir card', () => {
  expect(isValidCard('2200123456789010')).toBe(true);
  expect(getCardSystem('2200123456789010')).toBe('Mir');
});

test('Invalid card', () => {
  expect(isValidCard('1234567890123456')).toBe(false);
  expect(getCardSystem('1234567890123456')).toBe('Unknown');
});
