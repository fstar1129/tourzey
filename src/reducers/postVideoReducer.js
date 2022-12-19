import {
    POST_VIDEO_FAIL,
    POST_VIDEO_SUCCESS,
    POST_VIDEO
} from '../action/types';

const INITIAL_STATE = {
    videoUrl: '',
    videoLoading: false,
    videoErr: '',
    imageUrl: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_VIDEO:
            return { ...state, videoLoading: true, videoErr: '' };
        case POST_VIDEO_SUCCESS:
            return { ...INITIAL_STATE, success: 'ok', videoLoading: false, videoUrl: action.payload, imageUrl: action.img };
        case POST_VIDEO_FAIL:
            return {
                ...state,
                videoErr: 'Data fetch failed.',
                videoLoading: false
            };
        default:
            return state;
    }
};
