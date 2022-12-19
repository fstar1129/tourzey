import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Card, CardItem, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView, ListView, TouchableOpacity } from 'react-native';
import styles from './styles';
import {
    getJobDetail
} from '../../../action/index';
import { archiveJobs } from '../mock';

class ArchiveJobs extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            jobDetail: [],
            showDesc: false,
        };
    }

    componentDidMount() {
        this.props.getJobDetail('archive');
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     visible: false
        // });
        if (nextProps.successJobs === true) {
            if (nextProps.details !== this.props.details) {
                const jobs = [];
                nextProps.details.map((eachJobItem) => {
                    if (eachJobItem.type === 'archive') {
                        jobs.push(eachJobItem);
                        this.setState({
                            jobDetail: jobs
                        }, () => {
                        });
                    }
                });
            }
        }
    }

    onPostJobPress() {
        this.props.navigation.navigate('PostJob');
    }

    showdetail(details) {
        this.setState({ showDesc: !this.state.showDesc });
        if (this.state.details) {
            if (this.state.details.id !== details.id) {
                this.setState({ showDesc: true });
            }
        }
        this.setState({ details });
    }

    renderLoader() {
        // if (this.props.loading) {
        //     this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.props.loading} textContent={'Loading...'} textStyle={{ width: '100%', textAlign: 'center', color: '#FFF' }} />
                </View>
            );
        // }
    }

    renderRow(details) {
        console.log('details', details);
        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('HireAgent',
                        {
                            archive: true,
                            type: details.type,
                            jobId: details.id,
                            tourDesc: details.tourDesc ? details.tourDesc : '',
                            tourName: details.tourName,
                            contract: details.contract,
                            screen: 'jobs'
                        })
                    }
                >
                    <Card>
                        <CardItem style={styles.cardView}>
                            <View style={styles.detailView}>
                                <Text style={styles.title}>{details.tourName}</Text>
                                <Text style={styles.priceDes}>Fixed Price - {details.tourPostDate} by {details.postedBy}</Text>
                            </View>
                            <View style={styles.iconView}>
                                {(this.state.details !== details || this.state.showDesc === false) &&
                                    <TouchableOpacity onPress={() => this.showdetail(details)}>
                                        <Icon style={styles.icon} name="plus-circle" />
                                    </TouchableOpacity>
                                }
                                {this.state.showDesc === true && this.state.details === details &&
                                    <TouchableOpacity onPress={() => this.showdetail(details)}>
                                        <Icon style={styles.icon} name="minus-circle" />
                                    </TouchableOpacity>
                                }
                            </View>
                            <View>
                                {this.state.showDesc === true && this.state.details === details &&
                                    <View style={styles.wholeView}>
                                        <CardItem style={styles.contentView}>
                                            <Text style={styles.count}>{details.jobAppliedBy ? details.jobAppliedBy.length : 0}</Text>
                                            <Text style={styles.description}>Offers</Text>
                                        </CardItem>
                                        <View style={styles.lineStyle} />
                                        <CardItem style={styles.contentView}>
                                            <Text style={styles.count}> </Text>
                                            <Text style={styles.description}>Messages</Text>
                                        </CardItem>
                                        <View style={styles.lineStyle} />
                                        <CardItem style={styles.contentView}>
                                            <Text style={styles.count}>{details.hiredAgent.length}</Text>
                                            <Text style={styles.description}>Hired</Text>
                                        </CardItem>
                                    </View>
                                }
                            </View>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    {this.state.jobDetail && this.state.jobDetail.length > 0 ?
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.state.jobDetail)}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections
                        />
                        :
                        <View style={styles.nodataInfo}>
                            <Text style={styles.nodataText}>
                                No Archived jobs...
                            </Text>
                        </View>
                    }
                    {this.renderLoader()}
                </ScrollView>
            </View>
        );
    }
}
ArchiveJobs.navigationOptions = {
    header: null
};

export const mapStateToProps = (status) => {
    const { details, successJobs, loading, error } = status.getJobDetails;
    return {
        details,
        successJobs,
        loading,
        error,
    };
};

export default
    connect(mapStateToProps, {
        getJobDetail
    })(ArchiveJobs);
