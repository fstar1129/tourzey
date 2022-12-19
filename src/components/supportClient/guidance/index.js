import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { View } from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import AppStyles from '../../../themes/main/Theme.Main.AppStyles';
import Theme from '../../../themes/Theme';
import { getSupportdata } from '../../../action/index';
import { orderByFun } from '../../../utils/orderFormat';


class Guidance extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Guidance',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        // headerRight: null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            // color: Theme.Colors.primary,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        }
    });

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            supportDetails: [],
            basic: [],
            policies: [],
            pricing: [],
            others: []
        };
    }
    componentWillMount() {
        this.props.getSupportdata();
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

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.supportData !== this.props.supportData) {
            this.setState({
                supportDetails: orderByFun(nextProps.supportData)
            }, () => {
                this.state.supportDetails.forEach((data) => {
                console.log('checkData', data);
                    if (data.supportType === 'Main') {
                        this.state.basic.push(data);
                    } else if (data.supportType === 'Policies') {
                        this.state.policies.push(data);
                    } else if (data.supportType === 'Pricing'){
                        this.state.pricing.push(data);
                    } else {
                        console.log('datecheck', data);
                        this.state.others.push(data);
                    }
                });
            });
        }
    }

    onBasicPress(name, data) {
        this.props.navigation.navigate('Questions', { pageName: name, questions: data });
    }

    renderLoader() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.props.supportDataLoader} textContent={'Loading...'} textStyle={styles.toastStyle} />
            </View>
        );
    }

    render() {
        console.log('checkstate', this.state.others);
        return (
            <SafeAreaView >
                <ScrollView style={styles.ScrollViewStyle}>
                    <View>
                        <View style={styles.nodataView}>
                            <View style={styles.basicView} >
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onBasicPress('Main', this.state.basic)}>
                                    <Text style={styles.textStyle}>Main</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={styles.cardStyle}
                            />
                            <View style={styles.basicView} >
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onBasicPress('Policies', this.state.policies)}>
                                    <Text style={styles.textStyle}>Policies</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={styles.cardStyle}
                            />
                            <View style={styles.basicView} >
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onBasicPress('Pricing', this.state.pricing)}>
                                    <Text style={styles.textStyle}>Pricing</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={styles.cardStyle}
                            />
                                     <View style={styles.basicView} >
                                <TouchableOpacity style={AppStyles.tochableButton} onPress={() => this.onBasicPress('Others', this.state.others)}>
                                    <Text style={styles.textStyle}>Others</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {this.renderLoader()}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (status) => {
    const {
        supportData,
        supportDataError,
        supportDataLoader
    } = status.getSupportdetail;
    console.log('jnjnjnjjjjjjj', supportData);
    return {
        supportData,
        supportDataError,
        supportDataLoader
    };
};
export default connect(mapStateToProps, {
    getSupportdata
})(Guidance);

