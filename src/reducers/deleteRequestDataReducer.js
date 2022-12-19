import {
    DELETE_REQUEST_DATA,
    DELETE_REQUEST_DATA_SUCCESS,
    DELETE_REQUEST_DATA_FAIL
} from '../action/types';

const INITIAL_STATE = {
    deletedRequesterror: '',
    deletedRequestDataLoader: false,
    deleteStatus: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_REQUEST_DATA:
            return { ...state, deletedRequestDataLoader: true, deletedRequesterror: '' };
        case DELETE_REQUEST_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE, deletedRequestDataLoader: false, deleteStatus: action.deleteStatus };
        case DELETE_REQUEST_DATA_FAIL:
            return {
                ...state,
                deletedRequesterror: action.payload,
                deletedRequestDataLoader: false
            };
        default:
            return state;
    }
};
