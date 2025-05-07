import axios from "axios";

const API_URL = "http://localhost:8080"; // Make sure this matches your backend port

const userService = {
  userRegister: (userData) => axios.post(`${API_URL}/addUsers`, userData),
  userLogin: (loginData) => axios.post(`${API_URL}/loginUser`, loginData),
};

export default userService;
 