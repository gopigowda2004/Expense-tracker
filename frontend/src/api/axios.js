import axios from "axios";

const BASE_URL = "http://localhost:8080/api"; // make sure this matches your Spring Boot base path

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
