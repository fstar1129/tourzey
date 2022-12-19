import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Text, Image } from 'react-native';
import { View } from 'native-base';
import styles from './styles';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';
import Theme from '../../../themes/Theme';


export default class Questions extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params && navigation.state.params.pageName,
        headerLeft:
            navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight:
            navigation.state.params ? navigation.state.params.headerRight : null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            // color: Theme.Colors.primary,
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
            supportDetails: []
        };
    }
    componentWillMount() {
        if (this.props.navigation.state.params &&
            this.props.navigation.state.params.questions
        ) {
            this.setState({
                supportDetails: this.props.navigation.state.params.questions
            });
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                    <Image
                        source={Theme.Images.icons.leftArrowIcon}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>,
        });
    }


    onGuidePress(data) {
        this.props.navigation.navigate('Details', { data, pageName: data.question });
    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <ScrollView
                    style={styles.ScrollViewStyle}
                >
                    {this.state.supportDetails.length > 0 ?
                        this.state.supportDetails.map((data, index) => {
                            return (
                                <View>
                                    <View style={styles.cardItemStyle} >
                                        <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onGuidePress(data)}>
                                            <Text style={styles.textStyle}>{data.question}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { this.onGuidePress(data); }}>
                                            <Image
                                                source={Theme.Images.icons.dropDown}
                                                style={styles.dropDownStyle}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                    <View
                                        style={styles.borderStyle}
                                    />
                                </View>
                            );
                        })
                        :
                        <View style={styles.nodataInfo}>
                            <Text style={styles.nodataText}>
                                No data Available...
                        </Text>
                        </View>
                    }
                </ScrollView>
            </View>
        );
    }
}

