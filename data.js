const movies = [
    {
        title: "Chernobyl",
        image: "chernobyl.jpg", // Replace with actual movie poster URL
        logo: "chernobyl-logo.png", // Replace with actual logo URL
        genre: "Drama",
        description: "A nuclear disaster changes history forever.",
        specialCode: "1240",
        redirectUrl: "https://www.hbo.com/chernobyl"
    },
    {
        title: "Inception",
        image: "inception.jpg",
        logo: "inception-logo.png",
        genre: "Sci-Fi",
        description: "A mind-bending thriller about dreams within dreams.",
        specialCode: "inception",
        redirectUrl: "https://www.netflix.com/title/inception"
    }
];

// Save data to localStorage for persistence
if (!localStorage.getItem("movies")) {
    localStorage.setItem("movies", JSON.stringify(movies));
}
