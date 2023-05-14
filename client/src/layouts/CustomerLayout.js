import Header from "../components/Header/Header";

function CustomerLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content-customer">{children}</div>
        </div>
    );
}

export default CustomerLayout;
