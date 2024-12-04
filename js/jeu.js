let ligne = 0;
let colone = 0;
let motMystere = "SALUT";
let motSaisie = "";
let point = 7;
let enJeu = false;

initialisationJeu();

function initialisationJeu() {
  creationDuClavierVirtuel();
  creationGrille();

  // Listener du clavier
  // zoneJeuContainer
  const grille = document.querySelector(".zoneJeuContainer")
  // const grille = document.getElementById("grille");
  grille.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "Enter":
        testeLaReponse();
        break;
      case "Backspace":
        effaceDerniereLettre();
        break;
      default:
        ajouteLaLettreSaisie(event.key);
    }
  });

  // Listener lettre du clavier virtuel
  const boutonsClavier = document.querySelectorAll(".toucheLettre");
  for (const bouton of boutonsClavier) {
    bouton.addEventListener("click", function () {
      ajouteLaLettreSaisie(bouton.textContent);
    });
  }

  // Listerner bouton retour clavier virtuel
  const boutonRetour = document.getElementById("bt-retour");
  boutonRetour.addEventListener("click", function () {
    effaceDerniereLettre();
  });

  // Listerner bouton retour clavier virtuel
  const boutonEnter = document.getElementById("bt-enter");
  boutonEnter.addEventListener("click", function () {
    console.log("je click sur enter");
    testeLaReponse();
  });

  initialisationPartie();
}

function initialisationPartie() {
  ligne = 0;
  point = 7;
  motMystere = "SALUT";
  enJeu = true;

  const casesGrille = document.querySelectorAll(".case");
  for (const maCase of casesGrille) {
    maCase.className = "case";
    maCase.textContent = "";
  }
  const touchesClavier = document.querySelectorAll(".toucheLettre");
  for (const touche of touchesClavier) {
    touche.className = "toucheLettre";
  }

  initialisationTentative();
}

function initialisationTentative() {
  colone = 0;
  motSaisie = "";
  point--;
  setCouleurFocus();
  if (ligne > 5) {
    console.log("perdu")
    enJeu = false;
  }
}

function testeLaReponse() {
  if (motExiste(motSaisie) && colone === 5 && enJeu === true) {
    checkCorespondance(motSaisie);
    if (motMystere === motSaisie) {
      console.log("gagné");
      console.log(point);
      enJeu = false;
    } else {
      ligne++;
      initialisationTentative();
    }
  }
}

function motExiste(mot) {
  return true;
}

function ajouteLaLettreSaisie(char) {
  // Liste les caractères autorisés
  const regex = /^[a-zA-Z]$/;

  if (regex.test(char) && ligne < 6 && enJeu === true) {
    if (colone < 5) {
      const maCase = document.getElementById(`l${ligne}c${colone}`);
      maCase.textContent = char.toUpperCase();
      motSaisie = motSaisie + char.toUpperCase();
      setCouleurFocus();
      colone++;
      setCouleurFocus();
    }
  }
}

function effaceDerniereLettre() {
  if (enJeu === true) {
    setCouleurFocus();
    colone--;
    setCouleurFocus();
    const maCase = document.getElementById(`l${ligne}c${colone}`);
    maCase.textContent = "";
    motSaisie = motSaisie.slice(0, -1);
  }
}

// Fonction qui change la couleur (bordure) de la casse en cour de saisie
function setCouleurFocus() {
  if (colone < 5 && ligne < 6) {
    const maCase = document.getElementById(`l${ligne}c${colone}`);
    maCase.classList.toggle("active");
  }
}

function checkCorespondance(mot) {
  const tableauMotSaisie = mot.split("");
  const tableauMotMystere = motMystere.split("");

  for (let i = 0; i < tableauMotSaisie.length; i++) {
    if (tableauMotMystere[i] === tableauMotSaisie[i]) {
      couleurCase(i, 2, tableauMotSaisie[i]);
    } else {
      tableauMotMystere.includes(tableauMotSaisie[i])
        ? couleurCase(i, 1, tableauMotSaisie[i])
        : couleurCase(i, 0, tableauMotSaisie[i]);
    }
  }
}

function couleurCase(maColone, point, lettre) {
  const maCase = document.getElementById(`l${ligne}c${maColone}`);
  const boutonLettre = document.getElementById(`bt-${lettre}`);
  switch (point) {
    case 2:
      maCase.classList.toggle("lettreOK");
      boutonLettre.classList.add("lettreOK");
      break;
    case 1:
      maCase.classList.toggle("lettreExiste");
      boutonLettre.classList.add("lettreMalPlace");
      break;
    default:
      maCase.classList.toggle("lettreKO");
      boutonLettre.classList.add("lettreMauvaise");
      break;
  }
}
