
import {
    GET_ALL_NOTIFICATION,
    GET_ALL_NOTIFICATION_SUCCESS,
    GET_ALL_NOTIFICATION_FAIL
} from '../../action/types';

const INITIAL_STATE = {
    notificationsLoader: false,
    notifications: [],
    error: 'none',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_NOTIFICATION:
            return { ...state, notificationsLoader: true, error: '' };
        case GET_ALL_NOTIFICATION_SUCCESS:
            return { ...state, ...INITIAL_STATE, notifications: action.payload, notificationsLoader: false };
        case GET_ALL_NOTIFICATION_FAIL:
            return {
                ...state,
                notificationsLoader: false,
                error: 'Failed',
            };
        default:
            return state;
    }
};
