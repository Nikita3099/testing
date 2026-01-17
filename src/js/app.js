export function setupCardInput(isValidCard, getCardSystem) {
  const input = document.getElementById('card-input');
  const result = document.getElementById('result');
  const icon = document.getElementById('card-icon');

  input.addEventListener('input', () => {
    const value = input.value.replace(/\s/g, '');
    const valid = isValidCard(value);
    const system = getCardSystem(value);

    result.textContent = value ? `${valid ? 'Валидная' : 'Невалидная'} карта (${system})` : '';
    icon.innerHTML = '';

    if (system !== 'Unknown') {
      const img = document.createElement('img');
      img.src = `./img/${system.toLowerCase()}.png`;
      img.alt = system;
      icon.appendChild(img);
    }
  });
}
