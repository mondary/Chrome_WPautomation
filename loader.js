let h = 0;
const loaderFill = document.querySelector('.loader-fullscreen-fill');
const loaderInterval = setInterval(() => {
    h += 5;
    if (h > 100) h = 0;
    loaderFill.style.height = h + '%';
}, 1000);

// Rediriger vers la page de création de post après un court délai
setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('post_title');
    const content = urlParams.get('content');
    const postUrl = `https://mondary.design/wp-admin/post-new.php?post_title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`;
    window.location.href = postUrl;
}, 3000); // Délai de 3 secondes avant la redirection
