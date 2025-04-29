const myLibrary = [{
  title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: "no", id: "fb9d7b37-1322-4493-b149-351b554a9574"
  },
  {
  title: "The Legend", author: "D.H. Smith", pages: 395, read: "yes", id: "3564e844-8549-4814-b009-3ad445c218c5"
  },
  {
  title: "The Rocket", author: "R.L. Brown", pages: 274, read: "no", id: "af7278bc-9809-42bc-93c9-bc7765344378"
  },
  {
  title: "The Lost Planet", author: "M.S. Jones", pages: 382, read: "yes", id: "75102e01-41ec-4966-85d9-7a93bf3d0af3"
  },];

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

    this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages}, ${this.read}, ${this.id}`;
    }
}

function addBookToLibrary( title, author, pages, read )  {
    
    const id = crypto.randomUUID();  // unique id for each book  
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    console.log(book);
} 

const form = document.getElementById('bookForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    document.getElementById("bookForm").reset();  
    addBookToLibrary(title, author, pages, read); 
});


console.log(myLibrary);

