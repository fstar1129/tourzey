import firebase from 'react-native-firebase';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import _ from 'lodash';
import axios from 'axios';

import { Toast } from 'native-base';
import {
    GET_JOB_DETAIL,
    GET_JOB_DETAIL_SUCCESS,
    GET_JOB_DETAIL_FAIL,
    UPDATE_JOB_DETAILS,
    UPDATE_JOB_DETAILS_SUCCESS,
    UPDATE_JOB_DETAILS_FAIL,
    FETCH_COMPLETED_JOB_DETAIL,
    FETCH_COMPLETED_JOB_DETAIL_SUCCESS,
    FETCH_COMPLETED_JOB_DETAIL_FAIL,
    VERIFY_HIRED_AGENT,
    VERIFY_HIRED_AGENT_SUCCESS,
    VERIFY_HIRED_AGENT_FAIL,
    GET_CONTRACT_DETAIL,
    GET_CONTRACT_DETAIL_SUCCESS,
    GET_CONTRACT_DETAIL_FAIL,
    FIND_TOURS,
    FIND_TOURS_SUCCESS,
    FIND_TOURS_FAIL
} from './types';
import { hiredNotifyUrl } from '../utils/constants';

const db = firebase.firestore();
const geofirestore: GeoFirestore = new GeoFirestore(db);
const Apikey = 'AIzaSyAeODubKk9sups2xh8yXBVWgM1UHJCUSe4';


export const getJobDetail = (typeValue) => (dispatch) => {
    const jobDetail = [];
    dispatch({ type: GET_JOB_DETAIL });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        db.collection('jobs')
            .where('userId', '==', currentUser.uid)
            .where('type', '==', typeValue)
            .get()
            // if (last === '') {
            //     ref = res
            //     .orderBy('createdAt', 'desc')
            //     .limit(5);
            // } else {
            //     ref = res
            //     .orderBy('createdAt', 'desc')
            //         .startAfter(last)
            //         .limit(5);
            // }
            // ref
            .then((data) => {
                // const nextLastVisible = data.docs[data.docs.length - 1];
                if (data.size === 0) {
                    dispatch({
                        type: GET_JOB_DETAIL_FAIL,
                        payload: [],
                    });
                } else {
                    let sd;
                    let ed;
                    let url;
                    let name;
                    let size;
                    let status;
                    let approvedby;
                    data.forEach((doc) => {
                        console.log(doc.data(), 'docu');
                        if (!doc.data().contractDetails) {
                            sd = null;
                            ed = null;
                            url = null;
                            name = null;
                            size = null;
                            status = null;
                            approvedby = null;
                        } else {
                            sd = doc.data().contractDetails[0].startDate;
                            ed = doc.data().contractDetails[0].endDate;
                            url = doc.data().contractDetails[0].fileUrl;
                            name = doc.data().contractDetails[0].fileName;
                            size = doc.data().contractDetails[0].fileSize;
                            status = doc.data().contractDetails[0].approvalStatus;
                            approvedby = doc.data().contractDetails[0].approvedby;
                        }
                        // doc.data() is never undefined for query doc snapshots
                        const obj = {
                            tourName: doc.data().tourName,
                            tourLocation: doc.data().tourLocation,
                            tourDesc: doc.data().tourDesc,
                            tourStartDate: doc.data().tourStartDate,
                            tourEndDate: doc.data().tourEndDate,
                            tourPostDate: doc.data().tourPostDate,
                            postedBy: doc.data().postedBy,
                            type: doc.data().type,
                            createdBy: doc.data().userId,
                            hiredAgent: doc.data().hiredAgent,
                            hired: doc.data().hired,
                            jobId: doc.data().jobId,
                            starCountagent: doc.data().starCountagent,
                            rateAgent: doc.data().rateAgent,
                            rateClient: doc.data().rateClient,
                            jobReviewAgent: doc.data().jobReviewAgent,
                            contractDetails: doc.data().contractDetails,
                            id: doc.id,
                            contract: doc.data().contract,
                            jobVideo: doc.data().jobVideo || '',
                            contractWith: doc.data().agreedBy,
                            currentUserId: currentUser.uid,
                            createdAt: doc.data().createdAt,
                            jobAppliedBy: doc.data().jobAppliedBy,
                            userId: doc.data().userId,
                            startDate: sd,
                            endDate: ed,
                            fileUrl: url,
                            fileName: name,
                            fileSize: size,
                            approvalStatus: status,
                            approvedby,

                            // lastVisible: nextLastVisible
                        };
                        jobDetail.push(obj);
                    });
                    if (data.size === jobDetail.length) {
                        /*Pass success data  */
                        const temp = _.orderBy(jobDetail, ['createdAt'], ['desc']);
                        dispatch({
                            type: GET_JOB_DETAIL_SUCCESS,
                            payload: temp,
                        });
                    }
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_JOB_DETAIL_FAIL,
                    payload: err,
                });
            });
    } else {
        dispatch({
            type: GET_JOB_DETAIL_FAIL,
            payload: [],
        });
    }
};


export const updateJobDetails = (agentIds, jobId, obj) => (dispatch) => {
    console.log(agentIds, jobId, obj, 'hd');
    let hiredetails = {};
    dispatch({ type: UPDATE_JOB_DETAILS });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        db.collection('jobs')
            .doc(jobId)
            .get()
            .then((data) => {
                console.log(data, 'hd123');
                if (data.data().hiredAgent.length >= 0) {
                    data.data().hiredAgent.push(obj);
                }
                db.collection('jobs').doc(jobId).update({
                    hired: true,
                    hiredAgent: _.uniq(data.data().hiredAgent)
                })
                    .then(() => {
                        console.log('hd12');
                        hiredetails = {
                            hired: true,
                            hiredAgent: _.uniq(data.data().hiredAgent)
                        };
                        let params = {};
                        db.collection('users').where('uid', '==', agentIds)
                            .get()
                            .then((response) => {
                                console.log('hd123', response);
                                response.forEach((userdata) => {
                                    const { pushToken, setting } = userdata.data();
                                    let sd = null;
                                    let ed = null;
                                    let url = null;
                                    let name = null;
                                    let size = null;
                                    let status = false;
                                    if (!data.data().contractDetails) {
                                        sd = null;
                                        ed = null;
                                        url = null;
                                        name = null;
                                        size = null;
                                        status = false;
                                    } else {
                                        // eslint-disable-next-line array-callback-return
                                        data.data().contractDetails.map((contractInfo) => {
                                            sd = contractInfo.startDate;
                                            ed = contractInfo.endDate;
                                            url = contractInfo.fileUrl;
                                            name = contractInfo.fileName;
                                            size = contractInfo.fileSize;
                                            status = contractInfo.ApprovalStatus;
                                        });
                                    }

                                    const obj = {
                                        jobTitle: data.data().jobTitle,
                                        jobCity: data.data().jobCity,
                                        jobDesc: data.data().jobDesc,
                                        jobPrice: data.data().jobPrice,
                                        jobState: data.data().jobState,
                                        jobZipcode: data.data().jobZipcode,
                                        postedBy: data.data().postedBy,
                                        id: data.id,
                                        startDate: sd,
                                        endDate: ed,
                                        fileUrl: url,
                                        fileName: name,
                                        fileSize: size,
                                        approvalStatus: status,
                                        userId: data.data().userId
                                    };
                                    if (setting.notification === true) {
                                        params = {
                                            token: pushToken,
                                            jobId: data.id
                                        };
                                        console.log('params', params);
                                        const value = JSON.stringify(params);
                                        axios.post(hiredNotifyUrl + value);
                                    }
                                });
                                updateJobDetailsSuccess(dispatch, hiredetails);
                                Toast.show({
                                    text: 'Hiring details sent to agent',
                                    position: 'bottom',
                                    buttonText: 'Okay',
                                    type: 'success',
                                    duration: 5000
                                });
                            })
                            .catch((errorValue) => {
                                updateJobDetailsFail(dispatch, errorValue);
                            });
                    })
                    .catch((err) => {
                        updateJobDetailsFail(dispatch, err);
                    });
            })
            .catch((error) => {
                updateJobDetailsFail(dispatch, error);
            });
    }
};

const updateJobDetailsSuccess = (dispatch, hiredetails) => {
    dispatch({ type: UPDATE_JOB_DETAILS_SUCCESS, payload: hiredetails });
};

const updateJobDetailsFail = (dispatch, error) => {
    dispatch({ type: UPDATE_JOB_DETAILS_FAIL, payload: error });
};

export const fetchCompletedJobs = (completeJobs) => (dispatch) => {
    const jobs = [];
    dispatch({ type: FETCH_COMPLETED_JOB_DETAIL });
    const ref = db.collection('jobs');
    ref
        .get()
        .then((details) => {
            details.forEach((doc) => {
                const id = doc.id;
                if (completeJobs.jobId) {
                    completeJobs.jobId.map((item, value) => {
                        if (item === id) {
                            jobs.push(doc.data());
                        }
                    });
                }
            });
            dispatch({
                type: FETCH_COMPLETED_JOB_DETAIL_SUCCESS,
                payload: jobs
            });
        })
        .catch((error) => {
            dispatch({
                type: FETCH_COMPLETED_JOB_DETAIL_FAIL,
                payload: error
            });
        });
};

export const verifyHiredAgent = (agentId, jobId) => (dispatch) => {
    dispatch({ type: VERIFY_HIRED_AGENT });
    db.collection('jobs')
        .doc(jobId)
        .get()
        .then((value) => {
            const { hiredAgent } = value.data();
            let agent = false;
            let status = '';
            let count = 0;
            if (hiredAgent.length > 0) {
                hiredAgent.forEach((item, key) => {
                    count += 1;
                    if (item.agentId === agentId) {
                        agent = true;
                        status = 'hired';
                    }
                });
                if (hiredAgent.length === count) {
                    dispatch({
                        type: VERIFY_HIRED_AGENT_SUCCESS,
                        payload: agent,
                        statusValue: status
                    });
                }
            } else {
                dispatch({
                    type: VERIFY_HIRED_AGENT_FAIL,
                    payload: agent,
                    statusValue: status
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: VERIFY_HIRED_AGENT_FAIL
            });
        });
};

export const viewContractDetails = (jobIdValue, clientId) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        return (dispatch) => {
            dispatch({ type: GET_CONTRACT_DETAIL });
            db.collection('jobs')
                .doc(jobIdValue)
                .get()
                .then((value) => {
                    console.log('value', value.data());
                    const {
                        // jobTitle,
                        // jobType,
                        // jobPrice,
                        // jobCity,
                        // jobState,
                        // jobZipcode,
                        // jobDesc,
                        // jobPostDate,
                        tourName,
                        tourPrice,
                        tourLocation,
                        tourDesc,
                        tourStartDate,
                        tourEndDate,
                        tourPostDate,
                        tourService,
                        type,
                        starCountagent,
                        starCountclient,
                        rateAgent,
                        rateClient,
                        rate,
                        jobAppliedBy,
                        userId,
                        createdAt,
                        jobVideo,
                        postedBy,
                        hired,
                        hiredAgent,
                        contractDetails,
                        agreedBy,
                        contract,
                        archievedBy,
                        milestone
                    } = value.data();
                    let jobData = {};
                    if (contractDetails) {
                        let decline = {};

                        if (contractDetails[0].approvalStatus === true) {
                            db.collection('contracts')
                                .where('hiredAgent', '==', contractDetails[0].hiredAgent)
                                .where('jobId', '==', jobIdValue)
                                .get()
                                .then((contract) => {
                                    let count = 0;
                                    let contractVal = {};
                                    contract.forEach((val, key) => {
                                        count += 1;
                                        const contractObj = val.data();
                                        const { approvalStatus, budget, startDate, endDate, fileName, fileSize, fileUrl, comments, approvedby } = contractDetails[0];
                                        contractVal = {
                                            completeStatus: contractObj.completed,
                                            createdBy: contractObj.createdBy,
                                            approvalStatus,
                                            budget,
                                            startDate,
                                            endDate,
                                            fileName,
                                            fileSize,
                                            url: fileUrl,
                                            comments,
                                            approvedby,
                                            tourName,
                                            // tourPrice,
                                            tourLocation,
                                            tourDesc,
                                            tourStartDate,
                                            tourEndDate,
                                            tourPostDate,
                                            tourService,
                                            type,
                                            starCountclient,
                                            rate,
                                            rateAgent,
                                            rateClient,
                                            starCountagent,
                                            jobAppliedBy,
                                            userId,
                                            createdAt,
                                            jobVideo,
                                            postedBy,
                                            hired,
                                            hiredAgent,
                                            jobIdValue: value.id,
                                            edit: false,
                                            agreedBy,
                                            contract: value.data().contract,
                                            archievedBy,
                                            milestone
                                        };
                                    });
                                    if (contract.size === count) {
                                        dispatch({
                                            type: GET_CONTRACT_DETAIL_SUCCESS,
                                            payload: contractVal
                                        });
                                    }
                                })
                                .catch(() => {
                                    dispatch({
                                        type: GET_CONTRACT_DETAIL_FAIL,
                                    });
                                });
                        } else {
                            decline = {
                                tourName,
                                tourPrice,
                                tourLocation,
                                tourDesc,
                                tourStartDate,
                                tourEndDate,
                                tourPostDate,
                                tourService,
                                type,
                                starCountclient,
                                rate,
                                jobAppliedBy,
                                userId,
                                createdAt,
                                jobVideo,
                                postedBy,
                                hired,
                                hiredAgent,
                                approvalStatus: contractDetails[0].approvalStatus,
                                agreedBy,
                                contract: value.data().contract,
                                jobIdValue: value.id,
                                comments: contractDetails[0].comments,
                                // budget: contractDetails[0].budget,
                                startDate: contractDetails[0].startDate,
                                endDate: contractDetails[0].endDate,
                                fileName: contractDetails[0].fileName,
                                fileSize: contractDetails[0].fileSize,
                                url: contractDetails[0].fileUrl,
                                approvedby: contractDetails[0].approvedby,
                                archievedBy,
                                starCountagent,
                                rateAgent,
                                rateClient,
                                milestone
                            };
                            dispatch({
                                type: GET_CONTRACT_DETAIL_SUCCESS,
                                payload: decline
                            });
                        }
                    } else {
                        jobData = {
                            tourName,
                            tourPrice,
                            tourLocation,
                            tourDesc,
                            tourStartDate,
                            tourEndDate,
                            tourPostDate,
                            tourService,
                            type,
                            starCountclient,
                            rate,
                            jobAppliedBy,
                            userId,
                            createdAt,
                            jobVideo,
                            postedBy,
                            hired,
                            hiredAgent,
                            contractDetails,
                            agreedBy,
                            jobIdValue: value.id,
                            contract,
                            archievedBy,
                            milestone
                        };
                        dispatch({
                            type: GET_CONTRACT_DETAIL_SUCCESS,
                            payload: jobData
                        });
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: GET_CONTRACT_DETAIL_FAIL,
                        payload: error
                    });
                });
        };
    }
};

//newwww
export const findTours = (location, isCategory, name) => (dispatch) => {
    console.log(isCategory, name, location, 'name');
    dispatch({ type: FIND_TOURS });
    fetchTourData(location, isCategory, name).then((data) => {
        console.log(data, 'fetchTourData');
        dispatch({ type: FIND_TOURS_SUCCESS, payload: data });
    })
        .catch((err) => {
            console.log(err, 'err findTours');
            dispatch({ type: FIND_TOURS_FAIL, payload: [] });
        });
};


const fetchTourData = (location, isCategory, name) => {
    console.log('fetch', location, isCategory, name);
    return new Promise((resolve, reject) => {
        const dataVal = [];
        if (isCategory === true) {
            console.log('isCategory11', location, isCategory, name);
            // todo-cr-mi - suren @ janani - use link as seperate file
            axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${Apikey}`)
                .then((mapdata) => {
                    console.log('mapdata..', mapdata);
                    const lat = mapdata.data.results[0].geometry.location.lat;
                    const lang = mapdata.data.results[0].geometry.location.lng;
                    // Create a GeoCollection reference
                    const agentcollection: GeoCollectionReference = geofirestore.collection('tourlocation');
                    const query: GeoQuery = agentcollection.near({ center: new firebase.firestore.GeoPoint(lat, lang), radius: 50 });
                    // Get query (as Promise)
                    query.get()
                        .then((value: GeoQuerySnapshot) => {
                            if (value.size > 0) {
                                value._querySnapshot.docs.forEach((data) => {
                                    console.log('dataaa', data);
                                    db.collection('tours')
                                        .doc(data.data().d.jobid)
                                        .get()
                                        .then((doc) => {
                                            console.log('doccu', doc.data());
                                            db.collection('users')
                                                .where('uid', '==', doc.data().userId)
                                                .get()
                                                .then((user) => {
                                                    console.log(doc.data().tourService[0],
                                                        doc.data().adminApproval,
                                                        doc.data().tourService[0] === name,
                                                        name, user, 'equal');
                                                    console.log('userDocs', user._docs[0]._data);
                                                    if (user._docs[0]._data.deleteStatus === undefined) {
                                                        if (doc.data().deleteTourStatus === true) {
                                                            dataVal.push({});
                                                        } else if (doc.data().adminApproval === 'approved') {
                                                            console.log('approved obj', doc.data().adminApproval);
                                                            if (doc.data().tourService[0] === name) {
                                                                console.log('if tourService');
                                                                const final = doc.data();
                                                                final.tourId = doc.id;
                                                                final.guideDetails = user._docs[0].data();
                                                                dataVal.push(final);
                                                            } else {
                                                                console.log('else');
                                                                dataVal.push({});
                                                            }
                                                        } else {
                                                            dataVal.push({});
                                                        }
                                                    } else {
                                                        dataVal.push({});
                                                    }
                                                    console.log(value, dataVal, dataVal.length === value.size, dataVal.length, value.size, 'tours');
                                                    if (dataVal.length === value.size) {
                                                        const tourValues = dataVal.filter(val => Object.keys(val).length !== 0);
                                                        const temp = _.orderBy(tourValues, ['createdAt'], ['desc']);
                                                        console.log(temp, 'temp');
                                                        resolve(temp);
                                                    }
                                                })
                                                .catch(() => {
                                                    // todo-cr-mi - suren @ janani - use reject instead of resolve in catch - completed
                                                    reject([]);
                                                });
                                        })
                                        .catch((err) => {
                                            reject([]);
                                        });
                                });
                            } else {
                                reject([]);
                            }
                        })
                        .catch((error) => {
                            reject([]);
                        });
                })
                .catch((error) => {
                    console.log('error......', error);
                    reject([]);
                });
        } else {
            axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${Apikey}`)
                .then((mapdata) => {
                    console.log('mapdata..', mapdata);
                    const lat = mapdata.data.results[0].geometry.location.lat;
                    const lang = mapdata.data.results[0].geometry.location.lng;
                    // Create a GeoCollection reference
                    const agentcollection: GeoCollectionReference = geofirestore.collection('tourlocation');
                    const query: GeoQuery = agentcollection.near({ center: new firebase.firestore.GeoPoint(lat, lang), radius: 50 });
                    // Get query (as Promise)
                    query.get()
                        .then((value: GeoQuerySnapshot) => {
                            if (value.size > 0) {
                                value._querySnapshot.docs.forEach((data) => {
                                    console.log('dataaa', data);
                                    db.collection('tours')
                                        .doc(data.data().d.jobid)
                                        .get()
                                        .then((doc) => {
                                            console.log('doccu', doc.data());
                                            db.collection('users')
                                                .where('uid', '==', doc.data().userId)
                                                .get()
                                                .then((user) => {
                                                    console.log(
                                                        doc.data().adminApproval,
                                                        name, user, 'equal');
                                                    const tourName = doc.data().tourName.toLowerCase();
                                                    const searchName = name.toLowerCase();
                                                    if (doc.data().adminApproval === 'approved') {
                                                        console.log('if approved', doc.data(), name);
                                                        if (_.includes(tourName, searchName)) {
                                                            console.log('if tourName');
                                                            const final = doc.data();
                                                            final.tourId = doc.id;
                                                            final.guideDetails = user._docs[0].data();
                                                            dataVal.push(final);
                                                        } else {
                                                            console.log('else');
                                                            dataVal.push({});
                                                        }
                                                    } else {
                                                        console.log('not approved');
                                                        dataVal.push({});
                                                    }
                                                    console.log(value, dataVal, dataVal.length === value.size, dataVal.length, value.size, 'tours');
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
                                        .catch((err) => {
                                            reject([]);
                                        });
                                });
                            } else {
                                reject([]);
                            }
                        })
                        .catch((error) => {
                            reject([]);
                        });
                })
                .catch(() => {
                    reject([]);
                });
        }
    });
};
