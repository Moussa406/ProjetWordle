function creationDuClavierVirtuel(){
    const caracteres = "azertyuiopqsdfghjklmwxcvbn"
    let tableauDeCaracteres = caracteres.split('');
    
    tableauDeCaracteres.forEach((caractere, index) => {
        if (index === 20){
            ajouteBouton("↩", "enter")
        }
        ajouteBouton(caractere, "toucheLettre")
    });

    ajouteBouton("⌫", "retour")
}

function ajouteBouton(value, maClasse){
    

    const container = document.getElementById('clavier')
    const bouton = document.createElement("button");
    bouton.textContent = value.toUpperCase();

    if (maClasse === "toucheLettre"){
        bouton.id = `bt-${value.toUpperCase()}`
        bouton.classList.add(maClasse)
    }else{
        bouton.id = `bt-${maClasse}`
        bouton.classList.add(`toucheAction`)
    }
    
    
    container.appendChild(bouton);
}