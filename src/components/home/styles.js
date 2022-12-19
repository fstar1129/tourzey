import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const WIDTH = Dimensions.get('window').width - 100;


export default {
    scrollContainer: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: Colors.white
    },
    homeContainer: {
        marginHorizontal: Metrics.margins.large,
        marginVertical: Metrics.margins.medium,
    },
    mainView: {
        flexDirection: 'row',
        marginHorizontal: Metrics.margins.medium,
    },
    infoView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Metrics.margins.medium,

    },
    nameViewWrap: {
        width: SCREEN_WIDTH,

    },
    nameView: {
        display: 'flex',
        flexDirection: 'row',
    },
    userImage: {
        width: 55,
        height: 55,
        borderRadius: 50
    },
    nameSpacing: {
        marginLeft: Metrics.margins.medium,
    },
    nameStyling: {
        fontSize: Font.sizes.default,
        color: Colors.default,
    },
    earningsView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        // marginRight: Metrics.margins.medium
    },
    earningAmount: {
        fontSize: Font.sizes.medium,
        color: Colors.default,
        // marginTop: Metrics.margins.small
    },
    rightView: {
        marginRight: Metrics.margins.medium,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    heartIcons: {
        width: 25,
        height: 22,
    },
    heartIconsFilled: {
        width: 25,
        height: 22,
        color: Colors.red
    },
    shareIcon: {
        width: 30,
        height: 30,
        color: Colors.white,
        resizeMode: 'contain',
    },
    starCountview: {
        marginLeft: Metrics.margins.default,
        marginTop: 5
    },
    starCounttext: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
        // marginTop: 1,
        marginLeft: 5,
        marginTop: 3
    },
    ratingView: {
        flexDirection: 'row'
    },
    ratingPoint: {
        fontSize: Font.sizes.default,
        color: Colors.default,
        alignItems: 'center',
        textAlign: 'center'
    },
    heartIconFilled: {
        color: Colors.red,
        // fontSize: Font.sizes.regular,
    },
    heartIconView: {
        position: 'absolute',
        top: 20,
        left: 20
    },
    tourImageStyle: {
        width: Dimensions.get('window').width - 70,
        height: 145,
        resizeMode: 'cover',
        // opacity: 0.7,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    tourCategoryStyle: {
        color: Colors.categoryText,
        fontSize: Font.sizes.small,
        marginTop: Metrics.margins.default,
        flexWrap: 'wrap'
    },
    dotStyle: {
        color: Colors.default,
        fontWeight: 'bold',
        fontSize: Font.sizes.title,
        textAlign: 'center',
    },
    tourCategoryView: {
        flexDirection: 'row',
        width: Dimensions.get('window').width - 270,
    },
    headerView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Metrics.margins.medium
    },
    searchStyle: {
        flexDirection: 'row',
        paddingRight: Dimensions.get('window').width - 180
    },
    searchIcon: {
        width: 15,
        height: 15,
        marginTop: 3
    },
    filterIcon: {
        width: 20,
        height: 20,
        marginRight: Metrics.margins.medium,
    },
    messageIcon: {
        width: 20,
        height: 20,
        marginRight: Metrics.margins.medium
    },
    searchItemStyle: {
        fontSize: Font.sizes.medium,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        color: Colors.default,
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: Colors.borderColor,
        marginHorizontal: 0,
    },
    modelView: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(163,175,183, 0.5)',
        // backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modelView1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0, 0.4)',
    },
    modelContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: Metrics.paddings.large,
        marginBottom: Metrics.paddings.extraLarge,
        marginHorizontal: Metrics.margins.large,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    modelContainerLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    textStyle: {
        textAlign: 'center',
        fontSize: Font.sizes.title,
        marginTop: Metrics.margins.preMedium
    },
    clickedTextStyle: {
        textAlign: 'center',
        fontSize: Font.sizes.title,
        marginTop: Metrics.margins.preMedium,
        color: 'blue'
    },
    modelViewStyle: {
        backgroundColor: Colors.white,
    },
    headerModalView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Metrics.margins.medium
    },
    leftArrowIcon: {
        width: 20,
        height: 18,
        marginTop: 2,
        marginLeft: Metrics.margins.default
    },
    filterText: {
        marginVertical: Metrics.margins.default,
        paddingRight: Metrics.margins.default,
    },
    resetView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: Metrics.margins.medium
    },
    resetText: {
        fontSize: Font.sizes.small,
        color: Colors.default,
    },
    filterSpacing: {
        marginLeft: Metrics.margins.default,
    },
    filterStyling: {
        fontSize: Font.sizes.default,
        color: Colors.default,
        fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
    },
    CertifiedView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    qualityIcon: {
        width: 20,
        height: 20,
        marginHorizontal: Metrics.margins.preMedium,
        // marginTop: Metrics.margins.preLarge,
        marginTop: Metrics.margins.preMedium,
        mariginLeft: Metrics.margins.extraLarge,

    },
    doneView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    doneStyle: {
        textAlign: 'center',
        fontSize: Font.sizes.default,
        marginVertical: Metrics.paddings.large,
    },
    nodataText: {
        fontSize: Font.sizes.title,
        color: Colors.default,
        // height: SCREEN_HEIGHT,

    },
    nodataInfo: {
        height: SCREEN_HEIGHT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toastStyle: {
        width: '100%',
        textAlign: 'center',
        color: Colors.white
    },
    searchViewWrap: {
        width: WIDTH,
    },
    searchView: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: Metrics.margins.default,
    },
    locationStyle: {
        marginLeft: Metrics.margins.default,
        fontSize: Font.sizes.default,
        width: '80%'
    },
    iconStyle: {
        width: 23,
        height: 23,
        resizeMode: 'contain',
        right: 10,
        bottom: 5
    },
    iconStyle1: {
        width: 30,
        height: 30,
        right: 10,
        top: 20,
        position: 'absolute',
        // color: 'white',
        // backgroundColor: 'white'
    },
    modelContainerStyle: {
        backgroundColor: Colors.white,
        padding: Metrics.margins.default,
        borderRadius: 10,
        marginHorizontal: Metrics.margins.veryLarge,
        display: 'flex',
        flexDirection: 'column',
    },
    secondaryButtonWhite: {
        borderRadius: 5,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.buttonBorder,
        elevation: 0,
        marginTop: Metrics.margins.large
    },
    buttonTextSecondary: {
        fontSize: Font.sizes.regular,
        textAlign: 'center',
        color: Colors.primary,
        flex: 1,
        justifyContent: 'center',
    },
    closeIconView: {
        position: 'absolute',
        right: 0,
    },
    closeIcon: {
        width: 45,
        height: 45,
        alignItems: 'flex-end'
    },
    notifyCount: {
        fontSize: Font.sizes.regular,
        color: Colors.red
    },
    video: {
        marginHorizontal: Metrics.margins.small,
    },
    noNoificationStyle: {
        fontSize: Font.sizes.regular,
        textAlign: 'center',
        color: Colors.primary,
        justifyContent: 'center',
        width: Dimensions.get('window').width - 100,
        height: 50,
        right: 20,
        bottom: 13
    },
    noificationStyle: {
        marginHorizontal: Metrics.margins.veryLarge,
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('window').width - 150,
    },
    suggestionView: {
        margin: Metrics.margins.large,
        padding: Metrics.paddings.default
    },
    suggestionTextStyle: {
        fontSize: Font.sizes.medium,
        color: Colors.default,
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 27,
    },
};
