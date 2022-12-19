import firebase from 'react-native-firebase';
import axios from 'axios'; 
import _ from 'lodash';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import {
    GET_USER_DETAIL,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL,
    GET_JOB_APPROVED_DETAILS,
    GET_JOB_APPROVED_DETAILS_SUCCESS,
    GET_JOB_APPROVED_DETAILS_FAIL,
    NEAR_BY_AGENTS,
    NEAR_BY_AGENTS_SUCCESS,
    NEAR_BY_AGENTS_FAILURE

} from './types';

const Apikey = 'AIzaSyAeODubKk9sups2xh8yXBVWgM1UHJCUSe4';

const db = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(db);

export const getUserDetails = () => (dispatch) => {
    const userDetails = [];
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        dispatch({ type: GET_USER_DETAIL });
        db.collection('offers')
            .where('createdBy', '==', currentUser.uid)
            .get()
            .then((data) => {
                if (data.size === 0) {
                    dispatch({
                        type: GET_USER_DETAIL_FAIL,
                        payload: userDetails,
                    });
                } else {
                    data.forEach((doc) => {
                         db.collection('users')
                         .get()
                         .then((value) => {
                             value.forEach((val) => {
                                if (val.data().role === 'Agent' || 'Broker') {
                                if (val.data().uid === doc.data().agentId) {
                                    const {
                                        email,
                                        password,
                                        fullName,
                                        phone,
                                        role,
                                        address,
                                        serviceArea,
                                        languages,
                                        imageData,
                                        experience,
                                        description,
                                        brokerageName,
                                        brokerName,
                                        brokerageLicense,
                                        agentLicense,
                                        id,
                                        jobId,
                                        pushToken,
                                        setting,
                                        uid,
                                        ratingCount,
                                        videoUrl,
                                        gallery
                                    } = val.data();
                                    const obj = {
                                        email,
                                        password,
                                        fullName,
                                        phone,
                                        role,
                                        address,
                                        serviceArea,
                                        languages,
                                        imageData,
                                        experience,
                                        description,
                                        brokerageName,
                                        brokerName,
                                        brokerageLicense,
                                        agentLicense,
                                        id,
                                        jobId,
                                        pushToken,
                                        setting,
                                        uid,
                                        fav: doc.data().fav,
                                        price: doc.data().budget,
                                        jobIdValue: doc.data().jobId,
                                        jobTitle: doc.data().jobTitle,
                                        offerId: doc.id,
                                        createdAt: doc.data().createdAt,
                                        fileName: doc.data().fileName,
                                        fileSize: doc.data().fileSize,
                                        fileUrl: doc.data().url,
                                        agentId: doc.data().agentId,
                                        agentName: doc.data().agentName,
                                        jobsCreatedBy: doc.data().createdBy,
                                        endDate: doc.data().endDate,
                                        startDate: doc.data().startDate,
                                        ratingCount: doc.data().ratingCount,
                                        videoUrl,
                                        gallery,
                                        docId: doc.id,
                                        milestone: doc.data().milestone
                                };
                                    userDetails.push(obj);
                                    }
                                }
                             });
                            
                             if (data.size === userDetails.length) {
                                const temp = _.orderBy(userDetails, ['createdAt'], ['desc']);
                                dispatch({
                                    type: GET_USER_DETAIL_SUCCESS,
                                    payload: temp,
                                });
                            }
                         })
                         .catch((err) => {
                            dispatch({
                                type: GET_USER_DETAIL_FAIL,
                                payload: err,
                            });
                         }); 
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_DETAIL_FAIL,
                    payload: error,
                });
            });
    } else {
        dispatch({
            type: GET_USER_DETAIL_FAIL,
            payload: userDetails,
        });
    }
};

export const nearbyAgents = (address) => {
    console.log('adrs', address);
    return (dispatch) => {
        console.log('adrs112');
        dispatch({ type: NEAR_BY_AGENTS });
        console.log('adrs112');

        axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${Apikey}`).then((mapdata) => {
            console.log('adrs1', mapdata);
           const lat = mapdata.data.results[0].geometry.location.lat;
           const lang = mapdata.data.results[0].geometry.location.lng;
            const agentcollection: GeoCollectionReference = geofirestore.collection('location');
            const query: GeoQuery = agentcollection.near({ center: new firebase.firestore.GeoPoint(lat, lang), radius: 160 });
            // Get query (as Promise)
            query.get().then((value: GeoQuerySnapshot) => {
                let sugJobs = [];
                if (value.size > 0) {
                    value._querySnapshot.docs.forEach((data) => {
                        db.collection('users')
                            .where('uid', '==', data.data().d.Agentuid)
                            .get()
                            .then((docs) => {
                                console.log('adrs2', docs);
                                docs.forEach((doc) => {
                                    sugJobs.push(doc.data()); // All docs returned by GeoQuery
                                    if (value.size === sugJobs.length) {
                                        console.log('adrs3', sugJobs);
                                        dispatch({ type: NEAR_BY_AGENTS_SUCCESS, payload: sugJobs });
                                    }
                                });
                            })
                            .catch(() => {
                                dispatch({ type: NEAR_BY_AGENTS_SUCCESS, payload: sugJobs });
                            });
                    });
                } else {
                        dispatch({ type: NEAR_BY_AGENTS_FAILURE });
                }
            })
            .catch(() => {
                dispatch({ type: NEAR_BY_AGENTS_FAILURE });
            });
        })
        .catch(() => {
            dispatch({ type: NEAR_BY_AGENTS_FAILURE });
        });
    };
};


export const viewJobApprovedDetail = (jobId, jobApprovedById) => {
    console.log('jobApprovedById', jobApprovedById);
    return (dispatch) => {
        dispatch({ type: GET_JOB_APPROVED_DETAILS });
        db.collection('users')
            .where('uid', '==', jobApprovedById)
            .get()
            .then((value) => {
                value.forEach((doc) => {
                    dispatch({
                        type: GET_JOB_APPROVED_DETAILS_SUCCESS,
                        payload: doc.data()
                    });
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_JOB_APPROVED_DETAILS_FAIL,
                    payload: {}
                });
            });
    };
};