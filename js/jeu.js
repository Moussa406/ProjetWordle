let ligne = 0;
let colone = 0;
let motMystere = "SALUT";
let motSaisie = "";
let point = 7;
let pointTemps = 0;
let enJeu = false;

const timerElement = document.getElementById("timer");
const essaisRestant = document.getElementById("essaisRestant")
const boutonRejouer = document.getElementById("btRejouer")

const departMinutes = 2.5;
let chrono;
let temps;

initialisationJeu();

function initialisationJeu() {
  creationDuClavierVirtuel();
  creationGrille();

  // Listener du clavier
  // zoneJeuContainer
  const grille = document.querySelector(".zoneJeuContainer");
  // const grille = document.getElementById("grille");
  document.addEventListener("keydown", (event) => {
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

  // Listener bouton rejouer
  boutonRejouer.addEventListener("click", function(){
    boutonRejouer.classList.toggle("visible")
    initialisationPartie()
  });

  initialisationPartie();
}

function initialisationPartie() {
  ligne = 0;
  point = 7;
  const indexAleatoire = Math.floor(Math.random() * words.length);
  motMystere = words[indexAleatoire];
  console.log(motMystere)
  temps = departMinutes * 60;
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
  startTimer()
}

function initialisationTentative() {
  colone = 0;
  motSaisie = "";
  point--;
  essaisRestant.textContent = point
  setCouleurFocus();
  if (ligne > 5) {
    console.log("perdu");
    enJeu = false;
    stopTimer();
  }
}

function startTimer() {
  chrono = setInterval(() => {
    if(temps === 0 ){
      enJeu = false
      stopTimer();
    }
    let minutes = parseInt(temps / 60, 10);
    let secondes = parseInt(temps % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    timerElement.innerText = `${minutes}:${secondes}`;
    pointTemps = temps;
    temps = temps <= 1 ? 0 : temps - 1;
    // console.log(temps)
  }, 1000);
}

function stopTimer(){
  clearInterval(chrono);
  boutonRejouer.classList.toggle("visible")
}

function testeLaReponse() {
  if (motExiste(motSaisie) && colone === 5 && enJeu === true) {
    checkCorespondance(motSaisie);
    if (motMystere === motSaisie) {
      console.log("gagné");
      console.log(point);
      enJeu = false;
      stopTimer()
    } else {
      ligne++;
      initialisationTentative();
    }
  }
}

function motExiste(mot) {
  if( words.includes(mot)){
    return true
  }else{
    const ligneGrille = document.getElementById(`ligne${ligne}`)
    ligneGrille.classList.toggle('saisieIncorect')
    return false
  }
  
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
  if (enJeu === true && colone > 0) {
    const ligneGrille = document.getElementById(`ligne${ligne}`)
    ligneGrille.classList.remove('saisieIncorect')
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
