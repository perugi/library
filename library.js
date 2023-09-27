let myLibrary = [];
// myLibrary = [
//   new Book("title1", "author1", 100, true),
//   new Book("title2", "author2", 200, false),
//   new Book("title3", "author3", 300, true),
//   new Book("title4", "author4", 400, false),
//   new Book(
//     "this is a very long book title that might be a problem for layout",
//     "author4",
//     400,
//     false
//   ),
// ];
displayLibrary();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

function addBookToLibrary() {
  console.log("addBookToLibrary");
  const title = document.querySelector("#title-form");
  const author = document.querySelector("#author-form");
  const pages = document.querySelector("#pages-form");
  const read = document.querySelector("#read-form");

  myLibrary.push(
    new Book(title.value, author.value, pages.value, read.checked)
  );

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
    removeButton.addEventListener("click", function () {
      removeBookFromLibrary(bookDiv.getAttribute("data-id"));
    });
    bookDiv.appendChild(removeButton);

    for (let key in book) {
      if (key !== "read") {
        const infoDiv = document.createElement("div");
        infoDiv.setAttribute("class", `${key}`);
        infoDiv.innerHTML = `<span class="info-key">${capitalize(
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
  myLibrary.splice(index, 1);

  displayLibrary();
}

function toggleRead(index) {
  console.log(`toggleRead: ${index}`);
  myLibrary[index].read = !myLibrary[index].read;
  displayLibrary();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
