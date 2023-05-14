import { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom } from "../../redux/apiRequests";

function FormEditRoom() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const room = useSelector((state) => state.room.room);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            number: room?.number || "",
            name: room?.name || "",
            type: room?.type || "",
            capacity: room?.capacity || "",
            price: room?.price || "",
            description: room?.description || "",
            image: room?.image || "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await updateRoom(room._id, data, dispatch);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            reset({
                number: "",
                name: "",
                type: "",
                capacity: "",
                price: "",
                description: "",
                image: "",
            });
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
                    <Form.Control
                        type="text"
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
                    <span>Đang cập nhật...</span>
                </div>
            )}

            <Button variant="primary" type="submit">
                Cập Nhật Phòng
            </Button>
        </Form>
    );
}

export default FormEditRoom;
