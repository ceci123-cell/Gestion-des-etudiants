// Tableau pour stocker les étudiants
let etudiants = [];

// Récupération des éléments HTML
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const btnAjouter = document.getElementById("btnAjouter");
const tableau = document.getElementById("tableauEtudiants");

// Variable pour savoir quel étudiant modifier
let indexModification = -1;


// Fonction pour ajouter ou modifier un étudiant
btnAjouter.addEventListener("click", function() {

    let nomEtudiant = nom.value.trim();
    let prenomEtudiant = prenom.value.trim();

    // Vérification des champs
    if (nomEtudiant === "" || prenomEtudiant === "") {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Modification d'un étudiant
    if (indexModification !== -1) {

        etudiants[indexModification].nom = nomEtudiant;
        etudiants[indexModification].prenom = prenomEtudiant;

        indexModification = -1;
        btnAjouter.textContent = "Ajouter";

    } else {

        // Création d'un étudiant
        let etudiant = {
            nom: nomEtudiant,
            prenom: prenomEtudiant
        };

        // Ajouter dans le tableau
        etudiants.push(etudiant);
    }

    // Vider les champs
    nom.value = "";
    prenom.value = "";

    // Afficher la liste
    afficherEtudiants();

});


// Fonction pour afficher les étudiants
function afficherEtudiants() {

    tableau.innerHTML = "";

    for (let i = 0; i < etudiants.length; i++) {

        tableau.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${etudiants[i].nom}</td>
                <td>${etudiants[i].prenom}</td>
                <td>
                    <button class="btnModifier"
                    onclick="modifierEtudiant(${i})">
                        Modifier
                    </button>

                    <button class="btnSupprimer"
                    onclick="supprimerEtudiant(${i})">
                        Supprimer
                    </button>
                </td>
            </tr>
        `;
    }
}


// Fonction pour modifier un étudiant
function modifierEtudiant(index) {

    nom.value = etudiants[index].nom;
    prenom.value = etudiants[index].prenom;

    indexModification = index;

    btnAjouter.textContent = "Modifier";
}


// Fonction pour supprimer un étudiant
function supprimerEtudiant(index) {

    let confirmation = confirm(
        "Voulez-vous vraiment supprimer cet étudiant ?"
    );

    if (confirmation) {

        etudiants.splice(index, 1);

        afficherEtudiants();

        // Annuler le mode modification si nécessaire
        if (indexModification === index) {
            indexModification = -1;
            nom.value = "";
            prenom.value = "";
            btnAjouter.textContent = "Ajouter";
        }
    }
}