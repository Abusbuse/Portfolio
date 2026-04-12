async function includeHTML() {
    const includes = document.querySelectorAll('[id="header"], [id="footer"]');
    
    for (const el of includes) {
        const file = `/Portfolio/partials/${el.id}.html`;
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.innerHTML = await response.text();
            } else {
                console.error(`Fichier introuvable: ${file}`);
            }
        } catch (error) {
            console.error('Erreur réseau lors du chargement de:', file, error);
        }
    }
    
    // Mettre à jour l'année automatiquement après le chargement
    updateYear();
}

function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

window.onload = function() {
    // 1. Charger les composants
    includeHTML();

    // 2. Initialiser EmailJS
    emailjs.init('m2UbHNucx2QNjTMx2');

    // 3. Gestion du formulaire de contact
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Afficher un état de chargement sur le bouton
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            emailjs.sendForm('service_d27ns2p', 'template_s8j9qqf', this)
                .then(function() {
                    // On retire la classe is-hidden du succès et on s'assure qu'elle est sur l'erreur
                    document.getElementById('success-msg').classList.remove('is-hidden');
                    document.getElementById('error-msg').classList.add('is-hidden');
                    form.reset(); // On vide le formulaire après succès
                    
                    // Optionnel : on recache le message après 5 secondes
                    setTimeout(() => {
                        document.getElementById('success-msg').classList.add('is-hidden');
                    }, 5000);
                })
                .catch(function(error) {
                    // On fait l'inverse en cas d'erreur
                    document.getElementById('error-msg').classList.remove('is-hidden');
                    document.getElementById('success-msg').classList.add('is-hidden');
                })
                .finally(function() {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }
};