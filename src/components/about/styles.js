import { Dimensions } from 'react-native';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';


export const SCREEN_WIDTH = Dimensions.get('window').width - 200;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 100; 
console.log('SCREEN_HEIGHT', SCREEN_HEIGHT);
export default {
    CardContainerView: {
        margin: Metrics.margins.default,
      },
      nodataView: {
        display: 'flex',
        flexDirection: 'column',  
        justifyContent: 'center',
        height: SCREEN_HEIGHT,   
        alignItems: 'center',   
      },
      nodataText: {
        fontSize: Font.sizes.title,   
      },
};
