const searchURL = 'https://api.themoviedb.org/3/search/movie?';
const paramSearch = '&language=fr-FR&page=1&include_adult=false&query=';

const apiKey = 'api_key=b5bea217057715172bb7ea8c3913de70';

const imgPath = "https://image.tmdb.org/t/p/original";

var movies;

var display;

/**
 * Fonction qui permet de lancer la recherche d'un film 
 * en appuyant sur la touche "entrée" du clavier
 */
async function searchMovieWithEnter() {
    if(event.key === 'Enter') {
        await searchMovie();        
    }
}

/**
 * Fonction qui retourne un message personnalisé si le film n'a pas d'intrigue
 * @param {Intrigue du film} overview 
 * @returns l'overview de l'API si overview n'est pas vide, une personnalisée sinon
 */
function getOverview(overview) {
    if(overview == ""){
        return "Pas d'intrigue trouvée pour ce film.";
    } else {
        return overview;
    }
}

/**
 * Fonction qui retourne l'url de l'affiche
 * @param {url fournie par l'API} poster 
 * @returns url de l'API si poster n'est pas nulle, une personnalisée sinon
 */
function getPoster(poster) {
    if (poster == null) {
        return "icons/Pas_affiche.png";
    } else {
        return imgPath + poster;
    }
}

/**
 * Fonction de recherche d'un film
 */
async function searchMovie() {
    //Récupération de la valeur saisie par l'utilisateur
    let input = document.getElementById("text");
    let movie = input.value;

    //Récupération de la liste des films via l'API
    movies = await getMovies(movie);

    console.log(movies);

    let display = document.getElementById("display_movies");

    //Réinitialisation de l'affichage des films (pour une nouvelle recherche)
    display.innerHTML = "";

    movies.results.forEach(movie => {
        display.innerHTML+=
        "<div class='movie'>" + 
            "<h2>" + movie.title + "</h2>" + 
            "<div class='imgMovie'>" +
                "<img src='" + getPoster(movie.poster_path) + "' width='150px'>" + 
            "</div>" + 
            "<div class='elt'>" +
                "<h3>Intrigue :<h3>" + 
                "<p>" + getOverview(movie.overview) + "</p>" +
                "<p><span class='title_h3'>Note : </span>" + movie.vote_average + "</p>" +
            "</div>" +
        "</div>";
    });
}

/**
 * Fonction qui fait un appel à l'API et retourne une liste de film en fonction d'une saisie utilisateur
 * @param {Film entré par l'utilisateur} movie 
 * @returns 
 */
async function getMovies(movie) {
    const res = await fetch(searchURL + apiKey + paramSearch + movie);
    if (res) {
        var data = await res.json();
        return data;
    } else {
        return undefined;
    }
}