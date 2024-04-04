import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lectures: [],
    loading: false,
    success: false,
    error: null,
};

export const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {
        createLecture: (state, action) => {
            state.lectures.push(action.payload);
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        updateLecture: (state, action) => {
            state.lectures = state.lectures.map((lecture) =>
                lecture._id === action.payload._id ? action.payload : lecture
            );
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        deleteLecture: (state, action) => {
            state.lectures = state.lectures.filter(
                (lecture) => lecture._id !== action.payload
            );
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        getLecture: (state, action) => {
            state.lectures = action.payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        getAllLectures: (state, action) => {
            state.lectures = action.payload;
            state.loading = false;
            state.success = true;
            state.error = null;
        },
    },
});

export const {
    createLecture,
    updateLecture,
    deleteLecture,
    getLecture,
    getAllLectures,
} = lectureSlice.actions;

export default lectureSlice.reducer;
