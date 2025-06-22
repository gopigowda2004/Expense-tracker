import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState({
    title: "",
    amount: "",
    date: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      alert("Error fetching expenses. Please log in again.");
      console.error(err);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/expenses",
        { title, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setAmount("");
      fetchExpenses();
    } catch (err) {
      alert("Failed to add expense");
      console.error(err);
    }
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditingExpense({
      title: expense.title,
      amount: expense.amount,
      date: expense.date?.substring(0, 10) || "",
    });
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/expenses/${editingId}`,
        editingExpense,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditingExpense({ title: "", amount: "", date: "" });
      fetchExpenses();
    } catch (err) {
      alert("Failed to update expense");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (err) {
      alert("Failed to delete expense");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Expense Dashboard</h3>
      <form onSubmit={editingId ? handleUpdateExpense : handleAddExpense} className="mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={editingId ? editingExpense.title : title}
              onChange={(e) =>
                editingId
                  ? setEditingExpense({ ...editingExpense, title: e.target.value })
                  : setTitle(e.target.value)
              }
              required
            />
          </div>
          <div className="col-auto">
            <input
              type="number"
              placeholder="Amount"
              className="form-control"
              value={editingId ? editingExpense.amount : amount}
              onChange={(e) =>
                editingId
                  ? setEditingExpense({ ...editingExpense, amount: e.target.value })
                  : setAmount(e.target.value)
              }
              required
            />
          </div>
          <div className="col-auto">
            <input
              type="date"
              className="form-control"
              value={editingId ? editingExpense.date : ""}
              onChange={(e) =>
                editingId
                  ? setEditingExpense({ ...editingExpense, date: e.target.value })
                  : null
              }
              required={!!editingId}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary me-2">
              {editingId ? "Update Expense" : "Add Expense"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setEditingExpense({ title: "", amount: "", date: "" });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Amount (₹)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>{expense.amount}</td>
              <td>{expense.date?.substring(0, 10)}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => startEdit(expense)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {expenses.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseDashboard;
