import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';
import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width - 100;
export default {
    cardViewStyle: {
        elevation: 0
    },
    faqContainer: {
        margin: Metrics.margins.default,
    },
    questionView: {
        width: SCREEN_WIDTH,
    },
    faqContent: {
        paddingTop: Metrics.paddings.noPadding,
        
    },
    ansText: {
        fontSize: Font.sizes.medium
    }
};
