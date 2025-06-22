import axios from "./axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchExpenses = () => axios.get("/expenses", getAuthHeaders());

export const addExpense = (expense) =>
  axios.post("/expenses", expense, getAuthHeaders());

export const deleteExpense = (id) =>
  axios.delete(`/expenses/${id}`, getAuthHeaders());
