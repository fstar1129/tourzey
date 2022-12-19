import firebase from 'react-native-firebase';

import {
    GET_ALL_NOTIFICATION,
    GET_ALL_NOTIFICATION_SUCCESS,
    GET_ALL_NOTIFICATION_FAIL,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAIL,
    UPDATE_NOTIFICATION_SUCCESS,
    UPDATE_NOTIFICATION_FAIL,
    GET_NOTIFICATION_COUNT_SUCCESS,
    GET_NOTIFICATION_COUNT_FAIL
} from './types';
import { toastMessagesuccess } from '../utils/showMessage';
const db = firebase.firestore();

export const getOwnNotifications = () => (dispatch) => {
    try {
        if (firebase.auth().currentUser !== null) {
            dispatch({ type: GET_ALL_NOTIFICATION });
            db.collection('notifications')
                .where('ownerId', '==', firebase.auth().currentUser.uid)
                .onSnapshot({ includeMetadataChanges: true }, (notifyResult) => {
                    const notifications = [];
                    if (notifyResult.size > 0) {
                        notifyResult.forEach((doc) => {
                            const { createdAt, ownerId, userSeen, body, email, title, tourId, page, messageData } = doc.data();
                            const tempData = {
                                createdAt,
                                ownerId,
                                userSeen,
                                body,
                                dataId: doc.id,
                                email,
                                title,
                                tourId: tourId ? tourId : '',
                                page,
                                messageData: messageData ? messageData : {}
                            }
                            notifications.push(tempData);

                            if (notifications.length === notifyResult.size) {
                                /*Pass success data  */
                                passSuccessData(dispatch, GET_ALL_NOTIFICATION_SUCCESS, notifications);
                            }
                        });
                    } else {
                        /*Pass success data  */
                        passSuccessData(dispatch, GET_ALL_NOTIFICATION_SUCCESS, notifications);
                    }
                }, () => {
                    /*Pass failed data  */
                    passFailedData(dispatch, GET_ALL_NOTIFICATION_FAIL);
                });
        } else {
            /*Pass failed data  */
            passFailedData(dispatch, GET_ALL_NOTIFICATION_FAIL);
        }
    } catch (err) {
        /*Pass failed data  */
        passFailedData(dispatch, GET_ALL_NOTIFICATION_SUCCESS);
    }
};

export const deleteNotification = (notifications) => (dispatch) => {
    db.collection('notifications')
        .doc(notifications.dataId)
        .delete().then((res) => {
            toastMessagesuccess('Notification deleted successfully!');
            dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: DELETE_NOTIFICATION_FAIL, payload: err });
        });
};

export const updateSeenStatus = (id) => (dispatch) => {
    const Ref = db.collection('notifications').doc(id);
    Ref.update({ userSeen: true })
        .then((res) => {
            dispatch({ type: UPDATE_NOTIFICATION_SUCCESS, payload: res });
        }).catch((err) => {
            dispatch({ type: UPDATE_NOTIFICATION_FAIL, payload: err });
        });
};

/*Pass success data  */
const passSuccessData = (dispatch, type, payload) => {
    dispatch({
        type,
        payload
    });
};

/*Pass failed data  */
const passFailedData = (dispatch, type, payload) => {
    dispatch({
        type,
        payload
    });
};

export const getUnseenNotificationCount = () => (dispatch) => {
    if (firebase.auth().currentUser !== null) {
        db.collection('notifications')
            .where('ownerId', '==', firebase.auth().currentUser.uid)
            .where('userSeen', '==', false)
            .onSnapshot({ includeMetadataChanges: true }, (notifyResult) => {
                dispatch({ type: GET_NOTIFICATION_COUNT_SUCCESS, payload: notifyResult.size });
            });
    } else {
        dispatch({ type: GET_NOTIFICATION_COUNT_FAIL });
    }
}