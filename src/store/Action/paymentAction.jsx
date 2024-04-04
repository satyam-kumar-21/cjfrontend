import axios from 'axios';
import { initiatePayment, completePayment, paymentError } from '../Reducers/paymentReducer';

const backendurl = "https://cjbackend-3.onrender.com"
const handleError = (error, actionName) => {
  console.error(`Error ${actionName}:`, error);
};

export const initiatePaymentAction = (paymentData) => async (dispatch) => {
  try {
    const response = await axios.post(`${backendurl}/api/payment/checkout`, paymentData);
    dispatch(initiatePayment(response.data));
    return response.data;
  } catch (error) {
    handleError(error, 'initiating payment');
    dispatch(paymentError(error.message));
  }
};

export const completePaymentAction = (paymentId) => async (dispatch) => {
  try {
    const response = await axios.post(`${backendurl}/api/payment/complete/${paymentId}`);
    if (response.data) {
      dispatch(completePayment(response.data));
    } else {
      console.error('Payment completion failed: Invalid response from server');
      dispatch(paymentError('Payment completion failed'));
    }
  } catch (error) {
    handleError(error, 'completing payment');
    dispatch(paymentError(error.message));
  }
};
