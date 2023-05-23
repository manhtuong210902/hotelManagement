import axios from "axios";
import { useEffect, useState } from "react";
import { SendFill } from "react-bootstrap-icons";
import { API_URL } from "../../utils/constants";
import MessageRight from "./MessageRight";
import MessageLeft from "./MessageLeft";
import socket from "../../config/socket";

function ChatFrame({ idChat }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            if (idChat) {
                const result = await axios.get(`${API_URL}/chats/messages/${idChat}`);
                setMessages(result.data.messages);
            }
        };

        fetchApi();
    }, [idChat]);

    useEffect(() => {
        const handleNewMessages = ({ userId, message }) => {
            if (userId === idChat) {
                setMessages((prev) => [...prev, message]);
            }
        };

        socket.on("message", handleNewMessages);

        return () => {
            socket.off("message", handleNewMessages);
        };
    }, [idChat]);

    const handleAddMessage = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${API_URL}/chats/add`, {
            idUser: idChat,
            text: text,
            role: true,
        });
        socket.emit("message", { userId: idChat, message: res.data.newMessage });
        setText("");
    };

    return (
        <div className="chat-manager border-start">
            <div className="chat-customer-list-message manager">
                {messages.length > 0 &&
                    messages.map((message, index) => {
                        if (message.role) {
                            return <MessageRight message={message} key={index} />;
                        } else {
                            return <MessageLeft message={message} key={index} />;
                        }
                    })}
            </div>

            <form
                className="card-footer text-muted d-flex justify-content-start align-items-center p-3"
                onSubmit={handleAddMessage}
            >
                <input
                    type="text"
                    className="form-control form-control-sm me-2"
                    placeholder="Nhập tin nhắn ..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <SendFill className="text-primary" />
            </form>
        </div>
    );
}

export default ChatFrame;
