import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Card, CardItem, Thumbnail, Text, Body } from 'native-base';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux';

import styles from './styles';
import Theme from '../../../themes/Theme';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';
import {
    getUserDetails
} from '../../../action/index';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            showDesc: false,
            data: []
        };
    }

    componentDidMount() {
        this.setState({ visible: true });
        this.props.getUserDetails();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ visible: false });
        if (nextProps.userDetails) {
            this.setState({
                data: nextProps.userDetails.details
            });
        }
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


    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    renderRow(details) {
        if (details.fav) {
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
                                        <Text style={styles.earningAmount}>${details.price}</Text>
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
                            <View style={styles.heartIconView}>
                                <Icon name="heart" style={styles.heartIcon} size={10} />
                            </View>

                        </TouchableOpacity>
                    </Card>
                </View>
            );
        } else {
            return null;
        }
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
                        {this.state.data && this.state.data.length > 0 ?
                            <ListView
                                dataSource={this.ds.cloneWithRows(this.state.data)}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections
                            />
                            :
                            <View style={styles.nodataView}>
                                <Text style={styles.nodataText}>
                                    No Favorites Available
                                </Text>
                            </View>
                        }
                    </View>
                </ScrollView>
                {this.renderLoader()}
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
    })(Favorites);

