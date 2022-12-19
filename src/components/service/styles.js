import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
export const SCREEN_FULLWIDTH = Dimensions.get('window').width - 100;
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export default {
    scrollContainer: {
        backgroundColor: Colors.allpageBg,
    },
    cardViewStyle: {
        elevation: 0
    },
    notification: {
        margin: Metrics.margins.default,
    },
    settingsContainer: {
        paddings: Metrics.paddings.default,
    },
    questionView: {
        width: SCREEN_WIDTH,
    },
    titleText: {
        color: Colors.primary,
        fontSize: Font.sizes.medium
    },
    settingsContent: {
        paddingTop: Metrics.paddings.noPadding,
        paddingLeft: 25,
    },
    notificationView: {
        marginBottom: Metrics.margins.large
    },
    textPrimary: {
        color: Colors.primary,
        paddingBottom: Metrics.paddings.default,
    },
    textDefault: {
        color: Colors.default,
        paddingBottom: Metrics.paddings.default,
    },
    textareaView: {
        width: SCREEN_FULLWIDTH,
        paddingLeft: 0,
        paddingRight: 0,
        paddingVertical: Metrics.paddings.small
    },
    subText: {
        color: Colors.primary,
        alignSelf: 'flex-end'
    },
    Content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    alert: {
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.red,
        fontSize: Font.sizes.default
    },
    alertView: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    otherText: {
        marginLeft: Metrics.margins.default,
        marginRight: Metrics.margins.large
    }
};
