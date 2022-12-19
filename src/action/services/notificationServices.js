import firebase from 'react-native-firebase';
import { toastMessagefailure } from '../../utils/showMessage';

const db = firebase.firestore();
export const notificationService = {
    requestedTourNotify: (tourId) => {
        console.log('tourIdtourId', tourId);
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser !== null) {
                db.collection('requestTour')
                    .where('tourRequestedById', '==', firebase.auth().currentUser.uid)
                    .where('tourId', '==', tourId)
                    .where('tourComplete', '==', false)
                    .get()
                    .then((data) => {
                        console.log('getToursData', data);
                        if (data.size > 0) {
                            data.forEach((doc) => {
                                db.collection('tours').doc(doc.data().tourId)
                                    .get()
                                    .then((value) => {
                                        console.log('tours', value, value.data());
                                        db.collection('users')
                                            .where('uid', '==', value.data().userId)
                                            .get()
                                            .then((userDetail) => {
                                                console.log('userDetail', userDetail, userDetail._docs[0]._data, userDetail._docs[0].data());
                                                const {
                                                    address,
                                                    agentLicense,
                                                    blockedByClient,
                                                    brokerName,
                                                    brokerageLicense,
                                                    brokerageName,
                                                    certificationStatus,
                                                    certified,
                                                    description,
                                                    documents,
                                                    documentsSubmitted,
                                                    deleteStatus,
                                                    email,
                                                    experience,
                                                    fbData,
                                                    fullName,
                                                    gallery,
                                                    id,
                                                    imageData,
                                                    isfacebooklogin,
                                                    jobId,
                                                    languages,
                                                    phone,
                                                    pushToken,
                                                    ratingCount,
                                                    reason,
                                                    role,
                                                    serviceArea,
                                                    setting,
                                                    uid,
                                                } = userDetail._docs[0].data();
                                                const {
                                                    approvedClients,
                                                    averageRatingCount,
                                                    postedBy,
                                                    requestedClients,
                                                    tourDesc,
                                                    tourLocation,
                                                    tourService,
                                                    uniqueId,
                                                    userId,
                                                    deleteTourStatus,
                                                    adminApproval
                                                } = value.data();
                                                const {
                                                    count,
                                                    createdAt,
                                                    tourId,
                                                    tourImageUrl,
                                                    tourName,
                                                    tourPostedById,
                                                    tourPrice,
                                                    tourRequestedById,
                                                    tourRequestedName,
                                                    tourApprovalStatus,
                                                    tourDate,
                                                    tourTime,
                                                    tourComplete,
                                                    paymentId,
                                                    paymentStatus
                                                } = doc.data();
                                                const obj = {
                                                    count,
                                                    createdAt,
                                                    tourId,
                                                    tourImageUrl,
                                                    tourName,
                                                    tourPostedById,
                                                    tourPrice,
                                                    tourRequestedById,
                                                    tourRequestedName,
                                                    tourApprovalStatus,
                                                    tourDate,
                                                    tourTime,
                                                    tourComplete,
                                                    paymentId,
                                                    paymentStatus,
                                                    requestTourId: doc.id,
                                                    approvedClients,
                                                    averageRatingCount,
                                                    tourCreatedAt: value.data().createdAt,
                                                    postedBy,
                                                    requestedClients,
                                                    tourDesc,
                                                    tourLocation,
                                                    tourService,
                                                    uniqueId,
                                                    userId,
                                                    adminApproval,
                                                    deleteTourStatus,
                                                    address,
                                                    agentLicense,
                                                    blockedByClient,
                                                    brokerName,
                                                    brokerageLicense,
                                                    brokerageName,
                                                    certificationStatus,
                                                    certified,
                                                    description,
                                                    documents,
                                                    documentsSubmitted,
                                                    deleteStatus,
                                                    email,
                                                    experience,
                                                    fbData,
                                                    fullName,
                                                    gallery,
                                                    id,
                                                    imageData,
                                                    isfacebooklogin,
                                                    jobId,
                                                    languages,
                                                    phone,
                                                    pushToken,
                                                    ratingCount,
                                                    reason,
                                                    role,
                                                    serviceArea,
                                                    setting,
                                                    uid,

                                                };
                                                if (deleteStatus === undefined) {
                                                    if (deleteTourStatus === true) {
                                                        resolve({});
                                                    } else if (adminApproval === 'approved') {
                                                        console.log('approved obj', obj);
                                                        resolve(obj);
                                                    } else {
                                                        resolve({});
                                                    }
                                                } else {
                                                    resolve({});
                                                }
                                            })
                                            .catch((err) => {
                                                reject({});
                                                console.log('error', err);
                                            });
                                    })
                                    .catch((err) => {
                                        console.log('error', err);
                                        reject({});
                                    });
                            });
                        } else {
                            reject({});
                        }
                    })
                    .catch((err) => {
                        console.log('error', err);
                        reject({});
                    });
            } else {
                // reject('No data avalaible');
                toastMessagefailure('Something went wrong!')
            }
        });
    },
    completedTourNotify: (tourId) => {
        console.log('tourIdtourId', tourId);
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser !== null) {
                db.collection('contracts')
                    .where('approvedClientId', '==', firebase.auth().currentUser.uid)
                    .where('tourId', '==', tourId)
                    .where('tourComplete', '==', true)
                    .get()
                    .then((data) => {
                        console.log('completeTourData', data);
                        if (data.size > 0) {
                            data.forEach(async (doc) => {
                                console.log('doc', doc.id, doc.data());
                                const {
                                    approveDocId,
                                    approvedClientId,
                                    ratebyClient,
                                    specialInstructions,
                                    tourApprovedById,
                                    tourComplete,
                                    tourId,
                                    tourPostedById,
                                    tourRating,
                                    tourReview,
                                    requestDocId,
                                    supportTourdesc,
                                    completedAt
                                } = doc.data();

                                await fetchRequestTourData(requestDocId)
                                    .then(async (result) => {
                                        console.log('result', result);
                                        const {
                                            count,
                                            tourRequestedById,
                                            tourRequestedName,
                                            tourApprovalStatus,
                                            tourDate,
                                            tourTime,
                                            requestTourId,
                                            paymentId,
                                            paymentStatus
                                        } = result;
                                        await fetchTourData(doc.data().tourId)
                                            .then(async (tourDetail) => {
                                                console.log('tourDetail', tourDetail);
                                                const {
                                                    tourName,
                                                    tourImageUrl,
                                                    tourPrice,
                                                    tourDesc,
                                                    tourService,
                                                    uniqueId,
                                                    requestedClients,
                                                    approvedClients,
                                                    createdAt,
                                                    userId,
                                                    adminApproval,
                                                    deleteTourStatus
                                                } = tourDetail;
                                                await db.collection('users')
                                                    .where('uid', '==', userId)
                                                    .get()
                                                    .then((userDetail) => {
                                                        console.log('userDetail', userDetail, userDetail._docs[0].data());
                                                        const {
                                                            address,
                                                            agentLicense,
                                                            blockedByClient,
                                                            brokerName,
                                                            brokerageLicense,
                                                            brokerageName,
                                                            certificationStatus,
                                                            certified,
                                                            description,
                                                            documents,
                                                            documentsSubmitted,
                                                            deleteStatus,
                                                            email,
                                                            experience,
                                                            fbData,
                                                            fullName,
                                                            gallery,
                                                            id,
                                                            imageData,
                                                            isfacebooklogin,
                                                            jobId,
                                                            languages,
                                                            phone,
                                                            pushToken,
                                                            ratingCount,
                                                            reason,
                                                            role,
                                                            serviceArea,
                                                            setting,
                                                            uid,
                                                        } = userDetail._docs[0].data();
                                                        const obj = {
                                                            count,
                                                            requestCreatedAt: result.createdAt,
                                                            tourRequestedById,
                                                            tourRequestedName,
                                                            tourApprovalStatus,
                                                            tourDate,
                                                            tourTime,
                                                            requestTourId,
                                                            approveDocId,
                                                            approvedClientId,
                                                            ratebyClient,
                                                            specialInstructions,
                                                            tourApprovedById,
                                                            tourComplete,
                                                            tourId,
                                                            tourPostedById,
                                                            tourRating,
                                                            tourReview,
                                                            tourName,
                                                            tourImageUrl,
                                                            tourPrice,
                                                            tourDesc,
                                                            tourService,
                                                            uniqueId,
                                                            requestedClients,
                                                            approvedClients,
                                                            createdAt,
                                                            paymentId,
                                                            paymentStatus,
                                                            supportTourdesc,
                                                            completedAt,
                                                            userId,
                                                            adminApproval,
                                                            deleteTourStatus,
                                                            address,
                                                            agentLicense,
                                                            blockedByClient,
                                                            brokerName,
                                                            brokerageLicense,
                                                            brokerageName,
                                                            certificationStatus,
                                                            certified,
                                                            description,
                                                            documents,
                                                            documentsSubmitted,
                                                            deleteStatus,
                                                            email,
                                                            experience,
                                                            fbData,
                                                            fullName,
                                                            gallery,
                                                            id,
                                                            imageData,
                                                            isfacebooklogin,
                                                            jobId,
                                                            languages,
                                                            phone,
                                                            pushToken,
                                                            ratingCount,
                                                            reason,
                                                            role,
                                                            serviceArea,
                                                            setting,
                                                            uid,
                                                        };
                                                        if (deleteStatus === undefined) {
                                                            if (deleteTourStatus === true) {
                                                                resolve({});
                                                            } else if (adminApproval === 'approved') {
                                                                console.log('approved obj', obj);
                                                                resolve(obj);
                                                            } else {
                                                                resolve({});
                                                            }
                                                        } else {
                                                            resolve({});
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        reject({});
                                                    });
                                            })
                                            .catch((error) => {
                                                reject({});
                                            });
                                    })
                                    .catch((error) => {
                                        reject({});
                                    });
                            });
                        } else {
                            reject({});
                        }
                    })
                    .catch((error) => {
                        reject({});
                    });
            } else {
                // reject('No data avalaible');
                toastMessagefailure('Something went wrong!')
            }
        });
    },
};

const fetchRequestTourData = (requestDocId) => {
    console.log('fetchRequestTourData', requestDocId);
    return new Promise((resolve, reject) => {
        db.collection('requestTour')
            .doc(requestDocId)
            .get()
            .then(async (requestTourData) => {
                console.log('requestTourData', requestTourData.data());
                let obj = {};
                const {
                    count,
                    createdAt,
                    tourId,
                    tourImageUrl,
                    tourName,
                    tourPostedById,
                    tourPrice,
                    tourRequestedById,
                    tourRequestedName,
                    tourApprovalStatus,
                    tourDate,
                    tourTime,
                    tourComplete,
                    specialInstructions
                } = requestTourData.data();
                obj = {
                    count,
                    createdAt,
                    tourId,
                    tourImageUrl,
                    tourName,
                    tourPostedById,
                    tourPrice,
                    tourRequestedById,
                    tourRequestedName,
                    tourApprovalStatus,
                    tourDate,
                    tourTime,
                    tourComplete,
                    specialInstructions,
                    requestTourId: requestTourData.id
                };
                resolve(obj);
            })
            .catch((err) => {
                reject(err);
            });
    });
};


const fetchTourData = (tourId) => {
    console.log('fetchTourData', tourId);
    return new Promise((resolve, reject) => {
        db.collection('tours')
            .doc(tourId)
            .get()
            .then((val) => {
                console.log('fetchTourData val', val);
                const {
                    tourName,
                    tourImageUrl,
                    tourPrice,
                    tourDesc,
                    userId,
                    tourService,
                    uniqueId,
                    requestedClients,
                    approvedClients,
                    createdAt,
                    adminApproval,
                    deleteTourStatus,
                } = val.data();
                const obj = {
                    tourName,
                    tourImageUrl,
                    tourPrice,
                    tourDesc,
                    userId,
                    tourService,
                    uniqueId,
                    requestedClients,
                    approvedClients,
                    createdAt,
                    adminApproval,
                    deleteTourStatus,
                };
                resolve(obj);
            })
            .catch((error) => {
                console.log('error', error);
                reject(error);
            });
    });
};

