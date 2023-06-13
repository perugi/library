let myLibrary = [];
myLibrary = [
  new Book("title1", "author1", 100, true),
  new Book("title2", "author2", 200, false),
  new Book("title3", "author3", 300, true),
  new Book("title4", "author4", 400, false),
  new Book(
    "this is a very long book title that might be a problem for layout",
    "author4",
    400,
    false
  ),
];
displayLibrary();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function showForm() {
  let form = document.createElement("div");
  form.setAttribute("id", "add-form");

  //TODO create a popup for the form
  let main = document.querySelector("main");
  let library = document.querySelector("#library");
  main.insertBefore(form, library);

  const bookObject = new Book("test_title", "test_author", 123, true);
  for (let key in bookObject) {
    const keyLabel = document.createElement("label");
    keyLabel.setAttribute("for", key);
    keyLabel.textContent = `${capitalize(key)}:`;
    const inputElement = document.createElement("input");
    inputElement.setAttribute("id", key);
    if (key === "pages") {
      inputElement.setAttribute("type", "number");
      inputElement.setAttribute("min", "1");
    }
    if (key === "read") {
      inputElement.setAttribute("type", "checkbox");
    }

    form.appendChild(keyLabel);
    form.appendChild(inputElement);
  }

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

  form.appendChild(addBookButton);
  form.appendChild(closeButton);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function closeForm() {
  let form = document.querySelector("#add-form");

  form.remove();
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  myLibrary.push(new Book(title, author, pages, read));

  closeForm();
  displayLibrary();
}

function displayLibrary() {
  const library = document.querySelector("#library");

  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book-card");
    bookDiv.setAttribute("data-id", myLibrary.indexOf(book));

    const removeButton = document.createElement("img");
    removeButton.setAttribute("class", "remove-button");
    removeButton.setAttribute("src", "img/remove.svg");
    // TODO use icon instead of remove button.
    removeButton.addEventListener("click", function () {
      removeBookFromLibrary(bookDiv.getAttribute("data-id"));
    });
    bookDiv.appendChild(removeButton);

    for (let key in book) {
      if (key !== "read") {
        const infoDiv = document.createElement("div");
        infoDiv.setAttribute("class", `${key}`);
        infoDiv.textContent = `${capitalize(key)}: ${book[key]}`;

        bookDiv.appendChild(infoDiv);
      }
    }

    const readLabel = document.createElement("label");
    readLabel.setAttribute("for", `read-${bookDiv.getAttribute("data-id")}`);
    readLabel.textContent = "Read:";
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
  myLibrary.splice(index, 1);

  displayLibrary();
}

function toggleRead(index) {
  console.log(`toggleRead: ${index}`);
  myLibrary[index].read = !myLibrary[index].read;
  displayLibrary();
}
