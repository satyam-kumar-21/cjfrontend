import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    course: [],
    loading: false,
    success: false,
    error: null,
};

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        createCourse: (state, action) => {
            state.course = action.payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        updateCourse: (state, action) => {
            state.course = action.payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        deleteCourse: (state, action) => {
            state.course = null;
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        getCourse: (state, action) => {
            state.course = action.payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        getAllCourse: (state, action) => {
            state.course = action.payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        },
    },
});

export const {
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
    getAllCourse,
} = courseSlice.actions;

export default courseSlice.reducer;
