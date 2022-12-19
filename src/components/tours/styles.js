import { Dimensions } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export default {
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
        fontSize: Font.sizes.title, 
        textAlign: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        color: Colors.timeText, 
        flex: 1,   
        justifyContent: 'center',
      },
      buttonTextPrimary: {
        fontSize: Font.sizes.title, 
        textAlign: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        color: Colors.default, 
        flex: 1,   
        justifyContent: 'center',
      },
      segmentView: {
        backgroundColor: 'white', 
        width: '50%',
        alignSelf: 'center',
        marginVertical: Metrics.margins.preMedium  
      },
      backIcon: {
        width: 20,
        height: 18,
        marginLeft: Metrics.margins.preMedium
      },
};
