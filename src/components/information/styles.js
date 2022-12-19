import { Dimensions } from 'react-native';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export const SCREEN_HEIGHT = Dimensions.get('window').height - 400;
export default {
  nodataView: {
    display: 'flex',
    flex: 1,
    margin: 'auto',
  },
  icon: {
    width: 22,
    height: 22,
    margin: 'auto',
    ginVertical: Metrics.margins.default,
    marginTop: 20,
    marginRight: 30

  },
  postJob: {
    flexDirection: 'row',
    justifycontent: 'space-between',
    ginVertical: Metrics.margins.default,
    margin: 'auto',
    height: 55,
  },
  postJob2: {
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
    marginLeft: 40,
    marginTop: 20,

  },

  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    marginVertical: Metrics.margins.large,
    marginHorizontal: Metrics.margins.default,
  },
  contractContainer: {
    marginHorizontal: Metrics.margins.preLarge,
    marginVertical: Metrics.margins.default,
  },
  cardViewStyle: {
    elevation: 0
  },
  textStyle2: {
    textAlign: 'center',
    fontSize: Font.sizes.medium,
    marginVertical: Metrics.margins.default
  },
  profileTextStyle: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    display: 'flex',
    flex: 1,
    fontSize: Font.sizes.medium,
    color: '#000000',
    justifyContent: 'center',
    marginLeft: 40,
    marginTop: 20,
  },
  viewStyle: {
    height: '100%',
    backgroundColor: 'white'
  }
};
