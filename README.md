The following code is for the constructor function and the prototype function:

The constructor function creates a Book object instance when called with `new`. The constructor function is called from the addBookToLibrary() function

```
const book = new Book(title, author, pages, read, id);
```


The `Book.prototype.toggleReadStatus()`  method is used to toggle the read status (yes / no) from the `read status` button on all book instances. This saves memory because all book instances use this method 

```
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
}

Book.prototype.toggleReadStatus = function () {
  console.log("Read status clicked");
  this.read = this.read === "yes" ? "no" : "yes";
  displayBooks();
};

```

The addBookToLibrary() function calls the constructor function to create an instance of Book, and creates a random number bookId from crypto.randomUUID() function. The new book instance together with it's **random id** are pushed to the myLibrary objects array of books,  the book-form is reset and the `displayBooks()` function is called to update the display of the library of books.

```
function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID(); // unique id for each book
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
  // Call funtion to update the display
  document.getElementById("book-form").reset();
  displayBooks();
}
```

```
document.addEventListener("click", (event) => { 
  if (event.target.classList.contains("toggle-read")) {     
    const bookArticle = event.target.closest("article");     
    if (!bookArticle) return; // Guard clause in case the article isn't found    
    const bookId = bookArticle.dataset.id;    
    const book = myLibrary.find((b)=> b.id === bookId);    
    if(book) {
      console.log("toggleReadStatus called");
      book.toggleReadStatus();      
    }
  }
});

```

The delete book and read status buttons are enclosed inside
`<div></div>` tags to display them side by side using flexbox.
The `data-id` number of the `read status` and `delete book` buttons
are in the `article tags`, so the `parent tags` are div.button group.
So to get the **id** numbers we use: 
`event.target.closest("article")`  as the `event.target.parent()` does not work

**function: displayBooks**

```
function displayBooks() {  
  const bookContainer = document.getElementById("book-container"); grab the book-container
// Clear existing book entries before re-rendering
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
      <p>id:${book.id}</p>
      <div class="button-group">
        <button class="delete-book" type="button">delete book</button>
        <button class="toggle-read" type="button">read status</button>        
      </div>
      `;
    bookContainer.appendChild(articleElement);
  });

```

The displayBooks() function uses a forEach loop to create the book data fields on the browser and fill in the data per book for all book objects in the myBooks array of objects and append each book to the books container.

```

// Ensure displayBooks is triggered at page load too.
document.addEventListener("DOMContentLoaded", displayBooks);

```

```
const showForm = document.getElementById("add-book");
//console.log("Initial 'add-book' button selection", showForm); // for completeness

```

```
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

```

```
// Handle form submission
const form = document.getElementById("book-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value  
  if (read !== "yes" && read !== "no") {
    alert("Your input for 'read' must be 'yes' or 'no'.");
    return;   
  }
  addBookToLibrary(title, author, pages, read);
  dialog.close(); // Close the dialog
  //Reset form fields after submission and hide the form
  document.getElementById("book-form").reset();
});

```

```
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

```