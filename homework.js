// DOM Elements
const subjectInput = document.getElementById("subject-input");
const assignmentInput = document.getElementById("assignment-input");
const dueDateInput = document.getElementById("due-date-input");
const homeworkList = document.getElementById("homework-list");
const addHomeworkBtn = document.getElementById("add-homework-btn");

// Load homework data from localStorage (or Firebase)
function loadHomework() {
  let homeworkData = localStorage.getItem("homeworkData");
  if (homeworkData) {
    homeworkData = JSON.parse(homeworkData);
    displayHomework(homeworkData);
  }
}

// Display homework list with spacing and formatting
function displayHomework(homeworkData) {
  homeworkList.innerHTML = ""; // Clear previous entries

  homeworkData.forEach((item, index) => {
    const homeworkItem = document.createElement("li");
    homeworkItem.classList.add("homework-item");

    // Structuring the data
    homeworkItem.innerHTML = `
      <div class="homework-content">
        <span class="subject">${item.subject}</span>
        <span class="assignment"> - ${item.assignment}</span>
        <span class="due-date">(Due: ${item.dueDate})</span>
      </div>
      <button class="delete-btn" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
    `;

    homeworkList.appendChild(homeworkItem);
  });

  // Attach delete event listeners
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", deleteHomework);
  });
}

// Add new homework entry
function addHomework() {
  const subject = subjectInput.value.trim();
  const assignment = assignmentInput.value.trim();
  const dueDate = dueDateInput.value.trim();

  if (subject && assignment && dueDate) {
    let homeworkData = localStorage.getItem("homeworkData");
    homeworkData = homeworkData ? JSON.parse(homeworkData) : [];

    // Prevent duplicate entries
    const exists = homeworkData.some(item => item.subject === subject && item.assignment === assignment && item.dueDate === dueDate);
    
    if (!exists) {
      homeworkData.push({ subject, assignment, dueDate });
      localStorage.setItem("homeworkData", JSON.stringify(homeworkData));
      loadHomework(); // Refresh the list
    } else {
      alert("This homework entry already exists.");
    }
  } else {
    alert("Please fill out all fields.");
  }
}

// Delete homework entry
function deleteHomework(event) {
  let homeworkData = JSON.parse(localStorage.getItem("homeworkData"));
  const index = event.target.closest(".delete-btn").dataset.index;
  homeworkData.splice(index, 1);
  localStorage.setItem("homeworkData", JSON.stringify(homeworkData));
  loadHomework();
}

// Event listener for adding homework
addHomeworkBtn.addEventListener("click", addHomework);

// Initial load of homework data
loadHomework();
