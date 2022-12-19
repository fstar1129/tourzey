import {
    JOB_POST,
    JOB_POST_SUCCESS,
    JOB_POST_FAIL
} from '../action/types';

const INITIAL_STATE = {
    jobDetails: [],
    error: '',
    loading: false,
    post: false,
    jobId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case JOB_POST:
        return { ...state, error: '', loading: true };
        case JOB_POST_SUCCESS:
            console.log('JOB_POST_SUCCESS', action.payload);
            return { post: true, jobDetails: action.payload, jobId: action.id };
        case JOB_POST_FAIL:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};
