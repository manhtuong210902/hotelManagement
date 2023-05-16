import { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRoom } from "../../redux/apiRequests";
import InputMask from "react-input-mask";

function FormAddRoom() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const roomData = { ...data, price: data.price.replace(/\s+/g, "") };
            await addRoom(roomData, dispatch);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            reset();
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Số phòng</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập số phòng"
                        {...register("number", {
                            required: true,
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors?.number?.type === "required" && "Không được bỏ trống"}
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Tên phòng</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên phòng"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors?.name?.type === "required" && "Không được bỏ trống"}
                    </Form.Text>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Loại phòng</Form.Label>
                    <Form.Select defaultValue="Phòng thường" {...register("type")}>
                        <option>Phòng Thường</option>
                        <option>Phòng Vip</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Sức chưa tối đa</Form.Label>
                    <Form.Select defaultValue="1" {...register("capacity")}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Đơn giá theo ngày</Form.Label>
                    <InputMask
                        mask="999 999 999 999"
                        maskChar=" "
                        className="form-control"
                        placeholder="Nhập giá phòng"
                        {...register("price", {
                            required: true,
                        })}
                    />
                    <Form.Text className="text-danger">
                        {errors?.price?.type === "required" && "Không được bỏ trống"}
                    </Form.Text>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Thêm mô tả</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Viết thêm mô tả" {...register("description")} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Thêm hình ảnh</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Thêm hình ảnh"
                    {...register("image", {
                        required: true,
                    })}
                />
                <Form.Text className="text-danger">
                    {errors?.image?.type === "required" && "Không được bỏ trống"}
                </Form.Text>
            </Form.Group>

            {loading && (
                <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                    <Spinner animation="border" size="sm" />
                    <span>Đang thêm phòng...</span>
                </div>
            )}

            <Button variant="primary" type="submit">
                Thêm Phòng
            </Button>
        </Form>
    );
}

export default FormAddRoom;
