// File: main.js

function showPopup() {
  document.getElementById("popupForm").classList.remove("d-none");
}

function hidePopup() {
  document.getElementById("popupForm").classList.add("d-none");
  document.getElementById("employeeForm").reset();
}

function renderTable() {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";

  employees.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.address}</td>
      <td>${emp.phone}</td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !address || !phone) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Số điện thoại phải đúng 10 chữ số.");
    return;
  }

  employees.push({ name, email, address, phone });
  renderTable();
  hidePopup();
});

renderTable();
