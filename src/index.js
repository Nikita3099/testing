// src/index.js

import './css/style.css';
import { validateCard, getCardType } from './js/validator.js';

// Получаем элементы один раз
const input = document.getElementById('card-input');
const button = document.getElementById('check-btn');
const result = document.getElementById('result');

function updateDisplay() {
  // Убираем всё кроме цифр
  let value = input.value.replace(/\D/g, '');

  // Форматируем с пробелами
  input.value = value.match(/.{1,4}/g)?.join(' ') || value;

  const type = getCardType(value);
  const isValid = value.length >= 13 && validateCard(value);

  // Подсвечиваем нужный логотип
  document.querySelectorAll('.card-logo').forEach(logo => {
    const logoType = logo.dataset.type;
    if (logoType && type === logoType) {
      logo.classList.add('active');
    } else {
      logo.classList.remove('active');
    }
  });

  // Сбрасываем классы и сообщение
  input.classList.remove('valid', 'invalid');
  result.textContent = '';
  result.className = 'result';

  if (value.length === 0) return;

  let message = '';
  let resultClass = '';

  if (!type) {
    input.classList.add('invalid');
    message = 'Неизвестная платёжная система';
    resultClass = 'error';
  } else if (isValid) {
    input.classList.add('valid');
    message = `Валидная карта ${type.toUpperCase()}`;
    resultClass = 'success';
  } else if (value.length >= 13) {
    input.classList.add('invalid');
    message = `Невалидная карта ${type.toUpperCase()} (ошибка Luhn)`;
    resultClass = 'error';
  } else {
    message = `Тип карты: ${type.toUpperCase()}`;
    resultClass = 'info';
  }

  result.textContent = message;
  if (resultClass) result.className = `result ${resultClass}`;
}

// Реал-тайм при вводе
input.addEventListener('input', updateDisplay);

// По клику на кнопку — та же функция
if (button) {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    updateDisplay();
  });
}

// Первый запуск (на случай, если в input уже что-то есть)
updateDisplay();
