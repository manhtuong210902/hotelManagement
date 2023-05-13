import { Button, Form, InputGroup } from "react-bootstrap";
import { Key, Person } from "react-bootstrap-icons";
import config from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { registerUser } from "../../redux/apiRequests";

function RegisterForm() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (data) => {
        const res = await registerUser(data);
        if (!res.success) {
            setError(true);
        } else {
            navigate(config.routes.login);
        }
    };

    return (
        <div className="text-center login-form">
            <div className="mb-4">
                <h3>Đăng kí</h3>
                <p>Đăng kí với Hotel HCMUS</p>
            </div>
            <div className="text-start p-4">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Text className="text-danger">{error}</Form.Text>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Email<span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Person />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Nhập email"
                                type="text"
                                {...register("email", {
                                    required: true,
                                    minLength: 6,
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Email không hợp lệ",
                                    },
                                })}
                            />
                        </InputGroup>
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
                            Họ và tên<span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Person />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Nhập họ và tên"
                                type="text"
                                {...register("fullname", {
                                    required: true,
                                    minLength: 6,
                                })}
                            />
                        </InputGroup>
                        <Form.Text className="text-danger">
                            {errors?.fullname?.type === "required"
                                ? "Không được bỏ trống"
                                : errors?.fullname?.type === "minLength"
                                ? "Họ tên phải có từ 6 kí tự"
                                : ""}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Mật khẩu<span className="text-danger">*</span>
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
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Nhập lại mật khẩu<span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Person />
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
                    <Button type="submit" variant="primary">
                        Đăng kí
                    </Button>
                </Form>
            </div>
            <div className="mt-3 text-center">
                <p>
                    Bạn đã có tài khoản ? <Link to={config.routes.login}>Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
