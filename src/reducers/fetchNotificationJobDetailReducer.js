import {
    FETCH_NOTIFICATION_JOB_DETAIL,
    FETCH_NOTIFICATION_JOB_DETAIL_SUCCESS,
    FETCH_NOTIFICATION_JOB_DETAIL_FAIL
} from '../action/types';

const INITIAL_STATE = {
    jobData: {},
    error: '',
    jobLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATION_JOB_DETAIL:
            return { ...state, jobLoader: true, error: '' };
        case FETCH_NOTIFICATION_JOB_DETAIL_SUCCESS:
            return { ...state, ...INITIAL_STATE, jobLoader: false, jobData: action.payload };
        case FETCH_NOTIFICATION_JOB_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
                jobLoader: false
            };
        default:
            return state;
    }
};
