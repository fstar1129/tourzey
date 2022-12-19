import {
    POST_IMAGE,
    POST_IMAGE_SUCCESS,
    POST_IMAGE_FAIL
} from '../action/types';

const INITIAL_STATE = {
    imageLoading: false,
    imageErr: '',
    postImageUrl: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_IMAGE:
            return { ...state, imageLoading: true, imageErr: '' };
        case POST_IMAGE_SUCCESS:
            return { ...INITIAL_STATE, success: 'ok', imageLoading: false, postImageUrl: action.payload };
        case POST_IMAGE_FAIL:
            return {
                ...state,
                imageErr: 'Data fetch failed.',
                imageLoading: false
            };
        default:
            return state;
    }
};
