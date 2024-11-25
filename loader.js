let h = 0;
const loaderFill = document.querySelector('.loader-fullscreen-fill');
const loaderLabel = document.querySelector('.loader-fullscreen-label');

// Démarrer l'animation de chargement
const loaderInterval = setInterval(() => {
    h += 5; // Augmentez la hauteur de 5% à chaque intervalle
    if (h > 100) {
        clearInterval(loaderInterval); // Arrêtez l'intervalle lorsque la hauteur atteint 100%
        // Rediriger vers la page de création de post après un court délai
        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const title = urlParams.get('post_title');
            const content = urlParams.get('content');
            const postUrl = `https://mondary.design/wp-admin/post-new.php?post_title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`;
            window.location.href = postUrl;
        }, 500); // Délai de 0,5 seconde avant la redirection
    }

    // Mettre à jour la hauteur du loader
    loaderFill.style.height = h + '%'; // Mettre à jour la hauteur du loader
}, 150); // Augmentez l'intervalle à 150 ms pour ralentir l'animation
