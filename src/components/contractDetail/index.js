import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Modal, Image, Alert, WebView, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
// import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View, Card, CardItem, Thumbnail, Text, Input,
    Body, Button, Textarea, Toast
} from 'native-base';
import { connect } from 'react-redux';
import Moment from 'moment';
import firebase from 'react-native-firebase';
// import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
// import Colors from '../../themes/main/Theme.Main.Colors';
// import Metrics from '../../themes/main/Theme.Main.Metrics';
import {
    updateJobType, viewContractDetails, viewJobApprovedDetail,
    nearbyAgents
} from '../../action/index';
// import { AccessTokenUrl, clientId, secretId, paymentIdUrl } from '../../utils/constants';
import { isStringEmpty } from '../../utils/checkEmptycondition';

const db = firebase.firestore();
class ContractDetail extends Component {

    //todo-cr-mi: janani- added globally 
    static navigationOptions = ({ navigation }) => ({
        title: 'Contract Details',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        }
    });

    constructor(props) {
        super(props);
        //todo-cr-mi: get date using common functions 
        const currentDate = Date.now();
        this.state = {
            minimumDate: Moment(currentDate).utc().format('DD/MM/YYYY'),
            startDate: Moment().utc().add(2, 'hours').format('DD/MM/YYYY'),
            endDate: Moment().utc().add(2, 'hours').format('DD/MM/YYYY'),
            decline: false,
            showApproveModal: false,
            commentBox: false,
            comments: '',
            details: {},
            complete: false,
            fileInfo: {},
            fileName: '',
            fileSize: '',
            url: '',
            fileDetails: '',
            archive: false,
            description: '',
            jobTitle: '',
            loader: false,
            approvalUrl: null,
            type: '',
            jobId: '',
            contract: false,
            jobApprovedDetails: {}
        };
    }

    componentDidMount() {
        console.log('Cd');

        this.setState({
            archive: this.props.navigation.state.params && this.props.navigation.state.params.archive,
            complete: this.props.navigation.state.params && this.props.navigation.state.params.complete,
            description: this.props.navigation.state.params && this.props.navigation.state.params.jobDesc,
            jobTitle: this.props.navigation.state.params && this.props.navigation.state.params.jobTitle,
            type: this.props.navigation.state.params && this.props.navigation.state.params.type,
            jobId: this.props.navigation.state.params && this.props.navigation.state.params.jobId,
            contract: this.props.navigation.state.params && this.props.navigation.state.params.contract,
            notification: this.props.navigation.state.params && this.props.navigation.state.params.notification,
        }, () => {
            this.props.viewContractDetails(this.state.jobId, this.props.userData.uid);
            this.props.navigation.setParams({
                headerLeft:
                    this.state.notification === true || this.props.navigation.state.params.notification ?
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Jobs'); }}>
                            <Image
                                source={Theme.Images.icons.backIcon}
                                style={AppStyles.backIcon}
                            />

                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                            <Image
                                source={Theme.Images.icons.backIcon}
                                style={AppStyles.backIcon}
                            />

                        </TouchableOpacity>,
            });
            if (this.state.type === 'open') {
                this.props.navigation.setParams({
                    headerRight:
                        <View>
                            <Text style={AppStyles.nextBtn} onPress={() => { this.saveContract(); }}>SAVE</Text>
                        </View>
                });
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'nextp', this.props.nearByAgent);
        if (nextProps.nearByAgent !== this.props.nearByAgent) {
            if (nextProps.nearByAgentSuccess === true) {
                console.log('dfaf');
                this.props.navigation.navigate('JobPostCompleted', { suggestion: nextProps.nearByAgent, nearByAgents: true, jobId: this.state.jobId });
            }
        }
        if (nextProps.jobType !== this.props.jobType) {
            if (nextProps.jobTypeSuccess === true) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Jobs' })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
                this.setState({ visible: false });
            }
        }

        if (nextProps.contractDetails !== this.props.contractDetails) {
            this.setState({
                details: nextProps.contractDetails,
            }, () => {
                if (this.state.details && isStringEmpty(this.state.details.approvedby)) {
                    console.log('jobApproved', this.state.details.approvedby);
                    this.props.viewJobApprovedDetail(this.state.jobId, this.state.details.approvedby);
                }
            });
        }
        if (nextProps.jobApprovedDetails !== this.props.jobApprovedDetails) {
            this.setState({
                jobApprovedDetails: nextProps.jobApprovedDetails,
            }, () => {
            });
        }
    }

    // onDeclinePress() {
    //     this.setState({
    //         decline: true,
    //     });
    // }

    // onApprovePress(userId, id, startDate, endDate, url, fileName, fileSize) {
    //     //todo-cr-si: boopi : Remove unwanted code //completed
    //     const approveStatus = true;
    //     const comments = 'No comments';
    //     const approveObj = {
    //         id,
    //         approveStatus,
    //         startDate,
    //         endDate,
    //         comments,
    //         url,
    //         fileName,
    //         fileSize,
    //         userId
    //     };
    //     this.props.updateApproval(approveObj);
    //     this.props.updateApprovalJobList(id);
    // }
    saveContract() {
        const Id = this.state.jobId;
        this.setState({ loader: true });
        if (Id) {
            db.collection('jobs').doc(Id).update({
                jobDesc: this.state.description,
                jobTitle: this.state.jobTitle

            })
                .then((res) => {
                    this.setState({ loader: false });
                    Toast.show({
                        text: 'Job details updated',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000
                    });
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Jobs' })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                })
                .catch((error) => {
                    this.setState({ loader: false });
                    Toast.show({
                        text: 'Cannot be update details',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000
                    });
                });
        }
    }
    // onDecline() {
    //     this.setState({
    //         decline: false,
    //         commentBox: true,
    //         showApproveModal: false,
    //     });
    // }
    // onSubmitPress(userId, id, comments, url, fileName, fileSize) {
    //     this.setState({
    //         commentBox: false,
    //         showApproveModal: false
    //     });
    //     const startDate = null;
    //     const endDate = null;
    //     const approveStatus = false;
    //     const declineObj = {
    //         id,
    //         approveStatus,
    //         startDate,
    //         endDate,
    //         comments,
    //         url,
    //         fileName,
    //         fileSize,
    //         userId
    //     };
    //     this.props.updateApproval(declineObj);
    //     this.props.deleteHiredAgent(id);
    // }

    // onIconPress() {
    //     this.setState({ showApproveModal: false },
    //         () => {
    //             const resetAction = NavigationActions.reset({
    //                 index: 0,
    //                 actions: [
    //                     NavigationActions.navigate({ routeName: 'Jobs' })
    //                 ]
    //             });
    //             this.props.navigation.dispatch(resetAction);
    //         }
    //     );
    // }


    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }
    renderLoaderValue() {
        if (this.props.loaderVal || this.props.jobTypeLoader || this.props.nearByAgentLoader) {
            this.state.loader = true;
            return (
                <View style={{ flex: 1 }}>
                    {/* todo-cr-si-pavithra: @janani - use external styles - completed */}
                    <Spinner visible={this.state.loader} textContent={'Loading...'} textStyle={styles.loaderStyle} />
                </View>
            );
        }
        this.state.loader = false;
        return (
            <View style={{ flex: 1 }}>
                {/* todo-cr-si-pavithra: @janani - use external styles - completed*/}
                <Spinner visible={this.state.loader} textContent={'Loading...'} textStyle={styles.loaderStyle} />
            </View>
        );

    }
    agentDetail() {
        this.props.navigation.navigate('ProfileEdit');
    }

    onJobComplete(jobData, type) {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to ${type} this job ? `,
            [
                {
                    text: 'ok',
                    onPress: type === 'complete' ? () => { this.onCompletePress(jobData, type); }
                        :
                        () => { this.onArchivePress(jobData, type); }
                },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }

        );
    }
    onCompletePress(jobData, type) {
        this.setState({ visible: true });
        // this.props.updateJobType(type, jobData);
        console.log('curncy', jobData, type )
                let currency = "100"
                // currency.replace(" USD", "");

               
    }

    onArchivePress(details, type) {
        if (details.type === 'complete') {
            Toast.show({
                text: 'This job has already completed!!!',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000
            });
        } else {
            this.props.updateJobType(type, details);
        }
    }

    openDoc(detail) {
        //todo-cr-si-pavi: @janani  use file for undefined condition  - completed
        if (detail && isStringEmpty(detail.url)) {
            Linking.canOpenURL(detail.url)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(detail.url);
                    }
                    //todo-cr-si: put in common funtion
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

    nearBy(address) {
        console.log('new');
        this.props.nearbyAgents(address);
    }


    render() {
        const jobItemInfo = this.state.details;
        console.log('jobItemInfo', jobItemInfo);
        //todo-cr-si: janani - while render value before check 'hasOwnPropery' in render
        //todo-cr-mi- pavithra: @janani - remove unused code - completed
        return (
            //todo-cr-mi: janani- Added translation label name
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.contractContainer}>

                        <Text style={styles.heading}>Contract Details</Text>
                        <View style={styles.titleView}>
                            <Card style={styles.cardView}>
                                <CardItem >
                                    <Body >
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={[styles.titleStyle, { paddingBottom: 10, marginTop: -10 }]}>Job Title</Text>
                                            {/*don't put condition in jobtitle in contract detail  */}
                                            {jobItemInfo.type === 'open' ?
                                                <Input style={[AppStyles.textPrimary, { height: 'auto', marginLeft: '-15%', paddingRight: 0, paddingTop: 10, paddingBottom: 0 }]} onChangeText={(text) => this.setState({ jobTitle: text })} >
                                                    <Text>{jobItemInfo && jobItemInfo.jobTitle ? jobItemInfo.jobTitle : '-'} </Text>
                                                </Input>
                                                :
                                                <Text
                                                    style={AppStyles.textPrimary}
                                                >
                                                    {jobItemInfo && jobItemInfo.jobTitle ? jobItemInfo.jobTitle : '-'}
                                                </Text>

                                            }
                                        </View>

                                    </Body>

                                </CardItem>
                            </Card>
                            <Card style={styles.cardViewbudget}>
                                <CardItem style={styles.cardStyle}>
                                    <Body>
                                        <View>
                                            <Text style={styles.titleStyle}>Budget</Text>
                                            <Text style={[AppStyles.textPrimary, { height: 'auto', paddingRight: 0, paddingTop: 10, paddingBottom: 0 }]}>${jobItemInfo.jobPrice ? jobItemInfo.jobPrice : jobItemInfo.budget}</Text>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Text style={styles.titleStyle} >
                                        Work Description</Text>
                                    {jobItemInfo.type === 'open' ?
                                        <Textarea
                                            style={styles.textareaStyle}
                                            value={this.state.description}
                                            onChangeText={(text) => this.setState({ description: text })}
                                        />
                                        // <Input onChangeText={(text) => this.setState({ description: text })} >
                                        //     <Text style={styles.description}>{jobItemInfo.jobDesc}</Text>
                                        // </Input>
                                        :
                                        <Text
                                            style={styles.description}
                                        // style={[AppStyles.textPrimary, { height: 'auto', paddingleft: 0, paddingRight: 0, paddingTop: 10, paddingBottom: 0 }]}
                                        >
                                            {jobItemInfo.jobDesc}
                                        </Text>
                                    }
                                </Body>
                            </CardItem>
                        </Card>

                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Text style={styles.titleStyle}>Property Address</Text>
                                    <Text style={AppStyles.textPrimary}>{jobItemInfo.jobCity}, {jobItemInfo.jobState}, {jobItemInfo.jobZipcode}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <View style={styles.titleView}>
                            <Card style={styles.datecardView}>
                                <CardItem style={styles.cardStyle}>
                                    <Body>
                                        <Text style={styles.titleStyle}>Posted on </Text>
                                        <Text style={AppStyles.textPrimary}>{jobItemInfo.jobPostDate}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                        <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <Body>
                                    <TouchableOpacity
                                        onPress={() => this.agentDetail()}
                                    >
                                        <Text style={styles.titleStyle}>Client</Text>
                                        <View style={styles.userView}>
                                            <Thumbnail
                                                style={styles.userImage}
                                                source={
                                                    this.props.userData &&
                                                        this.props.userData.imageData ?
                                                        { uri: this.props.userData.imageData.uri } :
                                                        Theme.Images.profile_screen.default_avatar
                                                }
                                            />
                                            <Text style={styles.agentName}>{this.props.userData ? this.props.userData.fullName : ''}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Body>
                            </CardItem>
                        </Card>
                        {jobItemInfo.approvedby && isStringEmpty(jobItemInfo.approvedby) &&
                            <Card style={styles.cardViewStyle}>
                                <CardItem>
                                    <Body>
                                        {/* <Text style={styles.titleStyle}>JobApprovedBy</Text> */}
                                        <Text style={styles.titleStyle}>Agent</Text>
                                        <View style={styles.userView}>
                                            <Thumbnail
                                                style={styles.userImage}
                                                source={
                                                    this.state.jobApprovedDetails &&
                                                        this.state.jobApprovedDetails.imageData ?
                                                        { uri: this.state.jobApprovedDetails.imageData.uri } :
                                                        Theme.Images.profile_screen.default_avatar
                                                }
                                            />
                                            <Text style={styles.agentName}>{this.state.jobApprovedDetails ? this.state.jobApprovedDetails.fullName : ''}</Text>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        }

                        {/* {jobItemInfo.contract && jobItemInfo.url !== '' && jobItemInfo.url !== null && */}
                        <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <Body>
                                    <View style={styles.attachView}>
                                        <View style={styles.fileView}>
                                            {jobItemInfo.fileName && jobItemInfo.url && jobItemInfo.contract === true ?
                                                <TouchableOpacity
                                                    onPress={() => this.openDoc(jobItemInfo)}
                                                >
                                                    <View style={styles.textCenter}>
                                                        <Text style={styles.textPrimary}>Attached File</Text>
                                                        <Text style={styles.textPrimary}>{jobItemInfo.fileName.split('|')[0].trim()}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <View style={styles.textCenter}>
                                                    <Text style={styles.textPrimary}>No Files Attached</Text>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                        {/* } */}

                        <View>
                            <View>
                                <View>
                                    {/* {jobItemInfo.contract === true && jobItemInfo.type !== 'complete' && */}
                                        <View style={styles.buttonView}>
                                            <TouchableOpacity style={AppStyles.tochableButton}>
                                                <Button
                                                    style={AppStyles.secondaryButtonWhite}
                                                    onPress={() => this.onJobComplete(jobItemInfo, 'complete')}
                                                >
                                                    <Text style={AppStyles.buttonTextSecondary}>COMPLETE</Text>
                                                </Button>
                                            </TouchableOpacity>
                                        </View>
                                    {/* // } */}

                                    <View style={styles.buttonView}>
                                        {this.state.details.userId === this.props.userData.uid && !jobItemInfo.contract && jobItemInfo.type !== 'archive' &&
                                            <TouchableOpacity style={AppStyles.tochableButton}>
                                                <Button
                                                    style={AppStyles.secondaryButtonWhite}
                                                    onPress={() => this.onJobComplete(jobItemInfo, 'archive')}
                                                >
                                                    <Text style={AppStyles.buttonTextSecondary}>ARCHIVE</Text>
                                                </Button>
                                            </TouchableOpacity>
                                        }
                                        <TouchableOpacity style={AppStyles.tochableButton} onPress={() => { this.nearBy(jobItemInfo.jobCity + jobItemInfo.jobState + jobItemInfo.jobZipcode) }} >
                                            <LinearGradientView style={AppStyles.primaryButton} name={'Local Agents'.toUpperCase()} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {this.renderLoader()}
                        {this.renderLoaderValue()}
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}

export const mapStateToProps = ({ getUserDetails, getuserData, updateJobTypeValue, getJobDetails }) => {
    console.log(getuserData, 'cd');
    const { jobTypeSuccess, jobTypeLoader, errorValue, jobType } = updateJobTypeValue;
    const { loaderVal, contractSuccess, contractDetails } = getJobDetails;
    const { jobApprovedDetails, jobApprovedLoader, jobApprovedDetailsSuccess, nearByAgent,
        nearByAgentSuccess, nearByAgentLoader } = getUserDetails;
    console.log('jobApprovedDetails....', jobApprovedDetails);

    const { userData } = getuserData;
    return {
        userData,
        jobTypeSuccess,
        jobType,
        jobTypeLoader,
        errorValue,
        loaderVal,
        contractSuccess,
        contractDetails,
        jobApprovedDetails,
        jobApprovedLoader,
        jobApprovedDetailsSuccess,
        nearByAgent,
        nearByAgentSuccess,
        nearByAgentLoader
    };
};

export default connect(mapStateToProps,
    { updateJobType, viewContractDetails, viewJobApprovedDetail, nearbyAgents })(ContractDetail);
