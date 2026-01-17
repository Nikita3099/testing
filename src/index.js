import './css/style.css';
import { validateCard, getCardType } from './js/validator';

const input = document.getElementById('card-input');
const button = document.getElementById('check-btn');
const result = document.getElementById('result');
const cardImg = document.getElementById('card-img');

button.addEventListener('click', () => {
  const value = input.value.replace(/\s+/g, '');
  if (!value) return;

  const isValid = validateCard(value);
  const type = getCardType(value);

  result.textContent = isValid ? '✅ Карта валидна' : '❌ Карта невалидна';

  if (type) {
    cardImg.src = `./img/${type}.png`; // 'visa.png', 'mastercard.png', 'mir.png'
    cardImg.alt = type;
  } else {
    cardImg.src = '';
    cardImg.alt = '';
  }
});
