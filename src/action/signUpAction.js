import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import {
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    UPDATE_DETAILS,
    UPDATE_DETAILS_SUCCESS,
    UPDATE_DETAILS_FAIL
} from './types';

const db = firebase.firestore();
const FCM = firebase.messaging();


export const signup = (name, email, password, role) => (dispatch) => {
        dispatch({ type: SIGNUP });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const currentUser = firebase.auth().currentUser;
                if (currentUser !== null) {
                    db.collection('users').add({
                        fullName: name,
                        email,
                        role,
                        uid: currentUser.uid,
                        brokerageName: '',
                        address: '',
                        phone: '',
                        brokerName: '',
                        brokerageLicense: '',
                        agentLicense: '',
                        description: '',
                        serviceArea: '',
                        languages: '',
                        experience: [],
                        imageData: '',
                        id: '',
                        location: '',
                        jobId: [],
                        setting: {
                            notification: true,
                            // offerValue: true,  //offers notification
                            // soundCheckedInOffers: true, // Offers sound
                            // messageCheckedInOffers: true,
                            // messageValue: true, //message notification
                            // soundCheckedInMessage: true, // Message sound
                            // messageCheckedInMessage: true,
                        },
                        ratingCount: 0,
                        gallery: [],
                        createdAt: Date.now()
                    }).then((doc) => {
                        let tokenVal;
                        FCM.requestPermission()
                                   .then(() => {
                                   FCM.hasPermission()
                                   .then(enabled => {
                                   if (enabled) {
                                    FCM.getToken().then(token => {
                                        tokenVal = token;
                                        console.log(token, 'token signup');
                                        // stores the token in the user's document
                                        db.collection('users').doc(doc.id).update({ pushToken: token });
                                    });
                                } else {
                                    console.log('denied');
                                }
                            const userdata = {
                                fullName: name,
                                email,
                                role,
                                uid: currentUser.uid,
                                brokerageName: '',
                                address: '',
                                phone: '',
                                brokerName: '',
                                brokerageLicense: '',
                                agentLicense: '',
                                description: '',
                                serviceArea: '',
                                languages: '',
                                experience: [],
                                imageData: '',
                                id: doc.id,
                                jobId: [],
                                setting: {
                                    notification: true,
                                    // offerValue: true,  //offers notification
                                    // soundCheckedInOffers: true, // Offers sound
                                    // messageCheckedInOffers: true,
                                    // messageValue: true, //message notification
                                    // soundCheckedInMessage: true, // Message sound
                                    // messageCheckedInMessage: true,
                                },
                                pushToken: tokenVal,
                                ratingCount: 0,
                                gallery: []
                            };
                            AsyncStorage.setItem('userdata', JSON.stringify(userdata)).then(() => {
                                signupUserSuccess(dispatch, user, userdata);
                                Toast.show({
                                    text: 'Account Created Successfully!!!',
                                    position: 'bottom',
                                    buttonText: 'Okay',
                                    duration: 5000
                                });
                            });
                        });
                    });
                    }).catch((error) => {
                        signupUserFail(dispatch, user);
                        Toast.show({
                            text: 'Authentication Failed',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000
                        });
                    });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        // do something
                        Toast.show({
                            text: 'Already exists an account with the given email address',
                            position: 'bottom',
                            buttonText: 'Okay',
                            type: 'danger',
                            duration: 5000
                        });
                        break;
                    case 'auth/invalid-email':
                        Toast.show({
                            text: 'The email address is not valid',
                            position: 'bottom',
                            buttonText: 'Okay',
                            type: 'danger',
                            duration: 5000
                        });
                        break;
                    case 'auth/operation-not-allowed':
                        Toast.show({
                            text: 'Email/password accounts are not enabled',
                            position: 'bottom',
                            buttonText: 'Okay',
                            type: 'danger',
                            duration: 5000
                        });
                        break;
                    case 'auth/weak-password':
                        Toast.show({
                            text: 'The password is too weak.',
                            position: 'bottom',
                            buttonText: 'Okay',
                            type: 'danger',
                            duration: 5000
                        });
                        break;
                    case 'auth/unknown':
                        Toast.show({
                            text: 'Network error.',
                            position: 'bottom',
                            buttonText: 'Okay',
                            type: 'danger',
                            duration: 5000
                        });
                        break;
                    default:
                        Toast.show({
                            text: errorMessage,
                            position: 'bottom',
                            buttonText: 'Okay',
                            type: 'danger',
                            duration: 5000
                        });
                    // handle other codes ...
                }
                signupUserFail(dispatch, error);
            });
    };

const signupUserSuccess = (dispatch, user, userdata) => {
    dispatch({ type: SIGNUP_SUCCESS, payload: user, userdata });
};

const signupUserFail = (dispatch, user) => {
    dispatch({ type: SIGNUP_FAIL, payload: user });
};

//Update profile user data
export const updateProfileDetails = (data) => {
    console.log('updateProfileDetails', data);
    const currentUser = firebase.auth().currentUser;
    return (dispatch) => {
        const { currentUserId, fullName, email, address, phone, imageData, setting, videoUrl, gallery, location, description } = data;
        let details = {};
        // const jobId = [];
        dispatch({ type: UPDATE_DETAILS });
        console.log('currentUser', currentUser.uid, currentUserId);
            db.collection('users')
                .where('uid', '==', currentUser.uid)
                .get()
                .then((ref) => {
                    console.log('ref', ref);
                    if (ref.size === 0) {
                        updateDetailsFail(dispatch, details);
                    } else {
                        ref.forEach((doc) => {
                            console.log('doc', doc);
                            const val = doc.id;
                            console.log('val', val);
                            db.collection('users').doc(doc.id).update({
                                fullName,
                                uid: currentUser.uid,
                                email,
                                address,
                                phone,
                                imageData,
                                setting,
                                videoUrl,
                                gallery,
                                location,
                                description
                            }).then((res) => {
                                console.log('then', res);
                                const {
                                    role,
                                    brokerageName,
                                    brokerName,
                                    brokerageLicense,
                                    agentLicense,
                                    serviceArea,
                                    languages,
                                    experience,
                                    id,
                                    jobId,
                                    pushToken
                                } = doc.data();
                                details = {
                                    fullName,
                                    uid: currentUser.uid,
                                    setting,
                                    email,
                                    role,
                                    brokerageName,
                                    address,
                                    phone,
                                    brokerName,
                                    brokerageLicense,
                                    agentLicense,
                                    description,
                                    serviceArea,
                                    languages,
                                    experience,
                                    imageData,
                                    id,
                                    jobId,
                                    pushToken,
                                    videoUrl,
                                    gallery,
                                    location
                                };
                                console.log('details', details);
                                AsyncStorage.setItem('userdata', JSON.stringify(details)).then((refs) => {
                                    console.log('after asyn', refs);
                                    updateDetailsSuccess(dispatch, details);
                                    Toast.show({
                                        text: 'Details updated successfully!!!',
                                        position: 'bottom',
                                        buttonText: 'Okay',
                                        duration: 5000,
                                        type: 'success'
                                    });
                                });
                            })
                                .catch((error) => {
                                    console.log('error', error);
                                    updateDetailsFail(dispatch, error);
                                    Toast.show({
                                        text: 'Updating details failed',
                                        position: 'bottom',
                                        buttonText: 'Okay',
                                        duration: 5000,
                                        type: 'danger'
                                    });
                                });
                        });
                    }
                })
                .catch((err) => {
                    updateDetailsFail(dispatch, err);
                    Toast.show({
                        text: 'Updating details failed',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000,
                        type: 'danger'
                    });
                });
    };
};

const updateDetailsSuccess = (dispatch, details) => {
    dispatch({ type: UPDATE_DETAILS_SUCCESS, payload: details });
};

const updateDetailsFail = (dispatch, error) => {
    dispatch({ type: UPDATE_DETAILS_FAIL, payload: error });
};
