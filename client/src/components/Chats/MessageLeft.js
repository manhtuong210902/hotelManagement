function MessageLeft({ message }) {
    return (
        <div className="chat-customer-message-left bg-light">
            <p className="small rounded-3 text-dark">{message.content}</p>
        </div>
    );
}

export default MessageLeft;
