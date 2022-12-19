import { Dimensions } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 130;
export const SCREEN_FULLWIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_HEIGHT_FULL = Dimensions.get('window').height;

export default {
    buttonView: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-around',
        marginTop: Metrics.margins.medium,
    },
    titleView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datecardView: {
        width: '48%',
        elevation: 0,
        borderColor: Colors.primary,
    },
    titleStyle: {
        color: Colors.default,
        fontSize: 13,
    },
    profileContainer: {
        marginHorizontal: Metrics.margins.large,
        marginVertical: Metrics.margins.medium
    },
    scrollContainer: {
        backgroundColor: Colors.allpageBg,
        height: SCREEN_HEIGHT_FULL,
    },
    infoView: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameViewWrap: {
        width: SCREEN_WIDTH,
    },
    nameView: {
        display: 'flex',
        flexDirection: 'row',
    },
    userImage: {
        width: 35,
        height: 35,
        borderRadius: 30
    },
    nameSpacing: {
        marginLeft: Metrics.margins.default,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameStyling: {
        fontSize: Font.sizes.medium,
        color: Colors.default,
    },
    moodStyle: {
        fontSize: Font.sizes.medium,
        color: Colors.primary,
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
        marginRight: Metrics.margins.large,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeIcon: {
        color: Colors.primary,
        alignSelf: 'flex-end',
    },
    data: {
        color: Colors.primary,
        alignSelf: 'center'
    }
};
