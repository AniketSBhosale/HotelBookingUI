import axios from "axios";

const baseUrl = "http://localhost:8080";

class CustomerService {
  userRegister(data) {
    return axios.post(`${baseUrl}/addCustomer`, data);
  }
}

export default new CustomerService;
