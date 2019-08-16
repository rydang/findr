/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import FriendDisplay from '../FriendDisplay';

class FriendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      allFriends: [],
      interests: {},
      filtered: true,
      redirect: false,
    };

    this.renderButton = this.renderButton.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
    this.switchFilter = this.switchFilter.bind(this);

    fetch('/api/filterfriends')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Error in fetch');
      })
      .then(friends => {
        this.setState({ friends });
      })
      .catch(() => {
        this.setState({ redirect: true });
      });
    fetch('/api/friends')
      .then(res => res.json())
      .then(allFriends => {
        this.setState({ allFriends });
      });
    fetch('/api/interests')
      .then(res => res.json())
      .then(json => {
        const interests = {};
        json.forEach(interestEntry => {
          const { friend_id, interest } = interestEntry;
          interests[friend_id] = interests[friend_id] || [];
          interests[friend_id].push(interest);
        });
        this.setState({ interests });
      });
  }

  switchFilter() {
    const { filtered } = this.state;
    this.setState({ filtered: !filtered });
  }

  renderButton() {
    const { filtered } = this.state;

    return (
      <button type="button" onClick={this.switchFilter}>
        {filtered ? 'Find all friends!' : 'Find friends with similar interests!'}
      </button>
    );
  }

  renderFriends() {
    const { friends: someFriends, interests, allFriends, filtered } = this.state;
    const friends = filtered ? someFriends : allFriends;

    const friendDisplays = [];
    if (Array.isArray(friends)) {
      friends.forEach(friend => {
        const { id, first_name, last_name, phone_number } = friend;
        friendDisplays.push(
          <FriendDisplay
            name={`${first_name} ${last_name}`}
            number={phone_number}
            interests={interests[id] || ['loading...']}
            key={`friend${id}`}
          />,
        );
      });
    }
    return friendDisplays;
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <div className="friendsPage">
        <div className="friendsHeader">
          <h1>Findr</h1>
          <h3>Find new friends today!</h3>
          {this.renderButton()}
          <a id="logout" href="/api/logout">
            <button id="logoutbutton" type="button">
              Logout
            </button>
          </a>
        </div>
        <div className="friendsDisplay">{this.renderFriends() || 'loading'}</div>
      </div>
    );
  }
}

export default FriendsPage;
