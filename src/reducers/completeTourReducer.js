//import from other files
import {
    COMPLETE_TOUR,
    COMPLETE_TOUR_SUCCESS,
    COMPLETE_TOUR_FAIL

} from '../action/types';

const INITIAL_STATE = {
    completeLoader: false,
    complete: false,
    completeStatus: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMPLETE_TOUR:
            return { ...state, error: '', completeLoader: true, complete: false };
        case COMPLETE_TOUR_SUCCESS:
            return { ...state, ...INITIAL_STATE, complete: true, completeLoader: false, completeStatus: action.tourCompleteStatus };
        case COMPLETE_TOUR_FAIL:
            return { ...state, error: '', completeLoader: false, complete: false };
        default:
            return state;
    }
};
