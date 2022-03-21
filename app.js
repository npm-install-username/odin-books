
// initializing page
myLibrary = JSON.parse(localStorage.getItem("savedLibrary")) || [];
console.log(myLibrary);
let tableRows = document.querySelectorAll(".table-row");
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

function createTable(){
    var displayBox = document.getElementById('display-box');

    var tableDiv = document.createElement('div');
    tableDiv.className = 'table'
    tableDiv.id = 'table'

    var titleCol = document.createElement('div');
    titleCol.id = 'title-col';
    titleCol.className  = 'table-col'
    titleCol.innerText = 'Title'

    var authorCol = document.createElement('div');
    authorCol.id = 'author-col';
    authorCol.className  = 'table-col'
    authorCol.innerText = 'Author'

    var pageNumCol = document.createElement('div');
    pageNumCol.id = 'pageNum-col';
    pageNumCol.className  = 'table-col'
    pageNumCol.innerText = 'No. Pages'

    var readCol = document.createElement('div');
    readCol.id = 'read-col';
    readCol.className  = 'table-col'
    readCol.innerText = 'Read?'

    displayBox.appendChild(tableDiv)
    var tableHeader = document.createElement('div')
    tableHeader.className = 'table-header'
    tableHeader.id = 'table-header'
    tableDiv.appendChild(tableHeader)
    tableHeader.appendChild(titleCol)
    tableHeader.appendChild(authorCol)
    tableHeader.appendChild(pageNumCol)
    tableHeader.appendChild(readCol)
}

function createTableRow(myLibrary, bookObject){

    var tableRow = document.createElement('div');
    var tableCellTitle = document.createElement('div')
    tableCellTitle.className = "table-cell"
    tableCellTitle.innerText = bookObject.title

    var tableCellAuthor = document.createElement('div')
    tableCellAuthor.className = "table-cell"
    tableCellAuthor.innerText = bookObject.author

    var tableCellPageNum = document.createElement('div')
    tableCellPageNum.className = "table-cell"
    tableCellPageNum.innerText = bookObject.pageNum

    var tableCellRead = document.createElement('div')
    tableCellRead.className = "table-cell"
    tableCellRead.innerText = bookObject.read

    var bookObjectIndex = myLibrary.indexOf(bookObject);
    tableRow.className = "table-row"

    tableRow.id = "table-row" + bookObjectIndex
    tableRow.setAttribute('data-index',JSON.stringify(bookObjectIndex));
    

    var tableDiv = document.getElementById('table')
    tableDiv.appendChild(tableRow)
    tableRow.appendChild(tableCellTitle)
    tableRow.appendChild(tableCellAuthor)
    tableRow.appendChild(tableCellPageNum)
    tableRow.appendChild(tableCellRead)

    if(bookObjectIndex % 2==0){
        document.getElementById(tableRow.id).style.backgroundColor="antiquewhite"
    }
    tableRows = document.querySelectorAll('.table-row')
    for (let tableRow of tableRows){

        tableRow.addEventListener('click',()=>{
            
        
            if(isATableRowSelected(tableRows)){
                let tableRowSelected = document.querySelector('.table-row-selected');
                tableRowSelected.classList.remove('table-row-selected')
                displayOptionsOnClick(tableRow)
                return
                
                
            } else if(!isATableRowSelected(tableRows)){
                
                displayOptionsOnClick(tableRow)
                return
            }
        });
        
        document.addEventListener('click',(e)=>{
            let tableRowSelected = document.querySelector('.table-row-selected');
            
            if(isATableRowSelected(tableRows)){
                if(e.target.closest('.table-row-selected')) return;
                tableRowSelected.classList.remove('table-row-selected')
                return
            }
    
        })
    }
    
}

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
        
        var doesTableExist = !!document.getElementById('table');
        if(!doesTableExist){
            createTable()
        }
    }
    for (const bookObject of myLibrary)  {
        // decided to use this syntax of for loop as forEach does not allow use of continue keyword
        

        //console.log(`index of - ${tableRow.getAttribute('data-index',parseInt(bookObjectIndex))}`);

        var bookObjectIndex = myLibrary.indexOf(bookObject);
        var doestableRowExist = !!document.getElementById("table-row"+bookObjectIndex)
        if(doestableRowExist){
            continue;
        }
        createTableRow(myLibrary,bookObject)
        // do not declare tableRows using let or var keyword so as to overwrite the global variable
    };
    
}

function displayOptionsOnClick(tableRow){

    let tableRowIndex = tableRow.getAttribute('data-index');
    let tableRowSelected = document.getElementById('table-row'+tableRowIndex)
    
    tableRowSelected.classList.add('table-row-selected')
    console.log(`Updated class on table row ${tableRowIndex}`)
    
}

function isATableRowSelected(tableRows){
    for (let tableRow of tableRows){
         
        if (tableRow.classList.contains('table-row-selected')){
            return true
        }
    }
    return false
    
}


for (let tableRow of tableRows){

    tableRow.addEventListener('click',()=>{
        
    
        if(isATableRowSelected(tableRows)){
            let tableRowSelected = document.querySelector('.table-row-selected');
            tableRowSelected.classList.remove('table-row-selected')
            displayOptionsOnClick(tableRow)
            return
            
            
        } else if(!isATableRowSelected(tableRows)){
            
            displayOptionsOnClick(tableRow)
            return
        }
    });
    
    document.addEventListener('click',(e)=>{
        let tableRowSelected = document.querySelector('.table-row-selected');
        
        if(isATableRowSelected(tableRows)){
            if(e.target.closest('.table-row-selected')) return;
            tableRowSelected.classList.remove('table-row-selected')
            return
        }

    })
}


