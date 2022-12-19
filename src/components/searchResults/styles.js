import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const WIDTH = Dimensions.get('window').width - 70;
console.log('WIDTH', WIDTH);
export default {
    backgroundVideo: {
        // flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    scrollContainer: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: Colors.white
    },
    homeContainer: {
        marginHorizontal: Metrics.margins.default,
        marginVertical: Metrics.margins.medium,
    },
    mainView: {
        marginHorizontal: Metrics.margins.large,
        display: 'flex',
    },
    infoView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Metrics.margins.default
    },
    starCounttext: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
        marginLeft: 5,
        marginTop: Metrics.margins.noMargin
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
        borderRadius: 50,
    },
    textView: {
        width: Dimensions.get('window').width - 200,
        WordBreak: 'break-word',
    },
    nameSpacing: {
        flexDirection: 'column',
        marginLeft: Metrics.margins.default,
        width: Dimensions.get('window').width - 270,
        WordBreak: 'break-word',
        whiteSpace: 'inherit'
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // lineHeight: 25,
        // height: 55
    },
    guideView: {
        flexDirection: 'row',
        // marginTop: Metrics.margins.small
    },
    qualityHighIcon: {
        width: 18,
        height: 18,
        marginTop: 3,
        marginLeft: 5
    },
    nameStyling: {
        fontSize: Font.sizes.medium,
        fontWeight: 'bold',
        color: Colors.default
    },
    addressStyling: {
        color: Colors.categoryText,
        fontSize: Font.sizes.default,
        marginTop: Metrics.margins.small,
    },
    earningsView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // marginRight: Metrics.margins.medium
    },
    earningAmount: {
        fontSize: Font.sizes.title,
        color: Colors.default,
        marginTop: Metrics.margins.default
    },
    heartIcons: {
        width: 25,
        height: 22,
    },
    heartIconView: {
        position: 'absolute',
        top: 20,
        right: 30
    },
    tourImageStyle: {
        width: WIDTH,
        height: 145,
        resizeMode: 'cover',
        // opacity: 0.7,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    tourCategoryStyle: {
        color: Colors.categoryText,
        fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
        fontSize: Font.sizes.small
    },
    dotStyle: {
        color: Colors.default,
        fontWeight: 'bold',
        fontSize: Font.sizes.medium,
        textAlign: 'center'
    },
    tourCategoryView: {
        flexDirection: 'row'
    },
    headerView: {
        flexDirection: 'row'
    },
    searchIcon: {
        width: 15,
        height: 15,
        marginLeft: Metrics.margins.medium,
        marginTop: Metrics.margins.large,
        marginRight: Metrics.margins.small
    },
    filterIcon: {
        width: 20,
        height: 20,
        marginRight: Metrics.margins.medium,
        marginTop: Metrics.margins.large,
        marginLeft: Metrics.margins.default
    },
    messageIcon: {
        width: 20,
        height: 20,
        marginTop: Metrics.margins.large,
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
    //  qualityIcon: {
    //     width: 20,
    //     height: 20,
    //     marginHorizontal: Metrics.margins.preMedium,
    //     marginTop: Metrics.margins.preLarge,
    // },
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


    },
    nodataInfo: {
        height: SCREEN_HEIGHT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    startIcon: {
        width: 16,
        height: 14,
        marginTop: Metrics.margins.small
    },
    CertifiedView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    categoryView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // marginTop: Metrics.margins.small
    },
    ratingView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    ratingView1: {
        flexDirection: 'row',
    },
    ratingPoint: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
        alignItems: 'center',
        textAlign: 'center'
    },
    textCenter: {
        width: '100%',
        alignItems: 'center',
        marginVertical: Metrics.margins.medium,
    },
    tagView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    mainCategoryButton: {
        paddingHorizontal: Metrics.paddings.default,
        paddingVertical: Metrics.paddings.small,
        borderRadius: 20,
        marginHorizontal: Metrics.margins.small,
        marginVertical: Metrics.margins.small,
        height: 25,
    },
    tourNameView: {
        justifyContent: 'flex-start',
        marginTop: Metrics.margins.default,
        flexDirection: 'row'
    },
    tourNameStyling: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
    },
    container: {
        marginHorizontal: Metrics.margins.small,
    },
    categoryButton: {
        flex: 1,
        paddingHorizontal: Metrics.paddings.small,
        paddingVertical: Metrics.paddings.small,
        borderRadius: 20,
        marginLeft: Metrics.margins.veryLarge,
        marginVertical: Metrics.margins.small,
        height: 25,
    },
    toastStyle: {
        // width: '100%',
        textAlign: 'center',
        color: Colors.white,
    },
    backIcon: {
        width: 20,
        height: 18,
        marginLeft: Metrics.margins.preMedium
    },
    filterIconStyle: {
        width: 20,
        height: 18,
        marginRight: Metrics.margins.preMedium
    },
    heartIconFilled: {
        color: Colors.red,
        // fontSize: Font.sizes.regular,
    },
    clickedTextStyle: {
        textAlign: 'center',
        fontSize: Font.sizes.title,
        marginTop: Metrics.margins.preMedium,
        color: 'blue'
    },
    video: {
        marginHorizontal: Metrics.margins.small,
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
