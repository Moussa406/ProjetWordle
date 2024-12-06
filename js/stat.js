historiquePartie = [];
historiqueVictoireDeSuite = 0;

recupereHistorique();
afficheLesDatas();

function recupereHistorique() {
  if (localStorage.getItem("wordle")) {
    historiquePartie = JSON.parse(localStorage.getItem("wordle"));
  }

  if (localStorage.getItem("wordle_victoire")) {
    historiqueVictoireDeSuite = JSON.parse(
      localStorage.getItem("wordle_victoire")
    );
  }
}

function afficheLesDatas() {
  let nbVictoire = 0;
  let nbPerdu = 0;
  let meilleurTemps = 10000;
  let meilleurScore =0;
  historiquePartie.forEach((element) => {
    ajouteLigneTable(
      element["victoire"],
      element["tentative"],
      element["temps"],
      element["point"]
    );

    if (element["victoire"]) {
      nbVictoire++;
    } else {
      nbPerdu++;
    }

    if(element["temps"] < meilleurTemps){
        meilleurTemps = element["temps"]
    }

    if(element['point'] > meilleurScore){
        meilleurScore = element['point']
    }

    pourcentageVictoire = Math.round((nbVictoire / (nbPerdu + nbVictoire)) * 100);

  });

  document.getElementById("nbPartie").textContent = `${nbVictoire + nbPerdu}`;
  document.getElementById("taux").textContent = `${pourcentageVictoire}%`;
  document.getElementById("bestTime").textContent = `${meilleurTemps}s`;
  document.getElementById("bestScore").textContent = `${meilleurScore}`;
  document.getElementById("bestSuite").textContent = historiqueVictoireDeSuite;
}

function ajouteLigneTable(resultat, tentative, temps, point) {
  const table = document.getElementById("table");
  const nouvelleLigne = document.createElement("tr");
  nouvelleLigne.innerHTML = `
        <td ${resultat ? "class=victoire" : "class=perdu"}>${
    resultat ? "Gagné" : "Perdu"
  }</td>
        <td ${resultat ? "class=victoire" : "class=perdu"}>${tentative}</td>
        <td ${resultat ? "class=victoire" : "class=perdu"}>${temps}s</td>
        <td ${resultat ? "class=victoire" : "class=perdu"}>${point}</td>
        `;

  table.append(nouvelleLigne);
}
