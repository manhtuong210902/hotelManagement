import Sidebar from "../components/Sidebar/Sidebar";

function ManagerLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="manage-content">{children}</div>
        </div>
    );
}

export default ManagerLayout;
