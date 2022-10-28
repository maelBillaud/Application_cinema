const searchURL = 'https://api.themoviedb.org/3/search/movie?';
const paramSearch = '&language=fr-FR&page=1&include_adult=false&query=';

const apiKey = 'api_key=b5bea217057715172bb7ea8c3913de70';

const pathPoster = "https://image.tmdb.org/t/p/original";

var movies;

var display;

async function main() {
    let input = document.getElementById("text");
    let movie = input.value;

    movies = await getMovies(movie);

    let display = document.getElementById("display_movies");

    display.innerHTML = "";

    movies.results.forEach(movie => {
        movie.poster = pathPoster + movie.poster_path
        display.innerHTML+=
        "<div class='movie'>" + 
            "<h3>" + movie.title + "</h3>" + 
            "<div class='img'>" +
                "<img src='" + movie.poster+ "' width='100px'>" + 
            "</div>" + 
            "<div class='elt'>" + 
                "<p>" + movie.overview + "</p>" + 
                "<p>" + movie.vote_average + "</p>" +
            "</div>" +
        "</div>";
    });
}

async function getMovies(movie) {
    const res = await fetch(searchURL + apiKey + paramSearch + movie);
    if (res) {
        var data = await res.json();
        return data;
    } else {
        return undefined;
    }
}