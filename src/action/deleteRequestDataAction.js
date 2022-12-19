import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import {
    DELETE_REQUEST_DATA,
    DELETE_REQUEST_DATA_SUCCESS,
    DELETE_REQUEST_DATA_FAIL
} from './types';

const db = firebase.firestore();

export const deleteRequestData = (requestTourId, tourRequestedById, tourId) => (dispatch) => {
    const currentUser = firebase.auth().currentUser;
    dispatch({
        type: DELETE_REQUEST_DATA
    });
    if (currentUser !== null) {
        db.collection('tours').doc(tourId)
            .get()
            .then((doc) => {
                console.log('doc', doc, doc.data().requestedClients, doc.data().requestedClients.length);
                if (doc.data().requestedClients.length > 0) {
                    doc.data().requestedClients.map((delClient, index) => {
                        console.log('delClient', delClient);
                        console.log('check', delClient.tourRequestedById !== tourRequestedById);
                        if (delClient.tourRequestedById === tourRequestedById) {
                            console.log('equal', delClient.tourRequestedById === tourRequestedById);
                            doc.data().requestedClients.splice(index, 1);
                            console.log('remainAgents', doc.data().requestedClients);
                            db.collection('tours').doc(tourId).update({
                                requestedClients: doc.data().requestedClients
                            })
                                .then(() => {
                                    console.log('then', doc.data().requestedClients);
                                    db.collection('requestTour').doc(requestTourId).delete()
                                        .then(() => {
                                            console.log('deleted requestTour');
                                            dispatch({
                                                type: DELETE_REQUEST_DATA_SUCCESS,
                                                deleteStatus: 'deleted'
                                            });
                                            Toast.show({
                                                text: 'Deleted request tour data',
                                                position: 'bottom',
                                                buttonText: 'Okay',
                                                type: 'success',
                                                duration: 5000
                                            });
                                        })
                                        .catch((error) => {
                                            dispatch({
                                                type: DELETE_REQUEST_DATA_FAIL,
                                                payload: error
                                            });
                                        });
                                })
                                .catch((err) => {
                                    dispatch({
                                        type: DELETE_REQUEST_DATA_FAIL,
                                        payload: err
                                    });
                                });
                        } else {
                            dispatch({
                                type: DELETE_REQUEST_DATA_FAIL,
                                payload: doc.data().requestedClients
                            });
                        }
                    });
                } else {
                    dispatch({
                        type: DELETE_REQUEST_DATA_FAIL,
                        payload: ''
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_REQUEST_DATA_FAIL,
                    payload: error
                });
            });
    }
};
