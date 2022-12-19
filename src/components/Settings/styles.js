import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import AppStyles from '../../themes/main/Theme.Main.AppStyles'
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 75;
export const SCREEN_WIDTH_NOTIFICATION = Dimensions.get('window').width - 90;
export default {
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
};
