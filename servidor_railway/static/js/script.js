document.addEventListener('DOMContentLoaded', () => {
  const mazeContainer = document.getElementById('maze-container');
  const levelDisplay  = document.getElementById('level-display');
  const accelXEl      = document.getElementById('status-accel-x');
  const accelYEl      = document.getElementById('status-accel-y');

  const gridSize = 5;

  // Cria as 25 células (LEDs) do grid uma única vez
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = `cell-${i}`;
    mazeContainer.appendChild(cell);
  }

  async function updateGrid() {
    try {
      const response = await fetch('/api/dados', { cache: 'no-store' }); // <-- trocado
      if (!response.ok) throw new Error('HTTP ' + response.status);

      const gameState = await response.json();
      if (!gameState || !Array.isArray(gameState.labirinto) || gameState.labirinto.length === 0) {
        return; // sem dados válidos
      }

      // Atualiza textos
      levelDisplay.textContent = `Nível: ${gameState.nivel ?? '--'}`;
      if (accelXEl) accelXEl.textContent = gameState.accel_x ?? '--';
      if (accelYEl) accelYEl.textContent = gameState.accel_y ?? '--';

      const maze    = gameState.labirinto;   // matriz 5x5 com 0/1/2
      const playerX = gameState.jogador_x ?? 0;
      const playerY = gameState.jogador_y ?? 0;

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const cellValue = maze[y]?.[x] ?? 0;

          // índice no padrão sanfonado
          const index = (y % 2 !== 0)
            ? (y * gridSize) + (gridSize - 1 - x)
            : (y * gridSize) + x;

          const cellElement = document.getElementById(`cell-${index}`);
          if (!cellElement) continue;

          // reseta a célula
          cellElement.className = 'cell';

          if (x === playerX && y === playerY) {
            cellElement.classList.add('player');
          } else if (cellValue === 1) {
            cellElement.classList.add('wall');
          } else if (cellValue === 2) {
            cellElement.classList.add('goal');
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar o estado do jogo:', error);
    }
  }

  // Atualiza o grid a cada 200 ms
  setInterval(updateGrid, 200);
  updateGrid();
});
