import axios from "axios";
import { registerUser, loginUser, logoutUser, addCourseToUser, updateUserProfile  } from "../Reducers/userReducer";
import {getAllCourseAction} from "./actionCourse"

const backendurl = "https://cjbackend-3.onrender.com"
// Common error handling function
const handleError = (error, actionName) => {
    console.error(`Error ${actionName}:`, error);
};

export const registerUserAction = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${backendurl}/api/user/register`, userData); 
        dispatch(registerUser(response.data)); 
    } catch (error) {
        handleError(error, "registering user");
    }
};

export const loginUserAction = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${backendurl}/api/user/login`, userData); 
        if (response.data) {
            dispatch(loginUser(response.data)); 

            dispatch(getAllCourseAction());
        } else {
            console.error("Login failed: Invalid response from server");
        }
    } catch (error) {
        handleError(error, "logging in");
    }
};

export const logoutUserAction = () => async (dispatch) => {
    try {
        dispatch(logoutUser());
    } catch (error) {
        handleError(error, "logging out");
    }
};

export const addCourseToUserAction = (userId, courseId) => async (dispatch) => {
    try {
        const response = await axios.put(`${backendurl}/api/user/add-course/${userId}`, { courseId });
        const newCourse = response.data; // Assuming the course data is under 'course' key in the response
        dispatch(addCourseToUser(newCourse)); // Dispatching the course data as the payload
        return newCourse; // Returning the new course data for further use if needed
    } catch (error) {
        handleError(error, "adding course to user");
    }
};

// export const updateUserProfileAction = (userId, userData) => async (dispatch) => {
//     try {
//         const response = await axios.put(`http://localhost:5050/api/user/profile/${userId}`, userData);
//         dispatch(updateUserProfile(response.data)); 
//     } catch (error) {
//         handleError(error, "updating user profile");
//     }
// };

export const updateUserProfileAction = (userId, userData) => async (dispatch) => {
    try {
        const response = await axios.put(`${backendurl}/api/user/profile/${userId}`, userData);
        dispatch(updateUserProfile(userData)); // Pass userData directly
    } catch (error) {
        handleError(error, "updating user profile");
    }
};

export const getAllUserAction = () => async (dispatch) => {
    try {
        const response = await axios.get(`${backendurl}/api/user/admin/all-user`);
        return response.data 
    } catch (error) {
        handleError(error, "updating user profile");
    }
};




