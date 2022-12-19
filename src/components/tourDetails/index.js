import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Image, ListView } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import StarRating from 'react-native-star-rating';
import {
    View, Card, CardItem, Thumbnail, Text, Input,
    Body, Textarea, Toast
} from 'native-base';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';
import * as checkEmpty from '../../utils/checkEmptycondition'

const db = firebase.firestore();
export default class TourDetails extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Tour Details',
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
            flex: 1,
        },
    });

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            tourName: '',
            description: '',
            tourPrice: 0,
            location: '',
            travelDate: '',
            postedOn: '',
            suggestion: [],
            jobId: '',
            loader: false
        };
    }

    componentDidMount() {
        // Todocr-si @gowtham srini check the value of empty condition before use it
        if (checkEmpty.isObjectEmpty(this.props.navigation.state.params.tourDetails) &&
            checkEmpty.isStringEmpty(this.props.navigation.state.params.jobId) &&
            this.props.navigation.state.params.details
        ) {
            this.setState({
                tourName: this.props.navigation.state.params.tourDetails.tourName,
                description: this.props.navigation.state.params.tourDetails.tourDesc,
                location: this.props.navigation.state.params.tourDetails.location,
                travelDate: this.props.navigation.state.params.tourDetails.fromDate,
                postedOn: this.props.navigation.state.params.tourDetails.tourPostDate,
                details: this.props.navigation.state.params.details,
                tourPrice: this.props.navigation.state.params.tourDetails.price,
                jobId: this.props.navigation.state.params.jobId
            });
        }
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.backIcon}
                        style={AppStyles.backIcon}
                    />

                </TouchableOpacity>,
        });
        this.props.navigation.setParams({
            headerRight:
                <View>
                    <Text style={AppStyles.nextBtn} onPress={() => { this.saveJob(); }}>SAVE</Text>
                </View>
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'np');
        // this.setState({ jobId: nextProps.jobId });
    }

    saveJob() {
        const Id = this.state.jobId;
        this.setState({ loader: true });
        // Todocr-si @gowtham srini remove console log after use it
        if (this.state.tourName === this.props.navigation.state.params.tourDetails.tourName &&
            this.state.description === this.props.navigation.state.params.tourDetails.tourDesc) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Jobs' })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        } else if (Id) {
            db.collection('jobs').doc(Id).update({
                tourDesc: this.state.description,
                tourName: this.state.tourName

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

    renderLoaderValue() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.loader} textContent={'Loading...'} textStyle={styles.loaderStyle} />
            </View>
        );
    }

    renderRow(details) {
        return (
            <View style={styles.agentContainer}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AgentProfile',
                        {
                            data: details,
                            jobid: this.props.navigation.state.params.jobId
                        })}
                >
                    <Card style={styles.cardViewStyle}>
                        <CardItem>
                            <View style={styles.infoView}>
                                <View style={styles.nameViewWrap}>
                                    <View style={styles.nameView}>
                                        {details.imageData ?
                                            <Thumbnail style={styles.userImage} source={{ uri: details.imageData.uri }} />
                                            :
                                            <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                        }

                                        <View style={styles.nameSpacing}>
                                            <Text style={styles.nameStyling}>{details.fullName}</Text>
                                            <Text note>{details.serviceArea}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </CardItem>
                        <View style={AppStyles.lineStyle} />
                        <CardItem>
                            <Body>
                                <Text style={styles.jobDescription}>
                                    {details.description ?
                                        <Text style={styles.jobDescription}>
                                            {details.description.length > 70 ? <Text style={styles.jobDescription}>{details.description.slice(0, 70)}<Text style={AppStyles.textPrimary}> READ MORE</Text></Text> : details.description}
                                        </Text>
                                        :
                                        <Text>No description</Text>
                                    }
                                </Text>
                                <View style={styles.jobsView}>
                                    <Text style={styles.jobCount}>{details.jobId.length > 0 ? details.jobId.length : 0}<Text note>{' '}jobs</Text> </Text>
                                    <View>
                                        <StarRating
                                            disabled
                                            halfStarEnabled
                                            maxStars={5}
                                            rating={details.ratingCount ? details.ratingCount : 0}
                                            starSize={20}
                                            fullStarColor={'#f2b518'}
                                            starStyle={styles.starSpacing}
                                        />
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {
            tourName,
            description,
            tourPrice,
            location,
            travelDate,
            postedOn } = this.state;
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.contractContainer}>

                        <Text style={styles.tourHeading}>Tour Details</Text>
                        <View style={styles.titleView}>
                            <Card style={styles.cardView}>
                                <CardItem >
                                    <Body >
                                        <View style={styles.cardBodyStyle}>
                                            <Text style={[styles.titleStyle, { paddingBottom: 10, marginTop: -10, marginLeft: -5 }]}>Job Title</Text>
                                            <Input
                                                style={styles.jobTitle}
                                                onChangeText={(value) => this.setState({ tourName: value })}
                                                value={tourName}>
                                                {/* <Text style={styles.jobTitle}>{(tourName && tourName !== '') ? tourName : '-'} </Text> */}
                                            </Input>

                                        </View>

                                    </Body>

                                </CardItem>
                            </Card>
                            <Card style={styles.cardViewbudget}>
                                <CardItem style={styles.cardStyle}>
                                    <Body>
                                        <View>
                                            <Text style={styles.titleStyle}>Budget</Text>
                                            <Text style={styles.buget}>$ {tourPrice ? parseInt(tourPrice) : null}</Text>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Text style={styles.titleStyle}>Location</Text>
                                    <Text style={styles.textColour}>{location}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Text style={styles.titleStyle} >
                                        Description</Text>
                                    <Textarea
                                        style={styles.textareaStyle}
                                        value={description}
                                        onChangeText={(text) => this.setState({ description: text })}
                                        editable
                                    />
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Text style={styles.titleStyle}>Travel Date</Text>
                                    <Text style={styles.textColour}>{travelDate}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Text style={styles.titleStyle}>Posted on</Text>
                                    <Text style={styles.textColour}>{postedOn}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        {this.renderLoaderValue()}
                    </View>
                    <View style={styles.guidesView}>
                    {this.state.details && this.state.details.length > 0 ?
                            <View>
                                <View>
                                    <Text style={styles.heading}>Local Tourzey Guides</Text>
                                </View>
                                <ListView
                                    dataSource={this.ds.cloneWithRows(this.state.details)}
                                    renderRow={this.renderRow.bind(this)}
                                    enableEmptySections
                                />
                            </View>
                            :
                            <View>
                                <Text style={styles.nodataText}>No Local Tourzey Guides Available</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}
// Todocr-si @gowtham srini remove unused reducers value