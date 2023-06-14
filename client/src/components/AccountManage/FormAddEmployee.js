import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, InputGroup, Spinner } from "react-bootstrap";
import ReactInputMask from "react-input-mask";
import { Key } from "react-bootstrap-icons";
import { useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";

function FormAddEmployee() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const [loading, setLoading] = useState(false);
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {
        for (let key in data) {
            if (data.hasOwnProperty(key) && data[key] === "") {
                delete data[key];
            }
        }
        delete data.passwordRe;
        data.isEmployee = true;
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/user/add/employee`, data);
            console.log(res);
            if (!res.data.success) {
                setLoading(false);
                alert("Email này đã tồn tại !!");
            } else {
                setLoading(false);
                alert("Thêm nhân viên thành công !!");
                reset();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
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
                    <Form.Label>
                        Mật khẩu <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <Key />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Nhập mật khẩu"
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                            })}
                        />
                    </InputGroup>
                    <Form.Text className="text-danger">
                        {errors?.password?.type === "required"
                            ? "Không được bỏ trống"
                            : errors?.password?.type === "minLength"
                            ? "Mật khẩu phải có từ 6 kí tự"
                            : ""}
                    </Form.Text>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>
                        Xác Nhận Mật khẩu <span className="text-danger">*</span>
                    </Form.Label>

                    <InputGroup>
                        <InputGroup.Text>
                            <Key />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            {...register("passwordRe", {
                                validate: (value) => value === password.current,
                            })}
                        />
                    </InputGroup>
                    <Form.Text className="text-danger">
                        {errors.passwordRe?.type === "validate" ? "Mật khẩu nhập lại không khớp" : ""}
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
                    <span>Đang thêm...</span>
                </div>
            )}

            <Button variant="primary" type="submit">
                Thêm Nhân Viên
            </Button>
        </Form>
    );
}

export default FormAddEmployee;
