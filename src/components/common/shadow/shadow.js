import { Dimensions } from 'react-native';
import Colors from '../../../themes/main/Theme.Main.Colors';
import Metrics from '../../../themes/main/Theme.Main.Metrics';

export const SCREEN_WIDTH = Dimensions.get('window').width - 40;
export const shadowOpt = {
    width: SCREEN_WIDTH,   
    height: 10,
    color: Colors.white,
    border: 1,
    radius: 5,
    opacity: 0.4,
    x: 0,
    y: 3,
    style: { marginTop: Metrics.margins.large, marginLeft: Metrics.margins.large }
};
