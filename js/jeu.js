let ligne = 0;
let colone = 0;
let motMystere = "SALUT";
let motSaisie = "";
let pointTentative = 7;
let pointTemps = 0;
let enJeu = false;

// récupération de l'historique des partie
let historiquePartie = [];
let historiqueVictoireDeSuite = 0
let victoireDeSuite = 0;
recupereHistorique();

const timerElement = document.getElementById("timer");
const essaisRestant = document.getElementById("essaisRestant");
const boutonRejouer = document.getElementById("btRejouer");

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
  boutonRejouer.addEventListener("click", function () {
    boutonRejouer.classList.toggle("visible");
    document.getElementById('resultatPartieVictoire').classList.remove('visible')
    document.getElementById('resultatPartiePerdu').classList.remove('visible')
    initialisationPartie();
  });

  initialisationPartie();
}

// Initialisation d'une nouvelle partie
function initialisationPartie() {
  // Initialisation du chrono, des points
  temps = departMinutes * 60 - 1; // (-1 pour décaller de 1s le chrono)
  pointTentative = 7;
  pointPartie = 0;

  // Vide la grille
  const casesGrille = document.querySelectorAll(".case");
  for (const maCase of casesGrille) {
    maCase.className = "case";
    maCase.textContent = "";
  }

  // Initialisation position dans la grille
  ligne = 0;
  colone = 0;

  // Vide le clavier
  const touchesClavier = document.querySelectorAll(".toucheLettre");
  for (const touche of touchesClavier) {
    touche.className = "toucheLettre";
  }

  //  Sort un mot aléatoire
  const indexAleatoire = Math.floor(Math.random() * words.length);
  motMystere = words[indexAleatoire];
  console.log(motMystere);

  initialisationTentative();
  startTimer();
  enJeu = true;
}

// Initialisation d'une nouvelle tentative (à chaque ligne de la grille)
function initialisationTentative() {
  // Se positione sur la première colone
  colone = 0;
  // Vide la variable qui stocke le dernier mot testé
  motSaisie = "";

  // Mise à jour du nombre de tentative restante
  pointTentative--;
  essaisRestant.textContent = pointTentative;

  // Met le focus sur la première case active
  setCouleurFocus();

  // Si arrivé à la dernière ligne on est en fin de partie
  if (ligne > 5) {
    console.log("perdu");
    victoireDeSuite = 0;
    afficheScore(pointTentative, pointTemps, false)
    enJeu = false;
    stopTimer();
  }
}

// Démarre de chrono
function startTimer() {
  chrono = setInterval(() => {
    // Quand le temps est arrivé à 0 on stop le chrono et fin de partie
    if (temps === 0) {
      victoireDeSuite = 0;
      afficheScore(pointTentative, pointTemps, false)
      enJeu = false;
      stopTimer();
    }

    // Convertie le temps (s) en (m:s)
    let minutes = parseInt(temps / 60, 10);
    let secondes = parseInt(temps % 60, 10);

    // Ajoute un 0 si nombre inférieure à 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    // Mise à jour de l'affichage du chrono
    timerElement.innerText = `${minutes}:${secondes}`;

    // Pour le calcul du bonnus
    pointTemps = temps;

    // Décrémente le temps est supérieur à 1 s
    temps = temps <= 1 ? 0 : temps - 1;
    // iconsole.log(temps)
  }, 1000);
}

// Stop le chrono
function stopTimer() {
  // Stop l'interval
  clearInterval(chrono);
  // Rend visible le bouton pour relancer une partie
  boutonRejouer.classList.toggle("visible");
}

// Lance les testes sur le mot saisie
function testeLaReponse() {
  // Si la saisie est complete (5 lettres) et que le jeu est en cours
  if (colone === 5 && enJeu === true) {
    // Si le mot existe
    if (motExiste(motSaisie)) {
      // Lance la vérification corspondance des lettre (mise en couleur comme indice)
      checkCorespondance(motSaisie);
      // Si le mot est le bon on calcul les point, les affiches et fin de partie
      if (motMystere === motSaisie) {
        // console.log("gagné");
        // console.log(pointTentative);
        // console.log(temps);

        enJeu = false;
        victoireDeSuite++;
        afficheScore(pointTentative, pointTemps, true)
        stopTimer();
      } else {
        // On passe à la tentative suivante
        ligne++;
        initialisationTentative();
      }
    }
  }
}

// Vérification si le mot existe dans la liste
function motExiste(mot) {
  // Si le mot n'exite pas on ajoute du style sur la ligne
  if (words.includes(mot)) {
    return true;
  } else {
    const ligneGrille = document.getElementById(`ligne${ligne}`);
    ligneGrille.classList.toggle("saisieIncorect");
    return false;
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
    const ligneGrille = document.getElementById(`ligne${ligne}`);
    ligneGrille.classList.remove("saisieIncorect");
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

function recupereHistorique(){
  if (localStorage.getItem("wordle")) {
    historiquePartie = JSON.parse(localStorage.getItem("wordle"));
  }

  if(localStorage.getItem("wordle_victoire")){
    historiqueVictoireDeSuite = JSON.parse(localStorage.getItem("wordle_victoire"));
  }
}


function afficheScore(nbTentative, tempsPartie, victoire){
  const points = victoire ? (nbTentative * 10) + tempsPartie : 0;
  const nbTentativeRestante = victoire ? 7 - nbTentative : "-"
  const temps = victoire ? tempsPartie : "-";

  
  
  historiquePartie.push({tentative: nbTentativeRestante, temps: temps, victoire:victoire, point: points});

  localStorage.setItem("wordle", JSON.stringify(historiquePartie));
  
  if(victoire){
    const container = document.getElementById('resultatPartieVictoire')
    container.classList.add('visible')
  }else{
    const container = document.getElementById('resultatPartiePerdu')
    container.classList.add('visible')
  }

}
