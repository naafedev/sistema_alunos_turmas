// This file contains the JavaScript code for the Student Management System

// Database connection
// TODO: Replace this with actual database connection and queries
const fakeDatabase = {
    students: [
        { 
            id: 1, 
            nome: "Nathan Ferreira", 
            matematica: { semestre1: 85, semestre2: 90, media: 87.5 },
            portugues: { semestre1: 78, semestre2: 82, media: 80 },
            historia: { semestre1: 88, semestre2: 92, media: 90 }
        },
        { 
            id: 2, 
            nome: "Eduardo Kern", 
            matematica: { semestre1: 92, semestre2: 88, media: 90 },
            portugues: { semestre1: 85, semestre2: 89, media: 87 },
            historia: { semestre1: 90, semestre2: 94, media: 92 }
        },
        { 
            id: 3, 
            nome: "Lauro Carvalho", 
            matematica: { semestre1: 78, semestre2: 82, media: 80 },
            portugues: { semestre1: 80, semestre2: 84, media: 82 },
            historia: { semestre1: 76, semestre2: 80, media: 78 }
        },
        { 
            id: 4, 
            nome: "Cristopher Baroni", 
            matematica: { semestre1: 95, semestre2: 93, media: 94 },
            portugues: { semestre1: 88, semestre2: 92, media: 90 },
            historia: { semestre1: 91, semestre2: 95, media: 93 }
        },
        { 
            id: 5, 
            nome: "Aragon Yuri", 
            matematica: { semestre1: 89, semestre2: 93, media: 91 },
            portugues: { semestre1: 92, semestre2: 96, media: 94 },
            historia: { semestre1: 87, semestre2: 91, media: 89 }
        },
    ],
    classes: [
        { 
            id: 1, 
            name: "Matemática - 101", 
            students: [1, 2, 3],
            notas: {
                semestre1: { 1: 85, 2: 92, 3: 78 },
                semestre2: { 1: 90, 2: 88, 3: 82 },
                medias: { 1: 87.5, 2: 90, 3: 80 }
            }
        },
        { 
            id: 2, 
            name: "Português - 201", 
            students: [1, 4, 5],
            notas: {
                semestre1: { 1: 78, 4: 88, 5: 92 },
                semestre2: { 1: 82, 4: 92, 5: 96 },
                medias: { 1: 80, 4: 90, 5: 94 }
            }
        },
        { 
            id: 3, 
            name: "História - 301", 
            students: [2, 3, 4],
            notas: {
                semestre1: { 2: 90, 3: 76, 4: 91 },
                semestre2: { 2: 94, 3: 80, 4: 95 },
                medias: { 2: 92, 3: 78, 4: 93 }
            }
        },
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
        option.textContent = student.nome;
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
        const overallAverage = (student.matematica.media + student.portugues.media + student.historia.media) / 3;
        studentInfo.innerHTML = `
            <h3>${student.nome}</h3>
            <h4>Matemática</h4>
            <p>Semestre 1: ${student.matematica.semestre1}</p>
            <p>Semestre 2: ${student.matematica.semestre2}</p>
            <p>Média: ${student.matematica.media.toFixed(2)}</p>
            <h4>Português</h4>
            <p>Semestre 1: ${student.portugues.semestre1}</p>
            <p>Semestre 2: ${student.portugues.semestre2}</p>
            <p>Média: ${student.portugues.media.toFixed(2)}</p>
            <h4>História</h4>
            <p>Semestre 1: ${student.historia.semestre1}</p>
            <p>Semestre 2: ${student.historia.semestre2}</p>
            <p>Média: ${student.historia.media.toFixed(2)}</p>
            <h4>Média Geral: ${overallAverage.toFixed(2)}</h4>
        `;
        studentSelect.value = student.id;
    } else {
        studentInfo.innerHTML = '<p>Aluno não encontrado</p>';
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
        let studentInfoHTML = '';
        cls.students.forEach(studentId => {
            const student = fakeDatabase.students.find(s => s.id === studentId);
            if (student) {
                studentInfoHTML += `
                    <h4>${student.nome}</h4>
                    <p>Semestre 1: ${cls.notas.semestre1[studentId]}</p>
                    <p>Semestre 2: ${cls.notas.semestre2[studentId]}</p>
                    <p>Média: ${cls.notas.medias[studentId].toFixed(2)}</p>
                `;
            }
        });

        const classAverage = Object.values(cls.notas.medias).reduce((sum, grade) => sum + grade, 0) / cls.students.length;

        classInfo.innerHTML = `
            <h3>${cls.name}</h3>
            <h4>Informações dos Alunos:</h4>
            ${studentInfoHTML}
            <h4>Média da Turma: ${classAverage.toFixed(2)}</h4>
        `;
    } else {
        classInfo.innerHTML = '<p>Turma não encontrada</p>';
    }
}

function searchStudents() {
    const searchTerm = studentSearch.value.toLowerCase();
    const matchingStudents = fakeDatabase.students.filter(student => 
        student.nome.toLowerCase().includes(searchTerm)
    );

    if (matchingStudents.length > 0) {
        if (matchingStudents.length === 1) {
            displayStudentInfo(matchingStudents[0].id);
        } else {
            studentSelect.innerHTML = '<option value="">Selecione o(a) aluno(a)</option>';
            matchingStudents.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.nome;
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
