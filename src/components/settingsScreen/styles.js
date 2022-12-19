import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import AppStyles from '../../themes/main/Theme.Main.AppStyles';
import Font from '../../themes/main/Theme.Main.Font';
import { colors } from 'react-native-elements';

export const SCREEN_WIDTH = Dimensions.get('window').width - 75;
export const SCREEN_WIDTH_NOTIFICATION = Dimensions.get('window').width - 90;
export default {
    galleryStyle: {
        width: 72,
        height: 72,
        overflow: 'hidden',
        borderRadius: Platform.OS === 'ios' ? 35 : 50,
        marginRight: Metrics.margins.default,
    },
    galleryStyle1: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 30,
        top: -15,
        overflow: 'hidden',
    },
    notification: {
        margin: Metrics.margins.default,
    },
    settingsContainer: {
        paddings: Metrics.paddings.default,
    },
    cardViewStyle: {
        elevation: 0
    },
    notificationView: {
        marginBottom: Metrics.margins.large
    },
    logoutImg: {
        width: 30,
        height: 30,
        marginLeft: 15,
        opacity: 0.6
    },
    logoutView: {
        flexDirection: 'row',
        fontSize: Font.sizes.default,
        paddingTop: 5,
        paddingBottom: 5
    },
    logoutText: {
        color: Colors.sidebarText,
        fontWeight: 'normal',
        paddingLeft: 5,
        paddingTop: 3,
    },
    // notificationView: {
    //     width: SCREEN_WIDTH,  
    // },
    questionView: {
        width: SCREEN_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: Metrics.paddings.small,
    },
    questionViewMain: {
        width: SCREEN_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: Metrics.paddings.small,
    },
    settingsContent: {
        paddingTop: Metrics.paddings.noPadding,
        paddingLeft: Metrics.paddings.veryLarge,
    },
    textDefault: {
        color: Colors.default
    },
    checkboxCheck: {
        paddingRight: Metrics.paddings.default,
    },
    textStyle: {
        // position: 'absolute',
        textAlign: 'center',
        fontSize: Font.sizes.medium,
        color: Colors.black,
        margin: Metrics.margins.preLarge

    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: Colors.lineColor,
        marginLeft: 90
    },
    itemView: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        mariginLeft: 150
    },
    largeTextStyle: {
        fontSize: Font.sizes.title,
        margin: Metrics.margins.medium,
        color: Colors.black,
    },
    iconStyle: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        // mariginLeft: 150,
        paddingLeft: 50
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: Platform.OS === 'ios' ? 25 : 50,
        marginRight: Metrics.margins.default,
    },
    editIcon: {
        width: 30,
        height: 30,
        borderRadius: Platform.OS === 'ios' ? 15 : 30,
    },
    containerViewStyle: {
        backgroundColor: 'white'
    }

};
