import { Dimensions, Platform } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

export const SCREEN_HEIGHT = Dimensions.get('window').height - 150;
export const SCREEN_WIDTH = Dimensions.get('window').width - 150;


export default {
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
    nameSpacing: {
        marginLeft: Metrics.margins.medium,
    },
    nameStyling: {
        fontSize: Font.sizes.title,
        color: Colors.default,
        fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
    },
    earningsView: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // marginRight: '10%'
    },
    earningAmount: {
        fontSize: Font.sizes.title,
        color: Colors.default,
        marginHorizontal: Metrics.margins.default
    },
    tourImageStyle: {
        width: Dimensions.get('window').width,
        height: 100,
        resizeMode: 'cover',
    },
    tourCategoryStyle: {
        color: Colors.timeText,
        fontStyle: Platform.OS === 'ios' ? 'normal' : 'AktivGrotesk-Regular',
        fontSize: Font.sizes.default,
        marginTop: Metrics.margins.default
    },
    dotStyle: {
        color: Colors.default,
        fontWeight: 'bold',
        fontSize: Font.sizes.title,
        textAlign: 'center'
    },
    tourCategoryView: {
        flexDirection: 'row',
        marginTop: Metrics.margins.small
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#ECECEC',
        marginHorizontal: Metrics.margins.veryLarge,
        marginVertical: Metrics.margins.default
    },
      leftArrowIcon: {
          width: 20,
          height: 18,
          marginTop: 2,
          marginLeft: Metrics.margins.default
      },
      backIcon: {
        width: 20,
        height: 18,
        marginLeft: Metrics.margins.preMedium
      },
      code: {
          fontSize: Font.sizes.medium,
          color: Colors.categoryText,
          marginLeft: Metrics.margins.preMedium
      },
      tourImageView: {
        marginVertical: Metrics.margins.default
      },
      tourDescView: {
       
        marginVertical: Metrics.margins.default,
        marginHorizontal: Metrics.margins.default
      },
      closeIconView: {
        position: 'absolute',
        top: 20,
        right: 10,
      },
      closeIcon: {
        width: 40,
        height: 40,
      },
      contractStatusView: {
        display: 'flex',
        flexDirection: 'column'
      },
      mainView: {
        flexDirection: 'row'
      },
      buttonView: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-around',
        marginVertical: Metrics.margins.large,
        marginHorizontal: Metrics.margins.default,
      },
      textStyle: {
        textAlign: 'center',
        fontSize: Font.sizes.medium,
        marginVertical: Metrics.margins.default,
        lineHeight: 30
      },
      modalConentStyle: {
        textAlign: 'center',
        fontSize: Font.sizes.default,
        marginVertical: Metrics.margins.default,
        fontStyle: 'italic',
        lineHeight: 25
      },
      nodataText: {
        fontSize: Font.sizes.title,
        color: Colors.default
    },
    nodataInfo: {
        height: SCREEN_HEIGHT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toastStyle: {
        width: '100%',
        textAlign: 'center',
        color: Colors.white
    },
    backIconViewStyle: {
      width: 45,
      height: 25,
    },

};
