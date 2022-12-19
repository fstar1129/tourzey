import React, { Component } from 'react';
import {
    View, Card, CardItem, Body, Item, Label, Text, Input
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import {
    jobPost
} from '../../action/index';
import { isStringEmpty } from '../../utils/checkEmptycondition';
import ProgressGradientView from '../common/gradient/progressGradient';


class ListPrice extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Budget',
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
        },
      });
    constructor(props) {
        super(props);
        this.state = {
            price: '',
            alert: false,
            post: false,
            tourDetails: {}
        };
    }
    componentWillMount() {
        if (this.props.navigation.state.params !== undefined) {
            const { state } = this.props.navigation;
            if (state.params.quickTour === true) {
                console.log('description', state.params.percent);
                let val = 60;
                this.location = state.params.location;
                this.mood = state.params.mood;
                this.tourName = state.params.tourName;
                this.description = state.params.description;
                this.fromDate = state.params.fromDate;
                this.toDate = state.params.toDate;
                this.jobVideo = state.params.jobVideo;
                val += state.params.percent;
                this.setState({
                    percent: val
                }, () => {
                    console.log('percent setState', this.state.percent);
                });
            } else if (state.params.futureTour === true) {
                let val = 60;
                this.location = state.params.location;
                this.service = state.params.service;
                this.tourName = state.params.tourName;
                this.description = state.params.description;
                this.fromDate = state.params.fromDate;
                this.toDate = state.params.toDate;
                this.jobVideo = state.params.jobVideo;
                val += state.params.percent;
                
                this.setState({
                    percent: val 
                });
            }
    }
    }
    componentDidMount() {
        this.props.navigation.setParams({
          headerLeft:
            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>                     
                <Image                        
                    source={Theme.Images.icons.backIcon}
                    style={AppStyles.backIcon}
                />
            </TouchableOpacity>,
          headerRight:
            <View>
                <Text style={AppStyles.nextBtn} onPress={() => { this.onPostPress(); }}>POST</Text>
            </View>
        });
      }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.jobDetails !== this.props.jobDetails) {
            console.log('jobDetails', nextProps.jobDetails);
            //todo-cr-si: srini - please use common function for value is present or not - completed
        if (nextProps.jobDetails && isStringEmpty(nextProps.jobDetails.post)) {
            const temp = _.orderBy(nextProps.jobDetails.jobDetails, ['ratingCount'], ['desc']);
            this.props.navigation.navigate('JobPostCompleted', 
            { suggestion: temp, 
                // jobPrice: state.params.price, 
                jobId: nextProps.jobDetails.jobId, 
                percent: this.state.percent,  
                tourDetails: this.state.tourDetails
            });
        }
       }
    }
    onPostPress() {
        //cr:si:boopathi: @jaga: change var to const
        const format = /[,-]+/;
        if (this.state.price === '' || format.test(this.state.price)) {
            this.setState({
                    alert: true
            });
        } else {
            console.log('onPostJob');
            const { state } = this.props.navigation;
            const date = Moment().format('MMM DD, YYYY');
            const obj = {
                location: this.location,
                tourName: this.tourName,
                service: this.mood ? this.mood : this.service,
                price: this.state.price,
                tourDesc: this.description,
                fromDate: this.fromDate,
                toDate: this.toDate,
                tourPostDate: date,
                postedBy: this.props.userData && this.props.userData.fullName,
                type: 'open',
                hired: false,
                hiredAgent: [],
                jobVideo: this.jobVideo,
                jobAppliedBy: []
            };
            if (this.state.post === false) {
                console.log('post action', this.state.post);
                console.log('obj', obj);
                    this.props.jobPost(obj);
                    this.setState({
                        post: true,
                        tourDetails: obj
                    });
            }
            }
    }

    checkValue() {
        if (this.state.price !== '') {
            this.state.alert = false;
        }
    }

    renderLoader() {
        if (this.props.jobDetails.loading) {
            this.state.visible = true;
                return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
        } 
            this.state.visible = false;
                return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.scrollContainer}>
                    <View style={AppStyles.progress}>
                    <ProgressGradientView width={this.state.percent} />
                    </View>
                    <View style={styles.profileContainer}>                   
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>            
                                <Body>
                                    <Label style={styles.labelStyle}>What is your budget for this tour?</Label>
                                    <Item style={styles.itemStyle}>
                                        <Text style={styles.symbol}>$</Text>
                                        <Input
                                            placeholderTextColor="#dcdcdc"
                                            placeholder="5250"
                                            style={styles.inputHeight}
                                            value={this.state.price}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.setState({ price: text })}
                                        />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    {this.renderLoader()}
                    <View>{this.state.alert === true ?
                            <View style={styles.alertView}>
                                <Text style={styles.alert}>
                                    *Price is empty or invalid.
                                </Text>
                            </View> : null}
                        </View>
                    {this.checkValue()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (status) => {
    const jobDetails = status.jobPost;
    const navigateTo = status.isSignedin.navigateTo;
    const userData = status.getuserData.userData;

    return {
        jobDetails,
        navigateTo,
        userData,
    };
};

export default
    connect(mapStateToProps, {
         jobPost
    })(ListPrice);

