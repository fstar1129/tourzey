import {
    GET_MESSAGE,
    GET_MESSAGE_SUCCESS,
    GET_MESSAGE_FAIL,
   
} from '../action/types';

const INITIAL_STATE = {
    textArr: [],
    error: '',
    loading: false,
    
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MESSAGE:
            return { ...state, loading: true, error: '' };
        case GET_MESSAGE_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, textArr: action.payload };
        case GET_MESSAGE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
      
        default:
            return state;
    }
};
