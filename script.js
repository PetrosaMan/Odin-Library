const myLibrary = [
  /* Test data for myLibrary */
  /* All new books are appended to myLibrary
  /* Delete test data before real books data entered */
  new Book(
    "The Battle of Nowhere",
    "J.R.K. Thorman",
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

// Constructor function
function Book(title, author, pages, read, id) {  
  if (!new.target) {
    throw Error("You must use the 'new' operator");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;  
}
// toggle read status of a book
Book.prototype.toggleReadStatus = function () {  
  if (this.read == "yes") {
     this.read = "no";
    } else {
     this.read = "yes" ;
  }     
  displayBooks();
}; 

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID(); // unique id for each book
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
  // Call function to update the display
  document.getElementById("book-form").reset();
  displayBooks();
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("toggle-read")) {     
    const bookArticle = event.target.closest("article");         
    if (!bookArticle) return; // Guard clause in case the article isn't found    
    const bookId = bookArticle.dataset.id;    
    const book = myLibrary.find((b)=> b.id === bookId);    
    if(book) {     
      book.toggleReadStatus();      
    }
  }
});

function displayBooks() {
  // Clear existing book entries before re-rendering
  const bookContainer = document.getElementById("book-container");
  bookContainer.innerHTML = "";

  myLibrary.forEach( function(book) {       
    const articleElement = document.createElement("article");
    articleElement.dataset.id = book.id;
    articleElement.className = "book";    
   
    articleElement.innerHTML = `
      <h2>title: ${book.title}</h2>
      <p>author: ${book.author}</p>
      <p>pages: ${book.pages} pages</p>
      <p>read: ${book.read}</p>
      <p>id: ${book.id}</p>
      <div class="button-group">
        <button class="delete-book" type="button">delete book</button>
        <button class="toggle-read" type="button">read status</button>        
      </div>
      `;
    bookContainer.appendChild(articleElement);
  });
}

// Ensure displayBooks is triggered at page load too.
document.addEventListener("DOMContentLoaded", displayBooks);

const showForm = document.getElementById("add-book");

const dialog = document.querySelector(".dialog"); //Get the dialog here

// show add book form modal
if (showForm) {
  showForm.addEventListener("click", () => {
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal(); // Show the dialog as modal
    } else {
      console.error(
        "Dialog element is not found or does not have a showModal method.",
        dialog
      );
    }
  });
} else {
  console.error("'add-book' button not found.");
}

// Handle form submission
const form = document.getElementById("book-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readValue = document.getElementById("read").value  
  if (readValue !== "yes" && readValue !== "no") {
    alert("Your input for 'read' must be 'yes' or 'no'.");
    return;   
  }
  //const readBoolean = readValue === "yes"; 
  addBookToLibrary(title, author, pages, readValue/*readBoolean*/);
  dialog.close(); // Close the dialog  
});

// Delete a book from the library
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



