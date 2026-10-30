const STORAGE_KEY = "studentDSRecords";

const savedStudents = localStorage.getItem(STORAGE_KEY);

let students = savedStudents
  ? JSON.parse(savedStudents)
  : [
      { reg: 101, name: "Harika", marks: 85 },
      { reg: 102, name: "Ravi", marks: 78 }
    ];

if (!savedStudents) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function render() {
  const box = document.getElementById("records");

  document.getElementById("count").textContent =
    students.length + " record" + (students.length === 1 ? "" : "s");

  if (!students.length) {
    box.innerHTML =
      '<div class="empty-list">No student records. Add a student to create the first node.</div>';
    return;
  }

  box.innerHTML =
    '<div class="chain-label" style="color:#7dd3fc;font-size:11px;letter-spacing:1px;margin-bottom:4px">HEAD →</div>' +
    students
      .map(
        (s, i) =>
          `<div class="record">
            <div class="num">${s.reg}</div>
            <div>
              <b>${escapeHtml(s.name)}</b>
              <small>Registration Node ${i + 1}</small>
            </div>
            <div>
              <b>${Number(s.marks).toFixed(2)}</b>
              <small>Marks</small>
            </div>
            <div style="color:#688097">${i < students.length - 1 ? "→" : "∅"}</div>
          </div>`
      )
      .join("");
}

function addStudent() {
  const reg = Number(document.getElementById("reg").value);
  const name = document.getElementById("name").value.trim();
  const marks = Number(document.getElementById("marks").value);
  const msg = document.getElementById("message");

  if (!reg || !name || Number.isNaN(marks) || marks < 0 || marks > 100) {
    msg.textContent =
      "Please enter valid registration number, name and marks (0–100).";
    msg.style.color = "#ff9baa";
    return;
  }

  if (students.some((s) => s.reg === reg)) {
    msg.textContent = "Registration number already exists.";
    msg.style.color = "#ff9baa";
    return;
  }

  students.push({
    reg: reg,
    name: name,
    marks: marks
  });

  saveStudents();
  render();

  msg.textContent = "✓ Student node added successfully.";
  msg.style.color = "#8fe0b3";

  document.getElementById("reg").value = "";
  document.getElementById("name").value = "";
  document.getElementById("marks").value = "";
}

function searchStudent() {
  const reg = Number(document.getElementById("actionReg").value);
  const student = students.find((x) => x.reg === reg);
  const box = document.getElementById("searchResult");

  if (!reg) {
    box.textContent = "Enter a registration number.";
    box.className = "result empty";
    return;
  }

  if (student) {
    box.innerHTML =
      `<b>Student Found</b><br>` +
      `<span style="color:#91a6b8">Reg No:</span> ${student.reg} &nbsp; ` +
      `<span style="color:#91a6b8">Name:</span> ${escapeHtml(student.name)} &nbsp; ` +
      `<span style="color:#91a6b8">Marks:</span> ${Number(student.marks).toFixed(2)}`;

    box.className = "result";
  } else {
    box.textContent = "Student record not found.";
    box.className = "result empty";
  }
}

function deleteStudent() {
  const reg = Number(document.getElementById("actionReg").value);
  const index = students.findIndex((x) => x.reg === reg);
  const box = document.getElementById("searchResult");

  if (!reg) {
    box.textContent = "Enter a registration number.";
    box.className = "result empty";
    return;
  }

  if (index < 0) {
    box.textContent = "Student record not found.";
    box.className = "result empty";
    return;
  }

  const removed = students.splice(index, 1)[0];

  saveStudents();
  render();

  box.innerHTML =
    `<b>Deleted:</b> ${escapeHtml(removed.name)} (Reg No. ${removed.reg})`;

  box.className = "result";
}

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[character]
  );
}

function copyCode() {
  const text = document.getElementById("codeBox").innerText;

  navigator.clipboard
    .writeText(text)
    .then(() => alert("C source code copied!"));
}

render();
