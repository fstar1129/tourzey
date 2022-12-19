import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions, Platform } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 500;
export const SCREEN_HEIGHT_FULL = Dimensions.get('window').height;
export default {
    scrollContainer: {
        backgroundColor: Colors.allpageBg,
        height: SCREEN_HEIGHT_FULL,
    },
    contractContainer: {
        marginHorizontal: Metrics.margins.preLarge, 
        marginVertical: Metrics.margins.default,
    },
    labelStyle: {
        fontSize: Font.sizes.default,
        color: Colors.default,
        textAlign: 'center',
        padding: Metrics.paddings.default,
        // fontWeight: 'bold',
    },
    jobPostLabel: {
        fontSize: Font.sizes.regular,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: Metrics.margins.default,
    },
    cardViewStyle: {
        elevation: 0
    },
    cardStyle: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: Metrics.paddings.default,
        paddingRight: Metrics.paddings.default,
    },
      itemStyle: {
        borderColor: 'transparent'
      },
      textareaStyle: {
        fontSize: Font.sizes.medium,
        paddingBottom: 0,
        paddingLeft: 0,
        color: '#000000',
        height: SCREEN_HEIGHT,
      },
      nameStyle: {
        fontSize: Font.sizes.medium,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        color: Colors.primary,
      },
      textcountView: {
        justifyContent: 'flex-end',
        textAlign: 'right',
        color: '#dcdcdc',
        fontSize: 15
    },
    backIcon: {
      width: 20,
      height: 18,
      marginLeft: Metrics.margins.preMedium,
    },
    postJob: {
        marginVertical: Metrics.margins.default, 
        width: '55%',
        margin: 'auto',   
        height: 55,
        alignSelf: 'center'
      },
      inputHeight: {
        lineHeight: Platform.OS === 'ios' ? 0 : 1,
        height: 26,
        fontSize: Font.sizes.medium,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        color: '#000000',
      },
      errorMessage: {
        color: Colors.red,
        fontSize: Font.sizes.default,
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: Metrics.margins.small,
      },
};