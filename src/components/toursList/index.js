import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, Text, Button } from 'native-base';
import styles from './styles';
import { data } from './mock';
import Theme from '../../themes/Theme';
import { isArrayEmpty } from '../../utils/checkEmptycondition';
import Images from '../../themes/main/Theme.Main.Images';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import LinearGradientViewModel from '../common/gradient/modalGradient';
import { getRequestToursData, deleteRequestData, getCompleteToursData } from '../../action/index';

// todo-cr-mi- pavi @ janani - remove unused code and imports
class ToursList extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Tours',
        headerLeft: navigation.state.params ? navigation.state.params.headerLeft : null,
        headerRight: null,
        headerStyle: {
            backgroundColor: Theme.Colors.white,
        },
        headerTitleStyle: {
            // color: Theme.Colors.default,
            fontSize: Theme.Font.sizes.title,
            fontWeight: 'normal',
            textAlign: 'center',
            flex: 0.8,
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            delete: false,
            requestTourData: [],
            deletetourData: {},
            deleteStatus: '',
            completeTourData: []
        };
    }

    componentDidMount() {
        console.log('ssssssssssssss', this.props.navigation.state.params.tourType);
        this.props.navigation.setParams({
            headerLeft:
                <TouchableOpacity onPress={() => {
                    ((this.props.navigation.state.params &&
                        this.props.navigation.state.params.tourType) &&
                        this.props.navigation.state.params.tourType === 'complete') ?
                        this.props.navigation.navigate('Support') :
                        this.props.navigation.goBack();
                }}>
                   
                    <View style={styles.backIconViewStyle}>
                            <Image
                                source={Theme.Images.icons.leftArrowIcon}
                                style={styles.backIcon}
                            />
                        </View>
                </TouchableOpacity>,
        });
        // console.log('tourCategory ToursList', this.props.tourCategory);
        console.log('paramschecking', this.props.navigation.state.params);
        if (this.props.tourCategory === 'Current') {
            // console.log('tourCategory', this.props.tourCategory);
            this.props.getRequestToursData();
        } else {
            this.props.getCompleteToursData();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps, nextProps.requestTourData, this.props.requestTourData);
        if (nextProps) {
            if (this.props.requestTourData !== nextProps.requestTourData) {
                if (isArrayEmpty(nextProps.requestTourData)) {
                    this.setState({
                        requestTourData: nextProps.requestTourData
                    }, () => {
                        console.log('requestTourData', this.state.requestTourData);
                    });
                }
            }
            if (nextProps.deleteStatus === 'deleted') {
                // console.log('deleteStatus', nextProps.deleteStatus, this.state.requestTourData);
                const array = this.state.requestTourData;
                this.state.requestTourData.map((item, index) => {
                    // console.log('index', index);
                    if (item.requestTourId === this.state.deletetourData.requestTourId) {
                        array.splice(index, 1);
                        // console.log('array', array);
                        this.setState({ requestTourData: array }, () => {
                            // console.log('tourData next', this.state.requestTourData);
                        });
                    }
                });
            }
            console.log('datacheck', this.props.completeTourData);
            if (this.props.completeTourData !== nextProps.completeTourData) {
                if (isArrayEmpty(nextProps.completeTourData)) {
                    this.setState({
                        completeTourData: nextProps.completeTourData
                    }, () => {
                        // console.log('requestTourData', this.state.completeTourData);
                    });
                }
            }

            if (nextProps.complete !== this.props.complete) {
                console.log('NextProps in completeStatus toursList', nextProps.completeStatus);
                if (nextProps.completeStatus === 'Completed') {
                    this.props.onDataChanged('Pass');
                }
            }
        } else {
            console.log('Error');
        }
    }

    onDeletePress(item) {
        this.setState({
            deletetourData: item
        }, () => {

        });
        this.setState({
            delete: true,
        });
    }

    onRemovePress(deletetourData) {
        console.log('onRemovePress', deletetourData);
        this.setState({
            delete: false
        }, () => {
            if (deletetourData.tourApprovalStatus === 'Pending' ||
                deletetourData.tourApprovalStatus === 'Rejected') {
                this.props.deleteRequestData(
                    deletetourData.requestTourId,
                    deletetourData.tourRequestedById,
                    deletetourData.tourId
                );
            }
        });
    }
    onCancelPress() {
        this.setState({
            delete: false
        });
    }
    onPressTourImage(item) {
        this.props.navigation.navigate('TourSupport', { completeTourDetail: item });
    }
    onCompletePress(item) {
        console.log('tourData item', item, this.props.tourCategory);
        this.props.navigation.navigate('TourDetailScreen', { tourInfo: item, tourCategory: this.props.tourCategory });
    }
    renderLoader() {
        // console.log('renderLoader requestTourLoader', this.props.requestTourLoader);
        if (this.props.requestTourLoader || this.props.deletedRequestDataLoader || this.props.completeTourLoader) {
            this.state.visible = true;
            return (
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
                </View>
            );
        }
        // this.state.visible = false;
        // return (
        //     <View style={{ flex: 1 }}>
        //         <Spinner visible={this.state.visible} textContent={'Loading...'} textStyle={styles.toastStyle} />
        //     </View>
        // );
    }

    render() {
        const { requestTourData, deletetourData, completeTourData } = this.state;
        console.log('render', requestTourData, completeTourData);
        let tourData = [];
        if (this.props.tourCategory === 'Current') {
            tourData = this.state.requestTourData;
        } else {
            tourData = this.state.completeTourData;
        }
        console.log('tourData', tourData);
        return (
            <ScrollView>
                {isArrayEmpty(tourData) && tourData.length > 0 &&
                    tourData.map((item) => (
                        <View style={this.state.delete ? { opacity: 0.2 } : { opacity: 1 }}>
                            {(this.props.navigation.state.params &&
                                this.props.navigation.state.params.tourType) &&
                                this.props.navigation.state.params.tourType === 'complete' ?
                                <View style={styles.mainView}>
                                    <TouchableOpacity onPress={() => { this.onPressTourImage(item); }}>
                                        <View style={styles.tourImageView}>
                                            <Image source={{ uri: item.tourImageUrl }} style={styles.tourImageStyle} />
                                        </View>

                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.mainView}>
                                    <TouchableOpacity onPress={() => { this.onCompletePress(item); }}>
                                        <View style={styles.tourImageView}>
                                            <Image source={{ uri: item.tourImageUrl }} style={styles.tourImageStyle} />
                                        </View>
                                    </TouchableOpacity>
                                    {this.props.tourCategory === 'Current' && (item.tourApprovalStatus === 'Pending' || item.tourApprovalStatus === 'Rejected') &&
                                        <TouchableOpacity style={styles.closeIconView} onPress={() => this.onDeletePress(item)}>
                                            <Image source={Images.icons.closeWhiteIcon} style={styles.closeIcon} />
                                        </TouchableOpacity>
                                    }
                                </View>
                            }
                            <View style={styles.tourDescView}>
                                <View style={styles.infoView}>
                                    {/* tourCode is static */}
                                    {item.uniqueId &&
                                        <Text style={styles.code}>#{item.uniqueId}</Text>
                                    }
                                    {this.props.tourCategory === 'Current' &&
                                        <View style={styles.contractStatusView}>
                                            {item.tourApprovalStatus === 'Approved' ?
                                                <View style={AppStyles.ApprovedButton}>
                                                    <Text style={AppStyles.statusText}>APPROVED</Text>
                                                </View>
                                                :
                                                item.tourApprovalStatus === 'Pending' ?
                                                    <View style={AppStyles.pendingButton}>
                                                        <Text style={AppStyles.statusText}>PENDING</Text>
                                                    </View>
                                                    :
                                                    item.tourApprovalStatus === 'Rejected' ?
                                                        <View style={AppStyles.rejectedButton}>
                                                            <Text style={AppStyles.statusText}>REJECTED</Text>
                                                        </View>
                                                        :
                                                        null
                                            }
                                        </View>
                                    }
                                </View>
                                <View style={styles.infoView}>
                                    <View style={styles.nameViewWrap}>
                                        <View style={styles.nameView}>
                                            <View style={styles.nameSpacing}>
                                                <Text style={styles.nameStyling}>{item.tourName}</Text>
                                                {item.tourDate && item.tourTime &&
                                                    <View style={styles.tourCategoryView}>
                                                        <Text style={styles.tourCategoryStyle}>{item.tourDate}</Text>
                                                        <Text style={styles.dotStyle}> . </Text>
                                                        <Text style={styles.tourCategoryStyle}>{item.tourTime}</Text>
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.earningsView}>
                                        <Text style={styles.earningAmount}>${item.count ? parseInt(item.tourPrice * parseInt(item.count)) : parseInt(item.tourPrice)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.lineStyle} />
                        </View>

                    ))
                }
                {tourData.length === 0 && this.state.visible === true &&
                    <View style={styles.nodataInfo}>
                        <Text style={styles.nodataText}>
                            {this.props.tourCategory === 'Current' ?
                                'No Current Tours Are Available'
                                :
                                'No Completed Tours'
                            }
                        </Text>
                    </View>
                }
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
                                <Text style={styles.textStyle}>
                                    Are you sure you want to remove this tour?
                                    </Text>
                                <Text style={styles.modalConentStyle}>
                                    Removing an approved tour may result in a service fee
                                    </Text>
                            </View>
                            <View style={styles.buttonView}>
                                <TouchableOpacity style={AppStyles.tochableButton}>
                                    <Button style={AppStyles.ModalButtonWhite} onPress={() => this.onCancelPress()}>
                                        <Text style={AppStyles.ModalButtonText} uppercase={false}>Cancel</Text>
                                    </Button>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.onRemovePress(deletetourData)}
                                >
                                    <LinearGradientViewModel
                                        style={AppStyles.modalButton}
                                        name={'Remove'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {this.renderLoader()}
            </ScrollView >
        );
    }
}

export const mapStateToProps = (status) => {
    console.log(status, 'toursList det');
    const { userData } = status.getuserData;
    const {
        requestTourData,
        error,
        requestTourLoader
    } = status.requestTourData;
    const {
        deletedRequesterror,
        deletedRequestDataLoader,
        deleteStatus
    } = status.deleteRequestData;
    const {
        completeTourData,
        completeTourError,
        completeTourLoader
    } = status.completeTourData;
    const { complete, completeLoader, completeStatus } = status.completeTour;
    return {
        userData,
        requestTourData,
        error,
        requestTourLoader,
        deletedRequesterror,
        deletedRequestDataLoader,
        deleteStatus,
        completeTourData,
        completeTourError,
        completeTourLoader,
        complete,
        completeLoader,
        completeStatus
    };
};

export default connect(mapStateToProps, {
    getRequestToursData,
    deleteRequestData,
    getCompleteToursData
})(ToursList);

