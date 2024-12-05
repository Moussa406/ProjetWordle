


let button = document.getElementById('retourBouton');

button.addEventListener('click', function () {
    window.location.href = 'index.html'; 
});

document.addEventListener('DOMContentLoaded', () => {
    const howToPlay = document.getElementById('howToPlay');
    const lireLesRegles = document.getElementById('lireLesRegles');
    const closeButton = document.getElementById('closeButton');
    lireLesRegles.addEventListener('click', () => {
        howToPlay.style.display = 'block';

    });

    closeButton.addEventListener('click', () => {
        howToPlay.style.display = 'none';
    });
});
