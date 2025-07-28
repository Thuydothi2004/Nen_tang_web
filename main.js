// main.js

$(document).ready(function () {
  loadTable();

  $("#addEmployeeModal form").submit(function (e) {
    e.preventDefault();
    const newEmployee = {
      id: Date.now(), 
      name: $(this).find("input[type='text']").eq(0).val(),
      email: $(this).find("input[type='email']").val(),
      address: $(this).find("textarea").val(),
      phone: $(this).find("input[type='text']").eq(1).val()
    };
    employees.push(newEmployee);
    $('#addEmployeeModal').modal('hide');
    this.reset();
    loadTable();
  });

  $("#editEmployeeModal form").submit(function (e) {
    e.preventDefault();
    const id = $("#editEmployeeModal").data("id");
    const index = employees.findIndex(emp => emp.id === id);
    employees[index].name = $(this).find("input[type='text']").eq(0).val();
    employees[index].email = $(this).find("input[type='email']").val();
    employees[index].address = $(this).find("textarea").val();
    employees[index].phone = $(this).find("input[type='text']").eq(1).val();
    $('#editEmployeeModal').modal('hide');
    loadTable();
  });

  $(document).on("click", ".edit", function () {
    const id = $(this).data("id");
    const employee = employees.find(emp => emp.id === id);
    const modal = $("#editEmployeeModal");
    modal.data("id", id);
    modal.find("input[type='text']").eq(0).val(employee.name);
    modal.find("input[type='email']").val(employee.email);
    modal.find("textarea").val(employee.address);
    modal.find("input[type='text']").eq(1).val(employee.phone);
  });

  $("#deleteEmployeeModal form").submit(function (e) {
    e.preventDefault();
    $('table tbody input[type="checkbox"]:checked').each(function () {
      const row = $(this).closest("tr");
      const name = row.find("td").eq(1).text();
      employees = employees.filter(emp => emp.name !== name);
    });
    $('#deleteEmployeeModal').modal('hide');
    loadTable();
  });
});

function loadTable() {
  const tbody = $("table tbody");
  tbody.html("");
  employees.forEach((emp, index) => {
    tbody.append(`
      <tr>
        <td>
          <span class="custom-checkbox">
            <input type="checkbox" id="checkbox${index}" name="options[]" value="${emp.id}">
            <label for="checkbox${index}"></label>
          </span>
        </td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.address}</td>
        <td>${emp.phone}</td>
        <td>
          <a href="#editEmployeeModal" class="edit" data-toggle="modal" data-id="${emp.id}"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
          <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        </td>
      </tr>
    `);
  });
}
