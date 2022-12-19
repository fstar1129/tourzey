import firebase from 'react-native-firebase';
import _ from 'lodash';
// import axios from 'axios';
// import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
// import { isStringEmpty } from '../utils/checkEmptycondition';
import {
    GET_APPROVED_TOUR_DATA,
    GET_APPROVED_TOUR_DATA_SUCCESS,
    GET_APPROVED_TOUR_DATA_FAIL,
    GET_CATEGORY_TOURS,
    GET_CATEGORY_TOURS_SUCCESS,
    GET_CATEGORY_TOURS_FAIL
} from './types';
import { getData } from './checkdataAction';

const db = firebase.firestore();
// const geofirestore: GeoFirestore = new GeoFirestore(db);
// const Apikey = 'AIzaSyAeODubKk9sups2xh8yXBVWgM1UHJCUSe4';

export const getApprovedTours = () => (dispatch) => {
    dispatch({ type: GET_APPROVED_TOUR_DATA });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        const tourData = [];
        db.collection('tours')
            .get()
            .then(async (value) => {
                console.log('value getApprovedTours', value.size);
                await value.forEach((doc) => {
                    console.log('value userId', doc.data().userId);
                    db.collection('users')
                        .where('uid', '==', doc.data().userId)
                        .get()
                        .then(async (guideData) => {
                            console.log('guideData', guideData, guideData._docs[0]._data);
                            console.log('size', guideData.size);
                            await getData.allContracts(doc.id)
                                .then(async (contracts) => {
                                    console.log('contracts');
                                    const {
                                        requestedClients,
                                        approvedClients,
                                        averageRatingCount,
                                        createdAt,
                                        postedBy,
                                        tourDesc,
                                        tourLocation,
                                        tourName,
                                        tourPrice,
                                        tourService,
                                        tourImageUrl,
                                        tourVideoUrl,
                                        userId,
                                        adminApproval,
                                        favoritedBy,
                                        deleteTourStatus,
                                        transportFacility,
                                        lodgeFacility
                                    } = doc.data();
                                    const obj = {
                                        contractDetails: contracts || [],
                                        createdAt,
                                        requestedClients,
                                        approvedClients,
                                        postedBy,
                                        tourDesc,
                                        tourLocation,
                                        tourName,
                                        tourPrice,
                                        tourService,
                                        tourImageUrl,
                                        userId,
                                        averageRatingCount,
                                        tourId: doc.id,
                                        guideRating: guideData._docs[0]._data.ratingCount,
                                        guideCertified: guideData._docs[0]._data.certified,
                                        deleteStatus: guideData._docs[0]._data.deleteStatus,
                                        adminApproval,
                                        favoritedBy,
                                        tourVideoUrl,
                                        deleteTourStatus,
                                        transportFacility,
                                        lodgeFacility
                                    };
                                    await getTours(obj, guideData._docs[0]._data)
                                        .then((results) => {
                                            console.log('getTourData', results);
                                            tourData.push(results);
                                            if (value.size === tourData.length) {
                                                const tourValues = tourData.filter(val => Object.keys(val).length !== 0);
                                                const temp = _.orderBy(tourValues, ['createdAt'], ['desc']);
                                                console.log('temp1111', temp, temp.length);
                                                let approvedTour = [];
                                                if (temp.length > 10) {
                                                    approvedTour = temp.slice(0, 10);
                                                } else {
                                                    approvedTour = temp;
                                                }
                                                console.log('temp after slice', approvedTour);
                                                dispatch({
                                                    type: GET_APPROVED_TOUR_DATA_SUCCESS,
                                                    payload: approvedTour,
                                                });
                                            }
                                        })
                                        .catch(() => {
                                            dispatch({
                                                type: GET_APPROVED_TOUR_DATA_FAIL,
                                                payload: [],
                                            });
                                        });
                                })
                                .catch(() => {
                                    dispatch({
                                        type: GET_APPROVED_TOUR_DATA_FAIL,
                                        payload: [],
                                    });
                                });
                        })
                        .catch(() => {
                            dispatch({
                                type: GET_APPROVED_TOUR_DATA_FAIL,
                                payload: [],
                            });
                        });
                });
            })
            .catch((error) => {
                console.log('error1111', error);
                dispatch({
                    type: GET_APPROVED_TOUR_DATA_FAIL,
                    payload: [],
                });
            });
    } else {
        dispatch({
            type: GET_APPROVED_TOUR_DATA_FAIL,
            payload: [],
        });
    }
};

const getTours = (details, guideDetail) => {
    return new Promise((resolve, reject) => {
        console.log('all getTours', details);
        if (guideDetail.deleteStatus === undefined) {
            console.log('deleteStatus', guideDetail.deleteStatus);
            if (details.deleteTourStatus === true) {
                resolve({});
            } else if (details.adminApproval === 'approved') {
                console.log('approved obj', details);
                resolve(details);
            } else {
                resolve({});
            }
        } else {
            resolve({});
        }
    });
};

export const getCategoryTours = (isCategory, name) => (dispatch) => {
    console.log(isCategory, name, 'getCategoryTours');
    dispatch({ type: GET_CATEGORY_TOURS });
    fetchCategoryTourData(isCategory, name).then((data) => {
        console.log(data, 'fetchTourData');
        dispatch({ type: GET_CATEGORY_TOURS_SUCCESS, payload: data });
    })
        .catch((err) => {
            console.log(err, 'err findTours');
            dispatch({ type: GET_CATEGORY_TOURS_FAIL, payload: [] });
        });
};


const fetchCategoryTourData = (isCategory, name) => {
    console.log('fetch', isCategory, name);
    return new Promise((resolve, reject) => {
        const dataVal = [];
        if (isCategory === true) {
            console.log('isCategory11', isCategory, name);
            db.collection('tours')
                .get()
                .then((value) => {
                    value.forEach((doc) => {
                        console.log('doccu', doc.data());
                        db.collection('users')
                            .where('uid', '==', doc.data().userId)
                            .get()
                            .then(async (user) => {
                                console.log(doc.data().tourService[0],
                                    doc.data().adminApproval,
                                    doc.data().tourService[0] === name,
                                    name, user, 'equal');
                                console.log('userDocs', user._docs[0]._data);
                                await categoryTourData(user._docs[0]._data, doc.id, doc.data(), name)
                                    .then((results) => {
                                        console.log(results, 'results');
                                        dataVal.push(results);
                                        console.log(dataVal, 'dataVal');
                                        if (dataVal.length === value.size) {
                                            const tourValues = dataVal.filter(val => Object.keys(val).length !== 0);
                                            const temp = _.orderBy(tourValues, ['createdAt'], ['desc']);
                                            let categoryTour;
                                            if (temp.length > 10) {
                                                categoryTour = temp.slice(0, 10);
                                            } else {
                                                categoryTour = temp;
                                            }
                                            console.log(categoryTour, 'categoryTour');
                                            resolve(categoryTour);
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
                .catch((err) => {
                    reject([]);
                });
        }
    });
};



const categoryTourData = (user, tourId, tour, categoryName) => {
    return new Promise((resolve, reject) => {
        if (user.deleteStatus === undefined) {
            if (tour.deleteTourStatus === true) {
                resolve({});
            } else if (tour.adminApproval === 'approved') {
                console.log('approved obj', tour.adminApproval);
                if (tour.tourService[0] === categoryName) {
                    console.log('if tourService');
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

