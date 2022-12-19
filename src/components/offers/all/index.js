import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Card, CardItem, Thumbnail, Text, Body, Toast } from 'native-base';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import styles from './styles';
import Theme from '../../../themes/Theme';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';

import {
    getUserDetails
} from '../../../action/index';

class AllOffers extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            showDesc: false,
            userDetails: []
        };
    }

    componentDidMount() {
        this.props.getUserDetails();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userDetails) {
            this.setState({
                userDetails: nextProps.userDetails.details
            });
        }
    }
    starClicked(docId, status) {
        if (status === undefined) {
            firebase.firestore().collection('offers').doc(docId).update({
                fav: true
            })
                .then((data) => {
                    console.log(data, 'data');
                })
                .catch((err) => {
                    console.log(err, 'err');
                });
        } else {
            firebase.firestore().collection('offers').doc(docId).update({
                fav: !status
            })
                .then((data) => {
                    console.log(data, 'data');
                })
                .catch((err) => {
                    console.log(err, 'err');
                });
        }
        Toast.show({
            text: 'Updated!',
            position: 'bottom',
            buttonText: 'Okay',
            type: 'success',
            duration: 5000
        });
        this.props.navigation.navigate('Offers');
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

    renderRow(details) {
        return (
            <View style={styles.cardContainer}>
                <Card style={styles.cardViewStyle}>
                    {(this.state.details !== details || this.state.showDesc === false) &&
                        <TouchableOpacity style={styles.iconView} onPress={() => this.showdetail(details)}>
                            <Icon style={styles.icon} name="plus-circle" />
                        </TouchableOpacity>
                    }
                    {this.state.showDesc === true && this.state.details === details &&
                        <TouchableOpacity style={styles.iconView} onPress={() => this.showdetail(details)}>
                            <Icon style={styles.icon} name="minus-circle" />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HireAgent', { data: details, jobid: details.jobIdValue, screen: 'offer' })}>
                        <View style={styles.jobTitleView}>
                            <Text style={styles.jobTitleStyle}>{details.jobTitle}</Text>
                        </View>
                        <CardItem>
                            <View style={styles.infoView}>
                                <View style={styles.nameViewWrap}>
                                    <View style={styles.nameView}>
                                        <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                        <View style={styles.nameSpacing}>
                                            <Text style={styles.nameStyling}>{details.fullName}</Text>
                                            <Text note>{details.serviceArea}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.earningsView}>
                                {details.price ?
                                    <Text style={styles.earningAmount}>${details.price}</Text>
                                    :
                                    null
                                }
                                </View>
                            </View>
                        </CardItem>
                        <View style={AppStyles.lineStyle} />
                        {this.state.showDesc === true && this.state.details === details &&
                            <CardItem>
                                <Body>
                                    {/* <Text style={styles.jobTitle}>
                                        {details.brokerageName ? details.brokerageName : '-'}
                                    </Text> */}
                                    {details.description ?
                                        <Text style={styles.jobDescription}>
                                         {details.description.length > 70 ? <Text style={styles.jobDescription}>{details.description.slice(0, 70)}<Text style={styles.readText}> READ MORE</Text></Text> : details.description}
                                        </Text>
                                        :
                                        <Text>No description</Text>
                                    }
                                    <View style={styles.jobsView}>
                                        <Text style={styles.jobCount}>{details.jobId.length > 0 ? details.jobId.length : 0}<Text note>{' '}jobs</Text> </Text>
                                        <View>
                                            <StarRating
                                                disabled
                                                halfStarEnabled={true}
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
                        }
                        {details.fav ?
                            <View style={styles.heartIconView}>
                                <Icon name="heart" onPress={() => this.starClicked(details.offerId, details.fav)} style={styles.heartIconFilled} size={10} />
                            </View>
                            :
                            <View style={styles.heartIconView}>
                                <Icon name="heart" onPress={() => this.starClicked(details.offerId, details.fav)} style={styles.heartIcon} size={10} />
                            </View>
                        }
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }

    renderLoader() {
        // if (this.props.userDetails.loading) {
        //     this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.props.userDetails.loading} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
        // }
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        {this.state.userDetails && this.state.userDetails.length > 0 ?
                            <ListView
                                dataSource={this.ds.cloneWithRows(this.state.userDetails)}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections
                            />
                            :
                            <View style={styles.nodataView}>
                                <Text style={styles.nodataText}>
                                    No Offers Available
                                </Text>
                            </View>
                        }
                    </View>
                    {this.renderLoader()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export const mapStateToProps = (status) => {
    const userDetails = status.getUserDetails;

    return {
        userDetails,
    };
};

export default
    connect(mapStateToProps, {
        getUserDetails
    })(AllOffers);



