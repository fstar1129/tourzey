import React, { Component } from 'react';
//mi@ sini-remove unused imports
import {
    View, Card, CardItem, Text,
    Body, Item, Textarea, Toast
} from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import { updateRateandReview } from '../../action/index';
import { toastMessageokey } from '../../utils/showMessage';
//mi@ sini-remove unused const

class RateAndReview extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Rate and Review',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            color: Theme.Colors.default,
            fontSize: Theme.Font.sizes.medium, 
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
    });
    constructor(props) {
        super(props);
        this.state = {
            tourReview: '',
            alert: false,
            starCountclient: 0
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image
                        source={Theme.Images.icons.leftArrowIcon}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>,
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('nexpro', nextProps);
        if (nextProps.update !== this.props.update) {
            // this.props.navigation.navigate('Home');
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    onSubmitPress() {
        console.log('sssssss', this.props.navigation.state.params);
        if (this.props.navigation.state.params &&
            this.props.navigation.state.params.tourId && this.props.navigation.state.params.approveDocId && this.props.navigation.state.params.tourApprovedById) {
            if (this.state.tourReview !== '') { 
                this.props.updateRateandReview(this.props.navigation.state.params.tourId,
                    this.props.navigation.state.params.approveDocId,
                    this.props.navigation.state.params.tourApprovedById,
                    this.state.tourReview, this.state.starCountclient); 
            } else {
                this.setState({
                    alert: true
                });
            }
        } else {
            //SI-@sini make seprate file for toast mesg
            toastMessageokey('Cannot rate for this tour');
        }
    }
   
    onStarRatingPress(rating) {
        this.setState({
            starCountclient: rating
        });
    }
 renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.props.loading} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }
    render() {
        const {
            tourReview,
            starCountclient,
            alert
        } = this.state;
        return (
            <SafeAreaView>
                <ScrollView style={styles.containerView}>
                    <View style={styles.mainContainer}>
                        <Text style={styles.reviewHeading}>Please share your experience with us</Text>
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Item style={styles.itemStyle}>
                                        <Textarea
                                            placeholderTextColor="#dcdcdc"
                                            placeholder="Place Review this tour......"
                                            style={styles.textareaStyle}
                                            maxLength={50}
                                            value={tourReview}
                                            onChangeText={(text) => this.setState({ tourReview: text })}
                                        />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                        <Text style={styles.textcountView}>
                            {tourReview.length}/50
                         </Text>
                        <Text style={styles.titleStyle}>Please share your experience with us</Text>
                        <View style={styles.cardBodyStyle}>
                            <StarRating
                                disabled={false}
                                halfStarEnabled
                                maxStars={5}
                                rating={starCountclient}
                                starSize={30}
                                fullStarColor={'#f2b518'}
                                starStyle={styles.starSpacing}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                        {/* {this.checkValue()} */}
                        <View>{alert === true ?
                            <View style={styles.alertView}>
                                <Text style={styles.alert}>
                                    * The value is mandatory.
                                </Text>
                            </View> : null}
                        </View>
                    </View>
                    {this.renderLoader()}
                </ScrollView>
                <View>
                    <TouchableOpacity style={[AppStyles.tochableButton, AppStyles.tochableView]} onPress={this.onSubmitPress.bind(this)} >
                        <LinearGradientView style={AppStyles.bottomButton} name={'Submit'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView >

        );
    }
}

export const mapStateToProps = (state) => {
    console.log('state', state);
    const { error, loading, update } = state.updateRateandReivew;

    return {
        error,
        loading,
        update
    };
};

export default
    connect(mapStateToProps, {
        updateRateandReview
    })(RateAndReview);

