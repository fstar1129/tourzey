import React, { Component } from 'react';
import {
    View, Card, CardItem, Body, Item, Label, Text, Input
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import ProgressGradientView from '../common/gradient/progressGradient';

class ChooseLocation extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Choose Location',
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
            city: '',
            // state: '',
            // zipCode: '',
            alert: false
        };
    }
    componentWillMount() {
        if (this.props.navigation.state.params !== undefined) {
            const { state } = this.props.navigation;
            if (state.params.quickTour === true) {
                const val = 60;
                this.setState({
                    percent: val 
                });
            } else if (state.params.futureTour === true) {
                const val = 60;
                this.setState({
                    percent: val 
                });
            }
        }
    }
    componentDidMount() {
        console.log('hi');
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
                    <Text style={AppStyles.nextBtn} onPress={() => { this.onNextPress(); }}>NEXT</Text>
                </View>
        });
    }
    //todo:cr:si: jaga @ janani: remove unused functions/code - completed
    onNextPress() {
        console.log('onNextPress');
        if (this.state.city === '') {
            this.setState({
                alert: true
            });
        } else {
            console.log('onNextPress else');
            if (this.props.navigation.state.params !== undefined) {
                const { state } = this.props.navigation;
                if (state.params.quickTour === true) {
                    console.log('quickTour');
                    this.props.navigation.navigate('Mood',
                        {
                            location: this.state.city,
                            percent: this.state.percent,
                            quickTour: true
                        }
                    );
                    // this.props.navigation.navigate('Mood');
                } else if (state.params.futureTour === true) {
                    console.log('futureTour');
                    this.props.navigation.navigate('SelectService',
                        {
                            location: this.state.city,
                            percent: this.state.percent,
                            futureTour: true
                        }
                    );
                }
            }
        }
    }
    checkValue() {
        if (this.state.city !== '') {
            this.state.alert = false;
        }
    }
    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.props.loading} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
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
                                    <Label style={styles.labelStyle}>Type Desired Location</Label>
                                    <Item style={styles.itemStyle}>
                                        <Input
                                            placeholder='Ex: Kenya'
                                            placeholderTextColor="#dcdcdc"
                                            style={styles.inputHeight}
                                            value={this.state.city}
                                            onChangeText={(text) => this.setState({ city: text })}
                                        />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    {this.renderLoader()}
                    {this.checkValue()}
                    {/* todo:cr:si: jaga @ janani: no use of ternary operator here - completed*/}
                    <View>
                        {this.state.alert === true &&
                            <View style={styles.alertView}>
                                <Text style={styles.alert}>
                                    {/* todo:cr:si: jaga @ janani: change message according to the page - completed*/}
                                    * The value is mandatory.
                                </Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default ChooseLocation;

