import {
    GET_FAVOURITE_TOURS,
    GET_FAVOURITE_TOURS_SUCCESS,
    GET_FAVOURITE_TOURS_FAIL
} from '../action/types';

const INITIAL_STATE = {
    favoriteTourData: [],
    favouriteTourError: '',
    favoriteTourLoader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FAVOURITE_TOURS:
            console.log('GET_FAVOURITE_TOURS');
            return { ...state, favoriteTourLoader: true, favouriteTourError: '', favoriteTourData: [] };
        case GET_FAVOURITE_TOURS_SUCCESS:
            return { ...state, ...INITIAL_STATE, favoriteTourLoader: false, favoriteTourData: action.payload };
        case GET_FAVOURITE_TOURS_FAIL:
            return {
                ...state,
                favouriteTourError: action.payload,
                favoriteTourLoader: false,
                favoriteTourData: []
            };
        default:
            return state;
        }
    }
;