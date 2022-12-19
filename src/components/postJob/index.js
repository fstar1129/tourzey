import React, { Component } from 'react';
import {
    View, Card, CardItem, Text,
    Body, Item, Label, Textarea
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Theme from '../../themes/Theme';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import { isStringEmpty } from '../../utils/checkEmptycondition';
import ProgressGradientView from '../common/gradient/progressGradient';

class PostJob extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Tour Name',
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
            tourName: '',
            alert: false,
            // percent: 17
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
            headerRight:
                <View>
                    <Text style={AppStyles.nextBtn} onPress={() => { this.onNextPress(); }}>NEXT</Text>
                </View>
        });
    }

    componentWillMount() {
        if (this.props.navigation.state.params !== undefined) {
            const { state } = this.props.navigation;
            if (state.params.quickTour === true) {
                let val = 60;
                this.location = state.params.location;
                this.mood = state.params.value;
                val += state.params.percent;
                this.setState({
                    percent: val 
                });
            } else if (state.params.futureTour === true) {
                let val = 60;
                this.location = state.params.location;
                this.service = state.params.value;
                val += state.params.percent;
                this.setState({
                    percent: val 
                });
            }
        }
    }

    onNextPress() {
        if (this.state.tourName === '') {
            this.setState({
                alert: true
            });
        } else {
            if (this.props.navigation.state.params !== undefined) {
                const { state } = this.props.navigation;
            if (state.params.quickTour === true) {
            this.props.navigation.navigate('Description', 
            { 
              tourName: this.state.tourName, 
              location: this.location,
              mood: this.mood,
              percent: this.state.percent,
              quickTour: true
            }
            );
            } else if (state.params.futureTour === true) {
                this.props.navigation.navigate('Description', 
            { 
              tourName: this.state.tourName, 
              location: this.location,
              service: this.service,
              percent: this.state.percent,
              futureTour: true 
            }
            );
            }
        }
    }
}
    checkValue() {
        // todo-cr-si : boopi @ janani - check all conditions and use common file - completed
        if (isStringEmpty(this.state.tourName)) {
            this.state.alert = false;
        }
    }
    renderLoader() {
            return (
                <View style={{ flex: 1 }}>
                {/* todo-cr-mi: boopi @janani - use seperate style for css - completed */}
                    <Spinner visible={this.props.loading} textContent={'Loading...'} textStyle={styles.loading} />
                </View>
            );
    }

    render() {
        return (
            <SafeAreaView>        
                <ScrollView style={styles.containerView}>
                    <View style={AppStyles.progress}>
                    <ProgressGradientView width={this.state.percent} />
                    </View>
                    <View style={styles.profileContainer}>                        
                        <Card style={styles.cardViewStyle}>
                            <CardItem style={styles.cardStyle}>
                                <Body>
                                    <Label style={styles.labelStyle}>Name your Tour</Label>
                                    <Item style={styles.itemStyle}>
                                        <Textarea
                                            placeholderTextColor="#dcdcdc"
                                            placeholder='Ex: "Up Kilimanjaro" "Sistine Chapel Tour" "Running 
                                            The Wall Of China" "The Washington Monument"'
                                            style={styles.inputHeight}
                                            maxLength={50}
                                            value={this.state.tourName}
                                            onChangeText={(text) => this.setState({ tourName: text })}
                                        />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                        <Text style={styles.textcountView}>
                            {this.state.tourName.length}/50
                         </Text>
                        {this.checkValue()}
                        {/* todo-cr-mi: boopi @janani - no use of ternaey operator here - completed*/}
                        <View>{this.state.alert === true &&
                            <View style={styles.alertView}>
                                <Text style={styles.alert}>
                                    * The value is mandatory.
                                </Text>
                            </View>}
                        </View>
                    </View>
                    {this.renderLoader()}
                </ScrollView>
            </SafeAreaView>

        );
    }
}

export default PostJob;

