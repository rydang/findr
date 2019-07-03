import React, { Component } from 'react';

import FriendsDisplay from './FriendsDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Findr</h1>
        <h3>Find new friends today!</h3>
        <FriendsDisplay />
      </div>
    );
  }
}

export default App;
