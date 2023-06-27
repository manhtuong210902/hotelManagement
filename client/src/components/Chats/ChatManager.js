import { ChatDotsFill } from "react-bootstrap-icons";
import ListChatUser from "./ListChatUser";
import { useState } from "react";
import ChatFrame from "./ChatFrame";

function ChatManager() {
    const [idChat, setIdChat] = useState(null);

    return (
        <div>
            <h5 className="text-primary mb-0 d-flex align-items-center justify-content-end py-1 gap-2">
                <ChatDotsFill /> NHẮN TIN
            </h5>
            <div className="d-flex mt-5 p-1">
                <ListChatUser setIdChat={setIdChat} idChat={idChat} />
                <ChatFrame idChat={idChat} />
            </div>
        </div>
    );
}

export default ChatManager;
