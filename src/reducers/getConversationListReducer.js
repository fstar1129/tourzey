import {
    GET_COVERSATION_LIST,
    GET_COVERSATION_LIST_SUCCESS,
    GET_COVERSATION_LIST_FAIL,
    REMOVE_GUIDE,
    REMOVE_GUIDE_SUCCESS,
    REMOVE_GUIDE_FAIL
} from '../action/types';

const INITIAL_STATE = {
    conversationList: [],
    error: '',
    conversationLoading: false,
    guideProfileLoading: false,
    guideRemoved: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.type, action.payload, 'conversation Reducer');
    switch (action.type) {
        case GET_COVERSATION_LIST:
            return { ...state, conversationLoading: true, error: '' };
        case GET_COVERSATION_LIST_SUCCESS:
            return { ...state, ...INITIAL_STATE, conversationLoading: false, conversationList: action.payload };
        case GET_COVERSATION_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
                conversationLoading: false
            };
            case REMOVE_GUIDE:
                return { ...state, guideProfileLoading: true, error: '', guideRemoved: false };
            case REMOVE_GUIDE_SUCCESS:
                return { ...state, ...INITIAL_STATE, guideProfileLoading: false, guideRemoved: action.payload };
    
            case REMOVE_GUIDE_FAIL:
                return {
                    ...state,
                    guideRemoved: action.payload,
                    guideProfileLoading: false,
                };
        default:
            return state;
    }
};
