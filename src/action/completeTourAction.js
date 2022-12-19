import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import {
    COMPLETE_TOUR,
    COMPLETE_TOUR_SUCCESS,
    COMPLETE_TOUR_FAIL
} from './types';
import { authService } from './services/authServices';

const db = firebase.firestore();


export const completeTour = (obj) => (dispatch) => {
    console.log('completeTour', obj);
    const { approvedClients, requestTourId, tourId, uid, guideId, tourName } = obj;
    dispatch({ type: COMPLETE_TOUR });
    authService.getCurrentuserToken(uid)
        .then((clientDetails) => {
            db.collection('contracts')
                .where('requestDocId', '==', requestTourId)
                .where('approvedClientId', '==', uid)
                .get()
                .then((details) => {
                    console.log('details', details, details.size);
                    if (details.size > 0) {
                        details.forEach((doc) => {
                            console.log('doc', doc, doc.id);
                            approvedClients.map((item) => {
                                console.log('item', item, item.approvedDocId === doc.id);
                                if (doc.id === item.approvedDocId && doc.data().tourComplete === false) {
                                    db.collection('contracts').doc(item.approvedDocId).update({
                                        tourComplete: true,
                                        completedAt: new Date(),
                                    })
                                        .then(() => {
                                            console.log('contracts update');
                                            authService.getCurrentuserToken(guideId)
                                                .then((guideDetails) => {
                                                    console.log('contracts tourComplete');
                                                    db.collection('requestTour').doc(requestTourId).update({
                                                        tourComplete: true
                                                    })
                                                        .then(() => {
                                                            console.log('requestTour tourComplete', guideDetails);
                                                            if (guideDetails.pushToken && guideDetails.setting.notification === true) {
                                                                authService.completedTour(clientDetails.fullName,
                                                                    guideDetails.pushToken, tourName, tourId, guideDetails.email, guideDetails.userId);
                                                            }
                                                            updateSuccess(dispatch, 'Completed');
                                                        })
                                                        .catch((error) => {
                                                            updateFailure(dispatch, error);
                                                        });
                                                })
                                                .catch((error) => {
                                                    updateFailure(dispatch, error);
                                                });
                                        })
                                        .catch((error) => {
                                            updateFailure(dispatch, error);
                                        });
                                }
                            });
                        });
                    } else {
                        updateFailure(dispatch, 'No data');
                    }
                })
                .catch((error) => {
                    updateFailure(dispatch, error);
                });
        });
};

const updateSuccess = (dispatch, type) => {
    dispatch({ type: COMPLETE_TOUR_SUCCESS, tourCompleteStatus: type });
    console.log('updateSuccess', type);
    Toast.show({
        text: `Tour ${type}`,
        position: 'bottom',
        buttonText: 'Okay',
        type: 'success',
        duration: 5000
    });
};

const updateFailure = (dispatch, error) => {
    const errorCode = error.code;
    dispatch({ type: COMPLETE_TOUR_FAIL });
    Toast.show({
        text: errorCode,
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
};
