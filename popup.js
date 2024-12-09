(async () => {
    // Afficher le loader
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;

    // Obtenir le résumé du site
    const summary = await fetchSummary(url);

    // Construire le contenu à envoyer, incluant le séparateur et le texte générique
    const separator = "\n---\n"; // Séparateur
    const content = `${url}\n\n📌 ${summary.content}${separator}`; // Utiliser uniquement la description

    // Construire l'URL pour le nouvel onglet avec les paramètres
    const newPostUrl = `new_post.html?post_title=${encodeURIComponent(summary.title)}&content=${encodeURIComponent(content)}`;

    // Obtenir l'ID de la fenêtre actuelle
    const windowId = await chrome.windows.getCurrent();

    // Obtenir l'ID de l'onglet actif
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Ouvrir le nouvel onglet à droite de l'onglet actif
    chrome.tabs.create({ 
        url: newPostUrl, 
        windowId: windowId.id, 
        index: activeTab.index + 1 // Utilisez l'index de l'onglet actif + 1
    });

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

        return { title, content: description }; // Retourner uniquement la description
    } catch (error) {
        console.error(error);
        return { title: "Erreur", content: "Impossible d'obtenir le résumé." };
    }
}
