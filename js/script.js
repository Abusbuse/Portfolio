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
            .then(data => el.innerHTML = data);
        }
    });
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
