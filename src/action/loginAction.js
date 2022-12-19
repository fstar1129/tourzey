import {
    AsyncStorage
} from 'react-native';
import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from './types';


const db = firebase.firestore();
const FCM = firebase.messaging();
export const loginUser = ({ email, password }) => (dispatch) => {
    // dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log('loginnnn action', user);
            // FCM.requestPermissions();
            firebase.auth().currentUser.getIdToken().then((responseToken) => {
                const currentUser = firebase.auth().currentUser;
                console.log('currentUser', currentUser);
                if (currentUser != null) {
                    db.collection('users')
                    .where('uid', '==', currentUser.uid)
                        .get()
                        .then((querySnapshot) => {
                            if (querySnapshot.size > 0) {
                            querySnapshot.forEach((doc) => {
                                console.log('querySnapshot doc', doc);
                                const { role, activateStatus } = doc.data();
                                if (role === 'Client' || role === 'Guide') {
                                    console.log('querySnapshot doc', activateStatus);
                                    if (activateStatus !== false) {
                                   FCM.requestPermission()
                                   .then(() => {
                                   FCM.hasPermission()
                                   .then(enabled => {
                                   if (enabled) {
                                    FCM.getToken().then(token => {
                                        // stores the token in the user's document
                                        db.collection('users').doc(doc.id).update({ pushToken: token });
                                    });
                                } else {
                                    console.log('denied');
                                }
                            });
                        });
                                const value = doc.data();
                                 AsyncStorage.setItem('userdata', JSON.stringify(value)).then(async () => {
                                 loginUserSuccess(dispatch, user, value);
                                    Toast.show({
                                        text: 'Logged in  successfully !!!',
                                        position: 'bottom',
                                        buttonText: 'Okay',
                                        duration: 5000
                                    }); 
                                });
                            } else {
                                loginUserFail(dispatch, user);
                                Toast.show({
                                    text: 'Account deactivated! Please contact admin..',
                                    position: 'bottom',
                                    buttonText: 'Okay',
                                    duration: 5000,
                                    type: 'danger'
                                });
                            }
                            } else {
                                loginUserFail(dispatch, user);
                                Toast.show({
                                    text: 'User not found !!!',
                                    position: 'bottom',
                                    buttonText: 'Okay',
                                    duration: 5000
                                });
                            }
                            });
                        } else {
                            loginUserFail(dispatch, user);
                                Toast.show({
                                    text: 'User not found !!!',
                                    position: 'bottom',
                                    buttonText: 'Okay',
                                    duration: 5000
                            }); 
                        }
                        })
                        .catch(() => {
                            loginUserFail(dispatch, user);
                            Toast.show({
                                text: 'Authentication Failed',
                                position: 'bottom',
                                buttonText: 'Okay',
                                duration: 5000
                            });
                        });
                } else {
                    loginUserFail(dispatch, user);
                }
            });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            switch (errorCode) {
                case 'auth/invalid-email':
                    // do something
                    Toast.show({
                        text: 'The email address is not valid',
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: 'danger',
                        duration: 5000
                    });
                    break;
                case 'auth/wrong-password':
                    Toast.show({
                        text: 'Wrong username or password',
                        position: 'bottom',
                        buttonText: 'Okay',
                        type: 'danger',
                        duration: 5000
                    });
                    break;
                case 'auth/user-not-found':
                    Toast.show({
                        text: 'User not found',
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
            loginUserFail(dispatch, error);
        });
};

export const fbLogin = (credential) => (dispatch) => {
    //cr @jaga MI- check if credential there 
    // dispatch({ type: LOGIN_USER });
    if (credential) {
    firebase.auth()
    .signInAndRetrieveDataWithCredential(credential)
    .then(result => {
        const currentUser = firebase.auth().currentUser;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  if (result.additionalUserInfo.isNewUser) {
      //cr @jaga MI- remove console once it done 

    if (currentUser !== null) {
        db.collection('users').add({
            fullName: result.user._user.displayName,
            email: result.user._user.email,
            role: 'Client',
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
            imageData: { uri: result.user._user.photoURL },
            id: '',
            location: '',
            jobId: [],
            setting: {
                notification: true,
                offerValue: true,  //offers notification
                soundCheckedInOffers: true, // Offers sound
                messageCheckedInOffers: true,
                messageValue: true, //message notification
                soundCheckedInMessage: true, // Message sound
                messageCheckedInMessage: true,
            },
            ratingCount: 0,
            gallery: []
        }).then((doc) => {
            FCM.requestPermission()
            .then(() => {
            FCM.hasPermission()
            .then(enabled => {
            if (enabled) {
            FCM.getToken().then(token => {
                // stores the token in the user's document
                db.collection('users').doc(doc.id).update({ pushToken: token, id: doc.id });
                const userdata = {
                    fullName: result.user._user.displayName,
                    email: result.user._user.email,
                    role: 'Client',
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
                    location: '',
                    imageData: { uri: result.user._user.photoURL },
                    id: doc.id,
                    jobId: [],
                    setting: {
                        notification: true,
                        offerValue: true,  //offers notification
                        soundCheckedInOffers: true, // Offers sound
                        messageCheckedInOffers: true,
                        messageValue: true, //message notification
                        soundCheckedInMessage: true, // Message sound
                        messageCheckedInMessage: true,
                    },
                    pushToken: token,
                    ratingCount: 0,
                    gallery: []
                };
                AsyncStorage.setItem('userdata', JSON.stringify(userdata)).then(() => {
                    dispatch({ type: SIGNUP_SUCCESS, payload: 'Client', userdata });
                    Toast.show({
                        text: 'Account created successfully!!!',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000
                    });
                });
            });
        } else {
            console.log('denied');
        }
      })
      })
        }).catch((error) => {
            const ud = {};
            dispatch({ type: SIGNUP_FAIL, payload: 'Client', ud });
            Toast.show({
                text: 'Authentication Failed',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            });
        });
    } else {
        const ud = {};
        dispatch({ type: SIGNUP_FAIL, payload: 'Client', ud });
    }
  } else {
    if (currentUser != null) {
        db.collection('users')
        .where('uid', '==', currentUser.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { role } = doc.data();
                    if (role === 'Client' || role === 'Guide') {
                    FCM.getToken().then(token => {
                        // stores the token in the user's document
                        db.collection('users').doc(doc.id).update({ pushToken: token });
                       });
                    const value = doc.data();
                     AsyncStorage.setItem('userdata', JSON.stringify(value)).then(async () => {
                     loginUserSuccess(dispatch, 'Client', value);
                        Toast.show({
                            text: 'Logged in  successfully !!!',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000
                        });
                    });
                } else {
                    loginUserFail(dispatch, 'Client');
                    Toast.show({
                        text: 'User not found !!!',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000
                    });
                }
                });
            })
            .catch(() => {
                loginUserFail(dispatch, 'Client');
                Toast.show({
                    text: 'Authentication Failed',
                    position: 'bottom',
                    buttonText: 'Okay',
                    duration: 5000
                });
            });
    } else {
        loginUserFail(dispatch, 'Client');
    }
  }
  }).catch((error) => {
      console.log('err', error);
    // Handle Errors here.
    Toast.show({
        text: error.message,
        position: 'bottom',
        buttonText: 'Okay',
        type: 'danger',
        duration: 5000
    });
  });
} 
};


const loginUserSuccess = (dispatch, user, value) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: value, userType: user });
};

const loginUserFail = (dispatch, user) => {
    dispatch({ type: LOGIN_USER_FAIL, payload: user, navigateTo: 'Login' });
};
