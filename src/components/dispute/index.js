import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Image } from 'react-native';
import {
    View, Card, CardItem, Text,
    Body, Item, Label, Textarea, Button, Toast, Input
} from 'native-base';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientView from '../common/gradient/linearGradient';
import Theme from '../../themes/Theme';

export default class Dispute extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Dispute',
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
            name: '',
            email: '',
            phone: '',
            tourName: '',
            comment: ''
        };
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
        });
    }
    onDisputePress() {

    }
    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.contractContainer}>
                    <View>
                        <Label style={styles.labelStyle}>We want to help resolve your issue. Please provide as many details as possible regarding your dispute</Label>
                        <Label style={styles.labelStyle}>PLEASE NOTE: <Label style={styles.labelStyle}>You can initiate a dispute anytime during your tour, and before it is completed.</Label></Label>
                    </View>
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                            <Label style={styles.cardLabelStyle}>Name</Label>
                                <Item style={styles.itemStyle}>
                                    <Input
                                        style={styles.inputHeight}
                                        value={this.state.name}
                                        onChangeText={(text) => this.setState({ name: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <View style={styles.licenseView}>
                        <Card style={styles.cardView}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Label style={styles.cardLabelStyle}>Email</Label>
                                    <Item style={styles.itemStyle}>
                                        <Input
                                            style={styles.inputHeight}
                                            value={this.state.email}
                                            onChangeText={(text) => this.setState({ email: text })}
                                        />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardView}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Label style={styles.cardLabelStyle}>Phone</Label>
                                    <Item style={styles.itemStyle}>
                                        <Input
                                            keyboardType={'numeric'}
                                            style={styles.inputHeight}
                                            value={this.state.phone}
                                            onChangeText={(text) => this.setState({ phone: text })}
                                        />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                             <Label style={styles.cardLabelStyle}>Tour Name</Label>
                                <Item style={styles.itemStyle}>
                                    <Input
                                        style={styles.inputHeight}
                                        value={this.state.tourName}
                                        onChangeText={(text) => this.setState({ tourName: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={styles.cardViewStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                                <Item style={styles.itemStyle}>
                                    <Textarea
                                        placeholderTextColor="#dcdcdc"
                                        placeholder="Comment Box"
                                        style={styles.textareaStyle}
                                        maxLength={5000}
                                        value={this.state.comment}
                                        onChangeText={(text) => this.setState({ comment: text })}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                    </Card>
                    <Text style={styles.textcountView}>
                        {this.state.comment.length}/5000
                     </Text>
                    <View style={styles.postJob} >
                        <TouchableOpacity style={AppStyles.tochableButton} onPress={this.onDisputePress.bind(this)}>
                            <LinearGradientView style={AppStyles.primaryButton} name={'Dispute'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
};