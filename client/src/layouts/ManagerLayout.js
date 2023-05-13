import Sidebar from "../components/Sidebar/Sidebar";

function StaffLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />
            <div>{children}</div>
        </div>
    );
}

export default StaffLayout;
