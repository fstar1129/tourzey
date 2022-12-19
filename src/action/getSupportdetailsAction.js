import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import {
    GET_SUPPORT_DATA,
    GET_SUPPORT_DATA_SUCCESS,
    GET_SUPPORT_USER_DATA_FAIL,
    CONTACT_US,
    CONTACT_US_SUCCESS,
    CONTACT_US_FAIL
} from './types';

const db = firebase.firestore();
export const getSupportdata = () => (dispatch) => {
    dispatch({ type: GET_SUPPORT_DATA });
    db.collection('supports')
        .where('role', '==', 'Client')
        .get()
        .then((value) => {
            if (value.size > 0) {
                console.log('sssssssss', value);
                const supportsDetail = [];
                value.forEach((doc) => {
                    console.log('ressss', doc.data());
                    supportsDetail.push(doc.data());
                    if (value.size === supportsDetail.length) {
                        console.log('yes', supportsDetail);
                        dispatch({ type: GET_SUPPORT_DATA_SUCCESS, payload: supportsDetail });
                    }
                });
            } else {
                dispatch({ type: GET_SUPPORT_USER_DATA_FAIL, payload: 'No data available' });
            }
        })
        .catch((error) => {
            dispatch({ type: GET_SUPPORT_USER_DATA_FAIL, payload: error });
        });
};

export const contactUs = (name, email, message, phone) => (dispatch) => {
    console.log('contactUs');
    dispatch({ type: CONTACT_US });
    db.collection('contactUs').add({
        name,
        email,
        message,
        phone,
        createdAt: Date.now()
    }).then((value) => {
        console.log('check contactUs', value);
        dispatch({ type: CONTACT_US_SUCCESS, payload: 'success' });
        Toast.show({
            text: 'Message sent successfully !!!',
            position: 'bottom',
            buttonText: 'Okay',
            duration: 5000
        });
    })
        .catch((error) => {
            dispatch({ type: CONTACT_US_FAIL, payload: error });
            Toast.show({
                text: 'can\'t able sent...',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            });
        });
};

