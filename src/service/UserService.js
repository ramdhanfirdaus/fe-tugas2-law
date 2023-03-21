import axios from "axios";

class UserService {
    getAllUserPrivateChatroom() {
        const config = {
            'Content-Type': 'application/json'
        };

        return axios
            .get("http://localhost:8080/user", config)
            .then((response) => {
                return(response.data)
            });
    }

    postPasswordAdmin(password) {
        const config = {
            'Content-Type': 'application/json'
        };

        const data = {
            'password' : password
        }

        return axios
            .post("http://localhost:8080/admin", data, config)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data))
                return(response.data)
            });
    }

    logout() {
        localStorage.clear("user")
    }
}

export default new UserService();