document.addEventListener('DOMContentLoaded', () => {
    const mazeContainer = document.getElementById('maze-container');
    const levelDisplay = document.getElementById('level-display');
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
            const response = await fetch('/status');
            const gameState = await response.json();

            if (!gameState || !gameState.labirinto || gameState.labirinto.length === 0) {
                return; // Se não houver dados, não faz nada
            }
            
            levelDisplay.textContent = `Nível: ${gameState.nivel}`;

            const maze = gameState.labirinto;
            const playerX = gameState.jogador_x;
            const playerY = gameState.jogador_y;

            // Percorre cada célula do labirinto
            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const cellValue = maze[y][x];
                    
                    // Lógica para encontrar o índice correto do LED na matriz sanfonada
                    const index = (y % 2 !== 0) 
                        ? (y * gridSize) + (gridSize - 1 - x) 
                        : (y * gridSize) + x;

                    const cellElement = document.getElementById(`cell-${index}`);
                    
                    // Remove todas as classes de cor antes de adicionar a nova
                    cellElement.className = 'cell';

                    if (x === playerX && y === playerY) {
                        cellElement.classList.add('player'); // Pinta o jogador
                    } else if (cellValue === 1) {
                        cellElement.classList.add('wall'); // Pinta a parede
                    } else if (cellValue === 2) {
                        cellElement.classList.add('goal'); // Pinta a chegada
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao buscar o estado do jogo:", error);
        }
    }

    // Atualiza o grid a cada 200 milissegundos
    setInterval(updateGrid, 200);
});