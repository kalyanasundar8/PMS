import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const userSignup = (data) => {
  try {
    const response = api.post("/users/signup", data);
    return response;
  } catch (error) {
    if (error) {
      throw error.response;
    } else {
      throw new Error(error.message);
    }
  }
};

export const userSignin = (data) => {
  try {
    const response = api.post("/users/signin", data);
    return response;
  } catch (error) {
    if (error) {
      throw error.response;
    } else {
      throw new Error(error.message);
    }
  }
};

export const userProfile = (data) => {
  try {
    const response = api.post("/users/profile", data);
    return response;
  } catch (error) {
    if (error) {
      throw error.response;
    } else {
      throw new Error(error.message);
    }
  }
};