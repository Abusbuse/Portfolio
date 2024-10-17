function includeHTML() {
    const includes = document.querySelectorAll('[id]');
    includes.forEach(el => {
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
    });
}

window.onload = includeHTML;
