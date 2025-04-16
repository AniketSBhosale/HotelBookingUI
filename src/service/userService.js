import axios from "axios";

let baseUrl = "http://localhost:8080";

class UserService {
    userRegister(data) {
        return axios.post(`${baseUrl}/addUsers`, data);
    }
}

export default new UserService();
