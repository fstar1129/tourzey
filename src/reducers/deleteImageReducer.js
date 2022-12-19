import {
    DELETE_IMAGE,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL
} from '../action/types';

const INITIAL_STATE = {
    deleteLoader: false,
    deleteImage: false,
    deleteImageDetail: [],
    deleteErr: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_IMAGE:
            return { ...state, deleteErr: '', deleteImageDetail: [], deleteLoader: true };
        case DELETE_IMAGE_SUCCESS:
            return { ...state, ...INITIAL_STATE, deleteLoader: false, deleteImage: true, deleteImageDetail: action.payload };
        case DELETE_IMAGE_FAIL:
            return {
                ...state,
                deleteLoader: false,
                deleteErr: ''
            };
        default:
            return state;
    }
};
