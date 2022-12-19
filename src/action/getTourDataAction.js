import firebase from 'react-native-firebase';
import _ from 'lodash';
import axios from 'axios';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { isStringEmpty } from '../utils/checkEmptycondition';
import {
    GET_TOUR_DATA,
    GET_TOUR_DATA_SUCCESS,
    GET_TOUR_DATA_FAIL
} from './types';
import { getData } from './checkdataAction';

const db = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(db);
const Apikey = 'AIzaSyAeODubKk9sups2xh8yXBVWgM1UHJCUSe4';


export const getToursData = (location) => (dispatch) => {
    console.log('location', location);

    if (isStringEmpty(location)) {
        dispatch({ type: GET_TOUR_DATA });
        const currentUser = firebase.auth().currentUser;
        if (currentUser !== null) {
            axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${Apikey}`)
                .then((mapdata) => {
                    console.log('mapdata', mapdata);
                    const lat = mapdata.data.results[0].geometry.location.lat;
                    const lang = mapdata.data.results[0].geometry.location.lng;
                    // Create a GeoCollection reference
                    const agentcollection: GeoCollectionReference = geofirestore.collection('tourlocation');
                    const query: GeoQuery = agentcollection.near({ center: new firebase.firestore.GeoPoint(lat, lang), radius: 50 });
                    // Get query (as Promise)
                    query.get()
                        .then((value: GeoQuerySnapshot) => {
                            const tourData = [];
                            if (value.size > 0) {
                                value._querySnapshot.docs.forEach((data) => {
                                    console.log('dataaa', data);
                                    db.collection('tours')
                                        .doc(data.data().d.jobid)
                                        .get()
                                        .then((docs) => {
                                            console.log('doccu', docs.data());
                                            db.collection('users')
                                                .where('uid', '==', docs.data().userId)
                                                .get()
                                                .then((guideData) => {
                                                    console.log('guideData', guideData, guideData._docs[0]._data);
                                                    getData.allContracts(docs.id)
                                                        .then((contracts) => {
                                                            console.log('contracts', contracts);
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
                                                            } = docs.data();
                                                            const obj = {
                                                                contractDetails: contracts ? contracts : [],
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
                                                                tourId: docs.id,
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
                                                            console.log('all obj', obj);
                                                            if (guideData._docs[0]._data.deleteStatus === undefined) {
                                                                console.log('deleteStatus', guideData._docs[0]._data.deleteStatus);
                                                                console.log('deleteStatus obj', (adminApproval === 'approved' && (deleteTourStatus === undefined)) || (adminApproval === 'rejected' && (deleteTourStatus === undefined)) || (deleteTourStatus === undefined) || (adminApproval !== undefined && deleteTourStatus === undefined), obj);
                                                                if (deleteTourStatus === true) {
                                                                    tourData.push({});
                                                                } else if (adminApproval === 'approved') {
                                                                    console.log('approved obj', obj);
                                                                    tourData.push(obj);
                                                                } else {
                                                                    tourData.push({});
                                                                }
                                                            } else {
                                                                tourData.push({});
                                                            }
                                                            console.log('getTourData', tourData, value.size, tourData.length, value.size === tourData.length);
                                                            if (value.size === tourData.length) {
                                                                const tourValues = tourData.filter(val => Object.keys(val).length !== 0);
                                                                const temp = _.orderBy(tourValues, ['createdAt'], ['desc']);
                                                                dispatch({
                                                                    type: GET_TOUR_DATA_SUCCESS,
                                                                    payload: temp,
                                                                });
                                                            }
                                                        })
                                                        .catch(() => {
                                                            dispatch({
                                                                type: GET_TOUR_DATA_FAIL,
                                                                payload: [],
                                                            });
                                                        });
                                                })
                                                .catch(() => {
                                                    dispatch({
                                                        type: GET_TOUR_DATA_FAIL,
                                                        payload: [],
                                                    });
                                                });
                                        })
                                        .catch((error) => {
                                            console.log('error1111', error);
                                            dispatch({
                                                type: GET_TOUR_DATA_FAIL,
                                                payload: [],
                                            });
                                        });
                                });
                            } else {
                                dispatch({
                                    type: GET_TOUR_DATA_FAIL,
                                    payload: [],
                                });
                            }
                        })
                        .catch(() => {
                            dispatch({
                                type: GET_TOUR_DATA_FAIL,
                                payload: [],
                            });
                        });
                })
                .catch(() => {
                    dispatch({
                        type: GET_TOUR_DATA_FAIL,
                        payload: [],
                    });
                });
        } else {
            dispatch({
                type: GET_TOUR_DATA_FAIL,
                payload: [],
            });
        }
    } else {
        dispatch({
            type: GET_TOUR_DATA_FAIL,
            payload: [],
        });
    }
};
