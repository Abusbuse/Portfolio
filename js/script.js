// Fonction qui gère le chargement de l'header.html et du footer.html
function includeHTML() {
    const includes = document.querySelectorAll('[id]');
    includes.forEach(el => {
        // Limiter le chargement des fichiers HTML uniquement aux éléments spécifiques
        if (el.id === 'header' || el.id === 'footer') {
            let file = el.getAttribute('id') + ".html";
            fetch(`/partials/${file}`)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return 'File not found';
                }
            })
            .then(data => el.innerHTML = data)
            .then(() => {
                // Appel de la fonction pour initialiser le menu déroulant après l'inclusion de l'HTML
                initializeDropdownMenu();
            });
        }
    });
}

// Fonction pour gérer le comportement du menu déroulant avec un délai de fermeture
function initializeDropdownMenu() {
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    let timeout;

    if (dropdown && dropdownMenu) {
        // Afficher la liste au survol
        dropdown.addEventListener("mouseenter", function() {
            clearTimeout(timeout); // Annule le timeout pour éviter qu'elle disparaisse
            dropdownMenu.style.display = "block";
        });

        // Délai avant de cacher la liste
        dropdown.addEventListener("mouseleave", function() {
            timeout = setTimeout(function() {
                dropdownMenu.style.display = "none";
            }, 400); // 2 secondes de délai
        });

        // Empêcher la fermeture si la souris est sur le menu déroulant
        dropdownMenu.addEventListener("mouseenter", function() {
            clearTimeout(timeout);
        });

        // Appliquer le délai aussi si la souris quitte le menu déroulant
        dropdownMenu.addEventListener("mouseleave", function() {
            timeout = setTimeout(function() {
                dropdownMenu.style.display = "none";
            }, 2000); // 2 secondes de délai
        });
    }
}

window.onload = function() {
    includeHTML();

    // Initialiser emailjs
    emailjs.init('m2UbHNucx2QNjTMx2');

    // Gestion du formulaire de contact
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            emailjs.sendForm('service_d27ns2p', 'template_s8j9qqf', this)
                .then(function() {
                    document.getElementById('success-msg').style.display = 'block';
                    document.getElementById('error-msg').style.display = 'none';
                }, function(error) {
                    document.getElementById('error-msg').style.display = 'block';
                    document.getElementById('success-msg').style.display = 'none';
                });
        });
    }
};
