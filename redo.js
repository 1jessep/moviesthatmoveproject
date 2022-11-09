// On app load, get all tasks from localStorage
window.onload = loadTitles;

// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTitle();
});

function loadTitles() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("titles") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let titles = Array.from(JSON.parse(localStorage.getItem("titles")));

  // Loop through the tasks and add them to the list
  titles.forEach(title => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="titleComplete(this)" class="check" ${title.completed ? 'checked' : ''}>
      <input type="text" value="${title.title}" class="title ${title.completed ? 'completed' : ''}" onfocus="getCurrentTitle(this)" onblur="editTitle(this)">
      <i class="fa fa-trash" onclick="removeTitle(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

function addTitle() {
  const title = document.querySelector("form input");
  const list = document.querySelector("ul");
  // return if title is empty
  if (title.value === "") {
    return false;
  }
  // check is title already exist
  if (document.querySelector(`input[value="${title.value}"]`)) {
    return false;
  }

  // add title to local storage
  localStorage.setItem("titles", JSON.stringify([...JSON.parse(localStorage.getItem("titles") || "[]"), { title: title.value, completed: false }]));

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="titleComplete(this)" class="check">
  <input type="text" value="${title.value}" class="title" onfocus="getCurrentTitle(this)" onblur="editTitle(this)">
  <i class="fa fa-trash" onclick="removeTitle(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  // clear input
  title.value = "";
}

function titleComplete(event) {
  let titles = Array.from(JSON.parse(localStorage.getItem("titles")));
  titles.forEach(title => {
    if (title.title === event.nextElementSibling.value) {
      title.completed = !title.completed;
    }
  });
  localStorage.setItem("titles", JSON.stringify(titles));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTitle(event) {
  let titles = Array.from(JSON.parse(localStorage.getItem("titles")));
  titles.forEach(title => {
    if (title.title === event.parentNode.children[1].value) {
      // delete title
      titles.splice(titles.indexOf(title), 1);
    }
  });
  localStorage.setItem("titles", JSON.stringify(titles));
  event.parentElement.remove();
}

// store current task to track changes
var currentTitle = null;

// get current task
function getCurrentTitle(event) {
  currentTitle = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let titles = Array.from(JSON.parse(localStorage.getItem("titles")));
  // check if task is empty
  if (event.value === "") {
    event.value = currentTitle;
    return;
  }
  // task already exist
  titles.forEach(title => {
    if (title.title === event.value) {
      event.value = currentTitle;
      return;
    }
  });
  // update title
  titles.forEach(title => {
    if (title.title === currentTitle) {
      title.title = event.value;
    }
  });
  // update local storage
  localStorage.setItem("titles", JSON.stringify(titles));
}
  