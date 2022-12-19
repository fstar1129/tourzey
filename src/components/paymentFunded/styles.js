import { Dimensions } from 'react-native';
import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

export const SCREEN_WIDTH = Dimensions.get('window').width - 140;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_HEIGHT_FULL = Dimensions.get('window').height;

export default {
  scrollContainer: {
    backgroundColor: Colors.allpageBg,
    height: SCREEN_HEIGHT_FULL,
  },
  profileContainer: {
    margin: Metrics.margins.default,
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    marginTop: Metrics.margins.medium,
  },
  labelStyle: {
    textAlign: 'center',
    fontSize: Font.sizes.regular,
    paddingHorizontal: Metrics.paddings.default,
    paddingVertical: Metrics.paddings.veryLarge,
  },
  postJob: {
    marginVertical: Metrics.margins.large,
    width: '50%',
    margin: 'auto',
    height: 55,
  },
  nodataView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
