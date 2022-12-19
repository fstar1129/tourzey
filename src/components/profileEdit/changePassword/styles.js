import Colors from '../../../themes/main/Theme.Main.Colors';
import Metrics from '../../../themes/main/Theme.Main.Metrics';
import Font from '../../../themes/main/Theme.Main.Font';

export default {
  viewStyle: {
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  profileContainer: {
    marginTop: Metrics.margins.veryLarge,
    marginLeft: Metrics.margins.medium,
    marginRight: Metrics.margins.medium,
  },
  textHeader: {
    fontSize: Font.sizes.medium,
    color: Colors.darkGray,
    paddingLeft: 5,
    marginTop: 5
  },
  textinputStyle: {
    height: 40,
    fontSize: Font.sizes.regular,
    paddingRight: 0,
  },
  backIcon: {
    width: 22,
    height: 20,
    marginLeft: Metrics.margins.preMedium
  },
  errorMessage: {
    color: Colors.red,
    fontSize: Font.sizes.default,
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: Metrics.margins.small,
  },
};
