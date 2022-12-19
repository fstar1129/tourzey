import React, { Component } from 'react';
import { Card, CardItem, View, Text, Thumbnail, Body, Button, Toast } from 'native-base';
import { ScrollView, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import StarRating from 'react-native-star-rating';
import Moment from 'moment';
import LinearGradientView from '../common/gradient/linearGradient';
import styles from './styles';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Colors from '../../themes/main/Theme.Main.Colors';
import {
    updateJobDetails,
    verifyHiredAgent,
    fetchTourDetails,
    updateJobType,
    viewContractDetails,
    viewJobApprovedDetail,
    nearbyAgents
} from '../../action/index';
import { isObjectEmpty, isStringEmpty, isArrayEmpty } from '../../utils/checkEmptycondition';


class HireAgent extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.screen === 'offer' ? 'Hire Agent' : 'Contract Details',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 1,
        }
    });
    constructor(props) {
        super(props);
        this.state = {
            jobId: '',
            data: {},
            tourDetails: {},
            checked: false,
            jobApprovedDetails: {},
            details: {},
            count: '1'
        };
    }

    componentWillMount() {
        const { state } = this.props.navigation;
        console.log('hireAgent...', state.params.data);
        if (state.params && isObjectEmpty(state.params.data)) {
            this.setState({
                data: state.params.data
            }, () => {
                console.log('hireAgent', this.state.data);
                this.setState({ count: this.state.data.milestone ? (this.state.data.milestone.length + 1).toString() : '1' });
            });
        }
    }
    componentDidMount() {
        console.log('didmount', this.props.navigation.state.params);
        this.setState({
            archive: this.props.navigation.state.params.archive,
            complete: this.props.navigation.state.params.complete,
            tourDesc: this.props.navigation.state.params.tourDesc,
            tourName: this.props.navigation.state.params.tourName,
            type: this.props.navigation.state.params.type,
            jobId: this.props.navigation.state.params.jobId,
            contract: this.props.navigation.state.params.contract,
            notification: this.props.navigation.state.params.notification,
            screen: this.props.navigation.state.params.screen
        }, () => {
            if (this.state.screen === 'offer') {
                console.log('didmountif');
                this.props.fetchTourDetails(this.state.data.jobIdValue);
                this.props.verifyHiredAgent(this.state.data.uid, this.props.navigation.state.params.jobid);
            } else if (this.state.screen === 'jobs') {
                console.log('didmountelse');
                this.props.viewContractDetails(this.state.jobId, this.props.userData.uid);
            }

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
                        <View>
                        {this.state.screen === 'offer' ?
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Offers'); }}>
                            <Image
                                source={Theme.Images.icons.backIcon}
                                style={AppStyles.backIcon}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Jobs'); }}>
                            <Image
                                source={Theme.Images.icons.backIcon}
                                style={AppStyles.backIcon}
                            />
                        </TouchableOpacity>
                        }
                        </View>,
                headerRight:
                    <View>
                        <Text style={styles.faqBtn} onPress={() => { this.onFaqPress(); }}>FAQS</Text>
                    </View>,
            });
        });
    }

  
    componentWillReceiveProps(nextProps) {
        if (nextProps.updateDetails !== this.props.updateDetails) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Jobs' })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
        if (nextProps.tourData !== this.props.tourData) {
            this.setState({
                tourDetails: nextProps.tourData
            }, () => {
                console.log('tourDetails', this.state.tourDetails);
            });
        }
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
                this.setState({ count: this.state.details.milestone ? (this.state.details.milestone.length + 1).toString() : '1' });
                console.log('details', this.state.details);
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
                console.log('hireAgent', this.state.jobApprovedDetails);
            });
        }
    }

    onHirePress() {
        this.props.navigation.navigate('Hire', { agentId: this.state.data.uid, jobId: this.props.navigation.state.params.jobid });
    }

    onFaqPress() {
        this.props.navigation.navigate('FAQ');
    }

    onJobComplete(jobData, type) {
        Alert.alert(
            'Confirmation',
            `Are you sure you want to ${type} this job ? `,
            [
                {
                    text: 'ok',
                    onPress: type === 'archive' ? () => { this.onArchivePress(jobData, type); }
                        :
                        null
                },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }

        );
    }

    // todo-cr-mi - suren @ jana - remove unused params
    onCompletePress(jobData, type) {
        // Note: In this action update jobType of 'complete'

        // this.setState({ visible: true });
        // this.props.updateJobType(type, jobData);

        this.props.navigation.navigate('JobComplete', { jobApprovedDetails: this.state.jobApprovedDetails, tourContractDetails: this.state.details });
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

    
 // todo-cr-mi - suren @ jana - solve eslint error - completed
    openDoc(detail) {
        if (detail && isStringEmpty(detail.fileUrl || detail.url)) {
            Linking.canOpenURL(detail.fileUrl || detail.url)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(detail.fileUrl || detail.url);
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

    nearBy(address) {
        console.log('new');
        this.props.nearbyAgents(address);
    }

    onClick() {
        if (this.state.checked === true) {
            this.setState({ checked: false });
        } else {
            this.setState({ checked: true });
        }
    }

    onCancelPress() {
        this.props.navigation.navigate('Jobs');
    }

    termsAndConditions() {
        this.props.navigation.navigate('TermsAndConditions');
    }

    renderLoader() {
        if (this.props.loading || this.props.loader || this.props.tourLoader || this.props.loaderVal || this.props.jobTypeLoader || this.props.nearByAgentLoader) {
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

    render() {
        const { tourDetails, details, jobApprovedDetails, data } = this.state;
        const milestonesData = isArrayEmpty(details.milestone) ? details.milestone : data.milestone;
        const value = isObjectEmpty(this.state.details) ? this.state.details : this.state.data;
        console.log('value...', value);
        console.log('tour', tourDetails, details, milestonesData);
        console.log('agent', jobApprovedDetails, data);
        console.log('count', this.state.count);

        return (
            <SafeAreaView>
                <ScrollView>
                    {(details.type !== 'archive') &&
                        <View style={styles.jobsContainer}>
                            <View style={styles.wrapper}>
                                <View style={styles.back}>
                                    <Card style={styles.cardViewStyle}>
                                        <CardItem>
                                            <View style={styles.agentDetails}>
                                                <Text style={styles.agentName}>
                                                    {data.fullName || jobApprovedDetails.fullName ? data.fullName || jobApprovedDetails.fullName : '-'}
                                                </Text>
                                                {/* <Text style={styles.agentOffice}>
                                            {this.state.jobPostDetails.serviceArea}
                                        </Text> */}
                                                <View>
                                                    <StarRating
                                                        disabled
                                                        halfStarEnabled
                                                        maxStars={5}
                                                        rating={data.ratingCount || jobApprovedDetails.ratingCount ? data.ratingCount || jobApprovedDetails.ratingCount : 0}
                                                        starSize={20}
                                                        fullStarColor={'#f2b518'}
                                                        starStyle={styles.starSpacing}
                                                    />
                                                </View>
                                            </View>
                                        </CardItem>
                                    </Card>
                                </View>
                                <View style={styles.front}>
                                    <Thumbnail
                                        source={(data && data.imageData) || jobApprovedDetails.imageData ? { uri: data.imageData.uri || jobApprovedDetails.imageData.uri } : Theme.Images.profile_screen.default_avatar}
                                        style={styles.profileImage}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                    <View style={styles.contractContainer}>
                        <Text style={styles.heading}>Tour Details</Text>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <View>
                                        <Text style={styles.titleStyle}>Tour Name</Text>
                                        <Text style={styles.textPrimary}>{tourDetails.tourName || details.tourName ? tourDetails.tourName || details.tourName : '-'}</Text>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Text style={styles.titleStyle}>Location</Text>
                                    <Text style={styles.textPrimary}>{tourDetails.tourLocation || details.tourLocation ? tourDetails.tourLocation || details.tourLocation : '-'}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Text style={styles.titleStyle}>Description</Text>
                                    <Text style={styles.description}>{tourDetails.tourDesc || details.tourDesc ? tourDetails.tourDesc || details.tourDesc : '-'}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <View>
                            <View style={styles.titleView}>
                                <Card style={styles.cardViewbudget}>
                                    <CardItem style={styles.cardStyle}>
                                        <Body>
                                            <View>
                                                <View style={styles.budgetView}>
                                                    <Text style={styles.titleStyle}>Budget</Text>
                                                </View>
                                                {data.price || details.tourPrice || details.budget ?
                                                    <Text style={AppStyles.textPrimary}>${data.price || details.tourPrice || details.budget}</Text>
                                                    :
                                                    <Text>{'-'}</Text>
                                                }
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                                <Card style={styles.datecardView}>
                                    <CardItem style={styles.cardStyle}>
                                        <Body>
                                            <View style={styles.startDateView}>
                                                <Text style={styles.titleStyle}>Start Date</Text>
                                            </View>
                                            {/* {tourDetails.tourStartDate && */}
                                            <Text style={AppStyles.textPrimary}>{data.startDate || details.tourStartDate ? (data.startDate && Moment(data.startDate, 'DD/MM/YYYY').format('MMM D,YYYY')) || details.tourStartDate : '-'}</Text>
                                            {/* } */}
                                        </Body>
                                    </CardItem>
                                </Card>
                                <Card style={styles.datecardView}>
                                    <CardItem style={styles.cardStyle}>
                                        <Body>
                                            <View style={styles.endDateView}>
                                                <Text style={styles.titleStyle}>End Date</Text>
                                            </View>
                                            {/* {tourDetails.tourEndDate && */}
                                            <Text style={AppStyles.textPrimary}>{data.endDate || details.tourEndDate ? (data.endDate && Moment(data.endDate, 'DD/MM/YYYY').format('MMM D,YYYY')) || details.tourEndDate : '-'}</Text>
                                            {/* } */}
                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                        </View>
                        <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <Body>
                                    {/* <View style={styles.attachView}>
                                        <View style={styles.fileView}>
                                            <View style={styles.textCenter}>
                                                {details.fileName && details.url && details.contract === true ?
                                                    <TouchableOpacity
                                                        onPress={() => this.openDoc(details)}
                                                    >
                                                        <Text style={styles.textPrimary}>Attached File</Text>
                                                        <Text style={styles.textPrimary}>{details.fileName.split('|')[0].trim()}</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <View style={styles.textCenter}>
                                                        <Text style={styles.textPrimary}>No Files Attached</Text>
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                    </View> */}
                                    <View style={styles.textCenter}>
                                        <Text style={AppStyles.textPrimary}>
                                            Attached File
                                        </Text>
                                    </View>
                                    <View style={styles.textCenter}>
                                        {(data.fileName || details.fileName) && (data.fileUrl || details.fileUrl) ?

                                            <TouchableOpacity
                                                onPress={() => this.openDoc(data || details)}
                                            >
                                                <Text style={styles.fileNameText}>{data.fileName.split('|')[0].trim() || details.fileName.split('|')[0].trim()}</Text>
                                            </TouchableOpacity>
                                            :
                                            <Text style={styles.fileNameText}>No Files Attached</Text>
                                        }
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.heading}>Payments</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Payment',
                                 { count: this.state.count,
                                    jobdata: value, 
                                    archive: this.props.navigation.state.params.archive,
                                    complete: this.props.navigation.state.params.complete,
                                    tourDesc: this.props.navigation.state.params.tourDesc,
                                    tourName: this.props.navigation.state.params.tourName,
                                    type: this.props.navigation.state.params.type,
                                    jobId: this.props.navigation.state.params.jobId,
                                    contract: this.props.navigation.state.params.contract,
                                    notification: this.props.navigation.state.params.notification,
                                    screen: this.props.navigation.state.params.screen,
                                    data: this.props.navigation.state.params.data })}
                            >
                                <Icon style={styles.pickerIcon} name="plus" />
                            </TouchableOpacity>
                            {(milestonesData && milestonesData.length > 0) ?
                                <View>
                                    {milestonesData.map((values, index) => {
                                        console.log(values, 'dt');
                                        return (
                                            <Card style={styles.cardViewStyle}>
                                                <CardItem>
                                                    <View style={styles.infoView}>
                                                        <View style={styles.nameViewWrap}>
                                                            <View style={styles.nameView}>
                                                                <View style={styles.nameSpacing}>
                                                                    <Text style={styles.paymentTitle}>payments</Text>
                                                                    <Text style={styles.mileStoneName}>{values.name}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={styles.mileStoneView}>
                                                            <Text style={styles.mileStoneAmount}>${values.price}</Text>
                                                        </View>
                                                    </View>
                                                </CardItem>
                                            </Card>
                                        );
                                    })
                                    }
                                </View>
                                :
                                <View>
                                    <Text style={styles.titleStyle}>No payments found </Text>
                                </View>
                            }

                        </View>
                        {(details.type === 'open' && details.contract === true) || (tourDetails.type === 'open' && this.props.statusVal !== 'hired') ?
                            <View style={styles.checkBox}>
                                <CheckBox
                                    style={styles.checkboxCheck}
                                    onClick={() => { this.onClick(); }}
                                    isChecked={this.state.checked}
                                    checkBoxColor={Colors.primary}
                                />
                                <Text>
                                    <Text style={styles.checkBoxLabel}>
                                        Yes, I understand and agree to the
                                       </Text>
                                    <Text onPress={() => this.termsAndConditions()} style={styles.checkBoxLink}> TOURZEY TERMS OF SERVICE<Text>, </Text> USER AGREEMENT<Text>,</Text></Text>
                                    <Text style={styles.checkBoxLabel}> and </Text>
                                    <Text onPress={() => this.termsAndConditions()} style={styles.checkBoxLink}> PRIVACY POLICY</Text>.
                                    </Text>
                            </View>
                            : null
                        }
                        <View>
                            {this.props.statusVal === 'hired' && this.state.screen === 'offer' ?
                                <Text style={styles.hiredTag}>Already hired</Text>
                                :
                                this.state.screen === 'offer' &&
                                <View style={styles.buttonView}>
                                    <TouchableOpacity style={AppStyles.tochableButton}>
                                        <Button style={AppStyles.secondaryButtonWhite} onPress={() => this.onSavePress(tourDetails)}>
                                            <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Save</Text>
                                        </Button>
                                    </TouchableOpacity>
                                    {!this.state.checked ?
                                        <Button disabled style={styles.disabledButton}>
                                            <Text style={AppStyles.buttonTextDisabled} uppercase={false}>Hire</Text>
                                        </Button>

                                        :
                                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onHirePress.bind(this)} >
                                            <LinearGradientView style={AppStyles.primaryButton} name={'Hire'} />
                                        </TouchableOpacity>
                                    }
                                </View>
                            }
                        </View>
                        {details.contract === true && details.type !== 'complete' && this.state.screen === 'jobs' &&
                            <View style={styles.buttonView}>
                                <TouchableOpacity style={AppStyles.tochableButton}>
                                    <Button style={AppStyles.secondaryButtonWhite} onPress={() => this.onCancelPress()}>
                                        <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Cancel</Text>
                                    </Button>
                                </TouchableOpacity>
                                {!this.state.checked ?
                                    <Button disabled style={styles.disabledButton}>
                                        <Text style={AppStyles.buttonTextDisabled} uppercase={false}>Complete</Text>
                                    </Button>
                                    :
                                    <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onCompletePress(details, 'complete')} >
                                        <LinearGradientView style={AppStyles.primaryButton} name={'Complete'} />
                                    </TouchableOpacity>
                                }
                            </View>
                        }

                        <View style={styles.buttonView}>
                            {this.state.details.userId === this.props.userData.uid && !details.contract && details.type !== 'archive' &&
                                <TouchableOpacity style={AppStyles.tochableButton}>
                                    <Button style={AppStyles.secondaryButtonWhite} onPress={() => this.onJobComplete(details, 'archive')}>
                                        <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Archive</Text>
                                    </Button>
                                </TouchableOpacity>
                            }
                            {this.state.screen === 'jobs' && !details.contract && details.type !== 'archive' &&
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={() => { this.nearBy(details.tourLocation); }} >
                                    <LinearGradientView style={AppStyles.primaryButton} name={'Local Agents'} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    {this.renderLoader()}
                </ScrollView>
            </SafeAreaView >
        );
    }
}

export const mapStateToProps = (status) => {
    const { update, updateDetails, loading, loader, verifyAgent, hiredAgentDetail, statusVal } = status.getJobDetails;
    const { tourData, error, tourLoader } = status.tourDetails;
    const { jobTypeSuccess, jobTypeLoader, errorValue, jobType } = status.updateJobTypeValue;
    const { loaderVal, contractSuccess, contractDetails } = status.getJobDetails;
    const { jobApprovedDetails, jobApprovedLoader, jobApprovedDetailsSuccess, nearByAgent,
        nearByAgentSuccess, nearByAgentLoader } = status.getUserDetails;
    const { userData } = status.getuserData;
    return {
        update,
        updateDetails,
        loading,
        loader,
        verifyAgent,
        hiredAgentDetail,
        statusVal,
        tourData,
        error,
        tourLoader,
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
    {
        updateJobDetails,
        verifyHiredAgent,
        fetchTourDetails,
        updateJobType,
        viewContractDetails,
        viewJobApprovedDetail,
        nearbyAgents
    })(HireAgent);

