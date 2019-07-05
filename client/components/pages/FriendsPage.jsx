import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import FriendDisplay from '../FriendDisplay';

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      allFriends: [],
      interests: {},
      username: Cookies.get('username'),
    };

    this.renderButton = this.renderButton.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
    this.switchUsername = this.switchUsername.bind(this);

    const { username } = this.state;

    fetch((username) ? `/api/friends/${username}` : '/api/friends')
      .then(res => res.json())
      .then((friends) => {
        this.setState({ friends });
      });
    fetch('/api/friends')
      .then(res => res.json())
      .then((allFriends) => {
        this.setState({ allFriends });
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

  switchUsername() {
    const { username } = this.state;
    this.setState({ username: username ? '' : Cookies.get('username') });
  }

  renderButton() {
    const { username } = this.state;

    return (
      <div>
        <button type="button" onClick={this.switchUsername}>
          {username ? 'Find all friends!' : 'Find friends with similar interests!'}
        </button>
      </div>
    )
  }

  renderFriends() {
    const { friends: someFriends, interests, allFriends, username } = this.state;
    const friends = username ? someFriends : allFriends;

    const friendDisplays = [];
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
      <div className="friendsPage">
        <div className="friendsHeader">
          <h1>Findr</h1>
          <h3>Find new friends today!</h3>
          {this.renderButton()}
          <NavLink to="/">
            <button type="button" onClick={() => Cookies.remove('username')}>Logout</button>
          </NavLink>
        </div>
        <div className="friendsDisplay">
          {this.renderFriends() || 'loading'}
        </div>
      </div>
    );
  }
}

export default FriendsPage;
