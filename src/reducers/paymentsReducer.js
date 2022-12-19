import {
    PAYPAL_PAYMENT_SUCCESS,
    PAYPAL_PAYMENT_FAIL,
    PAYPAL_PAYMENT,
    MILESTONE_UPDATE,
    MILESTONE_UPDATE_FAIL,
    MILESTONE_UPDATE_SUCCESS,
    PAYMENT_UPDATE,
    PAYMENT_UPDATE_SUCCESS,
    PAYMENT_UPDATE_FAIL,
    STRIPE_PAYMENT,
    STRIPE_PAYMENT_SUCCESS,
    STRIPE_PAYMENT_FAIL
} from '../action/types';

const INITIAL_STATE = {
    paypalPaymentData: { paymentLoader: false },
    paymentLoader: null,
    error: '',
    screen: '',
    paymentUpdateLoader: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.type, 'payment reducer');
    switch (action.type) {
        case PAYPAL_PAYMENT: 
         return { ...state, error: '', paymentLoader: true, paypalPaymentData: {} };
        case PAYPAL_PAYMENT_SUCCESS: 
         return { ...state, error: '', paymentLoader: false, paypalPaymentData: action.payload };
        case PAYPAL_PAYMENT_FAIL: 
         return { ...state, error: '', paymentLoader: false, paypalPaymentData: action.payload };
         case MILESTONE_UPDATE: 
         return { ...state, error: '', milestoneLoader: true, milestonesData: false };
         case MILESTONE_UPDATE_SUCCESS: 
         return { ...state, error: '', milestoneLoader: false, milestonesData: action.payload, screen: action.name };
         case MILESTONE_UPDATE_FAIL: 
         return { ...state, error: '', milestoneLoader: false, milestonesData: action.payload, screen: action.name };
         case PAYMENT_UPDATE: 
         return { ...state, error: '', paymentUpdateLoader: true, paymentDone: false };
        case PAYMENT_UPDATE_SUCCESS: 
         return { ...state, error: '', paymentUpdateLoader: false, paymentDone: true };
         case PAYMENT_UPDATE_FAIL: 
         return { ...state, error: '', paymentUpdateLoader: false, paymentDone: false };
        default:
         return state;
    }
};
