import { ChatDotsFill, DashLg, SendFill } from "react-bootstrap-icons";

function ChatCus({ setShowPopup }) {
    return (
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
                <div className="chat-customer-message-right bg-primary">
                    <p className="small rounded-3 text-white">
                        Helo chào cậu, mình là Tường Manager bạn cần gì hỗ trợ không
                    </p>
                </div>

                <div className="chat-customer-message-left bg-light">
                    <p className="small rounded-3 text-dark">Không bạn</p>
                </div>
                <div className="chat-customer-message-left bg-light">
                    <p className="small rounded-3 text-dark">Đồ ăn khách sản chán vãi, tôi hủy phòng</p>
                </div>

                <div className="chat-customer-message-right bg-primary">
                    <p className="small rounded-3 text-white">
                        Helo chào cậu, mình là Tường Manager bạn cần gì hỗ trợ không
                    </p>
                </div>

                <div className="chat-customer-message-left bg-light">
                    <p className="small rounded-3 text-dark">Không bạn</p>
                </div>
                <div className="chat-customer-message-left bg-light">
                    <p className="small rounded-3 text-dark">Đồ ăn khách sản chán vãi, tôi hủy phòng</p>
                </div>
            </div>
            <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                <input type="text" className="form-control form-control-sm me-2" placeholder="Nhập tin nhắn ..." />
                <SendFill className="text-primary" />
            </div>
        </div>
    );
}

export default ChatCus;
