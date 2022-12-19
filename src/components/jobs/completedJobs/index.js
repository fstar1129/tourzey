import React, { Component } from 'react';
import { ScrollView, ListView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Card, CardItem, Text, Button } from 'native-base';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import Theme from '../../../themes/Theme';
import {
    getJobDetail
} from '../../../action/index';


class CompletedJobs extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Completed Jobs',
        headerLeft: null,
        headerRight: null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
        starCountagent: 3.5
    });
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            jobDetail: [],
            lastId: '',
            seeMoreVisible: true
        };
    }
    componentDidMount() {
        this.props.getJobDetail('complete');
    }
    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     visible: false
        // });
        if (nextProps.successJobs === true) {
            this.setState({
                jobDetail: nextProps.details
            });
        }
    }

    seeMore() {
        const last = _.last(this.state.jobDetail);
        this.setState({ lastId: last.lastVisible.id });
        if (this.state.lastId === last.lastVisible.id) {
            this.setState({ seeMoreVisible: false }, () => {
            });
        }
        this.props.getJobDetail('complete', last.lastVisible);
    }

    rateNow(details) {
        this.props.navigation.navigate('RateAndReview', { jobId: details });
    }

    renderLoader() {
        // if (this.props.loading) {
        //     this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.props.loading} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
        // }
    }


    renderRow(details) {
        return (
            <View style={styles.cardContainerView} >
                <Card style={styles.cardViewStyle}>
                    <CardItem style={styles.cardDetailView}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('HireAgent',
                                {
                                    complete: true,
                                    type: details.type,
                                    jobId: details.id,
                                    tourDesc: details.tourDesc ? details.tourDesc : '',
                                    tourName: details.tourName,
                                    contract: details.contract,
                                    screen: 'jobs'
                                }
                            )}
                        >
                            <View style={styles.cardDetail}>
                                <View style={styles.detailView}>
                                    <Text style={styles.title}>{details.tourName}</Text>
                                    <Text style={styles.priceDes}><Text style={styles.priceDes}>Fixed Price - </Text>{details.tourPostDate}</Text>
                                    <View>
                                        {details.rateAgent === true ?
                                              <View style={styles.receivedRating}>
                                              <Text style={styles.priceDes}>Received ratings :</Text>
                                                <StarRating
                                                    disabled={false}
                                                    halfStarEnabled={true}
                                                    maxStars={5}
                                                    rating={details.starCountagent ? details.starCountagent : 0}
                                                    starSize={18}
                                                    fullStarColor={'#f2b518'}
                                                    starStyle={styles.starSpacing}
                                                />
                                            </View>
                                            :
                                            <View>
                                                 <Text style={styles.noRatings}>No ratings received</Text>
                                            </View>
                                        }

                                        {details.id && !details.rateClient &&
                                          <View style={styles.rateNowButton}>
                                            <Button rounded small
                                                onPress={this.rateNow.bind(this, details.id)}>
                                                <Text style={styles.priceDes}>Rate Now</Text>
                                            </Button>
                                            </View>
                                        }


                                    </View>
                                </View>
                                {/* <View>
                                    <Text style={styles.earningAmount}>${details.jobPrice}</Text>
                                </View> */}
                            </View>
                            {details.rateAgent === true &&
                                <Text style={styles.description}>{details.jobReviewAgent}</Text>
                            }
                        </TouchableOpacity>
                    </CardItem>
                </Card>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView >
                <ScrollView>
                    <View style={styles.cardContainer}>
                        {this.state.jobDetail && this.state.jobDetail.length > 0 ?
                            <ListView
                                dataSource={this.ds.cloneWithRows(this.state.jobDetail)}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections
                            />
                            :
                            <View style={styles.nodataInfo}>
                                <Text style={styles.nodataText}>
                                    No completed jobs...
                                </Text>
                            </View>
                        }
                        {this.renderLoader()}
                    </View>
                    {/* {this.state.seeMoreVisible === true &&
                    <Button rounded onPress={this.seeMore.bind(this)}>
                        <Text>See more</Text>
                        
                    </Button>
                    } */}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (status) => {
    const { details, successJobs, loading, error } = status.getJobDetails;
    const navigateTo = status.isSignedin.navigateTo;
    const userData = status.isSignedin.userData;
    return {
        details,
        successJobs,
        loading,
        error,
        navigateTo,
        userData
    };
};

export default
    connect(mapStateToProps, {
        getJobDetail
    })(CompletedJobs);

