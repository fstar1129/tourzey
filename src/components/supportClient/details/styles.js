import { Dimensions } from 'react-native';
import Metrics from '../../../themes/main/Theme.Main.Metrics';
import Font from '../../../themes/main/Theme.Main.Font';

export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 400;

export default {
  nodataView: {
    display: 'flex',
    flex: 1,
    // flexDirection: 'column',  
    justifyContent: 'flex-start',
    // height: SCREEN_HEIGHT,   
    // alignItems: 'center',   
  },
  cardItemStyle: {
    marginVertical: Metrics.margins.default,
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerStyle: {
    marginVertical: Metrics.margins.default,
    // paddingRight: Metrics.margins.large,
    // marginHorizontal: Metrics.margins.default,
    // margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 40,
    marginRight: 30
  },
  textStyle: {
    display: 'flex',
    flex: 1,
    fontSize: Font.sizes.title,
    color: '#000000',
    marginLeft: 30,
    paddingTop: 10
  },
  textStyle1: {
    display: 'flex',
    flex: 1,
    fontSize: Font.sizes.default,
    color: '#000000',
    marginLeft: 30,
  },
  logoutImg: {
    height: 10,
    width: 10,
    marginRight: 30,
    marginTop: 20,
  },
  backIcon: {
    width: 20,
    height: 18,
    marginLeft: Metrics.margins.preMedium
  },
};
