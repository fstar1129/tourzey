//import from other files
import {
    GET_JOB_DETAIL,
    GET_JOB_DETAIL_SUCCESS,
    GET_JOB_DETAIL_FAIL,
    UPDATE_JOB_DETAILS,
    UPDATE_JOB_DETAILS_SUCCESS,
    UPDATE_JOB_DETAILS_FAIL,
    FETCH_COMPLETED_JOB_DETAIL,
    FETCH_COMPLETED_JOB_DETAIL_SUCCESS,
    FETCH_COMPLETED_JOB_DETAIL_FAIL,
    VERIFY_HIRED_AGENT,
    VERIFY_HIRED_AGENT_SUCCESS,
    VERIFY_HIRED_AGENT_FAIL,
    GET_CONTRACT_DETAIL,
    GET_CONTRACT_DETAIL_SUCCESS,
    GET_CONTRACT_DETAIL_FAIL,
    FIND_TOURS,
    FIND_TOURS_SUCCESS,
    FIND_TOURS_FAIL

} from '../action/types';

const INITIAL_STATE = {
    details: [],
    updateDetails: [],
    loading: false,
    successJobs: false,
    successComplete: false,
    update: false,
    completeJobDetails: [],
    verifyAgent: false,
    hiredAgentDetail: false,
    statusVal: '',
    loader: false,
    contractSuccess: false,
    contractDetails: {},
    loadingVal: false,
    loaderVal: false
};

export default (state = INITIAL_STATE, action) => {
    // console.log('action', action.type, action.payload);
    switch (action.type) {
        case GET_JOB_DETAIL:
            return { ...state, error: '', loading: true };
        case GET_JOB_DETAIL_SUCCESS:
            return { ...state, successJobs: true, loading: false, details: action.payload };
        case GET_JOB_DETAIL_FAIL:
            return { ...state, error: '', loading: false, details: action.payload };
        case UPDATE_JOB_DETAILS:
            return { ...state, error: '', loading: true };
        case UPDATE_JOB_DETAILS_SUCCESS:
            return { ...state, loading: false, update: true, updateDetails: action.payload };
        case UPDATE_JOB_DETAILS_FAIL:
            return { ...state, error: '', loading: false };
        case FETCH_COMPLETED_JOB_DETAIL:
            return { ...state, error: '', loading: true };
        case FETCH_COMPLETED_JOB_DETAIL_SUCCESS:
            return { ...state, successComplete: true, loading: false, completeJobDetails: action.payload };
        case FETCH_COMPLETED_JOB_DETAIL_FAIL:
            return { ...state, error: '', loading: false };
        case VERIFY_HIRED_AGENT:
            return { ...state, error: '', loader: true };
        case VERIFY_HIRED_AGENT_SUCCESS:
            return { ...state, verifyAgent: true, loader: false, hiredAgentDetail: action.payload, statusVal: action.statusValue };
        case VERIFY_HIRED_AGENT_FAIL:
            return { ...state, error: '', loader: false, hiredAgentDetail: action.payload, statusVal: action.statusValue };
        case GET_CONTRACT_DETAIL:
            return { ...state, error: '', loaderVal: true };
        case GET_CONTRACT_DETAIL_SUCCESS:
            return { ...state, contractSuccess: true, loaderVal: false, contractDetails: action.payload };
        case GET_CONTRACT_DETAIL_FAIL:
            return { ...state, error: '', loaderVal: false };
        case FIND_TOURS:
            return { ...state, error: '', loaderVal: true, toursData: [] };
        case FIND_TOURS_SUCCESS:
            return { ...state, error: '', loaderVal: false, toursData: action.payload };
        case FIND_TOURS_FAIL:
            return { ...state, error: '', loaderVal: false, toursData: action.payload };
        default:
            return state;
    }
};
