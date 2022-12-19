import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import {
    GET_USERDATA_FAIL, GET_USERDATA_SUCCESS
} from './types';

const db = firebase.firestore();

export const fetchData = () => {
    return (dispatch) => {
        AsyncStorage.getItem('userdata').then(async res => {
            if (res === null) {
                await dispatch({
                    type: GET_USERDATA_FAIL,
                    userData: null
                });
            } else {
                const data = JSON.parse(res);
                await dispatch({
                    type: GET_USERDATA_SUCCESS,
                    userData: data,
                });
            }
        }).catch(err => {
            console.log(err);
        });
    };
};

export const getData = {
    contracts: (tourId) => {
        return new Promise((resolve, reject) => {
            const currentUser = firebase.auth().currentUser;
            if (currentUser != null) {
                db.collection('contracts')
                    .where('tourId', '==', tourId)
                    .where('approvedClientId', '==', currentUser.uid)
                    .get()
                    .then((ref) => {
                        if (ref.size > 0) {
                            ref.forEach((docs) => {
                                resolve(docs.data());
                            });
                        } else {
                            reject('No data found');
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } else {
                reject('No data found');
            }
        });
    },
    allContracts: (tourId) => {
        console.log('allContracts', tourId);
        return new Promise((resolve, reject) => {
            db.collection('contracts')
                .where('tourId', '==', tourId)
                .get()
                .then((ref) => {
                    console.log('ref', ref);
                    const contracts = [];
                    if (ref.size > 0) {
                        ref.forEach((docs) => {
                            contracts.push(docs.data());
                            if (ref.size === contracts.length) {
                                resolve(contracts);
                            }
                        });
                    } else {
                        resolve([]);
                    }
                })
                .catch((error) => {
                    reject([]);
                });
        });
    },

};

