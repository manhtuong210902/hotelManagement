function MessageRight({ message }) {
    return (
        <div className="chat-customer-message-right bg-primary">
            <p className="small rounded-3 text-white">{message.content}</p>
        </div>
    );
}

export default MessageRight;
