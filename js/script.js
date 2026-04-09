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

            // Afficher un état de chargement sur le bouton (optionnel mais recommandé)
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            emailjs.sendForm('service_d27ns2p', 'template_s8j9qqf', this)
                .then(function() {
                    document.getElementById('success-msg').style.display = 'block';
                    document.getElementById('error-msg').style.display = 'none';
                    form.reset(); // On vide le formulaire après succès
                })
                .catch(function(error) {
                    document.getElementById('error-msg').style.display = 'block';
                    document.getElementById('success-msg').style.display = 'none';
                })
                .finally(function() {
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }
};