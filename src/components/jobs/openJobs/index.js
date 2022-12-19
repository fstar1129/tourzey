import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Platform, Alert, Linking, AsyncStorage } from 'react-native';
import firebase, { Notification } from 'react-native-firebase';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { View, Card, CardItem, Text, Button, Toast, Label } from 'native-base';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../../common/gradient/linearGradient';
import {
    getJobDetail, fetchData, getNextJobDetail, updateJobType, fetchNotificationJobDetail
} from '../../../action/index';
import { isStringEmpty } from '../../../utils/checkEmptycondition';

class OpenJobs extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            showDesc: false,
            jobDetail: [],
            count: 0,
            lastId: '',
            seeMoreVisible: true,
            tourOptions: false,
            plusPressed: false
        };
    }

    componentDidMount() {
        this.props.getJobDetail('open');
        // this.props.fetchData();
        this.createNotificationListeners();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: false
        });
        //todo cr-si: janani - Before check condition,if it presents or not

        if (nextProps) {
            if (nextProps.successJobs === true) {
                if (nextProps.details !== this.props.details) {
                    const job = [];
                    nextProps.details.map((jobItem) => {
                        if (jobItem.type === 'open') {
                            job.push(jobItem);
                            this.setState({
                                jobDetail: job
                            }, () => {
                                this.props.onDataChanged(this.state.jobDetail);
                            });
                        }
                    });
                }
            }
            if (nextProps.jobData !== this.props.jobData) {
                // const job = JSON.parse(jobDetail);
                this.props.navigation.navigate('HireAgent',
                    {
                        complete: false,
                        type: nextProps.jobData && nextProps.jobData.type,
                        jobId: nextProps.jobData && nextProps.jobData.id,
                        tourDesc: (nextProps.jobData && nextProps.jobData.tourDesc) ? nextProps.jobData.tourDesc : '',
                        tourName: nextProps.jobData && nextProps.jobData.tourName,
                        contract: nextProps.jobData && nextProps.jobData.contract,
                        notification: true,
                        screen: 'jobs'
                    }
                );
            }
        }
    }


    onPostJobPress() {
        this.setState({
            tourOptions: true
        });
    }

    getNotification(notificationOpen) {
        if (notificationOpen) {
            //todo-cr-mi: srini - Remove console log - completed
            AsyncStorage.getItem('notification').then((res) => {
                const notificationId = notificationOpen.notification.notificationId;
                if (res === null) {
                    AsyncStorage.setItem('notification', notificationId).then(async () => {
                        await this.notification(notificationOpen);
                    });
                } else if (res !== notificationId) {
                    AsyncStorage.setItem('notification', notificationId).then(async () => {
                        await this.notification(notificationOpen);
                    });
                }
            });
        }
    }
    async createNotificationListeners() {
        //It is triggered when click on notifications
        this.notificationOpenedListener = await firebase.notifications().onNotificationOpened((notificationOpen) => {
            this.getNotification(notificationOpen);
        });
        /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        // this.notification(notificationOpen);
        if (notificationOpen) {
            this.getNotification(notificationOpen);
        }

        // Notification Listener
        //todo-cr-si: pavithra - use variable name as unique - completed
        this.notificationListener = firebase.notifications().onNotification((notificationOpen) => {
            // Process your notification as required  
            // if (Platform.OS === 'android') {
            //     payload
            //         .android.setChannelId('channelId')
            //         .android.setPriority(firebase.notifications.Android.Priority.Max); //Notification always stay at top 
            // }
            if (notificationOpen) {
                this.getNotification(notificationOpen);
            }
        });
    }

    notification(notificationOpen) {
        //todo-cr-mi: srini - Remove console log - completed
        if (notificationOpen) {
            const { page } = notificationOpen.notification.data;
            if (page === 'AgentProfile') {
                this.props.navigation.navigate('Favorites');
            } else if (page === 'CompletedJobs') {
                this.props.navigation.navigate('Jobs', { page: 'Complete' });
            } else if (page === 'ContractDetail') {
                const { jobId } = notificationOpen.notification.data;
                const job = JSON.parse(jobId);
                if (isStringEmpty(job)) {
                    this.props.fetchNotificationJobDetail(job);
                }
            } else if (page === 'MessageScreen') {
                const { messageData } = notificationOpen.notification.data;
                const message = JSON.parse(messageData);
                this.props.navigation.navigate('MessageScreen', { data: message, type: 'conversation', role: 'client', notification: true });
            }
        }
    }
    //todo-cr-si: srini - Solve eslint error - completed


    seeMore() {
        const last = _.last(this.state.jobDetail);
        this.setState({ lastId: last.lastVisible.id });
        if (this.state.lastId === last.lastVisible.id) {
            this.setState({ seeMoreVisible: false });
        }
        this.props.getJobDetail('open', last.lastVisible);
    }

    showdetail(details) {
        this.setState({ showDesc: !this.state.showDesc });
        if (this.state.details) {
            if (this.state.details.id !== details.id) {
                this.setState({ showDesc: true });
            }
        }
        this.setState({ details });
    }


    moveToMedia(data) {
        // this.props.navigation.navigate('Media');
        if (data) {
            this.props.navigation.navigate('Media', { videoUrl: data });
        } else {
            //todo-cr-si:goutham: change warning to info
            Alert.alert(
                'Info',
                'There is no media',
                [
                    { text: 'Ok', style: 'cancel' },
                ],
                { cancelable: false }
            );
        }
    }

    openDoc(jobsDetail) {
        if (jobsDetail && isStringEmpty(jobsDetail.fileUrl)) {
            // if (jobsDetail.fileName && jobsDetail.fileUrl) {
            Linking.canOpenURL(jobsDetail.fileUrl)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(jobsDetail.fileUrl);
                    }
                    Alert.alert(
                        'Cannot open the url',
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false }
                    );
                }).catch(() => {
                    Alert.alert('No documents attached.', [
                        { text: 'OK' },
                    ], { cancelable: false });
                });
        } else {
            Alert.alert(
                'Info',
                'No documents attached.',
                [
                    { text: 'OK' },
                ], { cancelable: false });
        }
    }

    //todo-cr-si: boopathi - Dont use inline styles
    renderLoader() {
        if (this.props.loading === true || this.props.loader === true) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
        this.state.visible = false;
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
            </View>
        );
    }


    renderRow(details) {
        return (
            <View style={styles.cardContainer}>
                <Card style={styles.cardViewStyle}>
                    <CardItem style={styles.cardView}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('HireAgent',
                                {
                                    complete: false,
                                    archive: false,
                                    type: details.type,
                                    jobId: details.id,
                                    tourDesc: details.tourDesc ? details.tourDesc : '',
                                    tourName: details.tourName,
                                    contract: details.contract,
                                    screen: 'jobs'
                                }
                            )}
                        >
                            <View style={styles.detailView}>
                                <Text style={styles.title}>{details.tourName}</Text>
                                <Text style={styles.priceDes}>Fixed Price - {details.tourPostDate} by {details.postedBy}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.iconView}>
                            {(this.state.details !== details || this.state.showDesc === false) &&
                                <TouchableOpacity onPress={() => this.showdetail(details)}>
                                    <Icon style={styles.icon} name="plus-circle" />
                                </TouchableOpacity>
                            }
                            {this.state.showDesc === true && this.state.details === details &&
                                <TouchableOpacity onPress={() => this.showdetail(details)}>
                                    <Icon style={styles.icon} name="minus-circle" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View>
                            {this.state.showDesc === true && this.state.details === details &&
                                <View>
                                    <View style={styles.wholeView}>
                                        <CardItem style={styles.contentView}>
                                            <Text style={styles.count}>{details.jobAppliedBy ? details.jobAppliedBy.length : 0}</Text>
                                            <Text style={styles.description}>Offers</Text>
                                        </CardItem>
                                        <View style={styles.lineStyle} />
                                        <CardItem style={styles.contentView}>
                                            <Text style={styles.count} />
                                            <Text style={styles.description}>Messages</Text>
                                        </CardItem>
                                        <View style={styles.lineStyle} />
                                        <CardItem style={styles.contentView}>
                                            <Text style={styles.count}>{details.hiredAgent.length}</Text>
                                            <Text style={styles.description}>Hired</Text>
                                        </CardItem>
                                    </View>
                                    <View style={styles.optionalStyle}>
                                        {details.jobVideo !== '' && details.jobVideo !== undefined ?
                                            <TouchableOpacity onPress={() => this.moveToMedia(details.jobVideo)}>
                                                <Text style={styles.buttonTextLink}>{'MEDIA'.toUpperCase()}</Text>
                                            </TouchableOpacity>
                                            :
                                            <Text />
                                        }
                                        {details.fileUrl !== '' && details.fileUrl !== undefined && details.fileUrl !== null ?
                                            <TouchableOpacity onPress={() => this.openDoc(details)}>
                                                <Text style={styles.buttonTextLink}>{'Documents'.toUpperCase()}</Text>
                                            </TouchableOpacity>
                                            :
                                            <Text />
                                        }
                                    </View>
                                </View>
                            }
                        </View>
                    </CardItem>
                    <View>
                        {details.contract && details.approvalStatus === true ?
                            <View>
                                <Text style={styles.tag}>Contract Approved</Text>
                            </View>
                            :
                            <View>
                                {details.approvalStatus === false ?
                                    <View>
                                        <Text style={styles.tag}>Contract Rejected</Text>
                                    </View>
                                    :
                                    null
                                }
                            </View>
                        }
                    </View>
                </Card>
            </View >
        );
    }
    onQuickTourPress() {
        this.props.navigation.navigate('Location', { quickTour: true });
    }
    onFutureTourPress() {
        this.props.navigation.navigate('Location', { futureTour: true });
    }

    render() {
        console.log('plusPressed', this.props.plusPressed, this.state.tourOptions);
        return (
            <SafeAreaView >
                <ScrollView>

                    {this.state.jobDetail && this.state.jobDetail.length > 0 ?
                        <View>
                            {this.props.plusPressed === true ?
                                <View style={styles.nodataView}>
                                    <Text style={styles.nodataText}>
                                        Post a new tour
                                    </Text>
                                    <Label style={styles.labelStyle}>Find great people quickly by posting a tour request.</Label>
                                    <View style={styles.postJob}>
                                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onQuickTourPress.bind(this)}>
                                            <LinearGradientView style={AppStyles.primaryButton} buttonStyle={'small'} name={'Quick Tour'} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.postJob}>
                                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onFutureTourPress.bind(this)}>
                                            <LinearGradientView style={AppStyles.primaryButton} buttonStyle={'small'} name={'Future Tour'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <ListView
                                    dataSource={this.ds.cloneWithRows(this.state.jobDetail)}
                                    renderRow={this.renderRow.bind(this)}
                                    enableEmptySections
                                />
                            }

                        </View>
                        :
                        <View>
                            {this.state.tourOptions === true ?
                                <View style={styles.nodataView}>
                                    <Text style={styles.nodataText}>
                                        No Open Tours
                                        </Text>
                                    <Label style={styles.labelStyle}>Find great people quickly by posting a tour request.</Label>
                                    <View style={styles.postJob}>
                                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onQuickTourPress.bind(this)}>
                                            <LinearGradientView style={AppStyles.primaryButton} buttonStyle={'small'} name={'Quick Tour'} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.postJob}>
                                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onFutureTourPress.bind(this)}>
                                            <LinearGradientView style={AppStyles.primaryButton} buttonStyle={'small'} name={'Future Tour'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View style={styles.nodataView}>
                                    <Text style={styles.nodataText}>
                                        No Open Tours
                                        </Text>
                                    <Label style={styles.labelStyle}>Find great people quickly by posting a tour request.</Label>
                                    <View style={styles.postJob}>
                                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onPostJobPress.bind(this)}>
                                            <LinearGradientView style={AppStyles.primaryButton} buttonStyle={'small'} name={'Post a Tour'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        </View>
                    }
                    {this.renderLoader()}
                    {/* {this.state.seeMoreVisible === true &&
                    <Button rounded onPress={this.seeMore.bind(this)}>
                        <Text>See more</Text>
                    </Button>
                     }  */}
                </ScrollView>
            </SafeAreaView>
        );
    }

}


export const mapStateToProps = ({ getJobDetails, isSignedin, updateJobTypeValue, fetchJobDetail }) => {
    const { details, successJobs, loading, error } = getJobDetails;
    const { jobTypeSuccess, loader, errorValue, jobType } = updateJobTypeValue;
    const { userData } = isSignedin;
    const { jobLoader, jobData } = fetchJobDetail;
    return {
        details,
        successJobs,
        loading,
        loader,
        error,
        errorValue,
        userData,
        jobTypeSuccess,
        jobType,
        jobLoader,
        jobData,
    };
};

export default
    connect(mapStateToProps, {
        getJobDetail, fetchData, getNextJobDetail, updateJobType, fetchNotificationJobDetail
    })(OpenJobs);

