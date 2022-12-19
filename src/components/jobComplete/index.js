import React, { Component } from 'react';
import { Card, CardItem, View, Text, Thumbnail } from 'native-base';
import { TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import Theme from '../../themes/Theme';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import { isObjectEmpty, isArrayEmpty } from '../../utils/checkEmptycondition';
// todo-cr-mi - puni @ jana - remove unused import


export default class JobComplete extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Job Complete',
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
        }
    });
    constructor(props) {
        super(props);
        this.state = {
            agentDetails: {},
            tourDetails: {}
        };
    }

    componentWillMount() {
        const { state } = this.props.navigation;
        if (state.params && isObjectEmpty(state.params.jobApprovedDetails) && isObjectEmpty(state.params.tourContractDetails)) {
            this.setState({
                agentDetails: state.params.jobApprovedDetails,
                tourDetails: state.params.tourContractDetails
            });
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
            headerRight: null
        });
    }

 // todo-cr-mi- pavi @ jana - solve eslint error
    onRequestPayment() {
        this.props.navigation.navigate('ReleaseFunds', { agentDetails: this.state.agentDetails });
    }

    // todo-cr-mi- puni @ jana - use correct format for function name - completed
    viewContractDetails() {
        this.props.navigation.goBack();
    }

    render() {
        console.log('agentDetails', this.state.agentDetails);
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.contractContainer}>
                        <TouchableOpacity onPress={() => this.onRequestPayment()}>
                            <Text style={styles.guideRequest}>Guide Request Payment</Text>
                        </TouchableOpacity>
                        <Card style={styles.cardViewStyle}>
                            <CardItem>
                                <View style={styles.infoView}>
                                    <View style={styles.nameViewWrap}>
                                        <View style={styles.nameView}>
                                            <Thumbnail
                                                style={styles.userImage}
                                                source={this.state.agentDetails && this.state.agentDetails.uri ?
                                                    { uri: this.state.agentDetails.uri }
                                                    :
                                                    Theme.Images.profile_screen.default_avatar
                                                }
                                            />
                                            <View style={styles.nameSpacing}>
                                                <Text style={styles.nameStyling}>{this.state.agentDetails.fullName ? this.state.agentDetails.fullName : '-'}</Text>
                                                <Text note>{this.state.agentDetails.serviceArea ? this.state.agentDetails.serviceArea : '-'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.earningsView}>
                                        <Text style={styles.earningAmount}>{this.state.tourDetails.budget ? this.state.tourDetails.budget : '-'}</Text>
                                    </View>
                                </View>
                            </CardItem>
                        </Card>
                        <Text style={styles.heading}>Milestones</Text>
                        {/* todo-cr-si pavi @jana - check milestone array values is there or not - completed */}
                        {(isObjectEmpty(this.state.tourDetails) && isArrayEmpty(this.state.tourDetails.milestone) && this.state.tourDetails.milestone.length > 0) ?
                            <View>
                                {this.state.tourDetails.milestone.map((values) => (
                                        <Card style={styles.cardViewStyle}>
                                            <CardItem>
                                                <View style={styles.infoView}>
                                                    <View style={styles.nameViewWrap}>
                                                        <View style={styles.nameView}>
                                                            <View style={styles.nameSpacing}>
                                                                <Text style={styles.mileStoneName}>{values.name}</Text>
                                                                <Text style={styles.mileStoneMessage}>{values.description}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.mileStoneView}>
                                                        <Text style={styles.mileStoneAmount}>{values.price}</Text>
                                                        <Text style={styles.fundMesssage}>(Waiting funds)</Text>
                                                    </View>
                                                </View>
                                            </CardItem>
                                        </Card>
                                    ))
                                }
                            </View>
                            :
                            <View style={styles.textCenter}>
                                <Text style={AppStyles.textPrimary}>No Milestones available</Text>
                            </View>
                        }
                        <TouchableOpacity onPress={() => this.viewContractDetails()}>
                            <Text style={styles.contractText}>SEE FULL CONTRACT DETAILS</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

