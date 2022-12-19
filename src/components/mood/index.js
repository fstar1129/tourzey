import React, { Component } from 'react';
import { Card, CardItem, Body, Right, Radio, Item, Textarea, Label, Button, Thumbnail } from 'native-base';
import { Text, View, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';
import Colors from '../../themes/main/Theme.Main.Colors';
import ProgressGradientView from '../common/gradient/progressGradient';


export default class Service extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Mood',
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
            moodPopup: false,
            value: '',
            content: '',
            data: ''
        };
    }

    componentWillMount() {
        if (this.props.navigation.state.params !== undefined) {
            const { state } = this.props.navigation;
            if (state.params.quickTour === true) {
                let val = 60;
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
        console.log('onNextPress', this.state.value);
        if (!this.state.value) {
            this.setState({
                alert: true
            });
            this.state.alert = true;
        } else {
            if (this.props.navigation.state.params !== undefined) {
                const { state } = this.props.navigation;
                if (state.params.quickTour === true) {
                    if (this.state.value === 'Sports') {
                        console.log('Sports', this.state.data, this.state.value);
                        this.props.navigation.navigate('PostJob',
                            {
                                value: this.state.data,
                                location: this.location,
                                percent: this.state.percent,
                                quickTour: true
                            }
                        );
                    } else {
                        console.log('else', this.state.value, this.state.data);
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

    setValue(text) {
        console.log('text', text);
        switch (text) {
            case 'Sightseeing':
                this.setState({
                    value: 'Sightseeing'
                });
                console.log('value switch', this.state.value);
                break;
            case 'Nightlife':
                this.setState({
                    value: 'Nightlife'
                });
                break;
            case 'Adventure':
                this.setState({
                    value: 'Adventure'
                });
                break;
            case 'Food':
                this.setState({
                    value: 'Food'
                });
                break;
            case 'Local':
                this.setState({
                    value: 'Local'
                });
                break;
            case 'Sports':
                this.setState({
                    value: 'Sports',
                    moodPopup: true
                });
                break;
            default:
                this.setState({
                    value: ''
                });
        }
    }

    onSubmitPress() {
        if (this.state.content.length > 0) {
            this.setState({
                data: this.state.content,
                moodPopup: false
            });
        }
    }

    checkValue() {
        if (this.state.value) {
            this.state.alert = false;
        }
    }
    onClose() {
        this.setState({
            moodPopup: false
        });
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.scrollContainer}>
                    <View style={AppStyles.progress}>
                    <ProgressGradientView width={this.state.percent} />
                    </View>
                    <View style={styles.profileContainer}>
                        <View style={styles.titleView}>
                            <Card style={styles.datecardView}>
                                <CardItem style={styles.dateCardStyle}>
                                    <TouchableOpacity onPress={() => this.setValue('Sightseeing')}>
                                        <View style={styles.infoView}>
                                            <View style={styles.nameViewWrap}>
                                                <View style={styles.nameView}>
                                                    <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                                    <View style={styles.nameSpacing}>
                                                        <Text style={this.state.value === 'Sightseeing' ? styles.moodStyle : styles.nameStyling}>Sightseeing</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                            <Card style={[styles.datecardView]}>
                                <CardItem style={styles.dateCardStyle}>
                                    <TouchableOpacity onPress={() => this.setValue('Nightlife')}>
                                        <View style={styles.infoView}>
                                            <View style={styles.nameViewWrap}>
                                                <View style={styles.nameView}>
                                                    <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                                    <View style={styles.nameSpacing}>
                                                        <Text style={this.state.value === 'Nightlife' ? styles.moodStyle : styles.nameStyling}>Nightlife</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={styles.titleView}>
                            <Card style={styles.datecardView}>
                                <CardItem style={styles.dateCardStyle}>
                                    <TouchableOpacity onPress={() => this.setValue('Adventure')}>
                                        <View style={styles.infoView}>
                                            <View style={styles.nameViewWrap}>
                                                <View style={styles.nameView}>
                                                    <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                                    <View style={styles.nameSpacing}>
                                                        <Text style={this.state.value === 'Adventure' ? styles.moodStyle : styles.nameStyling}>Adventure</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                            <Card style={styles.datecardView}>
                                <CardItem style={styles.dateCardStyle}>
                                    <TouchableOpacity onPress={() => this.setValue('Food')}>
                                        <View style={styles.infoView}>
                                            <View style={styles.nameViewWrap}>
                                                <View style={styles.nameView}>
                                                    <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                                    <View style={styles.nameSpacing}>
                                                        <Text style={this.state.value === 'Food' ? styles.moodStyle : styles.nameStyling}>Food</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={styles.titleView}>
                            <Card style={styles.datecardView}>
                                <CardItem style={styles.dateCardStyle}>
                                    <TouchableOpacity onPress={() => this.setValue('Local')}>
                                        <View style={styles.infoView}>
                                            <View style={styles.nameViewWrap}>
                                                <View style={styles.nameView}>
                                                    <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                                    <View style={styles.nameSpacing}>
                                                        <Text style={this.state.value === 'Local' ? styles.moodStyle : styles.nameStyling}>Local</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                            <Card style={styles.datecardView}>
                                <CardItem style={styles.dateCardStyle}>
                                    <TouchableOpacity onPress={() => this.setValue('Sports')}>
                                        <View style={styles.infoView}>
                                            <View style={styles.nameViewWrap}>
                                                <View style={styles.nameView}>
                                                    <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                                    <View style={styles.nameSpacing}>
                                                        <Text style={this.state.value === 'Sports' ? styles.moodStyle : styles.nameStyling}>Sports</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                        </View>
                    </View>
                    <Modal
                        animationType="slide"
                        transparent
                        visible={this.state.moodPopup}
                        onRequestClose={() => {
                            this.setState({ moodPopup: false });
                        }}
                    >
                        <View style={AppStyles.modelView}>
                            <View style={AppStyles.modelContainerLeftbg}>
                                <TouchableOpacity onPress={() => this.onClose()}>
                                    <Icon name="close" size={20} style={styles.closeIcon} />
                                </TouchableOpacity>
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
                    <View>
                        {this.state.alert === true &&
                            <View style={styles.alertView}>
                                <Text style={styles.alert}>
                                    * The value is mandatory.Please select any one
                                </Text>
                            </View>
                        }
                    </View>
                    {this.state.value === 'Sports' && this.state.data ?
                        <View style={styles.otherText}>
                            <Text style={styles.data}>
                                {this.state.data}
                            </Text>
                        </View>
                        : null
                    }
                </ScrollView>
            </SafeAreaView >
        );
    }
}

