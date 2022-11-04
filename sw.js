if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((reg) => {
        // registration worked
        console.log("Enregistrement du service réussi");
    }).catch((error) => {
        // registration failed
        console.log("Erreur : " + error);
    });
}