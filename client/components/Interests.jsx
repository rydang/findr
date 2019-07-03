import React, { Component } from 'react';

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { interests } = this.props;
    return (
      <div>
        <h5 style={{ margin: '-15 0', textDecoration: 'underline' }}>Interests</h5>
        <p className="interests">{interests.join(', ')}</p>
      </div>
    );
  }
}

export default Interests;
