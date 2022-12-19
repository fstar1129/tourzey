import React, { Component } from 'react';
import { Card, CardItem, Body, Right, Radio, Item, Textarea, Label } from 'native-base';
import { Text, View, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';
import ProgressGradientView from '../common/gradient/progressGradient';


class Service extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Select Service',
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
    constructor() {
        super();
        this.state = {
            sellers: false,
            buyer: false,
            landlord: false,
            tenant: false,
            showing: false,
            contractSetup: false,
            contractReview: false,
            other: false,
            value: {},
            content: '',
            servicePopup: false,
            serviceDesc: {},
            seller: false,
            landlordItem: false,
            alert: false
        };
    }


    componentWillMount() {
        let val = 60;
        //Todo-cr-si by Punitha @Janani: Check null values and use common file for this

        if (this.props.navigation.state.params === undefined) {
        } else {
            const { state } = this.props.navigation;
            if (state.params.futureTour === true) {
                console.log('service', state.params.percent);
                this.location = state.params.location;
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
                    <Text style={AppStyles.nextBtn} onPress={() => { this.onNextPress(); }}>NEXT </Text>
                </View>
        });
    }
    onNextPress() {
        if (!this.state.value.category) {
            this.setState({
                alert: true
            });
            this.state.alert = true; //Todo-cr-si by Punitha @Janani: Avoid setting state variable like this
        } else {
            if (this.props.navigation.state.params !== undefined) {
                const { state } = this.props.navigation;
                if (state.params.futureTour === true) {
                    if (this.state.value.value === 'other') {
                        this.props.navigation.navigate('PostJob',
                            {
                                value: this.state.serviceDesc,
                                location: this.location,
                                percent: this.state.percent,
                                quickTour: true
                            }
                        );
                    } else {
                        this.props.navigation.navigate('PostJob',
                            {
                                value: this.state.value,
                                location: this.location,
                                percent: this.state.percent,
                                quickTour: true
                            });
                    }
                }
            }
        }
    }


        onSubmitPress() {
            this.setState({
                serviceDesc: {
                    category: this.state.value.category,
                    value: this.state.content,
                },
                servicePopup: false
            });
        }


        setValue(text) {
            if (text === 'showing') {
                this.setState({
                    showing: true,
                    contractSetup: false,
                    contractReview: false,
                    other: false,
                    seller: false,
                    landlordItem: false,
                    tenantItem: false,
                    value: { category: 'buyer', value: 'showing' }
                });
            } else if (text === 'contractSetup') {
                this.setState({ showing: false, contractSetup: true, contractReview: false, other: false, seller: false, landlordItem: false, tenantItem: false, value: { category: 'Buyer', value: 'contractSetup' } });
            } else if (text === 'contractReview') {
                this.setState({ showing: false, contractSetup: false, contractReview: true, other: false, seller: false, landlordItem: false, tenantItem: false, value: { category: 'Buyer', value: 'contractReview' } });
            } else if (text === 'other') {
                this.setState({ showing: false, contractSetup: false, contractReview: false, other: true, seller: false, landlordItem: false, tenantItem: false, value: { category: 'Buyer', value: 'other' } });
                this.setState({ servicePopup: true });
            } else if (text === 'seller') {
                this.setState({ showing: false, contractSetup: false, contractReview: false, other: false, seller: true, landlordItem: false, tenantItem: false, value: { category: 'Seller', value: 'seller' } });
            } else if (text === 'landlord') {
                this.setState({ showing: false, contractSetup: false, contractReview: false, other: false, seller: false, landlordItem: true, tenantItem: false, value: { category: 'Landlord', value: 'landlord' } });
            } else if (text === 'tenant') {
                this.setState({ showing: false, contractSetup: false, contractReview: false, other: false, seller: false, landlordItem: false, tenantItem: true, value: { category: 'Tenant', value: 'tenant' } });
            }
        }
        checkValue() {
            if (this.state.value.category) {
                this.state.alert = false; //Todo-cr-si by Punitha @Janani: Avoid setting state variable like this
            }
        }

        render() {
            return (
                <ScrollView style={styles.scrollContainer}>
                    <View style={AppStyles.progress}>
                    <ProgressGradientView width={this.state.percent} />
                    </View>
                    <View style={styles.notification}>
                        <Card style={styles.cardViewStyle}>
                            <TouchableOpacity onPress={() => this.setState({ sellers: !this.state.sellers })} >
                                <CardItem>
                                    <Body>
                                        <View style={styles.questionView}>
                                            <Text style={styles.titleText}>Seller</Text>
                                        </View>
                                    </Body>
                                    <Right>
                                        <Icon style={AppStyles.textPrimary} name={this.state.sellers === false ? 'chevron-down' : 'chevron-up'} />
                                    </Right>
                                </CardItem>
                            </TouchableOpacity>
                            {this.state.sellers &&
                                <CardItem style={styles.settingsContent}>
                                    <Body>
                                        <TouchableOpacity style={styles.Content} onPress={() => this.setValue('seller')} >
                                            <Text style={this.state.seller ? styles.textPrimary : styles.textDefault}>Sellers</Text>
                                            <Radio onPress={() => this.setValue('seller')} selected={this.state.seller} />
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                            }
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <TouchableOpacity onPress={() => this.setState({ buyer: !this.state.buyer })} >
                                <CardItem>
                                    <Body>
                                        <View style={styles.questionView}>
                                            <Text style={styles.titleText}>Buyer</Text>
                                        </View>
                                    </Body>
                                    <Right>
                                        <Icon style={AppStyles.textPrimary} name={this.state.buyer === false ? 'chevron-down' : 'chevron-up'} />
                                    </Right>
                                </CardItem>
                            </TouchableOpacity>
                            {this.state.buyer &&
                                <CardItem style={styles.settingsContent}>
                                    <Body>
                                        <TouchableOpacity style={styles.Content} onPress={() => this.setValue('showing')} >
                                            <Text style={this.state.showing ? styles.textPrimary : styles.textDefault}>Showings</Text>
                                            <Radio onPress={() => this.setValue('showing')} selected={this.state.showing} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.Content} onPress={() => this.setValue('contractSetup')} >
                                            <Text style={this.state.contractSetup ? styles.textPrimary : styles.textDefault}>Purchase Contract Setup</Text>
                                            <Radio onPress={() => this.setValue('contractSetup')} selected={this.state.contractSetup} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.Content} onPress={() => this.setValue('contractReview')} >
                                            <Text style={this.state.contractReview ? styles.textPrimary : styles.textDefault}>Contract Review</Text>
                                            <Radio onPress={() => this.setValue('contractReview')} selected={this.state.contractReview} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.Content} onPress={() => this.setValue('other')} >
                                            <Text style={this.state.other ? styles.textPrimary : styles.textDefault}>Other</Text>
                                            <Radio onPress={() => this.setValue('other')} selected={this.state.other} />
                                        </TouchableOpacity>

                                        {this.state.value.value === 'other' ?
                                            <Item style={styles.otherText}>
                                                <Text>
                                                    {this.state.serviceDesc.value}
                                                </Text>
                                            </Item>
                                            : null
                                        }
                                    </Body>
                                </CardItem>
                            }
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <TouchableOpacity onPress={() => this.setState({ landlord: !this.state.landlord })} >
                                <CardItem>
                                    <Body>
                                        <View style={styles.questionView}>
                                            <Text style={styles.titleText}>Landlord</Text>
                                        </View>
                                    </Body>
                                    <Right>
                                        <Icon style={AppStyles.textPrimary} name={this.state.landlord === false ? 'chevron-down' : 'chevron-up'} />
                                    </Right>
                                </CardItem>
                            </TouchableOpacity>
                            {this.state.landlord &&
                                <CardItem style={styles.settingsContent}>
                                    <Body>
                                        <TouchableOpacity style={styles.Content} onPress={() => this.setValue('landlord')} >
                                            <Text style={this.state.landlordItem ? styles.textPrimary : styles.textDefault}>Property Management</Text>
                                            <Radio onPress={() => this.setValue('landlord')} selected={this.state.landlordItem} />
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                            }
                        </Card>
                        <Card style={styles.cardViewStyle}>
                            <TouchableOpacity onPress={() => this.setState({ tenant: !this.state.tenant })} >
                                <CardItem>
                                    <Body>
                                        <View style={styles.questionView}>
                                            <Text style={styles.titleText}>Tenant</Text>
                                        </View>
                                    </Body>
                                    <Right>
                                        <Icon style={AppStyles.textPrimary} name={this.state.tenant === false ? 'chevron-down' : 'chevron-up'} />
                                    </Right>
                                </CardItem>
                            </TouchableOpacity>
                            {this.state.tenant &&
                                <CardItem style={styles.settingsContent}>
                                    <Body>
                                        <TouchableOpacity style={styles.Content} onPress={() => this.setValue('tenant')} >
                                            <Text style={this.state.tenantItem ? styles.textPrimary : styles.textDefault}>Tenant</Text>
                                            <Radio onPress={() => this.setValue('tenant')} selected={this.state.tenantItem} />
                                        </TouchableOpacity>
                                    </Body>
                                </CardItem>
                            }
                        </Card>
                        <Modal
                            animationType="slide"
                            transparent
                            visible={this.state.servicePopup}
                            onRequestClose={() => {
                                this.setState({ servicePopup: false });
                            }}
                        >
                            <View style={AppStyles.modelView}>
                                <View style={AppStyles.modelContainerLeftbg}>
                                    <View style={AppStyles.modelContainerLeft}>
                                        <Label style={AppStyles.textPrimary}>Which service do you want?</Label>
                                        <Textarea
                                            value={this.state.content}
                                            onChangeText={(text) => this.setState({ content: text })}
                                            style={styles.textareaView}
                                            rowSpan={5}
                                            placeholder="Description"
                                            placeholderTextColor="#dcdcdc"
                                        />
                                    </View>
                                    <TouchableOpacity onPress={this.onSubmitPress.bind(this)} >
                                        <Text style={styles.subText}>SUBMIT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        {this.checkValue()}
                    </View>
                    <View>{this.state.alert === true &&
                        <View style={styles.alertView}>
                            <Text style={styles.alert}>
                                * The value is mandatory.Please select any one
                                </Text>
                        </View>}
                    </View>
                </ScrollView>
            );
        }
    }


    export default Service;

