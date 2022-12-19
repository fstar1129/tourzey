import { Dimensions, Platform } from 'react-native';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import Colors from '../../themes/main/Theme.Main.Colors';


export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 400;
export default {
    seenCss: {
        backgroundColor: Colors.white
    },
    unseenCss: {
        backgroundColor: '#D6EAFA'
    },
    buttonStyle: {
        height: 20,
        marginRight: 0,
    },
    labelStyle: {
        fontSize: Font.sizes.default,
        color: Colors.labelColor,
        marginRight: 20,
        paddingTop: 10
    },
    buttonStyle: {
        height: 20,
        marginRight: 0,
        width: 80
    },
    bodyStyle: {
        fontSize: Font.sizes.medium,
        color: Colors.labelColor,
        marginLeft: 30,
    },
    buttonText: {
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? -5 : 0
    },
    viewStyle: {
        backgroundColor: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    ScrollViewStyle: {
        height: Dimensions.get('window').height,
        display: 'flex',
        width: Dimensions.get('window').width,
    },
    cardItemStyle: {
        marginVertical: Metrics.margins.default,
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // height: 55,
    },
    cardItemStyle1: {
        // marginVertical: Metrics.margins.default,
        margin: 'auto',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // height: 55,
    },
    buttonView: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 15,
        paddingBottom: 5
    },
    textStyle: {
        display: 'flex',
        flex: 1,
        fontSize: Font.sizes.title,
        color: '#000000',
        justifyContent: 'center',
        marginLeft: 30,
        paddingTop: 10

    },
    dropDownStyle: {
        height: 10,
        width: 10,
        marginRight: 30,
        marginTop: 15,
    },
    backIcon: {
        width: 20,
        height: 18,
        marginLeft: Metrics.margins.preMedium
    },
    nodataText: {
        fontSize: Font.sizes.title,
        color: 'balck'
    },
    nodataInfo: {
        height: SCREEN_HEIGHT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderStyle: {
        borderBottomColor: '#D1D1D1',
        borderBottomWidth: 1,
        marginLeft: 30
    },
    backIconViewStyle: {
        width: 45,
        height: 25,
    }
};
