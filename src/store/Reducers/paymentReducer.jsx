import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentStatus: null,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    initiatePayment: (state, action) => {
      state.paymentStatus = 'initiated';
    },
    completePayment: (state, action) => {
      state.paymentStatus = 'completed';
    },
    paymentError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { initiatePayment, completePayment, paymentError } = paymentSlice.actions;

export default paymentSlice.reducer;
