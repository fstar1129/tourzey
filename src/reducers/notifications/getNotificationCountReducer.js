
import {
    GET_NOTIFICATION_COUNT_SUCCESS,
    GET_NOTIFICATION_COUNT_FAIL
} from '../../action/types';

const INITIAL_STATE = {
    notificationsCount: 0,
    notificationsCounterror: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_COUNT_SUCCESS:
            return { ...state, ...INITIAL_STATE, notificationsCount: action.payload };
        case GET_NOTIFICATION_COUNT_FAIL:
            return {
                ...state,
                notificationsCounterror: 'No data available',
            };
        default:
            return state;
    }
};
