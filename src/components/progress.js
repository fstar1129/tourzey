import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Progress, ActionSheet, Modal, List } from 'antd-mobile';

export default class progress extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      percent: 40,
    };
  }

  onAdd = () => {
    let p = this.state.percent + 10;
    if (this.state.percent >= 100) {
      p = 0;
    }
    this.setState({ percent: p });
  }

  render() {
    return (
        // <Text>Hi</Text>
          <Progress
               percent={40} position="normal" unfilled={false} size={70} percent={20}
                appearTransition
          />
    );
  }
}

const style = {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
