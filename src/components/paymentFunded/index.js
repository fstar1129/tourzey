import React, { Component } from 'react';
import {
    View, Label
} from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import styles from './styles';

export default class PaymentFunded extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Payment Funded',
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
        };
    }
    componentWillMount() {
        this.setState({
            jobId: this.props.navigation.state.params.jobId,
            screen: this.props.navigation.state.params.screen,
        });
    }

    onContractDetailsPress() {
       this.props.navigation.navigate('HireAgent', { jobId: this.state.jobId, screen: this.state.screen });
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.nodataView}>
                        <Label style={styles.labelStyle}>Congratulations! You're on your way! Your Tourzey Guide has been notified and will follow-up shortly.</Label>
                        <View style={styles.postJob}>
                            <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onContractDetailsPress.bind(this)} >
                                <LinearGradientView style={AppStyles.primaryButton} name={'Contract Details'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}
