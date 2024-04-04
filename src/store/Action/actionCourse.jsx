import axios from "axios";

import {createCourse, updateCourse,getCourse, deleteCourse, getAllCourse} from "../Reducers/courseReducer"
const backendurl = "https://cjbackend-3.onrender.com"

const handleError = (error, actionName) => {
    console.error(`Error ${actionName}:`, error);
};

export const createCourseAction = (userData) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`${backendurl}/api/course/create`, userData); 
        dispatch(createCourse(response.data)); 
        // console.log(response.data);

        return response.data;
    } catch (error) {
        handleError(error, "Creating course");
    }
}

export const updateCourseAction = (courseId, userData) => async (dispatch, getState) => {
    try {
        const response = await axios.put(`${backendurl}/api/course/update/${courseId}`, userData); 
        dispatch(updateCourse(response.data)); 
        //console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error, "Updating Course");
    }
}


export const deleteCourseAction = (courseId) => async (dispatch) => {
    try {
      await axios.delete(`${backendurl}/api/course/delete/${courseId}`);
  
      // Fetch all courses after deletion
      dispatch(getAllCourseAction());
  
      // Optionally, you can return a success message or other data if needed
      return { success: true };
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  };
  

export const getAllCourseAction = () => async (dispatch, getState) => {
    try {
        const response = await axios.get(`${backendurl}/api/course`);
        dispatch(getAllCourse(response.data)); 
        // console.log(response.data);
    } catch (error) {
        handleError(error, "Fetching All Courses");
    }
};

export const getOneCourseAction = (courseId) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`${backendurl}/api/course/${courseId}`); // Assuming this endpoint returns a single course by ID
        dispatch(getCourse(response.data)); 
        // console.log(response.data);
        return response.data
    } catch (error) {
        handleError(error, "Fetching Single Course");
    }
};
