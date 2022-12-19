import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Text, Image, Modal, StackActions } from 'react-native';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import { View, Button } from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';
import { removeGuide } from '../../action/index';
import LinearGradientViewModel from '../common/gradient/modalGradient';


class Information extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params ? navigation.state.params.data ? navigation.state.params.data.fullName : null : null,
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
            flex: 0.8

        },
    });
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            delete: false
        };
    }
    componentWillMount() {
        if (this.props.navigation.state.params && this.props.navigation.state.params.data
            && this.props.navigation.state.params.data.fullName) {
            this.setState({ fullName: this.props.navigation.state.params.data.fullName });
        }
    }
    componentWillReceiveProps(nextProps) {
        // todo-cr-si: janani @boopi - check guideRemoved variables present or not
        if (nextProps) {
            console.log('nextProps', nextProps, nextProps.guideRemoved, this.props.guideRemoved);
            if (nextProps.guideRemoved !== this.props.guideRemoved) {
                console.log('nextProps', nextProps.guideRemoved);
                if (nextProps.guideRemoved === true) {
                    console.log('nextProps true');
                    const orderlist = _.orderBy(nextProps.conversationList, ['createdAt'], ['desc']);
                    this.setState({ conversations: orderlist, tempConversations: orderlist }, () => console.log('9999', this.state.conversations));
                    // this.props.navigation.navigate('Message', { conversationList: this.state.conversations });
                    this.props.navigation.navigate('Jobs');
                }
            }
        }
    }

    onGuidance() {
        this.props.navigation.navigate('Guidance');
    }
    onGuidePress() {
        this.setState({
            delete: true,
        });
    }
    onRemovePress() {
        console.log(this.props.navigation.state.params.data.sendToid);
        //  todo-cr-si: janani @boopi - check params value present or not
        if (this.props.navigation.state.params && this.props.navigation.state.params.data
            && this.props.navigation.state.params.data.sendToid) {
            this.props.removeGuide(this.props.navigation.state.params.data.sendToid);
        }
        this.setState({
            delete: false
        });
    }
    onGuideProfilePress() {
        this.props.navigation.navigate('GuideProfile', { data: this.props.navigation.state.params.data });
    }
    onCancelPress() {
        this.setState({
            delete: false
        });
    }
    renderLoader() {
        console.log('renderLoader', this.props.guideProfileLoading);
        if (this.props.guideProfileLoading) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
    }
    render() {
        console.log('plusPressed', this.props.plusPressed);
        return (
            <SafeAreaView>
                <View style={styles.viewStyle}>
                    <ScrollView>
                        <View style={styles.nodataView}>
                            <View style={styles.postJob} >
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onGuidePress.bind(this)}>
                                    <Text style={styles.textStyle}>Remove Guide</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onGuidePress.bind(this)}>
                                    <Image
                                        source={Theme.Images.icons.delete}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.postJob2} >
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onGuideProfilePress.bind(this)}>
                                    <Text style={styles.profileTextStyle}>See Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent
                            visible={this.state.delete}
                            onRequestClose={() => {
                                this.setState({ delete: false });
                            }}
                        >
                            <View style={AppStyles.modelView}>
                                <View style={AppStyles.modelContainerView}>
                                    <View style={AppStyles.model}>
                                        <Text style={styles.textStyle2}>
                                            Are you sure would like to delete this guide?
                                </Text>
                                    </View>
                                    <View style={styles.buttonView}>
                                        <TouchableOpacity style={AppStyles.tochableButton}>
                                            <Button style={AppStyles.ModalButtonWhite} onPress={() => this.onRemovePress()}>
                                                <Text style={AppStyles.ModalButtonText} uppercase={false}>Remove</Text>
                                            </Button>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.onCancelPress()}
                                        >
                                            <LinearGradientViewModel
                                                style={AppStyles.modalButton}
                                                name={'Cancel'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
                </View>
                {this.renderLoader()}
            </SafeAreaView>
        );
    }
}
export const mapStateToProps = (state) => {
    const conver = state.getConversationList.conversationList.map((res) => res);
    const { loading, guideRemoved, guideProfileLoading, conversationList, error, conversationLoading } = state.getConversationList;
    return { loading, guideRemoved, guideProfileLoading, conversationList, error, conversationLoading, conver };
};

export default connect(mapStateToProps, { removeGuide })(Information);

//shan blocked janani
