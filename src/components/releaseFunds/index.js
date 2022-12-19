import React, { Component } from 'react';
import {
    View, Label, Text
} from 'native-base';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';
import styles from './styles';


export default class ReleaseFunds extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Release Funds',
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

    componentDidMount() {
        const { state } = this.props.navigation;
        console.log('state', state.params.agentDetails.fullName, state.params.agentDetails.serviceArea);
        this.setState({
            agentName: state.params.agentDetails
        });
    }
    onTourComplete() {
        this.props.navigation.navigate('CompleteTour',{agentName:this.state.agentName});
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.nodataView}>
                        <Label style={styles.headStyle}>Release Funds</Label>
                        <View>
                                <Text style={styles.confirmText}>
                                    <Text style={styles.checkBoxLabel}>
                                        I confirm the agent
                                       </Text>
                                    <Text style={styles.checkBoxLink}> ({this.state.agentName.fullName} "{this.state.agentName.serviceArea}") </Text>

                                    <Text style={styles.checkBoxLabel}>has completed the job</Text>.
                                </Text>
                        </View>
                        <View style={styles.postJob}>
                            <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onTourComplete()} >
                                <LinearGradientView style={AppStyles.primaryButton} name={'Release Funds'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}
