import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
    },
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
    addCourseToUser: (state, action) => {
      state.user = {
        ...state.user,
        courses: [...state.user.courses, action.payload],
      };
    },
    updateUserProfile: (state, action) => {
      const { watchedVideos, currentVideo } = action.payload;
      state.user = {
        ...state.user,
        watchedVideos: watchedVideos,
        currentVideo: currentVideo,
      };
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  addCourseToUser,
  updateUserProfile,
} = userSlice.actions;
export default userSlice.reducer;
