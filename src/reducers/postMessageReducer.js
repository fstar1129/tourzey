import {
    POST_MESSAGE,
    POST_MESSAGE_SUCCESS,
    POST_MESSAGE_FAIL
} from '../action/types';

const INITIAL_STATE = {
    error: '',
    postmessageLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_MESSAGE:
            return { ...state, postmessageLoader: true, error: '' };
        case POST_MESSAGE_SUCCESS:
            return { ...state, ...INITIAL_STATE, postmessageLoader: true };
        case POST_MESSAGE_FAIL:
            return {
                ...state,
                error: 'failed',
                postmessageLoader: false
            };
        default:
            return state;
    }
};
