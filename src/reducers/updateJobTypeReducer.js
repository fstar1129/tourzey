import {
    UPDATE_JOBTYPE,
    UPDATE_JOBTYPE_SUCCESS,
    UPDATE_JOBTYPE_FAIL,
} from '../action/types';

const INITIAL_STATE = {
    jobTypeLoader: false,
    jobTypeSuccess: false,
    errorValue: '',
    jobType: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_JOBTYPE:
            return { ...state, errorValue: '', jobType: '', jobTypeSuccess: false, jobTypeLoader: true };
        case UPDATE_JOBTYPE_SUCCESS:
            return { ...state, jobTypeSuccess: true, jobTypeLoader: false, jobType: action.jobType };
        case UPDATE_JOBTYPE_FAIL:
            return { ...state, errorValue: '', jobType: '', jobTypeSuccess: false, jobTypeLoader: false }; 
        default:
            return state;
    }
};
