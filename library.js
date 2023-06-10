let myLibrary = [];

showFormButton = document.querySelector("#new-book");
showFormButton.addEventListener("click", showForm);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function showForm() {
  console.log("show form");
  let form = document.createElement("div");
  form.setAttribute("id", "add-form");

  let library = document.querySelector("#library");
  document.body.insertBefore(form, library);

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title";
  const title = document.createElement("input");
  title.setAttribute("id", "title");

  const authorLabel = document.createElement("label");
  authorLabel.setAttribute("for", "author");
  authorLabel.textContent = "Author";
  const author = document.createElement("input");
  author.setAttribute("id", "author");

  const pagesLabel = document.createElement("label");
  pagesLabel.setAttribute("for", "pages");
  pagesLabel.textContent = "Pages";
  const pages = document.createElement("input");
  pages.setAttribute("id", "pages");

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "read");
  readLabel.textContent = "Read";
  const read = document.createElement("input");
  read.setAttribute("id", "read");
  read.setAttribute("type", "checkbox");

  const addBookButton = document.createElement("input");
  addBookButton.setAttribute("id", "add-book");
  addBookButton.setAttribute("type", "button");
  addBookButton.setAttribute("value", "Add Book");
  addBookButton.addEventListener("click", addBookToLibrary);

  const closeButton = document.createElement("input");
  closeButton.setAttribute("id", "add-book");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("value", "Close");
  closeButton.addEventListener("click", closeForm);

  form.appendChild(titleLabel);
  form.appendChild(title);
  form.appendChild(authorLabel);
  form.appendChild(author);
  form.appendChild(pagesLabel);
  form.appendChild(pages);
  form.appendChild(readLabel);
  form.appendChild(read);
  form.appendChild(addBookButton);
  form.appendChild(closeButton);
}

function closeForm() {
  console.log("close form");

  let form = document.querySelector("#add-form");

  form.remove();
}

function addBookToLibrary() {
  console.log("book added!");

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  myLibrary.push(new Book(title, author, pages, read));
}

function displayLibrary() {}
