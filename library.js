let myLibrary = [];

showForm = document.querySelector("#add-book");
addBook.addEventListener("click", showForm);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function showForm() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
}

function addBookToLibrary() {
  console.log("book added!");
}

function displayLibrary() {}
