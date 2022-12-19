import firebase from 'react-native-firebase';
import {
    FETCH_TOUR_DETAILS,
    FETCH_TOUR_DETAILS_SUCCESS,
    FETCH_TOUR_DETAILS_FAIL
} from './types';
import { getData } from './checkdataAction';

const db = firebase.firestore();

export const fetchTourDetails = (jobId) => (dispatch) => {
    dispatch({ type: FETCH_TOUR_DETAILS });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        db.collection('jobs')
            .doc(jobId)
            .get()
            .then((doc) => {
                console.log('fetchTourDetails', doc.data());
                // todo-cr-mi: puni @ jana - change variable name for understanding 
                let sd;
                let ed;
                let url;
                let name;
                let size;
                let status;
                let approvedby;
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
                const obj = {
                    tourName: doc.data().tourName,
                    tourLocation: doc.data().tourLocation,
                    tourDesc: doc.data().tourDesc,
                    tourStartDate: doc.data().tourStartDate,
                    tourEndDate: doc.data().tourEndDate,
                    postedBy: doc.data().postedBy,
                    type: doc.data().type,
                    createdBy: doc.data().userId,
                    hiredAgent: doc.data().hiredAgent,
                    hired: doc.data().hired,
                    jobId: doc.id,
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
                    approvedby
                };
                dispatch({
                    type: FETCH_TOUR_DETAILS_SUCCESS,
                    payload: obj,
                });
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_TOUR_DETAILS_FAIL,
                    payload: err,
                });
            });
    }
};
// export const getTourDetail = (tourId) => (dispatch) => {
//     console.log('getTourDetail', tourId);
//     dispatch({ type: FETCH_TOUR_DETAILS });
//     const currentUser = firebase.auth().currentUser;
//     if (currentUser !== null) {
//         console.log('tour getTourDetail');

//         db.collection('tours')
//             .doc(tourId)
//             .get()
//             .then((doc) => {
//                 let tourData = {};
//                 console.log('docdata', doc.data());
//                 db.collection('requestTour')
//                     .where('tourId', '==', tourId)
//                     .where('tourRequestedById', '==', currentUser.uid)
//                     .get()
//                     .then((data) => {
//                         console.log(data, 'DocData');
//                         data.forEach((val, key) => {
//                             const {
//                                 count,
//                                 specialInstructions,
//                                 tourApprovalStatus,
//                                 tourRequestedById,
//                                 tourRequestedName,
//                                 tourDate,
//                                 tourTime,
//                             } = val.data();
//                             const {
//                                 createdAt,
//                                 hiredClient,
//                                 postedBy,
//                                 tourDesc,
//                                 tourLocation,
//                                 tourName,
//                                 tourPrice,
//                                 tourService,
//                                 tourImageUrl,
//                                 tourComplete,
//                                 userId
//                             } = doc.data();

//                             getData.contracts(tourId)
//                                 .then((contracts) => {
//                                     const obj = {
//                                         contractDetails: contracts ? contracts : [],
//                                         createdAt,
//                                         hiredClient,
//                                         postedBy,
//                                         tourDesc,
//                                         tourLocation,
//                                         tourName,
//                                         tourPrice,
//                                         tourService,
//                                         tourImageUrl,
//                                         userId,
//                                         tourId: doc.id,
//                                         count,
//                                         specialInstructions,
//                                         tourApprovalStatus,
//                                         tourRequestedById,
//                                         tourRequestedName,
//                                         tourDate,
//                                         tourTime,
//                                         tourComplete,
//                                         requestTourId: val.id
//                                     };
//                                     // tourData = obj;
//                                     console.log(obj, 'obj getTourDetail');
//                                     dispatch({
//                                         type: FETCH_TOUR_DETAILS_SUCCESS,
//                                         payload: obj,
//                                     });
//                                 })
//                                 .catch((error) => {
//                                     dispatch({
//                                         type: FETCH_TOUR_DETAILS_FAIL,
//                                         payload: error,
//                                     });
//                                 });
//                         });
//                     })
//                     .catch((error) => {
//                         dispatch({
//                             type: FETCH_TOUR_DETAILS_FAIL,
//                             payload: error,
//                         });
//                     });
//             })
//             .catch((error) => {
//                 dispatch({
//                     type: FETCH_TOUR_DETAILS_FAIL,
//                     payload: error,
//                 });
//             });
//     }
// };

export const getTourDetail = (tourId) => (dispatch) => {
    dispatch({ type: FETCH_TOUR_DETAILS });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
        console.log('tour getTourDetail');
        db.collection('tours')
            .doc(tourId)
            .get()
            .then((doc) => {
                console.log('docdata', doc.data());
                const {
                    createdAt,
                    postedBy,
                    tourDesc,
                    tourLocation,
                    tourName,
                    tourPrice,
                    tourService,
                    tourImageUrl,
                    requestedClients,
                    approvedClients,
                    userId,
                    transportFacility,
                    lodgeFacility
                } = doc.data();
                const obj = {
                    createdAt,
                    postedBy,
                    tourDesc,
                    tourLocation,
                    tourName,
                    tourPrice,
                    tourService,
                    tourImageUrl,
                    userId,
                    requestedClients,
                    approvedClients,
                    tourId,
                    transportFacility,
                    lodgeFacility
                };
                console.log('obj', obj);
                dispatch({
                    type: FETCH_TOUR_DETAILS_SUCCESS,
                    payload: obj,
                });
            })
            .catch((err) => {
                console.log('error', err);
                dispatch({
                    type: FETCH_TOUR_DETAILS_FAIL,
                    payload: err,
                });
            });
    }
};

