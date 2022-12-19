import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 130;
export const SCREEN_WIDTH_MSG = Dimensions.get('window').width - 50;
export const SCREEN_FULLWIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
const React = require('react-native');

const { StyleSheet } = React;
export default {
    messageContainerView: {
        padding: Metrics.paddings.default,
        backgroundColor: Colors.white,
    },
    userIcon: {
        width: 30,
        height: 30,
        right: 15,
    },
    contentStyle: {
        paddingBottom: 25,
    },
    inputPadding: {
        paddingRight: Metrics.paddings.default,
        fontSize: Font.sizes.medium,
    },
    textareaStyle: {
        fontSize: Font.sizes.regular,
        color: Colors.default,
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : Metrics.paddings.default,
        paddingRight: Metrics.paddings.default,
        paddingBottom: Metrics.paddings.default,
        paddingLeft: Metrics.paddings.default,
        textAlignVertical: 'center',
    },
    headerTitle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
    },
    name: {
        color: Colors.primary,
        fontSize: Font.sizes.regular,
        textAlign: 'center'
    },
    groupName: {
        fontSize: Font.sizes.small,
        color: Colors.textDisabled,
        textAlign: 'center'
    },
    messageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        width: '100%',
    },
    messageView: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.grey,
        flexDirection: 'row',
        marginHorizontal: Metrics.margins.small,
        marginVertical: Metrics.margins.default,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 45,
    },
    camera: {
        color: Colors.darkGray,
        marginHorizontal: Metrics.margins.small,
        marginVertical: Metrics.margins.default,
    },
    video: {
        color: Colors.darkGray,
        marginHorizontal: Metrics.margins.small,
        marginVertical: Metrics.margins.default,
    },
    microphone: {
        padding: 7,
        backgroundColor: Colors.darkGray,
        color: Colors.white,
        borderWidth: 1,
        borderRadius: 30,
        width: 36,
        height: 36,
        right: 5,
        textAlign: 'center',
        borderColor: Colors.grey,
    },
    userView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 50,
    },
    userImage: {
        width: 40,
        height: 40,
        overflow: 'hidden',
        borderRadius: Platform.OS === 'ios' ? 20 : 20,
        marginRight: Metrics.margins.default,
    },
    userImageHidden: {
        width: 40,
        height: 40,
        marginRight: Metrics.margins.default,
        opacity: 0,
    },
    receiveMsgFirst: {
        color: Colors.default,
        fontSize: Font.sizes.default,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 25,
        backgroundColor: Colors.msgBg,
        paddingHorizontal: Metrics.paddings.medium,
        paddingVertical: Metrics.paddings.default,
        marginVertical: Metrics.margins.small
    },
    receiveMsgAll: {
        color: Colors.default,
        fontSize: Font.sizes.default,
        borderRadius: 25,
        backgroundColor: Colors.msgBg,
        paddingHorizontal: Metrics.paddings.medium,
        paddingVertical: Metrics.paddings.default,
        marginVertical: Metrics.margins.small,
        mariginBottom: 200
    },
    primaryButtonMain: {
        flex: 1,
        paddingHorizontal: Metrics.paddings.default,
        paddingVertical: Metrics.paddings.medium,
        borderRadius: 15,
        marginHorizontal: Metrics.margins.small,
    },
    deliverText: {
        color: Colors.grey,
        fontSize: Font.sizes.small,
        alignSelf: 'flex-end',
        fontWeight: 'normal',

    },
    sendMsgView: {
        paddingVertical: Metrics.paddings.default,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // marginRight: 50,        
    },
    sendMsgContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    msgIcon: {
        width: 13,
        height: 18,
        position: 'absolute',
        marginTop: Metrics.margins.small,
        bottom: 4,
        left: -5,
        transform: [{ rotate: '10deg' }]
    },
    msgSentIcon: {
        width: 13,
        height: 18,
        position: 'absolute',
        marginTop: Metrics.margins.small,
        bottom: 0,
        right: 0,
        transform: [{ rotate: '-10deg' }]
    },
    toastStyle: {
        width: '100%',
        textAlign: 'center',
        // color: '#FFF'
        color: 'black'
    },
    footerStyle: {
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1
    },
    footerText: {
        fontSize: 14,
        color: 'red',
        textAlign: 'center'
    },
    backIconViewStyle: {
        width: 45,
        height: 25,
    },
    receviedMsgView: {
        marginLeft: 50
    }
};
