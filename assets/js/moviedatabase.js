var databaseUrl = `https://api.themoviedb.org/3/search/movie?&api_key=c574d0d4c6f69c437efe9f2ca4ff7689&query=`;
var posterUrl = "https://image.tmdb.org/t/p/w1280";
var database = document.getElementById("database");
var form = document.getElementById("form");
var searchBar = document.getElementById("search");

async function getMovies(url) {
  var response = await fetch(url);
  var movieData = await response.json();
  displayMovies(movieData.results);
}

function displayMovies(movies) {
  database.innerHTML = "";

  movies.forEach((movie) => {
    var { poster_path, title, release_date, overview } = movie;
    var movies = document.createElement("section");
    movies.classList.add("movie");
    movies.innerHTML = `
            <img src="${posterUrl + poster_path}"
                alt="${title}"/>
            <section class="title">
                <h2>${title}</h2>
            </section>  
            <section class="summary">
            <h2>About The Movie:</h2>
            ${overview}
            </section>
            <section class="release">
                <h4>Release:</h4>
                ${release_date}
            </section>
        `;
    database.appendChild(movies);
  });
}

form.addEventListener("click", (e) => {
  e.preventDefault();
  var searchEntry = searchBar.value;
  if (searchEntry) {
    getMovies(databaseUrl + searchEntry);
    searchBar.value = "";
  }
});
