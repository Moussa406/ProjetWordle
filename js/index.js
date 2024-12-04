document.addEventListener('DOMContentLoaded', () => {
    const rulesButton = document.getElementById('rulesButton');
    const rulesSection = document.getElementById('rulesSection');
    const closeButton = document.getElementById('closeButton');
    rulesButton.addEventListener('click', () => {
        rulesSection.style.display = 'block';

    });

    closeButton.addEventListener('click', () => {
        rulesSection.style.display = 'none';
    });
});


let button = document.getElementById('newGameButton');

button.addEventListener('click', function () {
    window.location.href = 'jeu.html'; 
});
