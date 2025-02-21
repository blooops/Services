const urlParams = new URLSearchParams(window.location.search);
const specialCode = urlParams.get("code");
const movieData = JSON.parse(localStorage.getItem("movies"));
const movie = movieData.find(m => m.specialCode === specialCode);

if (movie) {
    document.getElementById("movie-title").innerText = movie.title;
    document.getElementById("movie-image").src = movie.image;
    document.getElementById("movie-logo").src = movie.logo;
    document.getElementById("movie-genre").innerText = movie.genre;
    document.getElementById("movie-description").innerText = movie.description;
    document.getElementById("watch-link").href = movie.redirectUrl;
    
    // Add to history
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if (!history.find(h => h.specialCode === specialCode)) {
        history.push(movie);
        localStorage.setItem("history", JSON.stringify(history));
    }
}

function addToFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find(f => f.specialCode === specialCode)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}
