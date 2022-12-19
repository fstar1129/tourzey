import { GET_USERDATA_SUCCESS, GET_USERDATA_FAIL, IS_SIGNED_IN_SUCCESS, IS_SIGNED_IN_FAIL } from '../action/types';

const INITIAL_STATE = {
    userData: null,
};

export default (state = INITIAL_STATE, action) => {
    console.log('logineeeee', action);
    switch (action.type) {
        case GET_USERDATA_SUCCESS:
            return {
                ...state,
                userData: action.userData,
                navigateTo: null,
            };
        case GET_USERDATA_FAIL:
            return {
                ...state,
                userData: action.userData,
                navigateTo: null,
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
