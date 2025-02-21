const movies = [
    {
        title: "Chernobyl",
        image: "chernobyl.jpg", // Replace with actual movie poster URL
        logo: "chernobyl-logo.png", // Replace with actual logo URL
        genre: "Drama",
        description: "April 1986: A nuclear power plant explodes at Chernobyl, USSR, resulting in one of history's worst man-made catastrophes.",
        specialCode: "chernobyl",
        redirectUrl: "https://www.hbo.com/chernobyl"
    }
];

// Save to local storage if not already set
if (!localStorage.getItem("movies")) {
    localStorage.setItem("movies", JSON.stringify(movies));
}
