import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, ListView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { View, Card, CardItem, Thumbnail, Text, Body } from 'native-base';
import StarRating from 'react-native-star-rating';
import styles from './styles';
import Theme from '../../themes/Theme';
import { data } from './mock';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';

class Agents extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {

        };
    }
    componentWillReceiveProps(nextProps) {
    }

    renderRow(details) {
        return (
            <View style={styles.agentContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AgentProfile')}>
                    <Card style={styles.cardViewStyle}>
                        <CardItem>
                            <View style={styles.infoView}>
                                <View style={styles.nameViewWrap}>
                                    <View style={styles.nameView}>
                                        <Thumbnail style={styles.userImage} source={Theme.Images.profile_screen.default_avatar} />
                                        <View style={styles.nameSpacing}>
                                            <Text style={styles.nameStyling}>{details.name}</Text>
                                            <Text note>{details.group_name}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.earningsView}>
                                    <Text style={styles.month}>Month</Text>
                                    <Text style={styles.eranings}>Total Earnings:</Text>
                                    <Text style={styles.earningAmount}>{details.amount}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <View style={AppStyles.lineStyle} />
                        <CardItem>
                            <Body>
                                <Text style={styles.jobTitle}>
                                    {details.expert}
                                </Text>
                                <Text style={styles.jobDescription}>
                                    {details.content}
                                </Text>
                                <View style={styles.jobsView}>
                                    <Text style={styles.jobCount}>{details.jobsCount} <Text note>jobs</Text> </Text>
                                    <View>
                                        <StarRating
                                            disabled
                                            halfStarEnabled={true}
                                            maxStars={5}
                                            rating={details.ratingCount ? details.ratingCount : 0}
                                            starSize={20}
                                            fullStarColor={'#f2b518'}
                                            starStyle={styles.starSpacing}
                                        />
                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View>
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
                    {/* {this.loaderSpinner()} */}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Agents;

