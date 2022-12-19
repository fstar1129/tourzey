import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import { Toast } from 'native-base';
import {
    POST_MESSAGE, POST_MESSAGE_SUCCESS, POST_MESSAGE_FAIL,
    GET_MESSAGE, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAIL,
    GET_COVERSATION_LIST, GET_COVERSATION_LIST_SUCCESS, GET_COVERSATION_LIST_FAIL, REMOVE_GUIDE,
    REMOVE_GUIDE_FAIL, REMOVE_GUIDE_SUCCESS,
} from './types';
import { messageNotifyUrl, commonEmailUrl } from '../utils/constants';
import { toastMessagefailure } from '../utils/showMessage';
import { authService } from '../action/services/authServices';

//review by jaga @suren si-- use promises 
const db = firebase.firestore();
export const postMessage = (data) => (dispatch) => {
    dispatch({ type: POST_MESSAGE });
    const currentUser = firebase.auth().currentUser;
    global.conversation = false;
    global.conversationId = '';
    authService.getCurrentuserToken(currentUser.uid)
    .then((me) => {
        console.log('memememe', me);
        if (me.activateStatus !== false) {
        db.collection('conversions')
        .get()
        .then((ref) => {
            if (ref.size > 0) {
                ref.forEach((val) => {
                    const { sendByid, sendToid } = val.data();
                    if ((sendByid === currentUser.uid || sendByid === data.sendToid) &&
                        (sendToid === currentUser.uid || sendToid === data.sendToid)) {
                        global.conversation = true;
                        global.conversationId = val;
                    }
                });
                if (global.conversation === true) {
                    const reff = db.collection('conversions').doc(global.conversationId.data().conversationId);
                    reff.get().then(() => {
                        reff.update({
                            LastText: data.text,
                            createdAt: Date.now(),
                            sendToid: data.sendToid
                        });
                    });
                    addMessage(data, currentUser.uid, global.conversationId.id, dispatch);
                } else {
                    db.collection('conversions')
                        .add({
                            LastText: data.text,
                            sendToid: data.sendToid,
                            createdAt: Date.now(),
                            sendByid: currentUser.uid,
                            role: 'Client',
                            conversationId: '',
                            videoUrl: data.videoUrl,
                            postImageUrl: data.postImageUrl
                        }).then((docs) => {
                            const Reffer = db.collection('conversions').doc(docs.id);
                            Reffer.get().then(() => {
                                Reffer.update({ conversationId: docs.id });
                            });
                            addMessage(data, currentUser.uid, docs.id, dispatch);
                        });
                }
            } else {
                db.collection('conversions')
                    .add({
                        LastText: data.text,
                        sendToid: data.sendToid,
                        createdAt: Date.now(),
                        sendByid: currentUser.uid,
                        role: 'Client',
                        conversationId: '',
                        videoUrl: data.videoUrl,
                        postImageUrl: data.postImageUrl
                    }).then((docs) => {
                        const Reffer = db.collection('conversions').doc(docs.id);
                        Reffer.get().then(() => {
                            Reffer.update({ conversationId: docs.id });
                        });
                        addMessage(data, currentUser.uid, docs.id, dispatch);
                    });
            }
        });
    } else {
        toastMessagefailure('Messaging Failed!');
    }
    });
};


const addMessage = (data, currentUser, conId, dispatch) => {
    db.collection('messages')
        .add({
            text: data.text,
            sendToid: data.sendToid,
            createdAt: Date.now(),
            sendByid: currentUser,
            role: 'client',
            textId: data.textId,
            conversationId: conId,
            videoUrl: data.videoUrl,
            postImageUrl: data.postImageUrl,
            deliveredStatus: true
        }).then((docRef) => {
            const Ref = db.collection('messages').doc(docRef.id);
            let params = {};
            //todo-cr-mi: janani: if any values needed, passed from previous screen
            db.collection('users').where('uid', '==', currentUser)
                .get()
                .then((response) => {
                    if (response.size > 0) {
                        response.forEach((user) => {
                            const { fullName } = user.data();
                            db.collection('users').where('uid', '==', data.sendToid)
                                .get()
                                .then((res) => {
                                    if (res.size > 0) {
                                        res.forEach((userdata) => {
                                            const { pushToken, setting, email } = userdata.data();
                                            //todo-cr-mi: janani - functionality is done,remove console log
                                            if (setting.notification === true) {
                                                const messageValue = {
                                                    text: _.startsWith(data.text, 'https://image') || _.startsWith(data.text, 'https://firebasestorage') ? 'Video/image' : data.text,
                                                    sendToid: currentUser,
                                                    videoUrl: data.videoUrl,
                                                    fullName,
                                                    createdAt: Date.now(),
                                                    conversationId: conId
                                                };
                                                params = {
                                                    token: pushToken,
                                                    messageData: messageValue,
                                                    sendTo: email,
                                                    subject: 'Received message',
                                                    status: _.startsWith(data.text, 'https://image') || _.startsWith(data.text, 'https://firebasestorage') ? 'Video/image' : data.text
                                                };
                                                db.collection('notifications')
                                                    .add({
                                                        createdAt: Date.now(),
                                                        ownerId: data.sendToid,
                                                        userSeen: false,
                                                        email,
                                                        page: 'MessageScreen',
                                                        token: pushToken,
                                                        messageData: messageValue,
                                                        title: 'Received message',
                                                        body: _.startsWith(data.text, 'https://image') || _.startsWith(data.text, 'https://firebasestorage') ? 'Video/image' : data.text
                                                    })
                                                    .then((doc) => {
                                                        params.notificationId = doc.id;
                                                        const value = JSON.stringify(params);
                                                        axios.post(messageNotifyUrl + value);
                                                        axios.post(commonEmailUrl + value);
                                                    })
                                                    .catch((error) => {
                                                        console.log('error on add notification', error);
                                                    });
                                                dispatch({ type: POST_MESSAGE_SUCCESS });
                                            }
                                        });
                                    } else {
                                        addMessageFailure('There is no data available', dispatch);
                                    }
                                })
                                .catch((error) => {
                                    addMessageFailure(error, dispatch);
                                });
                        });
                    } else {
                        addMessageFailure('There is no data available', dispatch);
                    }
                })
                .catch((error) => {
                    addMessageFailure(error, dispatch);
                });
            dispatch({ type: POST_MESSAGE_SUCCESS });
        })
        .catch((error) => {
            addMessageFailure(error, dispatch);
        });
};
// const addMessage = (data, currentUser, conId, dispatch) => {
//     console.log('debugging message', data);
//     db.collection('messages')
//         .add({
//             text: data.text,
//             sendToid: data.sendToid,
//             createdAt: new Date(),
//             sendByid: currentUser,
//             role: 'agent',
//             textId: data.textId,
//             conversationId: conId,
//             videoUrl: data.videoUrl,
//             postImageUrl: data.postImageUrl,
//             deliveredStatus: true
//         }).then(() => {
//             dispatch({ type: POST_MESSAGE_SUCCESS });
//             let params = {};
//             db.collection('users').where('uid', '==', currentUser)
//                 .get()
//                 .then((response) => {
//                     response.forEach((user) => {
//                         const { fullName } = user.data();

//                         db.collection('users').where('uid', '==', data.sendToid)
//                             .get()
//                             .then((res) => {
//                                 res.forEach((userdata) => {
//                                     const { pushToken, setting } = userdata.data();
//                                     if (setting.notification === true && setting.messageValue === true) {
//                                         const messageValue = {
//                                             text: _.startsWith(data.text, 'https://image') || _.startsWith(data.text, 'https://firebasestorage') ? 'Video/image' : data.text,
//                                             sendToid: currentUser,
//                                             videoUrl: data.videoUrl,
//                                             fullName,
//                                             createdAt: new Date(),
//                                             conversationId: conId
//                                         };
//                                         params = {
//                                             token: pushToken,
//                                             messageData: messageValue
//                                         };
//                                         const value = JSON.stringify(params);
//                                         axios.post(messageNotifyUrl + value);
//                                         dispatch({ type: POST_MESSAGE_SUCCESS });
//                                     } else {
//                                         addMessageFailure('There is no data available', dispatch);
//                                     }
//                                 });
//                             })
//                             .catch((error) => {
//                                 addMessageFailure(error, dispatch);
//                             });
//                     });
//                 })
//                 .catch((error) => {
//                     addMessageFailure(error, dispatch);
//                 });
//         }).catch((err) => {
//             dispatch({ type: POST_MESSAGE_FAIL, payload: err });
//         });
// };

const addMessageFailure = (error, dispatch) => {
    const errorCode = error.code;
    dispatch({ type: POST_MESSAGE_FAIL, payload: errorCode });
    Toast.show({
        text: errorCode,
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
    });
};

export const getMessage = (data) => (dispatch) => {
    dispatch({ type: GET_MESSAGE });
    const currentUser = firebase.auth().currentUser;
    db.collection('conversions')
        .get()
        .then((ref) => {
            // .onSnapshot({ includeMetadataChanges: true }, (ref) => {
            if (ref.size > 0) {
                ref.forEach((val) => {
                    const { sendByid, sendToid, conversationId } = val.data();
                    //todo-cr-si : janani - get data use const 
                    console.log(sendByid, sendToid, currentUser.uid, data.sendToid, data.sendToid, (sendByid === currentUser.uid || sendByid === data.sendToid),
                        (sendToid === currentUser.uid || sendToid === data.sendToid), 'Checking123');
                    if ((sendByid === currentUser.uid || sendByid === data.sendToid) &&
                        (sendToid === currentUser.uid || sendToid === data.sendToid)) {
                        const msgArr = [];
                        db.collection('messages')
                            .where('conversationId', '==', conversationId)
                            // .get()
                            // .then((allDocs) => {
                            //     // })
                            .onSnapshot({ includeMetadataChanges: true }, (allDocs) => {
                                let count = 0;
                                dispatch({ type: GET_MESSAGE });
                                if (allDocs.size > 0) {
                                    allDocs.forEach((res) => {
                                        count += 1;
                                        const { text, textId, createdAt, role, videoUrl, postImageUrl, deliveredStatus } = res.data();
                                        const temp = {
                                            text,
                                            textId,
                                            createdAt,
                                            role,
                                            videoUrl,
                                            postImageUrl,
                                            deliveredStatus: deliveredStatus || false
                                        };
                                        msgArr.push(temp);
                                    });
                                    const value = _.uniqBy(msgArr, 'textId');
                                    // console.log('getMessage value', value, count, value.length, allDocs.size);
                                    if (allDocs.size === count) {
                                        console.log('msgArr if ', allDocs, value, allDocs.size === value.length, allDocs.size, value.length);
                                        return dispatch({ type: GET_MESSAGE_SUCCESS, payload: value });
                                    }
                                } else {
                                    return dispatch({ type: GET_MESSAGE_SUCCESS, payload: [] });
                                }
                            });
                    } else {
                        return dispatch({ type: GET_MESSAGE_SUCCESS, payload: [] });
                    }
                });
            } else {
                dispatch({ type: GET_MESSAGE_FAIL, payload: [] });
            }
        });
};

export const getCoversationList = () => (dispatch) => {
    dispatch({ type: GET_COVERSATION_LIST });
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
    db.collection('conversions')
        .onSnapshot({ includeMetadataChanges: true },
            (ref) => {
                const coversationArr = [];
                if (ref.size > 0 && firebase.auth().currentUser) {
                    console.log('ref111', ref);
                    ref.forEach(async (val) => {
                        console.log('val11111111', val);
                        await fetchMessageData(val, firebase.auth().currentUser.uid).then((result) => {
                            console.log('result11111111', result);
                            coversationArr.push(result);
                            console.log(result, coversationArr, coversationArr.length, ref.size, 'Cheking Length');
                            if (coversationArr.length === ref.size) {
                                const conversation = coversationArr.filter(value => Object.keys(value).length !== 0);
                                return dispatch({ type: GET_COVERSATION_LIST_SUCCESS, payload: conversation });
                            }
                        }) 
                        .catch(() => dispatch({ type: GET_COVERSATION_LIST_FAIL, payload: [] }));
                    });
                } else {
                    return dispatch({ type: GET_COVERSATION_LIST_FAIL, payload: [] });
                }
            });
    } else {
            return dispatch({ type: GET_COVERSATION_LIST_FAIL, payload: [] });
    }
};

export const fetchMessageData = (conversationDetail, uid) => {
    console.log('fetchMessageData', conversationDetail, uid);
    return new Promise((resolve, reject) => {
        const { sendByid, sendToid, LastText, conversationId, createdAt, videoUrl } = conversationDetail.data();
            if (sendByid === uid || sendToid === uid) {
                console.log(uid, sendByid, sendToid, 'CheckUide');
                const nameId = conversationDetail.data().role === 'Client' ? conversationDetail.data().sendToid : conversationDetail.data().sendByid;
                db.collection('users')
                    .where('uid', '==', nameId)
                    .get()
                    .then((res) => {
                        console.log('res1111', res, res.size);
                        if (res.size > 0) {
                            res.forEach((value) => {
                                console.log('conversation11', value);
                                const temp = {
                                    fullName: value.data().fullName,
                                    LastText,
                                    conversationId,
                                    createdAt,
                                    sendToid,
                                    videoUrl,
                                    gallery: value.data().gallery,
                                    serviceArea: value.data().serviceArea,
                                    languages: value.data().languages,
                                    description: value.data().description,
                                    imageData: value.data().imageData,
                                    certified: value.data().certified,
                                    documents: value.data().documents,
                                    documentsSubmitted: value.data().documentsSubmitted,
                                };
                                resolve(temp);
                            });
                        } else {
                            resolve({});
                        }
                    })
                    .catch((err) => {
                        console.log('error', err);
                        reject(err);
                    });
            } else {
                console.log('else empty');
                resolve({});
            }
    });
};

export const removeGuide = (sendToId) => (dispatch) => {
    dispatch({ type: REMOVE_GUIDE });
    console.log('send to id', sendToId);
    const currentUser = firebase.auth().currentUser;
    db.collection('users')
        .where('uid', '==', currentUser.uid)
        .get()
        .then((res) => {
            console.log(res, 'check res');
            db.collection('users').where('uid', '==', sendToId)
                .get()
                .then((data) => {
                    data.forEach((guideData) => {
                        let temp = [];
                        temp = guideData.data().blockedByClient ? guideData.data().blockedByClient : [];
                        temp.push(currentUser.uid);
                        console.log(guideData, guideData.id, 'Guide Data');
                        db.collection('users').doc(guideData.id).update({
                            blockedByClient: temp      // Updating in Guide
                        });
                    });
                })
                .then(() => {
                    if (res.size > 0) {
                        res.forEach((value) => {
                            let blockList;
                            let temp = [];
                            temp = value.data().blockList ? value.data().blockList : [];
                            temp.push(sendToId);
                            console.log('check temp', temp, value.data().blockList, sendToId);
                            db.collection('users').doc(value.id).update({
                                blockList: temp             //Updating in Client
                            })
                                .then(() => {
                                    if (currentUser !== null) {
                                        db.collection('users').doc(value.id).get()
                                            .then((doc) => {
                                                const val = doc.id;
                                                const {
                                                    // eslint-disable-next-line no-shadow
                                                    blockList,
                                                    fullName,
                                                    password,
                                                    role,
                                                    brokerageName,
                                                    brokerName,
                                                    brokerageLicense,
                                                    agentLicense,
                                                    description,
                                                    serviceArea,
                                                    languages,
                                                    experience,
                                                    id,
                                                    jobId,
                                                    pushToken,
                                                    setting,
                                                    email,
                                                    address,
                                                    phone,
                                                    imageData,
                                                    videoUrl,
                                                    gallery,
                                                    location,

                                                } = doc.data();
                                                const details = {
                                                    fullName,
                                                    blockList,
                                                    uid: currentUser.uid,
                                                    setting,
                                                    email,
                                                    password,
                                                    role,
                                                    brokerageName,
                                                    address,
                                                    phone,
                                                    brokerName,
                                                    brokerageLicense,
                                                    agentLicense,
                                                    description,
                                                    serviceArea,
                                                    languages,
                                                    experience,
                                                    imageData,
                                                    id,
                                                    jobId,
                                                    pushToken,
                                                    videoUrl,
                                                    gallery,
                                                    location,

                                                };
                                                console.log('details', details);
                                                AsyncStorage.setItem('userdata', JSON.stringify(details)).then(() => {
                                                    Toast.show({
                                                        text: 'Guide has successfully removed !',
                                                        position: 'bottom',
                                                        buttonText: 'Okay',
                                                        duration: 5000
                                                    });
                                                    dispatch({ type: REMOVE_GUIDE_SUCCESS, payload: true });
                                                })
                                                    .catch((error) => {
                                                        console.log('past', error);
                                                        dispatch({ type: REMOVE_GUIDE_FAIL, payload: false });
                                                    });
                                            })
                                            .catch((err) => {
                                                console.log('present', err);
                                                dispatch({ type: REMOVE_GUIDE_FAIL, payload: false });
                                            });
                                    }
                                })
                                .catch((error) => {
                                    console.log('future', error);
                                    dispatch({ type: REMOVE_GUIDE_FAIL, payload: false });
                                });
                        });
                    } else {
                        dispatch({ type: REMOVE_GUIDE_FAIL, payload: false });
                    }
                });
        })
        .catch((error) => {
            console.log('pastpresent', error);
            // todo-cr-mi : janani - boopi - dispatch file as seperately
            dispatch({ type: REMOVE_GUIDE_FAIL, payload: false });
        });
};

