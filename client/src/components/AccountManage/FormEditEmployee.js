import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { API_URL } from "../../utils/constants";
import { useSelector } from "react-redux";

function FormEditEmployee() {
    // const [curEmployee, setCurEmployee] = useState();
    const [loading, setLoading] = useState(false);
    const curEmployee = useSelector((state) => state.auth.userSelected);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fullname: curEmployee?.fullname || "",
            email: curEmployee?.email || "",
            cccd: curEmployee?.cccd || "",
            position: curEmployee?.position || "",
            phone: curEmployee?.phone || "",
            gender: curEmployee?.gender || "",
            address: curEmployee?.address || "",
        },
    });

    // const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        for (let key in data) {
            if (data.hasOwnProperty(key) && data[key] === "") {
                delete data[key];
            }
        }
        delete data.passwordRe;
        try {
            setLoading(true);
            await axios.put(`${API_URL}/user/edit/employee/${curEmployee._id}`, data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            reset({
                fullname: "",
                email: "",
                cccd: "",
                position: "",
                phone: "",
                gender: "",
                address: "",
            });
        }
    };

    return (
        <>
            <p className="fst-italic">Chỉnh sửa nhân viên "{curEmployee?.email}"</p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>
                            Họ và tên <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập họ và tên"
                            {...register("fullname", {
                                required: true,
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.fullname?.type === "required" && "Không được bỏ trống"}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>
                            Email <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập email"
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
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>
                            CMND/CCCD <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập CMND/CCCD"
                            {...register("cccd", {
                                required: true,
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.cccd?.type === "required" && "Không được bỏ trống"}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>
                            Chức vụ <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập chức vụ"
                            {...register("position", {
                                required: true,
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors?.position?.type === "required" && "Không được bỏ trống"}
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Số điện thoại</Form.Label>

                        <ReactInputMask
                            mask="+84\ 999 999 999"
                            maskChar=" "
                            className="form-control"
                            placeholder="Nhập số điện thoại"
                            {...register("phone")}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Ngày sinh</Form.Label>
                        <Form.Control type="date" {...register("birthDay")} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Chọn giơi tính</Form.Label>
                        <Form.Select {...register("gender")}>
                            <option>Nam</option>
                            <option>Nữ</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control type="text" placeholder="Nhập địa chỉ" {...register("address")} />
                </Form.Group>

                {loading && (
                    <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                        <Spinner animation="border" size="sm" />
                        <span>Đang cập nhật...</span>
                    </div>
                )}

                <Button variant="primary" type="submit">
                    Cập nhật
                </Button>
            </Form>
        </>
    );
}

export default FormEditEmployee;
