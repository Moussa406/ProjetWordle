creationDuClavierVirtuel();
creationGrille();

let ligne = 0;
let colone = 0;
let motMystere = "salut";
let motSaisie = "";

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

  if (event.key === "Enter" && colone === 5) {
    motExiste(motSaisie)
      ? checkCorespondance(motSaisie)
      : console.log("existe pas");
  }

  if (regex.test(event.key)) {
    if (colone < 5) {
      const maCase = document.getElementById(`l${ligne}c${colone}`);
      maCase.textContent = event.key;
      motSaisie = motSaisie + event.key;
      //
      colone++;
      setCouleurCase();
    }
  }
});

function checkCorespondance(mot) {
  const tableauMotSaisie = mot.split("");
  const tableauMotMystere = motMystere.split("");

  for (let i = 0; i < tableauMotSaisie.length; i++) {
    console.log(i);
    if (tableauMotMystere[i] === tableauMotSaisie[i]) {
      console.log(`${tableauMotMystere[i]} === ${tableauMotSaisie[i]}`);
      console.log(tableauMotSaisie[i] + " -> ok");
      couleurCase(i, 2)
    } else {
      tableauMotMystere.includes(tableauMotSaisie[i])
        ? couleurCase(i,1)
        : couleurCase(i,0);
    }
  }
}

function motExiste(mot) {
  return true;
}

function couleurCase(maColone, point) {
  const maCase = document.getElementById(`l${ligne}c${maColone}`);
  switch (point) {
    case 2:
      maCase.classList.toggle("lettreOK");
      break;

    case 1:
        maCase.classList.toggle("lettreExiste");
      break;

    default:
        maCase.classList.toggle("lettreKO");
      break;
  }
}
