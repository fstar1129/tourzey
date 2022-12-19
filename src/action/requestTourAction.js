import firebase from 'react-native-firebase';
import _ from 'lodash';
import { Toast } from 'native-base';
import {
    REQUEST_TOUR,
    REQUEST_TOUR_SUCCESS,
    REQUEST_TOUR_FAIL
} from './types';
import { authService } from './services/authServices';


const db = firebase.firestore();

export const requestTour = (obj) => (dispatch) => {
    console.log(obj.tourId, obj, 'requestTour');
    let requestedDetails = {};
    dispatch({ type: REQUEST_TOUR });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        authService.getCurrentuserToken(obj.tourPostedById)
            .then((user) => {
                console.log(user, 'userstatus', currentUser);
                authService.getCurrentuserToken(currentUser.uid)
                .then((me) => {
                    console.log('memememe', me);
                if (me.activateStatus !== false) {
                    db.collection('tours')
                    .doc(obj.tourId)
                    .get()
                    .then((data) => {
                        console.log(data, 'hd123');
                        db.collection('requestTour').add({
                            tourId: obj.tourId,
                            tourPostedById: obj.tourPostedById,
                            tourRequestedById: obj.tourRequestedById,
                            count: obj.count,
                            tourRequestedName: obj.tourRequestedName,
                            tourName: obj.tourName,
                            tourPrice: obj.tourPrice,
                            tourImageUrl: obj.tourImageUrl,
                            tourApprovalStatus: obj.tourApprovalStatus,
                            tourDate: obj.tourDate,
                            tourTime: obj.tourTime,
                            tourComplete: obj.tourComplete,
                            createdAt: Date.now(),
                        })
                            .then((value) => {
                                console.log('hd12', value);
                                const ref = db.collection('requestTour').doc(value.id);
                                ref.update({
                                    requestDocId: value.id
                                })
                                    .then((val) => {
                                        console.log('update request Tour', val);
                                        if (data.data().requestedClients.length >= 0) {
                                            console.log('requestedClients', data.data().requestedClients);
                                            const requestedData = {
                                                tourRequestedById: obj.tourRequestedById,
                                                requestedDocId: value.id
                                            };
                                            data.data().requestedClients.push(requestedData);
                                            db.collection('tours').doc(obj.tourId).update({
                                                requestedClients: data.data().requestedClients
                                            })
                                                .then((update) => {
                                                    if (user.pushToken && user.setting.notification === true) {
                                                        authService.requestingTour(user.pushToken, obj.tourId, user.email, obj.tourRequestedName, user.userId);
                                                    }
                                                    console.log('update', update);
                                                    requestedDetails = {
                                                        requestedClients: data.data().requestedClients
                                                    };
                                                    requestTourSuccess(dispatch, requestedDetails);
                                                    Toast.show({
                                                        text: 'Requested tour successfully',
                                                        position: 'bottom',
                                                        buttonText: 'Okay',
                                                        type: 'success',
                                                        duration: 5000
                                                    });
                                                })
                                                .catch((error) => {
                                                    requestTourFail(dispatch, error);
                                                });
                                        }
                                    })
                                    .catch((error) => {
                                        requestTourFail(dispatch, error);
                                    });
                            })
                            .catch((error) => {
                                requestTourFail(dispatch, error);
                            });
                    })
                    .catch((error) => {
                        requestTourFail(dispatch, error);
                    });
                } else {
                    requestTourFail(dispatch, []);
                    Toast.show({
                        text: 'Requesting Failed!',
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: 'danger',
                        duration: 5000
                    });
                }
            })
            .catch((error) => {
                console.log('erererererere', error);
                requestTourFail(dispatch, error);
            });
            });
    }
};

const requestTourSuccess = (dispatch, requestedDetails) => {
    console.log('requestTourSuccess', requestedDetails);
    dispatch({ type: REQUEST_TOUR_SUCCESS, payload: requestedDetails });
};

const requestTourFail = (dispatch, error) => {
    dispatch({ type: REQUEST_TOUR_FAIL, payload: error });
};
