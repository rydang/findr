import React, { Component } from 'react';
import FriendDisplay from './FriendDisplay';

class FriendsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      interests: {},
    };

    fetch('/api/friends')
      .then(res => res.json())
      .then((friends) => {
        this.setState({ friends });
      });
    fetch('/api/interests')
      .then(res => res.json())
      .then((json) => {
        const interests = {};
        json.forEach((interestEntry) => {
          const { friend_id, interest } = interestEntry;
          interests[friend_id] = interests[friend_id] || [];
          interests[friend_id].push(interest);
        });
        this.setState({ interests });
      });
  }

  renderFriends() {
    const friendDisplays = [];
    const { friends, interests } = this.state;
    friends.forEach((friend) => {
      const
        {
          id,
          first_name,
          last_name,
          phone_number,
        } = friend;
      friendDisplays.push(
        <FriendDisplay
          name={`${first_name} ${last_name}`}
          number={phone_number}
          interests={interests[id] || ['loading...']}
          key={`friend${id}`}
        />,
      );
    });
    return friendDisplays;
  }

  render() {
    return (
      <div className="friendsDisplay">
        {this.renderFriends()}
      </div>
    );
  }
}

export default FriendsDisplay;
