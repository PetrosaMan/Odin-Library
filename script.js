const myLibrary = [
  new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    "no",
    "fb9d7b37-1322-4493-b149-351b554a9574"
  ),
  new Book(
    "The Legend",
    "D.H. Smith",
    395,
    "yes",
    "3564e844-8549-4814-b009-3ad445c218c5"
  ),
  new Book(
    "The Rocket",
    "R.L. Brown",
    274,
    "no",
    "af7278bc-9809-42bc-93c9-bc7765344378"
  ),
  new Book(
    "The Lost Planet",
    "M.S. Jones",
    382,
    "yes",
    "75102e01-41ec-4966-85d9-7a93bf3d0af3"
  ),
];

function Book(title, author, pages, read, id) {
  // the constructor...
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}, ${this.id}`;
  };
}

Book.prototype.toggleReadStatus = function () {
  this.read = this.read === "yes" ? "no" : "yes";
  displayBooks();
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("toggle-read")) {
    const bookId = event.target.parentElement.dataset.id;
    const book = myLibrary.find((b) => b.id === bookId);
    if (book) {
      book.toggleReadStatus();
      displayBooks(); // Refresh book display changes
    }
  }
});

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID(); // unique id for each book
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
  // Call funtion to update the display
  document.getElementById("book-form").reset();
  displayBooks();
}

function displayBooks() {
  // Clear existing book entries before re-rendering
  const bookContainer = document.getElementById("book-container");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const articleElement = document.createElement("article");
    articleElement.dataset.id = book.id;
    articleElement.className = "book";

    articleElement.innerHTML = `
            <h2>title: ${book.title}</h2>
            <p>author: ${book.author}</p>
            <p>pages: ${book.pages}</p>
            <p>read: ${book.read}</p>            
            <button class="delete-book" type="button">delete book</button>
            <button class="toggle-read" type="button">Toggle Read Status</button>
        `;
    bookContainer.appendChild(articleElement);
  });  
}

// Ensure displayBooks is triggered at page load too.
document.addEventListener("DOMContentLoaded", displayBooks);

const showForm = document.getElementById("add-book");
showForm.addEventListener("click", () => {
  const addBook = document.getElementById("book-form");
  addBook.style.opacity = 1;   
});

const form = document.getElementById("book-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;
  addBookToLibrary(title, author, pages, read);

  //Reset form fields after submission and hide the form
  document.getElementById("book-form").reset();
  form.style.opacity = 0;
});

document.getElementById("book-container").addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-book")) {
    const bookArticleElement = event.target.closest("article");

    if (bookArticleElement && bookArticleElement.dataset.id) {
      const bookIdToDelete = bookArticleElement.dataset.id;

      // Find the index of the book to delete in myLibrary
      const bookIndex = myLibrary.findIndex(
        (book) => book.id === bookIdToDelete
      );
      if (bookIndex !== -1) {
        // Remove the book from myLibrary
        myLibrary.splice(bookIndex, 1); // remove the book from array
        displayBooks(); // Re-render the library display
      }
    }
  }
});
