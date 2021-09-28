// api/TMDB.js

const TOKEN = 'ac308e747cf9c7ae5571a16258115b56';

export function getMovies(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + TOKEN + '&language=fr&query=' + text + '&page=' + page
    return fetch(url).then((response) => response.json()).catch((error) => console.error(error))
}

export function getImage(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}
