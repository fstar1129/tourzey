import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export default {
    plusIcon: {     
        fontSize: Font.sizes.h2,
         color: Colors.white,
         textAlign: 'center',
         marginTop: Metrics.margins.preMedium,
       }, 
       plusIconView: {
         position: 'absolute',
         right: 20,
         bottom: 20
       },
       lineStyle: {
        borderWidth: 1,
        borderColor: Colors.buttonBorder,
        margin: Metrics.margins.small,
        textAlign: 'center',
      },
      tochableButton: {
        flex: 1,
      },
      secondaryButtonWhite: {
        flex: 1,
        paddingHorizontal: Metrics.paddings.noPadding,
        paddingVertical: Metrics.paddings.noPadding, 
        marginHorizontal: Metrics.margins.small,
        backgroundColor: Colors.white,   
        borderColor: 'white',
        elevation: 0,   
      },
      buttonTextSecondary: {
        fontSize: Font.sizes.default, 
        textAlign: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        color: Colors.default, 
        flex: 1,   
        justifyContent: 'center',
      },
      buttonTextPrimary: {
        fontSize: Font.sizes.default, 
        textAlign: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        color: Colors.primary, 
        flex: 1,   
        justifyContent: 'center',
      },
      segmentView: {
        backgroundColor: 'white', 
        borderWidth: 1, 
        borderColor: Colors.buttonBorder, 
        width: '88%',
        alignSelf: 'center',
        marginTop: Metrics.margins.large,
        marginBottom: Metrics.margins.small,     
      },
      addjobIcon: {
        width: 55,
        height: 55,
      }
};
