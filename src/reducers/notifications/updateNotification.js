import {
    UPDATE_NOTIFICATION_SUCCESS,
    UPDATE_NOTIFICATION_FAIL
} from '../../action/types';

const INITIAL_STATE = {
    success: false,
    error: 'none',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_NOTIFICATION_SUCCESS:
            return { ...state, ...INITIAL_STATE, success: true };
        case UPDATE_NOTIFICATION_FAIL:
            return {
                ...state,
                error: 'Failed',
            };
        default:
            return state;
    }
};