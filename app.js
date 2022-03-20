

const addBookBtn = document.getElementById("add-book-button");

function Book(title,author,pageNum,read)  {
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.read = read ? 'book has been read' : 'not read yet'
}

Book.prototype.info = function() {
    return(`${this.title} by ${this.author}, ${this.pageNum}, ${this.read}`)
}

// Setting my library object and saving to local storage and subsequently retireving (local storage requires string)
myLibrary = JSON.parse(localStorage.getItem("savedLibrary")) || []
console.log(myLibrary)


function saveBookToMyLibrary(bookObject){
    let savedLibrary = []
    // Parse the serialized data back into an aray of objects
    savedLibrary = JSON.parse(localStorage.getItem('savedLibrary')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    savedLibrary.push(bookObject);
    // Alert the array value
    console.log(`Saved library ${savedLibrary}`);  // Should be something like ["Object" "object" etc...]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('savedLibrary', JSON.stringify(savedLibrary));

}

addBookBtn.addEventListener('click',()=>{
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pageNum = document.getElementById('pageNum').value;
    let read = document.getElementById('read').checked;
    addToBookLibrary(title, author, pageNum, read)
})


function addToBookLibrary(title, author, pageNum, read){
    let newBook = new Book(title, author, pageNum, read)
    myLibrary.push(newBook);
    saveBookToMyLibrary(newBook);
    console.log("A new book was added")
    console.log(myLibrary)
}
