import Colors from '../../themes/main/Theme.Main.Colors';
import Metrics from '../../themes/main/Theme.Main.Metrics';
import Font from '../../themes/main/Theme.Main.Font';

const React = require('react-native');

const { StyleSheet } = React;

export default {
  itemMargin: {
    marginLeft: Metrics.margins.noMargin,
    fontSize: Font.sizes.default,
  },
  inputPadding: {
    paddingRight: Metrics.paddings.default,
    fontSize: Font.sizes.medium,
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    marginTop: Metrics.margins.large,
    marginHorizontal: Metrics.margins.default,
  },
  checkBoxItem: {
    color: '#fff'
  },
  ageLabel: {
    paddingHorizontal: Metrics.paddings.small,
    fontSize: Font.sizes.default,
    paddingLeft: 37,
    paddingTop: Metrics.paddings.large, 
    color: Colors.default,
    width: '100%'
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.paddings.default,
    paddingRight: Metrics.paddings.medium,
    marginVertical: Metrics.margins.small,
    marginLeft: Metrics.margins.small,
    marginRight: Metrics.margins.medium,
  },
  checkboxCheck: {
    marginRight: Metrics.margins.default,
  },
  checkBoxLabel: {
    paddingHorizontal: Metrics.paddings.small,
    fontSize: Font.sizes.default,
    paddingTop: Metrics.paddings.noPadding,
    color: Colors.default,
    width: '100%'
  },
  checkBoxLink: {
    color: Colors.primary,
    fontSize: Font.sizes.default,
  },
  signUp: {
    marginVertical: Metrics.margins.medium,
    marginHorizontal: Metrics.margins.large,
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
  eyeAndriodStyle: {
    right: 40,
    top: 40,
    position: 'absolute',
    zIndex: 2
  },
  buttonTextDisabled: {
    fontSize: Font.sizes.medium,
    textAlign: 'center',
    color: Colors.white,
    flex: 1,
    justifyContent: 'center',
  },
};
