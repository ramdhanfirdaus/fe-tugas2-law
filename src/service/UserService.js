import axios from "axios";
import {BACKEND_URL} from "./Config";

class UserService {
    getAllUserPrivateChatroom() {
        const config = {
            'Content-Type': 'application/json'
        };

        return axios
            .get(BACKEND_URL + "user", config)
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
            .post(BACKEND_URL + "admin", data, config)
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