import { Dimensions } from 'react-native';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 400;
export default {
  nodataView: {
    display: 'flex',
    flex: 1,
    // flexDirection: 'column',  
    justifyContent: 'center',
    margin: 'auto',
    // height: SCREEN_HEIGHT,      
  },
  postJob: {
    marginVertical: Metrics.margins.default,
    margin: 'auto',
    height: 55,
  },
  textStyle: {
    display: 'flex',
    flex: 1,
    fontSize: Font.sizes.title,
    color: '#000000',
    justifyContent: 'center',
    marginLeft: 90,
    marginTop: 20,

  },
  contractContainer: {
    marginHorizontal: Metrics.margins.preLarge,
    marginVertical: Metrics.margins.default,
  },
  cardViewStyle: {
    elevation: 0
  },
  scrollStyle: {
    backgroundColor: 'white'
  },
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
};
