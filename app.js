
// initializing page
myLibrary = JSON.parse(localStorage.getItem("savedLibrary")) || [];
console.log(myLibrary);
showMyLibrary(myLibrary);

const addBookBtn = document.getElementById("add-book-button");

function Book(title,author,pageNum,read)  {
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.read = read ? 'book has been read' : 'not read yet'
}

Book.prototype.info = function() {
    return(`${this.title} by ${this.author}, ${this.pageNum}, ${this.read}`)
};



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

};

addBookBtn.addEventListener('click',()=>{
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pageNum = document.getElementById('pageNum').value;
    let read = document.getElementById('read').checked;
    
    addToBookLibrary(title, author, pageNum, read)
});


function addToBookLibrary(title, author, pageNum, read){
    let newBook = new Book(title, author, pageNum, read)
    myLibrary.push(newBook);
    saveBookToMyLibrary(newBook);
    console.log("A new book was added")
    console.log(myLibrary)
    showMyLibrary(myLibrary)
};

function showMyLibrary(myLibrary){
    
    var displayBox = document.getElementById('display-box');
    
    if(myLibrary.length === 0){
        var noBooksFound = document.createElement('h2')
        noBooksFound.id = "no-books-found"
        noBooksFound.innerHTML = "No Books Found"
        return displayBox.appendChild(noBooksFound)
    } else{
        //!! operator returns boolean value
        var noBooksFoundExists = !!document.getElementById('no-books-found')
        if(noBooksFoundExists){
            var noBooksFound = document.getElementById("no-books-found");
            noBooksFound.remove()
        }
    }
    for (const bookObject of myLibrary)  {
        // decided to use this syntax of for loop as forEach does not allow use of continue keyword
        var displayBoxBookRow = document.createElement('div')
        displayBoxBookRow.className = "display-box-book-row"
        displayBoxBookRow.id = "display-box-book-row" + myLibrary.indexOf(bookObject)
        var doesDisplayBoxBookRowExist = !!document.getElementById("display-box-book-row"+myLibrary.indexOf(bookObject))
        if(doesDisplayBoxBookRowExist){
            continue;
        }
        displayBoxBookRow.innerText = JSON.stringify(bookObject);
        displayBox.appendChild(displayBoxBookRow)
        
    };
}