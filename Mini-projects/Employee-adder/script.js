const addBtn = document.querySelector(".submit");
const inputs = document.querySelectorAll(".inputfield");
const addedEmployeesText = document.querySelector(".num");

const messageDiv = document.createElement("p");
const employeeList = document.createElement("div");

addedEmployeesText.after(messageDiv);
messageDiv.after(employeeList);

let employees = [];
let id = 1;

addedEmployeesText.innerText = "Added Employees (0)";

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const name = inputs[0].value.trim();
  const profession = inputs[1].value.trim();
  const age = inputs[2].value.trim();

  if (!name || !profession || !age) {
    messageDiv.innerText = "Error : Please make sure all the fields are filled";
    messageDiv.style.color = "red";
    return;
  }

  employees.push({
    id: id++,
    name,
    profession,
    age
  });

  messageDiv.innerText = "Success : Employee Added!";
  messageDiv.style.color = "green";

  inputs.forEach(input => input.value = "");

  renderEmployees();
});

function renderEmployees() {
  employeeList.innerHTML = "";
  addedEmployeesText.innerText = `Added Employees (${employees.length})`;

  employees.forEach(emp => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${emp.id}. ${emp.name} - ${emp.profession} - ${emp.age}</p>
      <button>Delete User</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      employees = employees.filter(e => e.id !== emp.id);
      renderEmployees();
    });

    employeeList.appendChild(div);
  });
}
