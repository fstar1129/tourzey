import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const WIDTH = Dimensions.get('window').width;


export default {
    dropDownStyle: {
        alignSelf: 'center',
        top: 5,
        bottom: 5,
        height: 15,
        width: 15
    },
    mainContainer: {
        // backgroundImage: Images.form_bg.form_bg,
        backgroundColor: Colors.white
    },
    iconStyle: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        // mariginLeft: 150,
        paddingLeft: 50
    },
    tourImage: {
        width: WIDTH,
        height: 222,
        resizeMode: 'cover',
    },
    mainView: {
        flexDirection: 'row'
    },
    backIcon: {
        width: 20,
        height: 16,
    },
    starCountview: {
        marginLeft: Metrics.margins.default,
        marginTop: 2
    },
    starCounttext: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
        // marginTop: 1,
        marginLeft: 5,
        marginTop: Metrics.margins.noMargin
    },
    backIconView: {
        position: 'absolute',
        top: 20,
        left: 20
    },
    container: {
        marginHorizontal: Metrics.margins.large,
        marginVertical: Metrics.margins.large,
    },
    infoView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Metrics.margins.default,
    },
    nameViewWrap: {
        width: SCREEN_WIDTH,
    },
    nameView: {
        display: 'flex',
        flexDirection: 'row',
    },
    tourName: {
        fontSize: Font.sizes.title,
        color: Colors.default,
        fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
    },
    tourCategoryView: {
        flexDirection: 'row',
        marginTop: Metrics.margins.small
    },
    tourCategoryStyle: {
        color: Colors.categoryText,
        fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
        fontSize: Font.sizes.small
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
    },
    tourDescView: {
        marginVertical: Metrics.margins.default,
        flexDirection: 'column'
    },
    tourDesc: {
        fontSize: Font.sizes.small,
        color: Colors.default,
        paddingRight: 10
    },
    guideViewWrap: {
        width: Dimensions.get('window').width - 250,
    },
    userImage: {
        width: 65,
        height: 65,
        borderRadius: 50
    },
    nameSpacing: {
        flexDirection: 'column',
        marginLeft: Metrics.margins.default,
        width: Dimensions.get('window').width - 250,
        WordBreak: 'break-word',
        whiteSpace: 'inherit'
    },
    guideView: {
        flexDirection: 'row',
        // marginTop: Metrics.margins.small
    },
    nameStyling: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
        textDecorationLine: 'underline',
        marginRight: Metrics.margins.default,

    },
    qualityHighIcon: {
        width: 18,
        height: 18,
        marginTop: 3
    },
    locationStyle: {
        color: Colors.categoryText,
        fontSize: Font.sizes.default,
        marginTop: Metrics.margins.small,
    },
    categoryView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        // alignItems: 'center',
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
    startIcon: {
        width: 12,
        height: 11,
        marginTop: Metrics.margins.small
    },
    dateAndTimeView: {
        flexDirection: 'row',
        marginVertical: Metrics.margins.medium,
        justifyContent: 'space-around'
    },
    calendarView: {
        flexDirection: 'row',
    },
    calendarIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
        left: 0
    },
    calendarIconView: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    dateTextStyle: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
        marginLeft: Metrics.margins.default
    },
    calendarViewStyle: {
        flexDirection: 'row',
        marginTop: 5
    },
    clockViewStyle: {
        flexDirection: 'row',
        marginTop: 5
    },
    clockView: {
        flexDirection: 'row',
    },
    shareView: {
        flexDirection: 'row',
        marginTop: 5
    },
    clockIcon: {
        width: 25,
        height: 25,
        marginRight: 15,
        left: 0
    },
    clockIconView: {
        width: 25,
        height: 25,

    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: Colors.buttonBorder,
        marginHorizontal: Metrics.margins.large,
        marginVertical: Metrics.margins.large,
    },
    addView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    minusIconView: {
        width: 40,
        height: 40,
        padding: 17,
        borderRadius: 30,
        borderColor: '#E6E6E6',
        borderWidth: 1,
    },
    minusIcon: {
        width: 10,
        height: 2,
        alignSelf: 'center'
    },
    plusIconView: {
        width: 40,
        height: 40,
        padding: 13,
        borderRadius: 30,
        borderColor: '#E6E6E6',
        borderWidth: 1,
    },
    plusIcon: {
        width: 12,
        height: 12,
        alignSelf: 'center',
        alignItems: 'center'
    },

    countView: {
        marginHorizontal: Metrics.margins.large
    },
    countText: {
        fontSize: Font.sizes.medium,
        color: '#707070'
    },
    toastStyle: {
        width: '100%',
        textAlign: 'center',
        color: Colors.white
    },
    textCenter: {
        width: '100%',
        alignItems: 'center',
        marginVertical: Metrics.margins.default,
    },
    tagView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
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
    tourDateText: {
        marginRight: 10
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
    heartIconFilled: {
        color: Colors.red,
    },
    homeIcon: {
        color: Colors.default,
        marginRight: 10
    },
    carIcon: {
        width: 50,
        height: 22,
        marginRight: 10,
        top: 5
    },
    tickIcon: {
        color: Colors.green,
        marginRight: 10
    },
    wrongIcon: {
        color: Colors.red,
        marginRight: 10
    },
    tagButton: {
        backgroundColor: Colors.default, //F3F3F3
        height: 35,
        // borderRadius: 25,
        marginVertical: 5
    },
    lanText3: {
        textAlign: 'center',
        fontSize: Font.sizes.medium,
        color: Colors.white, //000000
    },
};
