const box = document.querySelector(".box");
const overlay = document.querySelector(".overlay");

const add = document.querySelector(".add");
add.addEventListener("click", function () {
    overlay.style.display = "block";
    box.style.display = "block";
});

const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", function (event) {
    event.preventDefault();
    box.style.display = "none";
    overlay.style.display = "none";
});

const content = document.querySelector(".container");
const title = document.querySelector("#input");
const text = document.querySelector("#text");
const addmain = document.querySelector(".addmain");

// Function to load notes from local storage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => {
        addNoteToDOM(note.title, note.text);
    });
}

// Function to add a note to the DOM
function addNoteToDOM(titleText, textContent) {
    const div = document.createElement("div");
    div.setAttribute("class", "content");
    div.innerHTML = `
        <h2 class="heading">${titleText}</h2>
        <p class="para">${textContent}</p>
        <button class="del">Delete</button>`;
    
    content.appendChild(div);
}

// Function to save notes to local storage
function saveNotesToLocalStorage() {
    const notes = [];
    const noteElements = document.querySelectorAll(".content");
    noteElements.forEach(noteElement => {
        const heading = noteElement.querySelector(".heading").innerText;
        const para = noteElement.querySelector(".para").innerText;
        notes.push({ title: heading, text: para });
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

addmain.addEventListener("click", function (event) {
    event.preventDefault();

    // Check if title or text is empty
    if (title.value.trim() === '' || text.value.trim() === '') {
        alert('Please enter both a title and a note.'); // Show an alert if empty
        return; // Exit the function early
    }
    
    // Add note to the DOM and local storage
    addNoteToDOM(title.value, text.value);
    saveNotesToLocalStorage();

    // Clear input fields after adding
    title.value = '';
    text.value = '';
});

// Add delete functionality to existing notes, including default note
content.addEventListener("click", function(event) {
    if (event.target.classList.contains("del")) {
        const noteToDelete = event.target.parentElement; // Get the parent div of the button
        content.removeChild(noteToDelete); // Remove the note
        saveNotesToLocalStorage(); // Update local storage after deletion
    }
});

// Load notes on page load
loadNotes();

// Add delete functionality for the default note in HTML
document.querySelectorAll(".del").forEach(button => {
    button.addEventListener("click", function() {
        const noteToDelete = button.parentElement; // Get the parent div of the button
        content.removeChild(noteToDelete); // Remove the note
        saveNotesToLocalStorage(); // Update local storage after deletion
    });
});
