import Sidebar from "../components/Sidebar/Sidebar";

function AdminLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="manage-content">{children}</div>
        </div>
    );
}

export default AdminLayout;
