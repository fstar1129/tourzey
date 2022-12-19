import { Dimensions } from 'react-native';
import Metrics from '../../../themes/main/Theme.Main.Metrics';
import Font from '../../../themes/main/Theme.Main.Font';

export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 400;
export default {
  ScrollViewStyle: {
    height: Dimensions.get('window').height,
    display: 'flex',
    width: Dimensions.get('window').width,
    marginBottom: 55,
    backgroundColor: 'white',
  },
  nodataView: {
    display: 'flex',
    flex: 1,
    // flexDirection: 'column',  
    justifyContent: 'center',
    margin: 'auto',
    // height: SCREEN_HEIGHT,      
  },
  basicView: {
    marginVertical: Metrics.margins.default,
    width: '55%',
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
  cardStyle: {
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1,
    marginLeft: 90
  },
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
};
