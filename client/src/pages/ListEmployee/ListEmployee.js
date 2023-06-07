import TableAccount from "../../components/AccountManage/TableAccount";

function ListEmployee() {
    return (
        <div className="p-5">
            <h3 className="mb-3">DANH SÁCH TÀI KHOẢN NHÂN VIÊN</h3>
            <TableAccount type={"Employee"} />
        </div>
    );
}

export default ListEmployee;
