import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import { FBLoginManager } from 'react-native-facebook-login';

import {
    USER_LOGGED_OUT, SIGNUP_FAIL
} from './types';

const db = firebase.firestore();

export const isSignedIn = () => {
    return (dispatch) => {
        AsyncStorage.getItem('userdata').then(async res => {
            if (res === null) {
                AsyncStorage.getItem('launchSeen').then(async result => {
                    console.log('signinres', res);
                    if (result === null) {
                        await dispatch({
                            type: 'is_signed_in_fail',
                            checkedSignIn: true,
                            navigateTo: 'Launch1',
                        });
                    } else {
                        await dispatch({
                            type: 'is_signed_in_fail',
                            checkedSignIn: true,
                            navigateTo: 'LaunchScreen',
                        });
                    }
                 });
            } else {
              await dispatch({
                    type: 'is_signed_in_success',
                    checkedSignIn: true,
                    navigateTo: 'Home',
                    userData: JSON.parse(res)
                });
                }
        }).catch(err => {
                console.log(err, 'isSignedIn error');
        });
    };
};

export const LogoutUser = () => {
    const currentUser = firebase.auth().currentUser;
    return (dispatch) => {
        if (currentUser !== null) {
            db.collection('users')
            .where('uid', '==', currentUser.uid)
            .get()
            .then((value) => {
                value.forEach((doc) => {
                    firebase.auth().signOut().then(async () => {
                        await AsyncStorage.multiRemove(['userdata', 'notification', 'loginData', 'signupData'])
                        .then(() => {
                            db.collection('users').doc(doc.id).update({
                                pushToken: firebase.firestore.FieldValue.delete()
                            });
                            FBLoginManager.logout(() => { console.log('Logout facebook ok!')});
                        dispatch({
                            type: 'login_user_fail',
                            checkedSignIn: true,
                            navigateTo: 'LaunchScreen',
                            userData: null
                        });
                        dispatch({ type: SIGNUP_FAIL, payload: null });
                        dispatch({
                            type: USER_LOGGED_OUT,
                            checkedSignIn: true,
                            navigateTo: 'LaunchScreen',
                            userData: null
                        });
                    });
                })
                .catch((err) => {
                    const errorCode = err.code;
                    Toast.show({
                        text: errorCode,
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000
                    });
                });
                });
            });
        }
    };
};
