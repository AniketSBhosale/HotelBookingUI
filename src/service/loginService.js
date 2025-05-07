import axios from "axios";

const baseUrl = "http://localhost:8080";

class loginService {
  userLogin(data) {
    return axios.post(`${baseUrl}/UserLogin`, data);
  }
}

export default new loginService;
