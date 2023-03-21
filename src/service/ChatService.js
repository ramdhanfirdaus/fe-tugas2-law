import axios from "axios";

class ChatService {
    sendPrivateMessage(chatMessage) {
        return fetch('http://localhost:8080/chat', {
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
            .get("http://localhost:8080/private-chat-user/" + nama, config)
            .then((response) => {
                return(response.data)
            });
    }
}

export default new ChatService();