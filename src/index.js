import './css/style.css';

import visa from './img/visa.png';
import mastercard from './img/mastercard.png';
import mir from './img/mir.png';

import { validateCard, getCardType } from './js/validator';

document.getElementById('visa').src = visa;
document.getElementById('mastercard').src = mastercard;
document.getElementById('mir').src = mir;

const input = document.getElementById('card-input');
const button = document.getElementById('check-btn');
const result = document.getElementById('result');

button.addEventListener('click', () => {
  const value = input.value.replace(/\s+/g, '');
  if (!value) return;

  const isValid = validateCard(value);
  result.textContent = isValid ? '✅ Карта валидна' : '❌ Карта невалидна';
});
