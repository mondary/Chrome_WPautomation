(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;

    // Obtenir le résumé du site
    const summary = await fetchSummary(url);

    // Construire l'URL avec les paramètres pour le nouveau post
    const postUrl = `https://mondary.design/wp-admin/post-new.php?post_title=${encodeURIComponent(summary.title)}&content=${encodeURIComponent(summary.content)}`;

    // Ouvrir l'URL dans un nouvel onglet
    chrome.tabs.create({ url: postUrl });
})();

// Fonction pour obtenir le résumé du site
async function fetchSummary(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur lors de la récupération du résumé');

        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Récupérer le titre de la page
        const title = doc.querySelector('title')?.innerText || "Titre non disponible";

        // Récupérer la description
        const description = doc.querySelector('meta[name="description"]')?.content || "Résumé non disponible";

        // Construire le contenu à envoyer
        const content = `Source: ${url}\n\n📌 Description: ${description}`;

        return { title, content };
    } catch (error) {
        console.error(error);
        return { title: "Erreur", content: "Impossible d'obtenir le résumé." };
    }
}
