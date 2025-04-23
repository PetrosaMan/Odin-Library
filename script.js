const myLibrary = [];

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
    console.log(book.info());
} 

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not yet");
//console.log(myLibrary);
