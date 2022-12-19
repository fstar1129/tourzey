import {
    UPDATE_FAVORITE_TOUR,
    UPDATE_FAVORITE_TOUR_SUCCESS,
    UPDATE_FAVORITE_TOUR_FAIL
} from '../action/types';

const INITIAL_STATE = {
    updateFavoriteError: '',
    favoriteLoading: false,
    favoriteStatus: '',
    updateFavorite: false,
    favoriteData: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_FAVORITE_TOUR: 
            return { ...state, updateFavoriteError: '', favoriteLoading: true, updateFavorite: false, favoriteData: {} };
        case UPDATE_FAVORITE_TOUR_SUCCESS: 
        return { ...state, ...INITIAL_STATE, updateFavorite: true, favoriteLoading: false, favoriteStatus: action.favoriteStatus, favoriteData: action.favoriteData };
        case UPDATE_FAVORITE_TOUR_FAIL:
            return {
                ...state,
                favoriteLoading: false,
                updateFavorite: false,
                favoriteData: {}
            };
        default:
            return state;
    }
};
