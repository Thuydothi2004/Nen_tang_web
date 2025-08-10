import React, { useState } from "react";

interface SinhVien {
  hoTen: string;
  email: string;
  sdt: string;
}

const StudentManager: React.FC = () => {
  const [form, setForm] = useState<SinhVien>({ hoTen: "", email: "", sdt: "" });
  const [students, setStudents] = useState<SinhVien[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "danger" } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (sdt: string): boolean => {
    const phoneRegex = /^(0[0-9]{9})$/;
    return phoneRegex.test(sdt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.hoTen || !form.email || !form.sdt) {
      setAlert({ message: "Vui lòng điền đầy đủ thông tin.", type: "danger" });
      return;
    }

    if (!isEmailValid(form.email)) {
      setAlert({ message: "Email không hợp lệ.", type: "danger" });
      return;
    }

    if (!isPhoneNumberValid(form.sdt)) {
      setAlert({ message: "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.", type: "danger" });
      return;
    }

    if (editingIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editingIndex] = form;
      setStudents(updatedStudents);
      setAlert({ message: "Cập nhật sinh viên thành công!", type: "success" });
      setEditingIndex(null);
    } else {
      setStudents([...students, form]);
      setAlert({ message: "Thêm sinh viên thành công!", type: "success" });
    }

    setForm({ hoTen: "", email: "", sdt: "" });

    setTimeout(() => setAlert(null), 3000);
  };

  const handleEdit = (index: number) => {
    const studentToEdit = students[index];
    if (studentToEdit) {
      setForm(studentToEdit);
      setEditingIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setAlert({ message: "Không tìm thấy sinh viên để sửa!", type: "danger" });
    }
  };

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?");
    if (confirmDelete) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
      setAlert({ message: "Xóa sinh viên thành công!", type: "success" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center text-primary mb-4 font-weight-bold">
        Quản lý sinh viên
      </h2>

      {alert && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}

      {/* FORM NHẬP */}
      <div className="card shadow p-4 mb-5 border-0">
        <h4 className="mb-3 text-secondary border-bottom pb-2">
          Thông tin sinh viên
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ tên:</label>
            <input
              type="text"
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              className="form-control"
              placeholder="Nhập họ tên"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Nhập email"
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="sdt"
              value={form.sdt}
              onChange={handleChange}
              className="form-control"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <button type="submit" className="btn btn-success mt-2">
            {editingIndex !== null ? "Cập nhật" : "Thêm"}
          </button>
        </form>
      </div>

      {/* DANH SÁCH SINH VIÊN */}
      <div className="card shadow p-4 border-0">
        <h4 className="mb-3 text-secondary border-bottom pb-2">
          Danh sách sinh viên
        </h4>
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-muted">
                    Chưa có sinh viên nào.
                  </td>
                </tr>
              ) : (
                students.map((sv, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sv.hoTen}</td>
                    <td>{sv.email}</td>
                    <td>{sv.sdt}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info mr-2"
                        onClick={() => handleEdit(index)}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManager;
