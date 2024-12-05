// const departMinutes = 5
// let temps = departMinutes * 60

// const timerElement = document.getElementById("timer")

// setInterval(() => {
//   let minutes = parseInt(temps / 60, 10)
//   let secondes = parseInt(temps % 60, 10)

//   minutes = minutes < 10 ? "0" + minutes : minutes
//   secondes = secondes < 10 ? "0" + secondes : secondes

//   timerElement.innerText = `${minutes}:${secondes}`
//   temps = temps <= 0 ? 0 : temps - 1
// }, 1000)

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
