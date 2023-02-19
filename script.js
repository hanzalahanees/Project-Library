const addBook = document.querySelector(".addBook");
const closeBookForm = document.querySelector('.close');
const submitForm = document.querySelector(".submit");


addBook.addEventListener("click", addNewBook);
closeBookForm.addEventListener("click", closeForm);
submitForm.addEventListener("click", handleFormInput);

let myLibrary = [];

addBookToLibrary("The Principles of Object-Oriented JavaScript", "Nicholas C. Zakas", 122, "on");
addBookToLibrary("Eloquent JavaScript", "Marijn Haverbeke", 472, "off");
displayCurrentBooks();

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}
function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

function displayCurrentBooks() {
  myLibrary.forEach((element) => createBookCard(element));
}

function createBookCard(newBook) {
  //creates Card div and sets up the data-array attribute to hold the location of the book in the myLibrary array
  const myCardNode = document.createElement("div");
  myCardNode.className = "bookCard";
  myCardNode.setAttribute("data-array", myLibrary.indexOf(newBook)); //sets data-array attribute for each book to the index it is in the myLibrary array;
  document.querySelector(".cardContainer").appendChild(myCardNode);

  //adds the x button to corder of card
  addXButton(myCardNode);

  //creates Divs for the title, author, pages;
  for (prop in newBook) {
    let myDivNode = document.createElement("div");
    if (prop === "title" || prop === "author" || prop === "pages") {
      myDivNode.className = prop;
      myDivNode.textContent = newBook[prop];
      document
        .querySelector(`[data-array="${myLibrary.indexOf(newBook)}"]`)
        .appendChild(myDivNode);
    }
    if (prop === "pages") {
      myDivNode.textContent += " pages";
    }
    if (prop === "readStatus") {
      let myButtonNode = document.createElement("button");
      myButtonNode.className =
        newBook[prop] === "on" ? "read-book" : "not-read-book";
      myButtonNode.textContent = newBook[prop] === "on" ? "✓ Read" : "X Not Read";
      document
        .querySelector(`[data-array="${myLibrary.indexOf(newBook)}"]`)
        .appendChild(myButtonNode);
      myButtonNode.addEventListener("click", toggleRead);
    }
  }
}

function addXButton(myCardNode) {
  const myImg = document.createElement("img");
  myImg.src = "xbutton.png";
  myImg.className = "x-button";
  myCardNode.appendChild(myImg);
  myImg.addEventListener("click", removeBook);
}

function removeBook(e) {
  const bookToRemove = myLibrary[e.target.parentElement.dataset.array];
  let j = 0;

  //actually removes the object from myLibrary
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i] !== bookToRemove) {
      //removes the object from myLibrary and shifts other books down 1 index.
      myLibrary[j] = myLibrary[i];
      document
        .querySelector(`[data-array="${i}"]`)
        .setAttribute("data-array", j); //updates Div values so they still correspond to the index of myLibrary
      j++;
    }
  }

  //removes just the card from showing
  document.querySelector(".cardContainer").removeChild(e.target.parentElement);

  myLibrary.pop(); //remove last element from array because it will end up repeating the last element twice
}

function toggleRead(e) {
  //toggle the visuals of the button of the book card
  e.target.textContent =
    e.target.className === "read-book" ? "X Not Read" : "✓ Read";
  e.target.className =
    e.target.className === "read-book" ? "not-read-book" : "read-book";

  //toggle whether the book in the library is read or not
  const bookIndex = e.target.parentElement.getAttribute("data-array");
  myLibrary[bookIndex].readStatus =
    myLibrary[bookIndex].readStatus === "on" ? "off" : "on";
}

function handleFormInput(e) {
  const myForm = e.target.form;
  //check if the form fields are all filled
  if (
    !myForm.title.validity.valueMissing &&
    !myForm.author.validity.valueMissing &&
    !myForm.pages.validity.valueMissing
  ) {
    addBookToLibrary(
      myForm.title.value,
      myForm.author.value,
      myForm.pages.value,
      myForm.readStatus.value
    );

    closeForm();
    clearForm(myForm);
    createBookCard(myLibrary[myLibrary.length - 1]); //Creates book card for the book we just added to array which would be the last one, hence length - 1;
  }
}

function addNewBook() {
  document.getElementById('addBookForm').style.display = "block";
}

function closeForm() {
  document.getElementById('addBookForm').style.display = "none";
}

//clears the stuff you entered into the form if you submitted it
function clearForm(myForm) {
  myForm.title.value = "";
  myForm.author.value = "";
  myForm.pages.value = "";
  myForm.readStatus.value = "off";
}