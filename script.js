const listaPontos = document.getElementById('scoreList');
const addPlayerBtn = document.getElementById('addPlayerBtn');
const resetBtn = document.getElementById('resetBtn');
const resetPlayersBtn = document.getElementById('resetPlayersBtn');
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const players = [
  { name: 'jogador 1', score: 0 },
  { name: 'jogador 2', score: 0 },
  { name: 'jogador 3', score: 0 }
];
const savedPlayers = localStorage.getItem('players');
if (savedPlayers) {
  try {
    const parsed = JSON.parse(savedPlayers);
    if (Array.isArray(parsed)) {
      parsed.forEach(p => players.push(p));
      players.splice(0, 3);
    }
  } catch (e) {
    console.error('Erro ao carregar jogadores do localStorage:', e);
  }
}

function renderPlayers() {
  listaPontos.innerHTML = '';
  players.forEach(player => {
    const playerLi = document.createElement('li');
    playerLi.innerHTML = `
      <span class="name">${player.name}</span>
      <div class="controls">
        <button class="decrement">-</button>
        <span class="score">${player.score}</span>
        <button class="increment">+</button>
      </div>
    `;
    listaPontos.appendChild(playerLi);
  });
}

renderPlayers();

addPlayerBtn.addEventListener('click', () => {
  const newPlayerName = prompt('Digite o nome do novo jogador:');
  if (newPlayerName) {
    players.push({ name: newPlayerName, score: 0 });
    localStorage.setItem('players', JSON.stringify(players));
    renderPlayers();
  }
});

listaPontos.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const li = event.target.closest('li');
    const scoreSpan = li.querySelector('.score');
    let score = parseInt(scoreSpan.textContent);

    if (event.target.textContent === '+') {
      score++;
    } else {
      score--;
    }

    scoreSpan.textContent = score;
  }
});

resetBtn.addEventListener('click', () => {
  players.forEach(player => player.score = 0);
  localStorage.setItem('players', JSON.stringify(players));
  renderPlayers();
});

resetPlayersBtn.addEventListener('click', () => {
  players.length = 0;
  localStorage.removeItem('players');
  renderPlayers();
});

helpBtn.addEventListener('click', () => {
  helpModal.style.display = 'flex';
});

closeHelpBtn.addEventListener('click', () => {
  helpModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === helpModal) {
    helpModal.style.display = 'none';
  }
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('players', JSON.stringify(players));
});
