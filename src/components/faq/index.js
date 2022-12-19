import React, { Component } from 'react';
import { View, ScrollView, ListView, TouchableOpacity, Image } from 'react-native';
import {
    Text, Card, CardItem, Right, Body
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import { data } from './mock';
import styles from './styles';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Theme from '../../themes/Theme';

class FrequentlyAskedQuestions extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "FAQ'S",
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: null,
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
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            loader: false,
            isMounted: false,
            showDesc: false
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
    loaderSpinner() {
        return (
            <View>
                <Spinner visible={this.state.loader} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
            </View>
        );
    }

    showdetail(values) {
        // todo-cr-si: pavi @jana - values is present or not
        this.setState({ showDesc: !this.state.showDesc });
        if (this.state.values) {
            if (this.state.values.id !== values.id) {
                this.setState({ showDesc: true });
            }
        }
        this.setState({ values });
    }

    renderRow(values) {
        return (
            <View>
                <Card style={styles.cardViewStyle}>
                    <TouchableOpacity onPress={() => this.showdetail(values)}>
                        <CardItem>
                            <Body>
                                <View style={styles.questionView}>
                                    <Text style={AppStyles.textPrimary}>{values.question}</Text>
                                </View>
                            </Body>
                            <Right>
                                {(this.state.values !== values || this.state.showDesc === false) &&
                                    <Icon style={AppStyles.textPrimary} name="chevron-down" />
                                }
                                {this.state.showDesc === true && this.state.values === values &&
                                    <Icon style={AppStyles.textPrimary} name="chevron-up" />
                                }
                            </Right>
                        </CardItem>
                        {this.state.showDesc === true && this.state.values === values &&
                            <CardItem style={styles.faqContent}>
                                <Body>
                                    <Text style={styles.ansText}>{values.answer}</Text>
                                </Body>
                            </CardItem>
                        }
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.faqContainer}>
                        {data && data.length > 0 ?
                            <ListView
                                dataSource={this.ds.cloneWithRows(data)}
                                renderRow={this.renderRow.bind(this)}
                                enableEmptySections
                            />
                            :
                            <View>
                                <Text>
                                    No Data Available
                                </Text>
                            </View>
                        }
                    </View>
                    {/* {this.renderLoader()} */}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default FrequentlyAskedQuestions;

