import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    UPLOAD_MULTIPLE_IMAGES,
    UPLOAD_MULTIPLE_IMAGES_SUCCESS,
    UPLOAD_MULTIPLE_IMAGES_FAIL
} from '../action/types';

const INITIAL_STATE = {
    imageDetail: null,
    image: false,
    errorValue: '',
    loader: false,
    galleryLoader: false,
    galleryImage: false,
    galleryImageDetail: [],
    galleryError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return { ...state, errorValue: '', loader: true };
        case UPLOAD_IMAGE_SUCCESS:
            return { ...state, ...INITIAL_STATE, loader: false, image: true, imageDetail: action.payload };
        case UPLOAD_IMAGE_FAIL:
            return {
                ...state,
                loader: false,
                errorValue: ''
            };
        case UPLOAD_MULTIPLE_IMAGES:
            return { ...state, imageError: '', galleryLoader: true, galleryImageDetail: [] };
        case UPLOAD_MULTIPLE_IMAGES_SUCCESS:
            console.log('UPLOAD_MULTIPLE_IMAGES_SUCCESS', action.payload);
            return { ...state, ...INITIAL_STATE, galleryLoader: false, galleryImage: true, galleryImageDetail: action.payload };
        case UPLOAD_MULTIPLE_IMAGES_FAIL:
            return {
                ...state,
                galleryLoader: false,
                galleryError: ''
            };
        default:
            return state;
    }
};
