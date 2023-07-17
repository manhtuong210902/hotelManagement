import { ChatDotsFill } from "react-bootstrap-icons";
import Header from "../components/Header/Header";
import ChatCus from "../components/Chats/ChatCus";
import { useState } from "react";
import { useSelector } from "react-redux";

function CustomerLayout({ children }) {
    const [showPopup, setShowPopup] = useState(false);
    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            <Header />
            <div className="content-customer">{children}</div>
            {!showPopup && user && (
                <div
                    className="chat-customer border border-primary text-primary bg-light"
                    onClick={() => setShowPopup(true)}
                >
                    <ChatDotsFill />
                    NHẮN TIN HỖ TRỢ
                </div>
            )}
            {showPopup && <ChatCus setShowPopup={setShowPopup} />}
        </div>
    );
}

export default CustomerLayout;
