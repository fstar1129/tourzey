import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 200;

export default {
    mainContainer: {
        backgroundColor: Colors.white
    },
    container: {
        marginVertical: Metrics.margins.large,
        marginHorizontal: Metrics.margins.preLarge,
    },
    headerContainer: {
        marginVertical: Metrics.margins.medium,
        marginHorizontal: Metrics.margins.veryLarge,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchItemStyle: {
        fontSize: Font.sizes.medium,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        color: Colors.default
    },
    searchLineStyle: {
        borderWidth: 0.5,
        borderColor: Colors.lineColor,
    },
    tourImageStyle: {
        width: 157,
        height: 149,
        resizeMode: 'cover',
        // opacity: 0.7,
        // flex: 1,
    },
    textStyle: {
        position: 'absolute',
        textAlign: 'center',
        fontSize: Font.sizes.large,
        color: Colors.white
    },
    imageView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: Metrics.margins.small,
    },
    tourImageView: {
        flexDirection: 'column',
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 20,
        height: 18,
        marginLeft: Metrics.margins.preMedium
    },
    mainCategoryButton: {
        paddingHorizontal: Metrics.paddings.default,
        paddingVertical: Metrics.paddings.small,
        borderRadius: 20,
        height: 25,
    },
    viewStyle: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: Colors.white
      },
};
