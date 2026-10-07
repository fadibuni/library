const myLibrary = [];


function Book(name, author, pages, isRead) {
  // the constructor...
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}


function addBookToLibrary(name, author, pages, isRead) {
  // take params, create a book then store it in the array
  const newBook = new Book(name, author, pages, isRead);
  myLibrary.push(newBook);
}


addBookToLibrary("The Hobbits", "J.K. Rolling", 300, true);
addBookToLibrary("Harry Potter", "J.K. Tolkins", 400, false);


const tbody = document.querySelector("tbody");


function populateTable() {
  tbody.innerHTML = "";
  for (const book of myLibrary) {


    const tr = document.createElement("tr");
    tr.dataset.userId = book.id;
    for (const [key, value] of Object.entries(book)) {
      if (key !== "id") {
        let t;
        if (key == "name") {
          t = document.createElement("th");
          t.scope = "row";
        } else {
          t = document.createElement("td");
        }


        if (key == "isRead") {
          t.innerText = value ? "Read" : "Not Read";
        } else {
          t.innerText = value;
        }


        tr.appendChild(t);
        //   debugger
      }
    }
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", function (e) {
      const parentContainer = e.target.closest("tr");
      const id = parentContainer.dataset.userId;
      const indexToDelete = myLibrary.findIndex((b) => b.id === id);
      myLibrary.splice(indexToDelete, 1)
      populateTable();
    });


    const toggleReadButton = document.createElement("button");
    toggleReadButton.innerText = "Toggle Read";
    toggleReadButton.addEventListener("click", function (e) {
      const parentContainer = e.target.closest("tr");
      const id = parentContainer.dataset.userId;
      const indexToToggle = myLibrary.findIndex((b) => b.id === id);
      myLibrary[indexToToggle].isRead = !myLibrary[indexToToggle].isRead
     
      populateTable();
    });
    const removeTr = document.createElement("td")
    const toggleTr = document.createElement("td")
    removeTr.appendChild(removeButton)
    toggleTr.appendChild(toggleReadButton)
    tr.appendChild(removeTr);
    tr.appendChild(toggleTr)
    tbody.appendChild(tr);
  }
}
populateTable();
const newBookForm = document.querySelector(".new-book-form");


newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value;


  addBookToLibrary(name, author, pages, read);
  populateTable();
});
