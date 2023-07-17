import axios from "axios";
import { useEffect, useState } from "react";
import { ChatDotsFill, DashLg, SendFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";
import MessageRight from "./MessageRight";
import MessageLeft from "./MessageLeft";
import socket from "../../config/socket";

function ChatCus({ setShowPopup }) {
    const user = useSelector((state) => state.auth.user);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    console.log('chat');
    
    useEffect(() => {
        const fetchApi = async () => {
            const result = await axios.get(`${API_URL}/chats/messages/${user?._id}`);
            setMessages(result.data.messages);
        };

        fetchApi();
    }, [user?._id]);

    useEffect(() => {
        const handleNewMessages = ({ userId, message }) => {
            if (userId === user?._id) {
                setMessages((prev) => [...prev, message]);
            }
        };

        socket.on("message", handleNewMessages);

        return () => {
            socket.off("message", handleNewMessages);
        };
    }, [user?._id]);

    const handleAddMessage = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${API_URL}/chats/add`, {
            idUser: user._id,
            text: text,
            role: false,
        });
        socket.emit("message", { userId: user._id, message: res.data.newMessage });
        setText("");
    };
    return (
        user === null ? " ": 
        <div className="chat-customer-popup bg-white">
            <div className="gap-2 chat-customer-header bg-white text-primary">
                <span className="d-flex align-items-center gap-2">
                    <ChatDotsFill />
                    NHẮN TIN HỖ TRỢ
                </span>
                <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setShowPopup(false);
                    }}
                >
                    <DashLg />
                </span>
            </div>
            <div className="chat-customer-list-message">
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
                <button type="submit">
                    <SendFill className="text-primary" />
                </button>
            </form>
        </div>
    
    );
}

export default ChatCus;
