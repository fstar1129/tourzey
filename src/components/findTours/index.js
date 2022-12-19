import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { View, Text, Input, Toast } from 'native-base';
import styles from './styles';
import Images from '../../themes/main/Theme.Main.Images';
import TourCategoryGradientModal from '../common/gradient/tourCategoryGradient';

class FindTours extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     title: 'Find Tours',
    //     headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
    //     headerRight: null,
    //     headerStyle: {
    //         backgroundColor: Theme.Colors.white,
    //     },
    //     headerTitleStyle: {
    //         color: Theme.Colors.default,
    //         fontSize: Theme.Font.sizes.medium,
    //         fontWeight: 'normal',
    //         textAlign: 'center',
    //         flex: 0.8,
    //     },
    // });
    constructor(props) {
        super(props);
        this.state = {
            searchItem: '',
            alert: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            title: 'Find Tours'
        });
        // this.props.navigation.setParams({
        //     headerLeft:
        //         <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
        //             <Image
        //                 source={Theme.Images.icons.leftArrowIcon}
        //                 style={styles.backIcon}
        //             />
        //         </TouchableOpacity>,
        // });
    }
    onclose() {
        this.setState({
            filter: false
        });
    }
    onResetPress() {
        this.setState({
            name: 'reset',
        }, () => {
            this.onDone();
        });
    }


    onCategoryPress(page) {
        this.props.navigation.navigate('SearchResults', { category: page, isCategory: true });
    }

    searchPress() {
        console.log(this.state.searchItem, this.state.searchItem.length, 'checking length');
        if (!this.state.searchItem) {
            console.log(this.state.searchItem, this.state.searchItem.length, 'if length');
            this.setState({
                alert: true
            });
        } else {
            this.props.navigation.navigate('SearchResults', { category: this.state.searchItem, isCategory: false });
            this.setState({
                alert: false
            });
        }
    }
    
    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerView}>
                    <Text style={styles.searchItemStyle}>Categories</Text>
                        {/* <Input
                            placeholderTextColor="#000000"
                            placeholder="Search for Tours"
                            style={styles.searchItemStyle}
                            value={this.state.searchItem}
                            onChangeText={(text) => this.setState({ searchItem: text })}

                        /> */}
                        {/* <TouchableOpacity onPress={() => this.searchPress()}>
                            <TourCategoryGradientModal style={styles.mainCategoryButton} name={'Search'} />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.searchLineStyle} />
                    {/* {this.state.alert === true &&
                        <Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>Please enter a place to search!</Text>
                    } */}
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.tourImageView}>
                            <View style={styles.imageView}>
                                <TouchableOpacity onPress={() => this.onCategoryPress('SightSeeing')}>
                                    <View style={styles.textView}>
                                        <Image source={Images.tourImages.sightSeeing} style={styles.tourImageStyle} />
                                        <Text style={styles.textStyle}>Sightseeing</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onCategoryPress('Food')}>
                                    <View style={styles.textView}>
                                        <Image source={Images.tourImages.food} style={styles.tourImageStyle} />
                                        <Text style={styles.textStyle}>Food</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.imageView}>
                                <TouchableOpacity onPress={() => this.onCategoryPress('NightLife')}>
                                    <View style={styles.textView}>
                                        <Image source={Images.tourImages.nightLife} style={styles.tourImageStyle} />
                                        <Text style={styles.textStyle}>Nightlife</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onCategoryPress('Adventure')}>
                                    <View style={styles.textView}>
                                        <Image source={Images.tourImages.adventure} style={styles.tourImageStyle} />
                                        <Text style={styles.textStyle}>Adventure</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.imageView}>
                                <TouchableOpacity onPress={() => this.onCategoryPress('Local')}>
                                    <View style={styles.textView}>
                                        <Image source={Images.tourImages.local} style={styles.tourImageStyle} />
                                        <Text style={styles.textStyle}>Local</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.onCategoryPress('Sports')}>
                                    <View style={styles.textView}>
                                        <Image source={Images.tourImages.sports} style={styles.tourImageStyle} />
                                        <Text style={styles.textStyle}>Sports</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default FindTours;
