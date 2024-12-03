creationDuClavierVirtuel();
creationGrille();

let ligne = 0;
let colone = 0;

function setCouleurCase() {
  if (colone < 5) {
    const maCase = document.getElementById(`l${ligne}c${colone}`);
    maCase.classList.toggle("active");
    if (colone > 0) {
      const maCase = document.getElementById(`l${ligne}c${colone - 1}`);
      maCase.classList.toggle("active");
    }
  }
}

setCouleurCase();

const grille = document.getElementById("grille");

// Ajouter un écouteur pour l'événement keydown
grille.addEventListener("keydown", (event) => {
  const regex = /^[a-zA-Z]$/;

  if (event.key === "Enter") {
    // grille.style.backgroundColor = 'lightblue';
  }

  if (regex.test(event.key)) {
    if (colone < 5) {
      const maCase = document.getElementById(`l${ligne}c${colone}`);
      maCase.textContent = event.key;
      colone++;
      setCouleurCase();
      console.log(colone);
    }
  }
});
