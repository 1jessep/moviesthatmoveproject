window.onload = loadList;
var addBtnEl = document.querySelector(".saveBtn");
var titleEl = document.querySelector(".input");
var listTitles = document.querySelector("#title");

function loadList() {
  var titles = localStorage.getItem("titles");
  titles.forEach((title) => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = titleEl.val();
    list.insertBefore(li, list.children[0]);
  });
}

localStorage.getItem("titles");

// click event to add movie to watch list
addBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
// find value of input and save it to local storage.
  var button = $(this);
  var list = button.parent();
  var text = list.find(".input").val();
  var form = list.find(".form");
  console.log("text from input", text);
  localStorage.setItem("titles" + form, text);

  // create list element with entered movie title and append it to the list
  var movieTitle = document.createElement("li");
  movieTitle.textContent = text;
  listTitles.appendChild(movieTitle);
});
