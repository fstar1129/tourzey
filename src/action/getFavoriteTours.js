
import firebase from 'react-native-firebase';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { Toast } from 'native-base';
import _ from 'lodash';
import axios from 'axios';
import {
    GET_FAVOURITE_TOURS,
    GET_FAVOURITE_TOURS_SUCCESS,
    GET_FAVOURITE_TOURS_FAIL
} from './types';

const db = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(db);
const Apikey = 'AIzaSyAeODubKk9sups2xh8yXBVWgM1UHJCUSe4';

export const getFavoriteTours = (uid) => (dispatch) => {
    console.log('name');
    dispatch({ type: GET_FAVOURITE_TOURS });
    fetchFavoriteTourData(uid).then((data) => {
        console.log(data, 'getFavoriteTours');
        dispatch({ type: GET_FAVOURITE_TOURS_SUCCESS, payload: data });
    })
        .catch((err) => {
            console.log(err, 'err getFavoriteTours');
            dispatch({ type: GET_FAVOURITE_TOURS_FAIL, payload: [] });
        });
};


const fetchFavoriteTourData = (uid) => {
    console.log('fetch', uid);
    return new Promise((resolve, reject) => {
        const dataVal = [];
        console.log('isCategory11', uid);
        db.collection('tours')
            .get()
            .then((value) => {
                value.forEach((doc) => {
                    console.log('doccu', doc.data());
                    db.collection('users')
                        .where('uid', '==', doc.data().userId)
                        .get()
                        .then(async (user) => {
                            await favoriteTourData(user._docs[0]._data, doc.id, doc.data(), uid)
                            .then((results) => {
                                console.log('results favoriteTourData', results, results.length, value.size);
                                dataVal.push(results);
                                if (dataVal.length === value.size) {
                                    const tourValues = dataVal.filter(val => Object.keys(val).length !== 0);
                                    const temp = _.orderBy(tourValues, ['createdAt'], ['desc']);
                                    console.log(temp, 'temp');
                                    resolve(temp);
                                }
                            })
                            .catch(() => {
                                reject([]);
                            });
                        })
                        .catch(() => {
                            reject([]);
                        });
                });
            })
            .catch(() => {
                reject([]);
            });
    });
};

const favoriteTourData = (user, tourId, tour, uid) => {
    return new Promise((resolve, reject) => {
        console.log(user, 'equal111111111');
        if (user.deleteStatus === undefined) {
            if (tour.deleteTourStatus === true) {
                resolve({});
            } else if (tour.adminApproval === 'approved') {
                console.log('approved obj', tour.adminApproval);
                if (_.includes(tour.favoritedBy, uid)) {
                    console.log('if favoritedBy');
                    const final = tour;
                    final.tourId = tourId;
                    final.guideDetails = user;
                    resolve(final);
                } else {
                    console.log('else');
                    resolve({});
                }
            } else {
                resolve({});
            }
        } else {
            resolve({});
        }
    });
};
