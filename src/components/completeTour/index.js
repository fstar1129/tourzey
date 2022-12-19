import React, { Component } from 'react';
import {
    View, Text, Button
} from 'native-base';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import styles from './styles';


export default class CompleteTour extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Tour Complete',
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
            flex: 0.8,
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            agentName: {}
        };
    }
    componentWillMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.backIcon}
                        style={AppStyles.backIcon}
                    />

                </TouchableOpacity>,
            headerRight: null
        });
    }
    componentDidMount(){
        const { state } = this.props.navigation;
        console.log('agent', state.params.agentName.fullName);
        this.setState({
            agentName: state.params.agentName
        });
    }
    onReviewPress(){
        this.props.navigation.navigate('CompleteReview',{agentName:this.state.agentName});
    }
    onHomePress() {
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
            <SafeAreaView>
                <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.nodataView}>
                        <Image
                            onPress={() => { this.props.navigation.goBack(); }}
                            source={Theme.Images.icons.completeIcon}
                            style={styles.tickIcon}
                        />
                        <View>
                            <Text>
                                <Text style={styles.checkBoxLink}>Congratulations! Your tour is complete </Text>
                            </Text>
                        </View>
                        <View style={styles.postJob}>
                            <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onReviewPress()} >
                                <LinearGradientView style={AppStyles.primaryButton} name={'Write a Review'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.postJob}>
                            <TouchableOpacity style={AppStyles.tochableButton}>
                                <Button style={AppStyles.secondaryButtonWhite} onPress={() => this.onHomePress()}>
                                    <Text style={AppStyles.buttonTextSecondary} uppercase={false}>Go back home</Text>
                                </Button>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}
