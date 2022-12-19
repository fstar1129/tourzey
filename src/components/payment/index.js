import React, { Component } from 'react';
import {
    View, Card, CardItem, Text,
    Body, Item, Label, Textarea, Input, Button
} from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
    milestone
} from '../../action/index'; 
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import styles from './styles';

class Payment extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params ? navigation.state.params.title : null,
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
            description: '',
            price: '',
            name: '',
            alert: false
        };
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.jobdata, 'componentDidMount');
        this.props.navigation.setParams({
            headerRight:
                <View>
                    <Text style={styles.faqBtn} onPress={() => { this.onFaqPress(); }}>FAQS</Text>
                </View>,
        });
    }

    componentWillMount() {
        this.props.navigation.setParams({
            title: 'Payment ' + this.props.navigation.state.params.count
        });
    }

    onFaqPress() {
        this.props.navigation.navigate('FAQ');
    }

    onCancelPress() {
      this.props.navigation.goBack();
    }

    onFundPress() {
        console.log(this.props.navigation.state.params.jobdata, 'onFundPress');
        if (this.state.name !== '' && this.state.price !== '' && this.state.description !== '') {
        const data = {
           name: this.state.name,
           price: this.state.price,
           description: this.state.description
        };
        this.props.milestone(this.props.navigation.state.params.jobdata,
             data);
             this.setState({ alert: false });
        } else {
            console.log('else');
            this.setState({ alert: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'np');
       this.setState({ visible: nextProps.milestoneLoader });
       if (nextProps.milestonesData !== this.props.milestonesData) {
           if (nextProps.milestonesData === true) {
               if (nextProps.screen === 'offer') {
                this.props.navigation.navigate('HireAgent', 
                {
                    archive: this.props.navigation.state.params.archive,
                    complete: this.props.navigation.state.params.complete,
                    tourDesc: this.props.navigation.state.params.tourDesc,
                    tourName: this.props.navigation.state.params.tourName,
                    type: this.props.navigation.state.params.type,
                    jobId: this.props.navigation.state.params.jobId,
                    contract: this.props.navigation.state.params.contract,
                    notification: this.props.navigation.state.params.notification,
                    screen: this.props.navigation.state.params.screen,
                    data: this.props.navigation.state.params.data
                });
            } else if (nextProps.screen === 'contract') {
                this.props.navigation.navigate('HireAgent', { 
                    archive: this.props.navigation.state.params.archive,
                    complete: this.props.navigation.state.params.complete,
                    tourDesc: this.props.navigation.state.params.tourDesc,
                    tourName: this.props.navigation.state.params.tourName,
                    type: this.props.navigation.state.params.type,
                    jobId: this.props.navigation.state.params.jobId,
                    contract: this.props.navigation.state.params.contract,
                    notification: this.props.navigation.state.params.notification,
                    screen: this.props.navigation.state.params.screen });
            }
            }
        }
    }

    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView>
             <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.profileContainer}>               
                    <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>            
                                <Body>
                                <Label style={styles.labelStyle}>Payment Methods</Label>
                                    <View style={styles.paymentView}>
                                        <Input
                                            placeholderTextColor="#8c8c8c"
                                            placeholder="Transportation"
                                            style={styles.paymentName}
                                            value={this.state.name}
                                            onChangeText={(text) => this.setState({ name: text })}
                                        />
                                        <Text style={styles.symbol}>$</Text>
                                        <Input
                                            placeholderTextColor="#8c8c8c"
                                            placeholder="100"
                                            style={styles.priceStyle}
                                            value={this.state.price}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => this.setState({ price: text })}
                                        />
                                    </View>
                                    </Body>
                            </CardItem>
                        </Card>
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                            <Label style={styles.labelStyle}>Description</Label>
                                <Item style={styles.itemStyle}>
                                    <Textarea
                                        placeholderTextColor="#8c8c8c" 
                                        placeholder="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                                        totam rem aperiam, eaque ipsa quea ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                                        style={styles.textareaStyle}
                                        value={this.state.description}
                                        onChangeText={(text) => this.setState({ description: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <View style={styles.buttonView}>
                                <TouchableOpacity style={AppStyles.tochableButton}>
                                    <Button style={AppStyles.secondaryButtonWhite} onPress={this.onCancelPress.bind(this)}>
                                        <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Cancel</Text>
                                    </Button>
                                </TouchableOpacity>
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onFundPress.bind(this)} >
                                    <LinearGradientView style={AppStyles.primaryButton} name={'Save'} />
                                </TouchableOpacity>
                            </View>
                </View>
                {this.state.alert &&
            <View style={styles.alertView}>
                <Text style={styles.alert}>
                    * Please fill all fields.
                </Text>
            </View>
            }
            </ScrollView> 
           
            {this.renderLoader()}
            </SafeAreaView> 
        );
    }

}

export const mapStateToProps = (status) => {
    const userDetails = status.getUserDetails;
    const { milestonesData, milestoneLoader, screen } = status.payments;

    return {
        userDetails,
        milestonesData,
        milestoneLoader,
        screen
    };
};

export default connect(mapStateToProps, { milestone })(Payment);
