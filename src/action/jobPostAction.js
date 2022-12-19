import firebase from 'react-native-firebase';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { Toast } from 'native-base';
import axios from 'axios';
import {
    JOB_POST,
    JOB_POST_SUCCESS,
    JOB_POST_FAIL,
    LOGIN_USER_SUCCESS,
} from './types';

// const Apikey = 'AIzaSyDiUr3jJTboD0MdR7qijhzTkoHYSyAj8ak';
const Apikey = 'AIzaSyAeODubKk9sups2xh8yXBVWgM1UHJCUSe4';


const db = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(db);

export const jobPost = (obj) => {
    let lang = '';
    let lat = '';
    return (dispatch) => {
        dispatch({ type: JOB_POST });
        const currentUser = firebase.auth().currentUser;
        if (currentUser !== null) {
            const address = obj.location;
            axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${Apikey}`)
                .then((mapdata) => {
                    console.log('mapdata', mapdata);
                    lat = mapdata.data.results[0].geometry.location.lat;
                    lang = mapdata.data.results[0].geometry.location.lng;
                    db.collection('jobs').add({
                        tourLocation: obj.location,
                        tourName: obj.tourName,
                        tourDesc: obj.tourDesc,
                        tourStartDate: obj.fromDate,
                        tourEndDate: obj.toDate,
                        tourService: obj.service,
                        tourPrice: obj.price,
                        postedBy: obj.postedBy,
                        tourPostDate: obj.tourPostDate,
                        userId: currentUser.uid,
                        type: obj.type,
                        hired: obj.hired,
                        hiredAgent: obj.hiredAgent,
                        jobVideo: obj.jobVideo,
                        createdAt: new Date(),
                        jobAppliedBy: obj.jobAppliedBy,
                        starCountagent: 0,
                        starCountclient: 0,
                        rateAgent: false,
                        rateClient: false,
                        agreedBy: '',
                        archievedBy: []
                    })
                        .then((details) => {
                            const jobsLocationData = {
                                jobid: details.id,
                                coordinates: new firebase.firestore.GeoPoint(lat, lang)
                            };
                            const jobscollection: GeoCollectionReference = geofirestore.collection('jobslocation');
                            jobscollection.doc().set(jobsLocationData)
                                .then((joblocation) => {
                                });
                            // Create a GeoCollection reference
                            const agentcollection: GeoCollectionReference = geofirestore.collection('location');
                            const query: GeoQuery = agentcollection.near({ center: new firebase.firestore.GeoPoint(lat, lang), radius: 160 });
                            // Get query (as Promise)
                            query.get()
                                .then((value: GeoQuerySnapshot) => {
                                    const sugJobs = [];
                                    if (value.size > 0) {
                                        value._querySnapshot.docs.forEach((data) => {
                                            db.collection('users')
                                                .where('uid', '==', data.data().d.Agentuid)
                                                .get()
                                                .then((docs) => {
                                                    docs.forEach((doc) => {
                                                        sugJobs.push(doc.data()); // All docs returned by GeoQuery
                                                        if (value.size === sugJobs.length) {
                                                            jobPostSuccess(dispatch, sugJobs, details.id);
                                                            Toast.show({
                                                                text: 'Job successfully posted',
                                                                position: 'bottom',
                                                                buttonText: 'Okay',
                                                                duration: 5000
                                                            });
                                                        }
                                                    });
                                                })
                                                .catch((error) => {
                                                    jobPostFail(dispatch, error);
                                                    Toast.show({
                                                        text: error,
                                                        position: 'bottom',
                                                        buttonText: 'Okay',
                                                        duration: 5000
                                                    });
                                                });
                                        });
                                    } else {
                                        jobPostSuccess(dispatch, sugJobs, details.id);
                                    }
                                })
                                .catch((err) => {
                                    console.log('errr', err);
                                });
                        })
                        .catch((error) => {
                            jobPostFail(dispatch, error);
                            Toast.show({
                                text: 'Job cannot be posted',
                                position: 'bottom',
                                buttonText: 'Okay',
                                duration: 5000
                            });
                        });
                })
                .catch((error) => {
                    jobPostFail(dispatch, error);
                    Toast.show({
                        text: 'Invalid location data provided',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000
                    });
                });
        }
    };
};

const jobPostSuccess = (dispatch, sugJobs, id) => {
    dispatch({ type: JOB_POST_SUCCESS, payload: sugJobs, id });
};

const jobPostFail = (dispatch, sugJobs) => {
    dispatch({ type: JOB_POST_FAIL, payload: sugJobs });
};
