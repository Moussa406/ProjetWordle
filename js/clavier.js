function creationDuClavierVirtuel(){
    const caracteres = "azertyuiopqsdfghjklmwxcvbn"
    let tableauDeCaracteres = caracteres.split('');
    
    tableauDeCaracteres.forEach((caractere, index) => {
        if (index === 20){
            ajouteBouton("↩", "toucheAction")
        }
        ajouteBouton(caractere, "toucheLettre")
    });

    ajouteBouton("⌫", "toucheAction")
}

function ajouteBouton(value, maClasse){
    const container = document.getElementById('clavier')
    const bouton = document.createElement("button");
    bouton.textContent = value;
    bouton.classList.add(maClasse)
    container.appendChild(bouton);
}