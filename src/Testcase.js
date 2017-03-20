// @flow
import React from 'react'; // eslint-disable-line no-unused-vars
import {connect} from 'react-redux';
import type { Connector, MapDispatchToProps, MapStateToProps } from 'react-redux'
import {bindActionCreators} from 'redux';
import type { Dispatch as ReduxDispatch } from 'redux'

type Action = {
  type: 'ACTION',
  payload: number
}

type MyDispatch = ReduxDispatch<TState, Action>;

type StateProps = {
  b: number,
  d: number,
  onClick: (number) => Action,
  onClick2: (number) => void
}

// This is the state as defined by the reducer(s)
type TState = {
  b: number,
  c: number
}

const mapStateToProps = (state: TState) => {
  return {
    b: state.b,
    d: state.c
  }
}

function asyncCreator(input: number) {
  return (dispatch: MyDispatch, getState: () => TState): void => {
    dispatch({
      type: 'ACTION',
      payload: input
    });
  }
}

function syncCreator(input: number) {
  return {
    type: 'ACTION',
    payload: input
  }
}

const mapDispatchToProps = (dispatch: MyDispatch) => {
  return {
    onClick: bindActionCreators(syncCreator, dispatch),
    onClick2: (...args) => dispatch(asyncCreator(...args))
  }
}

class Testcase extends React.Component {
  render(){
    const aap = this.props.b + this.props.d;
    return (<span onClick={this.props.onClick2}>Hello {aap}!</span>);
  }
}

const connector: Connector<{}, StateProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(Testcase);
