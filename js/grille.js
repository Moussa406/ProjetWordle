function creationGrille() {
  const container = document.getElementById("grille");
  for (let ligneGrille = 0; ligneGrille < 6; ligneGrille++) {
    const nouvelleLigne = document.createElement("div");
    nouvelleLigne.classList.add(`ligne`);
    nouvelleLigne.id = `ligne${ligneGrille}`;
    container.appendChild(nouvelleLigne);

    for (let coloneGrille = 0; coloneGrille < 5; coloneGrille++) {
      const nouvelleCase = document.createElement("span");
      nouvelleCase.id = `l${ligneGrille}c${coloneGrille}`;
      nouvelleCase.classList.add("case")
      nouvelleLigne.appendChild(nouvelleCase);
    }
  }
}
