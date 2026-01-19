// src/js/app.js

import visaIcon       from '../img/visa.png';
import mastercardIcon from '../img/mastercard.png';
import mirIcon        from '../img/mir.png';

import { validateCard, getCardType } from './validator.js';

document.addEventListener('DOMContentLoaded', () => {
  const input   = document.getElementById('card-input');
  const result  = document.getElementById('result');
  const checkBtn = document.getElementById('check-btn');

  function updateCardDisplay() {
    // Убираем всё кроме цифр
    let value = input.value.replace(/\D/g, '');

    // Форматируем номер красиво
    input.value = value.match(/.{1,4}/g)?.join(' ') || value;

    const cardType = getCardType(value);
    const isValid  = value.length >= 13 && validateCard(value);

    // Подсветка логотипов (всегда видны, один активный)
    document.querySelectorAll('.card-logo').forEach(logo => {
      const logoType = logo.dataset.type;
      if (logoType && cardType === logoType) {
        logo.classList.add('active');
      } else {
        logo.classList.remove('active');
      }
    });

    // Сброс классов input и результата
    input.classList.remove('valid', 'invalid');
    result.textContent = '';
    result.className = 'result';

    if (value.length === 0) return;

    let message = '';
    let resultClass = '';

    if (!cardType) {
      input.classList.add('invalid');
      message = 'Неизвестная платёжная система';
      resultClass = 'error';
    } else if (isValid) {
      input.classList.add('valid');
      message = `Валидная карта ${cardType.toUpperCase()}`;
      resultClass = 'success';
    } else if (value.length >= 13) {
      input.classList.add('invalid');
      message = `Невалидная карта ${cardType.toUpperCase()} (ошибка Luhn)`;
      resultClass = 'error';
    } else {
      message = `Тип карты: ${cardType.toUpperCase()}`;
      resultClass = 'info';
    }

    result.textContent = message;
    if (resultClass) result.className = `result ${resultClass}`;
  }

  // Реал-тайм обновление при вводе
  input.addEventListener('input', updateCardDisplay);

  // Кнопка «Проверить» — просто вызывает обновление
  if (checkBtn) {
    checkBtn.addEventListener('click', e => {
      e.preventDefault();
      updateCardDisplay();
    });
  }

  // Первый запуск (на случай предзаполненного input)
  updateCardDisplay();
});
