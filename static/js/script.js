// static/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    const ball = document.getElementById('ball');
    const mazeContainer = document.getElementById('maze-container');
    
    const statusAccelX = document.getElementById('status-accel-x');
    const statusAccelY = document.getElementById('status-accel-y');

    // Fator de escala para converter o valor do acelerômetro em movimento na tela.
    // Você talvez precise ajustar este valor para ter a sensibilidade desejada!
    const SCALING_FACTOR = 0.005;

    async function atualizarStatus() {
        try {
            // 1. Busca os dados mais recentes do servidor
            const response = await fetch('/status');
            const data = await response.json();

            // 2. Atualiza os valores de texto na tela
            statusAccelX.textContent = data.accel_x;
            statusAccelY.textContent = data.accel_y;

            // 3. Calcula a nova posição da bolinha
            // O valor do acelerômetro no eixo Y move a bolinha na vertical (top)
            // O valor no eixo X move a bolinha na horizontal (left)
            const mazeRect = mazeContainer.getBoundingClientRect();
            
            // Centraliza o movimento: (metade da caixa) + (valor do sensor * escala)
            let newX = (mazeRect.width / 2) + (data.accel_x * SCALING_FACTOR);
            let newY = (mazeRect.height / 2) + (data.accel_y * SCALING_FACTOR);
            
            // Limita o movimento para que a bolinha não saia da caixa
            newX = Math.max(0, Math.min(mazeRect.width - ball.offsetWidth, newX));
            newY = Math.max(0, Math.min(mazeRect.height - ball.offsetHeight, newY));

            // 4. Aplica a nova posição à bolinha
            ball.style.transform = `translate(${newX}px, ${newY}px)`;

        } catch (error) {
            console.error("Erro ao buscar status:", error);
        }
    }

    // Chama a função a cada 100 milissegundos para um movimento mais fluido
    setInterval(atualizarStatus, 100);
});