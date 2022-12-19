import {
    GET_GUIDE_DETAIL,
    GET_GUIDE_DETAIL_SUCCESS,
    GET_GUIDE_DETAIL_FAIL
} from '../action/types';

const INITIAL_STATE = {
    guideDetail: {},
    error: '',
    guideLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_GUIDE_DETAIL:
            return { ...state, guideLoader: true, error: '', guideDetail: {} };
        case GET_GUIDE_DETAIL_SUCCESS:
            console.log('GET_GUIDE_DETAIL_SUCCESS', action.payload);
            return { ...state, ...INITIAL_STATE, guideLoader: false, guideDetail: action.payload };
        case GET_GUIDE_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
                guideLoader: false,
                guideDetail: {}
            };
        default:
            return state;
    }
};
