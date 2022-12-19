import React, { Component } from 'react';
import { TouchableOpacity, BackHandler, ScrollView, ListView, Image } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Card, CardItem, Thumbnail, Text, Body, Label } from 'native-base';
import StarRating from 'react-native-star-rating';
import styles from './styles';
import Theme from '../../themes/Theme';
import { jobPost } from '../../action/index';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import ProgressGradientView from '../common/gradient/progressGradient';

class JobPostComplete extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.nearby ? 'Local Agents' : 'Complete' : null,
        headerLeft:
            navigation.state.params && navigation.state.params.headerLeft,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
            paddingLeft: 0,
        },
        headerTitleStyle: {
            color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 1

        },
    });
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            details: [],
            // jobPrice: '',
            jobId: '',
            tourDetails: {}
        };
    }
    componentWillMount() {
        let val = 100;
        this.setState({
            details: this.props.navigation.state.params.suggestion,
            // jobPrice: this.props.navigation.state.params.jobPrice,
            jobId: this.props.navigation.state.params.jobId,
            tourDetails: this.props.navigation.state.params.tourDetails
        });
        val += this.props.navigation.state.params.percent;
        this.setState({
            percent: val
        });
        if (this.props.navigation.state.params.nearByAgents) {
            this.props.navigation.setParams({
                nearby: true
            });
        }
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.onHomePress('Jobs');
        });
    }
    componentDidMount() {
        console.log('sssssssssss', this.props);
        if (!this.props.navigation.state.params.nearByAgents) {
            this.props.navigation.setParams({
                headerRight:
                    <View>
                        <Text
                            style={AppStyles.nextBtn}
                            onPress={() => { this.onHomePress('TourDetails'); }}
                        >
                            TOUR</Text>
                    </View>,
                // headerLeft: null
            });
        } else {
            this.props.navigation.setParams({
                headerLeft:
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                        <Image
                            source={Theme.Images.icons.backIcon}
                            style={AppStyles.backIcon}
                        />
                    </TouchableOpacity>,
            });
        }
    }
    componentWillReceiveProps(nextProps) {
    }
    onHomePress(page) {
        this.props.navigation.navigate({
            routeName: page,
            params: {
                details: this.state.details,
                jobId: this.state.jobId,
                tourDetails: this.state.tourDetails
            }
        });
    }

    renderRow(details) {
        return (
            <View style={styles.agentContainer}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('AgentProfile',
                        {
                            data: details,
                            //  jobPrice: this.state.jobPrice, 
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
                                            {/* <Text note>{details.group_name}</Text> */}
                                            <Text note>{details.serviceArea}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={styles.earningsView}>
                                    <Text style={styles.earningAmount}>$500</Text>
                                </View> */}
                            </View>
                        </CardItem>
                        <View style={AppStyles.lineStyle} />
                        <CardItem>
                            <Body>
                                {/* <Text style={styles.jobTitle}>
                                    {details.brokerageName}
                                </Text> */}
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
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }
    onBackPress() {
        console.log('onBackPress');
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Jobs' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={AppStyles.progress}>
                    <ProgressGradientView width={this.state.percent} />
                </View>

                <View style={styles.profileContainer}>
                    {!this.props.navigation.state.params.nearByAgents &&
                        <View>
                            <TouchableOpacity onPress={() => this.onBackPress()}>
                                <Image
                                    source={Theme.Images.icons.completeIcon}
                                    style={styles.tickIcon}
                                />
                            </TouchableOpacity>
                            <Label style={styles.jobPostLabel}>Tour Posted</Label>
                            <Label style={styles.labelStyle}>Your tour was posted to Tourzey.</Label>
                            <Label style={styles.labelStyle}>While you wait...Here are some local Tourzey guides.</Label>
                        </View>
                    }
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
                                <Text style={styles.nodataText}>No Local Agents Available</Text>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export const mapStateToProps = (status) => {
    const jobDetails = status.jobPost;
    return { jobDetails };
};

export default connect(mapStateToProps, { jobPost })(JobPostComplete);

