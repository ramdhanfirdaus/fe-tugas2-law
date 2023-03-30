import axios from "axios";
import {BACKEND_URL} from "./Config";

class ChatService {
    sendPrivateMessage(chatMessage) {
        return fetch(BACKEND_URL + "/chat", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(chatMessage),
        });
    }

    getPrivateChatByUser(nama) {
        const config = {
            'Content-Type': 'application/json'
        };

        return axios
            .get(BACKEND_URL + "/private-chat-user/" + nama, config)
            .then((response) => {
                return(response.data)
            });
    }
}

export default new ChatService();