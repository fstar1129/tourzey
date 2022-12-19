//import from other files
import {
    GET_USER_DETAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
    GET_JOB_APPROVED_DETAILS,
    GET_JOB_APPROVED_DETAILS_SUCCESS,
    GET_JOB_APPROVED_DETAILS_FAIL,
    NEAR_BY_AGENTS,
    NEAR_BY_AGENTS_FAILURE,
    NEAR_BY_AGENTS_SUCCESS
} from '../action/types';

const INITIAL_STATE = {
    details: [],
    loading: false,
    success: false,
    jobApprovedLoader: false,
    jobApprovedDetails: {},
    jobApprovedDetailsSuccess: false,
    nearByAgentLoader: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER_DETAIL:
            return { ...state, error: '', loading: true };
        case GET_USER_DETAIL_SUCCESS:
            return { ...state, ...INITIAL_STATE, success: true, loading: false, details: action.payload };
        case GET_USER_DETAIL_FAIL:
            return { ...state, error: '', loading: false };
        case GET_JOB_APPROVED_DETAILS:
            return { ...state, error: '', jobApprovedLoader: true };
        case GET_JOB_APPROVED_DETAILS_SUCCESS:
        console.log('GET_JOB_APPROVED_DETAILS_SUCCESS', action.payload);
            return { ...state, ...INITIAL_STATE, jobApprovedDetailsSuccess: true, jobApprovedLoader: false, jobApprovedDetails: action.payload };
        case GET_JOB_APPROVED_DETAILS_FAIL:
            return { ...state, error: '', jobApprovedLoader: false };
        case NEAR_BY_AGENTS:
            return { ...state, nearByAgentLoader: true, nearByAgent: [], nearByAgentSuccess: false };
        case NEAR_BY_AGENTS_FAILURE:
            return { ...state, nearByAgentLoader: false, nearByAgent: [], nearByAgentSuccess: true };
        case NEAR_BY_AGENTS_SUCCESS:
            return { ...state, nearByAgentLoader: false, nearByAgent: action.payload, nearByAgentSuccess: true };
        default:
            return state;
    }
};
