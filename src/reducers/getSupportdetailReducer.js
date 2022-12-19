import {
    GET_SUPPORT_DATA,
    GET_SUPPORT_DATA_SUCCESS,
    GET_SUPPORT_USER_DATA_FAIL,
    CONTACT_US,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL
} from '../action/types';

const INITIAL_STATE = {
    supportData: [],
    supportDataError: '',
    supportDataLoader: false,
    contactUsStatus: '',
    contactUsLoader: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SUPPORT_DATA:
            return { ...state, supportDataLoader: true, supportDataError: '' };
        case GET_SUPPORT_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE, supportDataLoader: false, supportData: action.payload };
        case GET_SUPPORT_USER_DATA_FAIL:
            return {
                ...state,
                supportDataError: action.payload,
                supportDataLoader: false
            };
        case CONTACT_US:
            return { ...state, contactUsLoader: true, contactUsStatus: '' };
        case CONTACT_US_SUCCESS:
            console.log('CONTACT_US_SUCCESS', action.payload);
            return { ...state, ...INITIAL_STATE, contactUsLoader: false, contactUsStatus: action.payload };
        case CONTACT_US_FAIL:
            return {
                ...state,
                contactUsLoader: false,
                contactUsStatus: ''
            };
        default:
            return state;
    }
};
