import { combineReducers } from 'redux';
import joblistreducer from './Joblistreducer';
import SignupReducer from './signUpReducer';
import loginReducer from './loginReducer';
import imageReducer from './profileEditReducer';
import jobPostReducer from './jobPostReducer';
import checkloginReducer from './checkloginReducer';
import GetJobDetailReducer from './getJobDetailReducer';
import GetUserDetailReducer from './getUserDetailReducer';
import CheckdataReducer from './checkdataReducer';
import updateDetailsReducer from './updateDetailsReducer';
import updateJobTypeReducer from './updateJobTypeReducer';
import postVideoReducer from './postVideoReducer';
import postMessageReducer from './postMessageReducer';
import getMessageReducer from './getMessageReducer';
import getConversationListReducer from './getConversationListReducer';
import postImageReducer from './postImageReducer';
import fetchNotificationJobDetailReducer from './fetchNotificationJobDetailReducer';
import deleteImageReducer from './deleteImageReducer';
import fetchTourDetailsReducer from './fetchTourDetailsReducer';
import paymentsReducer from './paymentsReducer';
import getTourDataReducer from './getTourDataReducer';
import getGuideDetailReducer from './getGuideDetailReducer';
import requestTourReducer from './requestTourReducer';
import getRequestToursDataReducer from './getRequestToursDataReducer';
import deleteRequestTourDataReducer from './deleteRequestDataReducer';
import getCompleteTourDataReducer from './getCompleteTourDataReducer';
import completeTourReducer from './completeTourReducer';
import filterCertifiedTourDataReducer from './filterCertifiedTourDataReducer';
import filterRatedTourDataReducer from './filterRatedTourDataTeducer';
import updateRateandReivewReducer from './updateRateandReivewReducer';
import getSupportdetailReducer from './getSupportdetailReducer';
import updateFavoriteReducer from './updateFavoriteReducer';
import getFavoriteTourReducer from './getFavoriteTourReducer';
import getApprovedTourReducer from './getApprovedTourReducer';
//Notifications
import getOwnNotifications from './notifications/getOwnNotifications';
import deleteNotifications from './notifications/deleteNotifications';
import updateNotification from './notifications/updateNotification';
import getNotificationCountReducer from './notifications/getNotificationCountReducer';

const appReducer = combineReducers({
    Signup: SignupReducer,
    Login: loginReducer,
    joblistreducer,
    imageData: imageReducer,
    isSignedin: checkloginReducer,
    jobPost: jobPostReducer,
    getJobDetails: GetJobDetailReducer,
    getUserDetails: GetUserDetailReducer,
    getuserData: CheckdataReducer,
    updateDetail: updateDetailsReducer,
    updateJobTypeValue: updateJobTypeReducer,
    postVideoUrl: postVideoReducer,
    postMessage: postMessageReducer,
    getMessage: getMessageReducer,
    getConversationList: getConversationListReducer,
    postImageUrl: postImageReducer,
    fetchJobDetail: fetchNotificationJobDetailReducer,
    deleteImage: deleteImageReducer,
    tourDetails: fetchTourDetailsReducer,
    payments: paymentsReducer,
    tourData: getTourDataReducer,
    guideDetail: getGuideDetailReducer,
    requestTour: requestTourReducer,
    requestTourData: getRequestToursDataReducer,
    deleteRequestData: deleteRequestTourDataReducer,
    completeTourData: getCompleteTourDataReducer,
    completeTour: completeTourReducer,
    filterCertifiedTour: filterCertifiedTourDataReducer,
    filterRatedTour: filterRatedTourDataReducer,
    updateRateandReivew: updateRateandReivewReducer,
    getSupportdetail: getSupportdetailReducer,
    updateFavoriteTour: updateFavoriteReducer,
    getFavoriteTour: getFavoriteTourReducer,
    getApprovedTour: getApprovedTourReducer,
    //Notifications
    getNotifications: getOwnNotifications,
    delNotification: deleteNotifications,
    updateNotify: updateNotification,
    getNotificationCount: getNotificationCountReducer
});

export default (state, action) => appReducer(state, action);
