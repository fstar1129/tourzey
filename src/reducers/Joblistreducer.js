//import from other files
import {
   JOB_LIST
} from '../actions/type';

const INITIAL_STATE = {
    success: false,
    message: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case JOB_LIST:
            return action.payload;
        default:
            return state;
    }
};
