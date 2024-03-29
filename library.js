class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBookByIndex(index) {
    this.books.splice(index, 1);
  }

  getBooks() {
    return this.books;
  }
}

function showForm() {
  const modal = document.querySelector("#add-book-modal");
  modal.style.display = "flex";
}

function closeForm() {
  const modal = document.querySelector("#add-book-modal");
  modal.style.display = "none";

  const title = document.querySelector("#title-form");
  const author = document.querySelector("#author-form");
  const pages = document.querySelector("#pages-form");
  const read = document.querySelector("#read-form");

  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

window.addEventListener("mousedown", (event) => {
  const modal = document.querySelector("#add-book-modal");
  if (event.target == modal) {
    closeForm();
  }
});

const title = document.querySelector("#title-form");
const author = document.querySelector("#author-form");
const pages = document.querySelector("#pages-form");

function addBookToLibrary() {
  const read = document.querySelector("#read-form");

  if (title.validity.valueMissing) {
    title.setCustomValidity("Please enter a title");
    title.reportValidity();
    return;
  }

  if (author.validity.valueMissing) {
    author.setCustomValidity("Please enter an author");
    author.reportValidity();
    return;
  }

  if (pages.validity.valueMissing) {
    pages.setCustomValidity("Please enter the number of pages");
    pages.reportValidity();
    return;
  }

  myLibrary.addBook(
    new Book(title.value, author.value, pages.value, read.checked)
  );

  closeForm();
  displayLibrary();
}

title.addEventListener("input", () => clearErrorMessage(title));
author.addEventListener("input", () => clearErrorMessage(author));
pages.addEventListener("input", () => clearErrorMessage(pages));

function clearErrorMessage(element) {
  element.setCustomValidity("");
}

function displayLibrary() {
  const library = document.querySelector("#library");

  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }

  myLibrary.getBooks().forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book-card");
    bookDiv.setAttribute("data-id", myLibrary.getBooks().indexOf(book));

    const removeButton = document.createElement("img");
    removeButton.setAttribute("class", "remove-button");
    removeButton.setAttribute("src", "img/remove.svg");
    removeButton.addEventListener("click", function () {
      removeBookFromLibrary(bookDiv.getAttribute("data-id"));
    });
    bookDiv.appendChild(removeButton);

    for (let key in book) {
      if (key !== "read") {
        const infoDiv = document.createElement("div");
        infoDiv.setAttribute("class", `${key}`);
        infoDiv.innerHTML = `<span class="info-key">${Book.capitalize(
          key
        )}:</span> ${book[key]}`;

        bookDiv.appendChild(infoDiv);
      }
    }

    const readLabel = document.createElement("label");
    readLabel.setAttribute("for", `read-${bookDiv.getAttribute("data-id")}`);
    readLabel.innerHTML = "<span class='info-key'>Read:</span>";
    const toggleReadBox = document.createElement("input");
    toggleReadBox.setAttribute("type", "checkbox");
    toggleReadBox.setAttribute("id", `read-${bookDiv.getAttribute("data-id")}`);
    if (book.read) {
      toggleReadBox.setAttribute("checked", true);
    }
    toggleReadBox.addEventListener("click", function () {
      toggleRead(bookDiv.getAttribute("data-id"));
    });
    bookDiv.appendChild(readLabel);
    bookDiv.appendChild(toggleReadBox);

    library.appendChild(bookDiv);
  });

  const addBookDiv = document.createElement("div");
  addBookDiv.setAttribute("class", "book-card new-book");
  addBookButton = document.createElement("img");
  addBookButton.setAttribute("src", "img/add.svg");
  addBookButton.setAttribute("class", "add-button gray-filter");
  addBookDiv.addEventListener("click", showForm);

  addBookDiv.appendChild(addBookButton);

  library.appendChild(addBookDiv);
}

function removeBookFromLibrary(index) {
  myLibrary.removeBookByIndex(index);
  displayLibrary();
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  displayLibrary();
}

myLibrary = new Library();

myLibrary.addBook(new Book("title1", "author1", 100, true));
myLibrary.addBook(new Book("title2", "author2", 200, false));
myLibrary.addBook(new Book("title3", "author3", 300, true));
myLibrary.addBook(new Book("title4", "author4", 400, false));
myLibrary.addBook(
  new Book(
    "this is a very long book title that might be a problem for layout",
    "author4",
    400,
    false
  )
);

displayLibrary();
