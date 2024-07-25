import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const addIncome = (payload) => {
  try {
    const response = api.post("/incomes/addIncome", payload);
    return response;
  } catch (error) {
    if (error) {
      throw error.response;
    } else {
      throw new Error(error.message);
    }
  }
};
