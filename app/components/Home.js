// @flow
import React, { Component, Fragment } from 'react';
import { Text } from 'react-desktop/macOs';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Fragment>
        <Text>Home1</Text>
      </Fragment>
    );
  }
}
