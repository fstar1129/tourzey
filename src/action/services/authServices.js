import firebase from 'react-native-firebase';
import axios from 'axios';
import _ from 'lodash';
import { requestingTourUrl, paymentNotifyUrl, completedTourUrl, commonEmailUrl } from '../../utils/constants';


const db = firebase.firestore();
export const authService = {
    requestingTour: (pushToken, tourId, email, clientName, userId) => {
        const params = {
            tourId,
            token: pushToken,
            clientName,
            sendTo: email,
            subject: 'Request for your Tour',
            status: clientName + ' requesting your tour!',
            userId,
            page: 'RequestDetailScreen'
        };
        authService.addNotification(params)
        .then((docId) => {
            params.notificationId = docId;
        const value = JSON.stringify(params);
        return new Promise((resolve, reject) => {
            axios.post(requestingTourUrl + value)
            .then(() => {
                resolve('success');
            })
            .catch((error) => {
                reject(error);
            });
            axios.post(commonEmailUrl + value)
            .then(() => {
                resolve('success');
            })
            .catch((error) => {
                reject(error);
            });
        });
    });
    },
    paymentNotify: (tourId, pushToken, email, userId) => {
        const params = {
            tourId,
            token: pushToken,
            sendTo: email,
            subject: 'Payment received for your tour',
            status: "Your tour's payment successfully paid!",
            userId,
            page: 'RequestDetailScreen'
        };
        authService.addNotification(params)
        .then((docId) => {
            params.notificationId = docId;
        const value = JSON.stringify(params);
        return new Promise((resolve, reject) => {
            axios.post(paymentNotifyUrl + value)
            .then(() => {
                resolve('success');
            })
            .catch((error) => {
                reject(error);
            });
            axios.post(commonEmailUrl + value)
            .then(() => {
                resolve('success');
            })
            .catch((error) => {
                reject(error);
            });
        });
    });
    },
    completedTour: (clientName, guidePushtoken, tourName, tourId, email, userId) => {
        const params = {
            tourId,
            token: guidePushtoken,
            name: clientName,
            tourName,
            user: 'Client',
            sendTo: email,
            subject: 'Your tour is completed',
            status: tourName + " tour is Completed by " + clientName,
            userId,
            page: 'CompletedTours'
        };
        authService.addNotification(params)
        .then((docId) => {
            params.notificationId = docId;
        const value = JSON.stringify(params);
        return new Promise((resolve, reject) => {
            axios.post(completedTourUrl + value)
            .then(() => {
                resolve('success');
            })
            .catch((error) => {
                reject(error);
            });
            axios.post(commonEmailUrl + value)
            .then(() => {
                resolve('success');
            })
            .catch((error) => {
                reject(error);
            });
        });
    });
    },
    getCurrentuserToken: (userId) => {
        console.log('detailsusertoken', userId);
        return new Promise((resolve, reject) => {
            db.collection('users')
            .where('uid', '==', userId)
            .get()
            .then((details) => {
                console.log('detailsusertoken', details);
                if (details.size > 0) {
                    details.forEach((doc) => {
                        const { pushToken, fullName, setting, email, activateStatus } = doc.data();
                        const temp = {
                            pushToken: pushToken || '',
                            fullName,
                            setting,
                            email,
                            userId,
                            activateStatus
                        };
                        resolve(temp);
                    });
                }
            })
            .catch((error) => {
               reject(error); 
            });
        });
    },
    addNotification: (data) => {
        return new Promise((resolve, reject) => {
            db.collection('notifications')
                .add({
                    createdAt: Date.now(),
                    ownerId: data.userId,
                    userSeen: false,
                    title: data.subject,
                    body: data.status,
                    tourId: data.tourId,
                    email: data.sendTo,
                    page: data.page
                })
                .then((doc) => {
                    resolve(doc.id);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

