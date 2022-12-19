import firebase from 'react-native-firebase';
import {
    FETCH_NOTIFICATION_JOB_DETAIL,
    FETCH_NOTIFICATION_JOB_DETAIL_SUCCESS,
    FETCH_NOTIFICATION_JOB_DETAIL_FAIL
} from './types';

const db = firebase.firestore();

export const fetchNotificationJobDetail = (jobId) => (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATION_JOB_DETAIL });
    db.collection('jobs')
    .doc(jobId)
    .get()
    .then((job) => {
        let obj = {};
        let sd = null;
        let ed = null;
        let url = null;
        let name = null;
        let size = null;
        let status = null;
        if (job.data()) {
            if (!job.data().contractDetails) {
                sd = null;
                ed = null;
                url = null;
                name = null;
                size = null;
                status = null;
            } else {
                sd = job.data().contractDetails[0].startDate;
                ed = job.data().contractDetails[0].endDate;
                url = job.data().contractDetails[0].fileUrl;
                name = job.data().contractDetails[0].fileName;
                size = job.data().contractDetails[0].fileSize;
                status = job.data().contractDetails[0].approvalStatus;
            }
            obj = {
                agreedBy: job.data().agreedBy,
                archievedBy: job.data().archievedBy,
                hired: job.data().hired,
                hiredAgent: job.data().hiredAgent,
                jobAppliedBy: job.data().jobAppliedBy,
                jobPostDate: job.data().jobPostDate,
                jobType: job.data().jobType,
                jobVideo: job.data().jobVideo,
                rateAgent: job.data().rateAgent,
                rateClient: job.data().rateClient,
                starCountAgent: job.data().starCountAgent,
                starCountClient: job.data().starCountClient,
                type: job.data().type,
                contract: job.data().contract,
                jobId: job.id,
                jobTitle: job.data().jobTitle,
                jobCity: job.data().jobCity,
                jobDesc: job.data().jobDesc,
                jobPrice: job.data().jobPrice,
                jobState: job.data().jobState,
                jobZipcode: job.data().jobZipcode,
                postedBy: job.data().postedBy,
                id: job.id,
                startDate: sd,
                endDate: ed,
                fileUrl: url,
                fileName: name,
                fileSize: size,
                approvalStatus: status,
                userId: job.data().userId
            };
            fetchNotificationJobDetailSuccess(dispatch, obj);
        } else {
            fetchNotificationJobDetailfail(dispatch, {});
        }
    })
    .catch((error) => {
        fetchNotificationJobDetailfail(dispatch, error);
    });
};


const fetchNotificationJobDetailSuccess = (dispatch, jobData) => {
    dispatch({ type: FETCH_NOTIFICATION_JOB_DETAIL_SUCCESS, payload: jobData });
};


const fetchNotificationJobDetailfail = (dispatch, error) => {
    dispatch({ type: FETCH_NOTIFICATION_JOB_DETAIL_FAIL, payload: error });
};
