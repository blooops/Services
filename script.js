document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const specialCode = urlParams.get("code");

    // Debugging Step 1: Check if code is retrieved
    console.log("Special Code:", specialCode);

    // Fetch movies from localStorage
    const movieData = JSON.parse(localStorage.getItem("movies")) || [];
    
    // Debugging Step 2: Check if movies are loaded
    console.log("Loaded Movies:", movieData);

    if (!specialCode) {
        console.error("No special code provided in URL.");
        return;
    }

    // Find movie by specialCode
    const movie = movieData.find(m => m.specialCode === specialCode);

    if (!movie) {
        console.error("Movie not found for code:", specialCode);
        return;
    }

    // Debugging Step 3: Check if movie is found
    console.log("Movie Found:", movie);

    // Update the HTML content
    document.getElementById("movie-title").innerText = movie.title;
    document.getElementById("movie-image").src = movie.image;
    document.getElementById("movie-logo").src = movie.logo;
    document.getElementById("movie-genre").innerText = movie.genre;
    document.getElementById("movie-description").innerText = movie.description;
    document.getElementById("watch-link").href = movie.redirectUrl;

    // Add to history if not already viewed
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if (!history.find(h => h.specialCode === specialCode)) {
        history.push(movie);
        localStorage.setItem("history", JSON.stringify(history));
    }
});

function addToFavorites() {
    const urlParams = new URLSearchParams(window.location.search);
    const specialCode = urlParams.get("code");
    const movieData = JSON.parse(localStorage.getItem("movies")) || [];
    const movie = movieData.find(m => m.specialCode === specialCode);

    if (!movie) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find(f => f.specialCode === specialCode)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Added to Favorites!");
    } else {
        alert("Already in Favorites!");
    }
}
