import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

export const SCREEN_HEIGHT = Dimensions.get('window').height - 100;
export default {
    backIcon: {
        width: 20,
        height: 18,
        marginLeft: Metrics.margins.preMedium
    },
    scrollContainer: {
        backgroundColor: Colors.white
    },
    mainConatiner: {
        marginHorizontal: Metrics.margins.large,
        marginVertical: Metrics.margins.large,
    },
    tourDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tourName: {
        fontSize: Font.sizes.title,
        color: Colors.default
    },
    tourPrice: {
        fontSize: Font.sizes.title,
        color: Colors.default
    },
    container: {
        marginHorizontal: Metrics.margins.medium,
        marginVertical: Metrics.margins.large
    },
    labelStyle: {
        fontSize: Font.sizes.default,
        color: Colors.labelColor
    },
    textStyle: {
        marginTop: Metrics.margins.small,
        fontSize: Font.sizes.medium,
        color: Colors.default
    },
    modalTextStyle: {
        textAlign: 'center',
        fontSize: Font.sizes.medium,
        marginVertical: Metrics.margins.default
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: Colors.chatLineColor,
        marginVertical: Metrics.margins.default
    },
    textareaStyle: {
        fontSize: Font.sizes.medium,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        color: Colors.primary,
    },
    textLineStyle: {
        borderWidth: 0.5,
        borderColor: Colors.chatLineColor,
    },
    nameViewStyle: {
        marginTop: Metrics.margins.regular,
    },
    tourPriceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Metrics.margins.medium
    },
    tourCount: {
        fontSize: Font.sizes.large,
    },
    price: {
        fontSize: Font.sizes.large,
    },
    buttonView: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-around',
        marginVertical: Metrics.margins.large,
    },
    toastStyle: {
        width: '100%',
        textAlign: 'center',
        color: Colors.white
    },
    tag: {
        paddingTop: Metrics.paddings.default,
        paddingBottom: Metrics.paddings.preMedium,
        textAlign: 'center',
        marginVertical: Metrics.margins.default,
        marginHorizontal: Metrics.margins.preSmall,
        borderRadius: 5,
        backgroundColor: Colors.grey,
    },
    viewStyle: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: Colors.white
    },
    tourImageStyle: {
        width: 314,
        height: 145,
        resizeMode: 'cover',
        opacity: 0.7,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    nameView: {
        display: 'flex',
        flexDirection: 'row',
    },
    starCountview: {
        marginLeft: Metrics.margins.default,
    },
    starCounttext: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
        marginTop: Metrics.margins.small,
    },
    starSpacing: {
        paddingRight: Metrics.paddings.small,
        marginVertical: Metrics.margins.small
    },
    rateReviewView: {
        marginVertical: Metrics.margins.default
    }
};
