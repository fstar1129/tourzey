import firebase from 'react-native-firebase';
import { Toast } from 'native-base';
import axios from 'axios';
import {
    POST_VIDEO_FAIL,
    POST_VIDEO_SUCCESS,
    POST_VIDEO,
    POST_IMAGE,
    POST_IMAGE_SUCCESS,
    POST_IMAGE_FAIL
} from './types';

// todo-cr-si pavi : @suren use absolute imports at top
const storage = firebase.storage();
const storageRef = storage.ref();
// todo-cr-si pavi : @suren handle dispatch for fail condition
export const postVideo = (path) => (dispatch) => {
    dispatch({ type: POST_VIDEO });
    const dateTime = new Date().getTime();
    // eslint-disable-next-line no-useless-concat
    storageRef.child(`${'videos/video.mp4' + '_'}${dateTime}`)
        .putFile(path.uri, { contentType: path.type }).then(videoRes => {
    axios({
        method: 'post',
        url: 'https://api.mux.com/video/v1/assets',
        data: {
            input: videoRes.downloadURL, playback_policy: 'public'
        },
        config: {
            headers: {
                'Content-Type': 'application/json'
            },
        },
        auth: {
            username: '579b5f3b-2d62-4986-a035-31e801ee0f5e',
            password: 'tL0bNSRUmrqITL1cv+TsHAh3sYs8rNc3NVJHUtl2QMq3uhFW4UEcEf7yzD9EFRpAYOQjFDbAx5x'
        }
    })
        .then((response) => {
            axios({
                method: 'get',
                url: `https://api.mux.com/video/v1/assets/${response.data.data.id}`,
                auth: {
                    username: '579b5f3b-2d62-4986-a035-31e801ee0f5e',
                    password: 'tL0bNSRUmrqITL1cv+TsHAh3sYs8rNc3NVJHUtl2QMq3uhFW4UEcEf7yzD9EFRpAYOQjFDbAx5x'
                }
            })
                .then((res) => {
                    const concatUrl = `https://stream.mux.com/${ res.data.data.playback_ids[0].id}`;
                    const thumbnailUrl = `https://image.mux.com/${res.data.data.playback_ids[0].id}/thumbnail.jpg`;
                    return (dispatch({ type: POST_VIDEO_SUCCESS, payload: concatUrl, img: thumbnailUrl }));                 
                }).catch((err) => (dispatch({ type: POST_VIDEO_FAIL, payload: err })));
        }).catch((error) => (dispatch({ type: POST_VIDEO_FAIL, payload: error })));
    }).catch((error) => (dispatch({ type: POST_VIDEO_FAIL, payload: error })));
};

export const postImage = (path) => (dispatch) => {
    console.log('000', path);
    dispatch({ type: POST_IMAGE });
    const dateTime = new Date().getTime();
    storageRef.child('image/.image' + '_' + dateTime)
        .putFile(path.uri, { contentType: path.type }).then(imageRes => {
            console.log('image11', imageRes.downloadURL);
            return (dispatch({ type: POST_IMAGE_SUCCESS, payload: imageRes.downloadURL }));
        }).catch((error) => (dispatch({ type: POST_IMAGE_FAIL, payload: error })));
};
