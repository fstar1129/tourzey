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


export default class CompleteReview extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review',
        headerLeft:  
        navigation.state.params && navigation.state.params.headerLeft,
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
        // this.props.navigation.setParams({
        //     headerLeft:
        //         <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
        //             <Image
        //                 source={Theme.Images.icons.backIcon}
        //                 style={AppStyles.backIcon}
        //             />

        //         </TouchableOpacity>,
        //     headerRight: null
        // });
    }

    componentDidMount() {
        const { state } = this.props.navigation;
        
        this.setState({
            agentName: state.params.agentName
        });
    }
    onReviewPress() {
        this.props.navigation.navigate('Jobs');
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.nodataView}>
                    
                        <View>
                                <Text style={styles.confirmText}>
                                    <Text style={styles.checkBoxLabel}>
                                    Thank you for submitting this review for( 
                                       </Text>
                                    <Text style={styles.checkBoxLink}> {this.state.agentName.fullName} </Text>

                                    <Text style={styles.checkBoxLabel}>).Your review goes a long way in helping guides build their reputation and community.
                                    Feel free to keep contact with your guide.
                                    </Text>
                                </Text>
                        </View>
                        <View style={styles.postJob}>
                            <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onReviewPress()} >
                                <LinearGradientView style={AppStyles.primaryButton} name={'Go back home'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}
