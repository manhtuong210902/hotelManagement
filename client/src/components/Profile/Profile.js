import { useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { ArrowClockwise, PencilSquare, PersonFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import { updateUser } from "../../redux/apiRequests";

function Profile() {
    const [isUpdate, setIsUpdate] = useState(true);
    const user = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: user.email,
            fullname: user.fullname,
            phone: user?.phone || "",
            gender: user?.gender || "",
            birthDay: user?.birthDay || "",
            address: user?.address || "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await updateUser(data, dispatch);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setIsUpdate(true);
        }
    };

    const handleResetUpdate = () => {
        setIsUpdate((prev) => !prev);
        reset();
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="text-primary mb-0 d-flex align-items-center gap-2">
                    <PersonFill /> HỒ SƠ CÁ NHÂN
                </h5>
                <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2 justify-content-center"
                    onClick={handleResetUpdate}
                >
                    {isUpdate ? (
                        <>
                            <PencilSquare /> Chỉnh sửa
                        </>
                    ) : (
                        <>
                            <ArrowClockwise /> Hủy
                        </>
                    )}
                </Button>
            </div>
            <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                        placeholder="Họ và tên"
                        disabled={isUpdate}
                        {...register("fullname", {
                            required: true,
                            minLength: 6,
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors?.fullname?.type === "required"
                            ? "Không được bỏ trống"
                            : errors?.fullname?.type === "minLength"
                            ? "Họ tên phải có từ 6 kí tự"
                            : ""}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder="Email"
                        disabled={isUpdate}
                        {...register("email", {
                            required: true,
                            minLength: 6,
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Email không hợp lệ",
                            },
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors?.email?.type === "required"
                            ? "Không được bỏ trống"
                            : errors?.email?.type === "minLength"
                            ? "Email phải có từ 6 kí tự"
                            : errors?.email?.type === "pattern"
                            ? "Nhập sai định dạng email!"
                            : ""}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Số điện thoại{" "}
                        <span className="text-danger fst-italic" style={{ fontSize: 12 }}>
                            {user?.phone ? "" : "(Chưa cập nhật)"}
                        </span>
                    </Form.Label>

                    <InputMask
                        mask="+84\ 999 999 999"
                        maskChar=" "
                        className="form-control"
                        placeholder="Nhập số điện thoại"
                        disabled={isUpdate}
                        {...register("phone")}
                    />
                </Form.Group>

                {/* để đây */}
                {/* <Form.Group className="mb-3">
                    <Form.Label>
                        Số điện thoại{" "}
                        <span className="text-danger fst-italic" style={{ fontSize: 12 }}>
                            {user?.phone ? "" : "(Chưa cập nhật)"}
                        </span>
                    </Form.Label>

                    <InputMask
                        mask="999.999.999"
                        className="form-control"
                        placeholder="Nhập số tiền"
                        disabled={isUpdate}
                        {...register("abc")}
                    />
                </Form.Group> */}

                {user.isManager && (
                    <Form.Group className="mb-3">
                        <Form.Label>Chức vụ</Form.Label>
                        <Form.Control value={"Quản lý"} disabled={true} />
                    </Form.Group>
                )}

                {user.isAdmin && (
                    <Form.Group className="mb-3">
                        <Form.Label>Chức vụ</Form.Label>
                        <Form.Control value={"Admin hệ thông"} disabled={true} />
                    </Form.Group>
                )}

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>
                            Ngày sinh{" "}
                            <span className="text-danger fst-italic" style={{ fontSize: 12 }}>
                                {user?.birthDay ? "" : "(Chưa cập nhật)"}
                            </span>
                        </Form.Label>
                        <Form.Control placeholder="" disabled={isUpdate} type="date" {...register("birthDay")} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>
                            Giới tính{" "}
                            <span className="text-danger fst-italic" style={{ fontSize: 12 }}>
                                {user?.gender ? "" : "(Chưa cập nhật)"}
                            </span>
                        </Form.Label>
                        <Form.Select disabled={isUpdate} {...register("gender")}>
                            <option>Nam</option>
                            <option>Nữ</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Địa chỉ{" "}
                        <span className="text-danger fst-italic" style={{ fontSize: 12 }}>
                            {user?.address ? "" : "(Chưa cập nhật)"}
                        </span>
                    </Form.Label>
                    <Form.Control disabled={isUpdate} placeholder="Nhập địa chỉ" {...register("address")} />
                </Form.Group>

                {loading && (
                    <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                        <Spinner animation="border" size="sm" />
                        <span>Đang cập nhật...</span>
                    </div>
                )}

                {!isUpdate && (
                    <Button
                        variant="primary"
                        className="d-flex align-items-center gap-2 justify-content-center"
                        type="submit"
                    >
                        Cập nhật
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default Profile;
