self.addEventListener("install", evt => {
    console.log("Le service worker à été installé");
});

self.addEventListener("active", evt => {
    console.log("Le service worker à été activé");
});

self.addEventListener("fetch", evt => {
    console.log("Ressource récupérée " + evt.request.url);
});