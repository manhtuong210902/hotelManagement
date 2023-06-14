import axios from "axios";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants";
import setAuthToken from "../utils/setAuthToken";
import { loadUserFail, loadUserSuccess } from "./authSlice";
import { addroom, deleteroom, loadroomFail, loadroomSuccess, updateroom } from "./roomSlice";

//loader user
export const loaderUser = async (dispatch) => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
        const res = await axios.get(`${API_URL}/user`);
        if (res.data.success) {
            dispatch(loadUserSuccess(res.data.user));
        }
    } catch (error) {
        console.log("error");
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        dispatch(loadUserFail());
    }
};

//login user
export const loginUser = async (userData, dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/user/login`, userData);
        if (res.data.success) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        }

        //
        await loaderUser(dispatch);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//register user
export const registerUser = async (userData) => {
    try {
        const res = await axios.post(`${API_URL}/user/register`, userData);
        if (res.data.success) {
            return res.data;
        }
    } catch (error) {
        return error.response.data;
    }
};

//logout user
export const logoutUser = (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    setAuthToken(null);
    dispatch(loadUserFail());
};

//update user
export const updateUser = async (options, dispatch) => {
    try {
        const res = await axios.put(`${API_URL}/user/update`, options);
        await loaderUser(dispatch);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

//room
//get full rooms
export const getFullRooms = async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/rooms`);
        if (res.data.success) {
            dispatch(loadroomSuccess(res.data.rooms));
        }
    } catch (error) {
        console.log(error);
        dispatch(loadroomFail());
    }
};

//add my room
//add room
export const addRoom = async (room, dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/rooms/add`, room);
        if (res.data.success) {
            dispatch(addroom(res.data.newRoom));
            return res.data.newRoom;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

//delete my room
export const deleteRoom = async (idroom, dispatch) => {
    try {
        const res = await axios.delete(`${API_URL}/rooms/${idroom}`);
        if (res.data.success) {
            dispatch(deleteroom(idroom));
        }
    } catch (error) {
        console.log(error);
    }
};

//update my room
export const updateRoom = async (roomId, room, dispatch) => {
    try {
        const res = await axios.put(`${API_URL}/rooms/${roomId}`, room);
        if (res.data.success) {
            dispatch(updateroom(res.data.updateRoom));
        }
    } catch (error) {
        console.log(error);
    }
};

