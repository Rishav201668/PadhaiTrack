// DOM Elements
const subjectInput = document.getElementById('subject-input');
const examDateInput = document.getElementById('exam-date-input');
const addExamBtn = document.getElementById('add-exam-btn');
const examList = document.getElementById('exam-list');

// Array to store exams
let exams = [];

// Load saved exams from localStorage
function loadExams() {
    const savedExams = localStorage.getItem('exams');
    if (savedExams) {
        exams = JSON.parse(savedExams);
        renderExams();
    }
}

// Render exams to the list
function renderExams() {
    examList.innerHTML = ''; // Clear existing exams
    exams.forEach((exam, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${exam.subject}</strong> - ${exam.date}</span>
            <button class="delete-btn" onclick="deleteExam(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        examList.appendChild(li);
    });
}

// Add new exam to the list
function addExam() {
    const subject = subjectInput.value.trim();
    const examDate = examDateInput.value.trim();

    if (subject && examDate) {
        const newExam = {
            subject: subject,
            date: examDate,
        };
        
        exams.push(newExam);
        localStorage.setItem('exams', JSON.stringify(exams)); // Save exams to localStorage
        renderExams();

        // Clear inputs after adding
        subjectInput.value = '';
        examDateInput.value = '';
    } else {
        alert('Please enter both subject and exam date.');
    }
}

// Delete exam from the list
function deleteExam(index) {
    exams.splice(index, 1);
    localStorage.setItem('exams', JSON.stringify(exams)); // Save updated exams
    renderExams();
}

// Event Listener for Add Exam Button
addExamBtn.addEventListener('click', addExam);

// Load exams when page loads
window.onload = loadExams;
