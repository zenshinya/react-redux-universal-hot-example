import React from 'react';
import CounterButton from './CounterButton';
import {connectMultireducer} from 'multireducer';
import {incrementDouble} from 'redux/modules/counter';

@connectMultireducer(
  (key, state) => ({count: state.multireducer[key].count}),
  {incrementDouble}
)
export default class DoubleCounterButton extends CounterButton {
  render() {
    const {count, incrementDouble} = this.props; // eslint-disable-line no-shadow
    let {className} = this.props;
    className += ' btn btn-default';
    return (
      <button className={className} onClick={incrementDouble}>
        You have clicked me {count} time{count === 1 ? '' : 's'}.
      </button>
    );
  }
}

