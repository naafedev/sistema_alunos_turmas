// This file contains the JavaScript code for the Student Management System

// Database connection
// TODO: Replace this with actual database connection and queries
const fakeDatabase = {
    students: [
        { id: 1, name: "Nathan Ferreira", grades: [85, 90, 78], attendance: 95 },
        { id: 2, name: "Eduardo Kern", grades: [92, 88, 95], attendance: 98 },
        { id: 3, name: "Lauro Carvalho", grades: [78, 82, 80], attendance: 92 },
        { id: 4, name: "Cristopher Baroni", grades: [95, 91, 93], attendance: 97 },
        { id: 5, name: "Aragon Yuri", grades: [92, 97, 85], attendance: 97 },
    ],
    classes: [
        { id: 1, name: "Matemática - 101", students: [1, 2, 3], averageGrade: 88 },
        { id: 2, name: "História - 201", students: [1, 4, 5], averageGrade: 89 },
        { id: 3, name: "Ciência - 301", students: [2, 3, 4], averageGrade: 90 },
    ]
};

// DOM Elements
const viewStudentsBtn = document.getElementById('viewStudents');
const viewClassesBtn = document.getElementById('viewClasses');
const studentSection = document.getElementById('studentSection');
const classSection = document.getElementById('classSection');
const studentSelect = document.getElementById('studentSelect');
const classSelect = document.getElementById('classSelect');
const studentInfo = document.getElementById('studentInfo');
const classInfo = document.getElementById('classInfo');
const studentSearch = document.getElementById('studentSearch');
const searchButton = document.getElementById('searchButton');

// Event Listeners
viewStudentsBtn.addEventListener('click', showStudentSection);
viewClassesBtn.addEventListener('click', showClassSection);
studentSelect.addEventListener('change', displayStudentInfo);
classSelect.addEventListener('change', displayClassInfo);
searchButton.addEventListener('click', searchStudents);
studentSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchStudents();
    }
});

// Functions
function showStudentSection() {
    studentSection.classList.remove('hidden');
    classSection.classList.add('hidden');
    populateStudentSelect();
}

function showClassSection() {
    classSection.classList.remove('hidden');
    studentSection.classList.add('hidden');
    populateClassSelect();
}

function populateStudentSelect() {
    // TODO: Fetch students from database
    const students = fakeDatabase.students;
    
    studentSelect.innerHTML = '<option value="">Selecione o(a) aluno(a)</option>';
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    });
}

function populateClassSelect() {
    // TODO: Fetch classes from database
    const classes = fakeDatabase.classes;
    
    classSelect.innerHTML = '<option value="">Selecione a turma</option>';
    classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.id;
        option.textContent = cls.name;
        classSelect.appendChild(option);
    });
}

function displayStudentInfo(studentId) {
    if (typeof studentId !== 'number') {
        studentId = parseInt(studentSelect.value);
    }
    if (!studentId) {
        studentInfo.innerHTML = '';
        return;
    }

    // TODO: Fetch student info from database
    const student = fakeDatabase.students.find(s => s.id === studentId);
    
    if (student) {
        const averageGrade = student.grades.reduce((a, b) => a + b, 0) / student.grades.length;
        studentInfo.innerHTML = `
            <h3>${student.name}</h3>
            <p>Grades: ${student.grades.join(', ')}</p>
            <p>Average Grade: ${averageGrade.toFixed(2)}</p>
            <p>Attendance: ${student.attendance}%</p>
        `;
        studentSelect.value = student.id;
    } else {
        studentInfo.innerHTML = '<p>Student not found</p>';
    }
}

function displayClassInfo() {
    const classId = parseInt(classSelect.value);
    if (!classId) {
        classInfo.innerHTML = '';
        return;
    }

    // TODO: Fetch class info from database
    const cls = fakeDatabase.classes.find(c => c.id === classId);
    
    if (cls) {
        const studentNames = cls.students.map(studentId => {
            const student = fakeDatabase.students.find(s => s.id === studentId);
            return student ? student.name : 'Unknown';
        });

        classInfo.innerHTML = `
            <h3>${cls.name}</h3>
            <p>Students: ${studentNames.join(', ')}</p>
            <p>Average Grade: ${cls.averageGrade.toFixed(2)}</p>
        `;
    } else {
        classInfo.innerHTML = '<p>Class not found</p>';
    }
}

function searchStudents() {
    const searchTerm = studentSearch.value.toLowerCase();
    const matchingStudents = fakeDatabase.students.filter(student => 
        student.name.toLowerCase().includes(searchTerm)
    );

    if (matchingStudents.length > 0) {
        if (matchingStudents.length === 1) {
            displayStudentInfo(matchingStudents[0].id);
        } else {
            studentSelect.innerHTML = '<option value="">Selecione o(a) aluno(a)</option>';
            matchingStudents.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.name;
                studentSelect.appendChild(option);
            });
            studentInfo.innerHTML = '<p>Mais de um aluno com este nome, selecione no menu.</p>';
        }
    } else {
        studentInfo.innerHTML = '<p>Nenhum aluno(a) encontrado(a).</p>';
    }
}

// Initialize the page
showStudentSection();