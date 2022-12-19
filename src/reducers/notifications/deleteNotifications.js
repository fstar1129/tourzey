import {
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAIL
} from '../../action/types';

const INITIAL_STATE = {
    success: false,
    error: 'none',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_NOTIFICATION_SUCCESS:
            return { ...state, ...INITIAL_STATE, success: true };
        case DELETE_NOTIFICATION_FAIL:
            return {
                ...state,
                error: 'Failed',
            };
        default:
            return state;
    }
};