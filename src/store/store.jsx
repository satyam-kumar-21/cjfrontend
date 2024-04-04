import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
import courseReducer from "./Reducers/courseReducer";
import paymentReducer from "./Reducers/paymentReducer";
import lectureReducer from "./Reducers/lectureReducer";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};



const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    payment: paymentReducer, 
    lecture: lectureReducer
  },
  preloadedState,
});

// Subscribe to store changes and save the state if user is authenticated
store.subscribe(() => {
  const currentState = store.getState();
  if (currentState.user.isAuthenticated) {
    saveState(currentState);
  }
});

export default store;
