import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Image } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, Card, CardItem, Text, Thumbnail } from 'native-base';
import { fetchCompletedJobs } from '../../action/index';
import styles from './styles';
 //todo-cr-si : goutham - please use absolute imports before relative imports
class CompleteJobs extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Completed Jobs',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
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
        }
    });
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            completeJobs: [],
            completeJobDetail: []

        };
    }

    componentWillMount() {
         //todo-cr-si: goutham - please use const variables instead of long variables with repeatation
        if (this.props.navigation.state.params === undefined) {
        } else {
            const { state } = this.props.navigation;
            this.setState({
                completeJobs: state.params.jobComplete
            });
        }
    }

    componentDidMount() {
        this.props.fetchCompletedJobs(this.state.completeJobs);
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
    componentWillReceiveProps(nextProps) {
        if (nextProps.successComplete === true) {
            this.setState({
                completeJobDetail: nextProps.completeJobDetails
            });
        }
    }


    renderLoading() {
        // if (this.props.loading) {
        //     this.state.visible = true;  //TODO: need to setState 
            // this.setState({
            //     visible: true
            // });
            return (
                <View style={{ flex: 1 }}>
                    <Spinner
                        visible={this.props.loading}
                        textContent={'Loading...'}
                        textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }}
                    />

                </View>
            );
        // }
    }
    renderRow(jobsDetails) {
        return (
            <ScrollView>
                <View style={styles.cardContainer}>
                    <TouchableOpacity>
                        <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <View style={styles.cardDetail}>
                                    <View style={styles.detailView}>
                                        <Text style={styles.nameStyling}>{jobsDetails.jobTitle}</Text>
                                        <Text style={styles.des}>{jobsDetails.jobPostDate}</Text>
                                        <View>
                                            <StarRating
                                                halfStarEnabled={true}
                                                disabled
                                                maxStars={5}
                                                rating={jobsDetails.starCountagent ? jobsDetails.starCountagent : 0}
                                                starSize={20}
                                                fullStarColor={'#f2b518'}
                                                starStyle={styles.starSpacing}
                                            />
                                        </View>
                                        <Text style={styles.des}>{jobsDetails.jobDesc}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.earningAmount}>${jobsDetails.jobPrice}</Text>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.jobsContainer}>
                        <View style={styles.wrapper}>
                            <View style={styles.back}>
                                <Card style={styles.cardViewStyle}>
                                    <CardItem>
                                        <View style={styles.agentDetails}>
                                            <Text style={styles.agentName}>
                                                {this.state.completeJobs.fullName}
                                            </Text>
                                            {/* <Text style={styles.agentOffice}>
                                                {this.state.completeJobs.brokerageName}
                                            </Text> */}
                                            <View>
                                                <StarRating
                                                    disabled
                                                    halfStarEnabled={true}
                                                    maxStars={5}
                                                    rating={this.state.completeJobs.ratingCount ? this.state.completeJobs.ratingCount : 0}
                                                    starSize={20}
                                                    fullStarColor={'#f2b518'}
                                                    starStyle={styles.profileStarSpacing}
                                                />
                                            </View>
                                        </View>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={styles.front}>
                                <Thumbnail
                                    source={this.state.completeJobs && this.state.completeJobs.imageData ? { uri: this.state.completeJobs.imageData.uri } : Theme.Images.profile_screen.default_avatar}
                                    style={styles.profileImage}
                                />
                            </View>
                        </View>
                    </View>
                    {this.state.completeJobDetail && this.state.completeJobDetail.length > 0 ?
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.state.completeJobDetail)}
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
                    {this.renderLoading()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (status) => {
    const { completeJobDetails, successComplete, loading } = status.getJobDetails;
    return { completeJobDetails, successComplete, loading };
};

export default connect(mapStateToProps, { fetchCompletedJobs })(CompleteJobs);
