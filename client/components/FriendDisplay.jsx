import React, { Component } from 'react';

import Interests from './Interests';

class FriendDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, number, interests } = this.props;
    return (
      <div className="friendDisplay">
        <h4>{name}</h4>
        <h5 style={{ margin: '-15 0', textDecoration: 'underline' }}>Phone Number</h5>
        <p>{number}</p>
        <Interests interests={interests} />
      </div>
    );
  }
}

export default FriendDisplay;
