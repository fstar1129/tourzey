import { LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, USER_LOGGED_OUT, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL,
     SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL, IS_SIGNED_IN_FAIL, IS_SIGNED_IN_SUCCESS } from '../action/types';

const INITIAL_STATE = {
    checkedSignIn: false,
    userData: null,
    userRole: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log('state', action, action.navigateTo);
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                checkedSignIn: action.checkedSignIn,
                navigateTo: action.navigateTo,
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                checkedSignIn: action.checkedSignIn,
                navigateTo: action.navigateTo ? action.navigateTo : 'Login',
            };
        case USER_LOGGED_OUT:
            return {
                ...state,
                checkedSignIn: action.checkedSignIn,
                userData: action.userData,
                navigateTo: action.navigateTo,
            };
        case SIGNUP:
            return { ...state, error: '', loading: true, register: 'Yes', navigateTo: 'Register' };
        case SIGNUP_SUCCESS:
            return { ...state, loading: false, signedin: true, user: action.payload, userData: action.userdata, register: 'Yes' };
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                signedin: false,
                register: 'Yes',
                navigateTo: 'Register',
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                userData: action.userData
            };
        case FETCH_DATA_FAIL:
            return {
                ...state,
                userData: action.userData
            };
        case IS_SIGNED_IN_SUCCESS: 
            return {
                navigateTo: action.navigateTo,
                userData: action.userData
            };
        case IS_SIGNED_IN_FAIL: 
            return {
                navigateTo: action.navigateTo,
                userData: action.userData
            };
        default:
            return state;
    }
};
