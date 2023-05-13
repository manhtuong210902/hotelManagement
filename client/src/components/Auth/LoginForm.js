import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { Key, Person } from "react-bootstrap-icons";
import config from "../../config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequests";

function LoginForm() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await loginUser(data, dispatch);
        if (!res.success) {
            setError(res.message);
            return;
        }

        navigate(from, { replace: true });
    };

    return (
        <div className="text-center login-form">
            <div className="mb-4">
                <h3>Đăng nhập</h3>
                <p>Đăng nhập để cùng đặt phòng nào</p>
            </div>
            <div className="text-start p-4">
                {error && <Alert variant="danger">Mật khẩu không hợp lệ</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Mật khẩu<span className="text-danger">*</span>
                        </Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                <Key />
                            </InputGroup.Text>
                            <Form.Control placeholder="Nhập mật khẩu" type="password" {...register("password")} />
                        </InputGroup>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Đăng nhập
                    </Button>
                </Form>
            </div>
            <div className="mt-3 text-center">
                <p>
                    Nếu bạn chưa có tài khoản ? <Link to={config.routes.register}>Đăng kí ngay</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
