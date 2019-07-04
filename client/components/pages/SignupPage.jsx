import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberInterests: 1,
      fields: {
        username: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        phone_number: '',
      },
      errors: {
        username: false,
        password: false,
        password2: false,
        first_name: false,
        last_name: false,
        phone_number: false,
        interest: false,
      },
    };

    this.changeFormEntry = this.changeFormEntry.bind(this);
    this.checkForm = this.checkForm.bind(this);
    this.renderInterests = this.renderInterests.bind(this);
  }

  changeFormEntry(e) {
    const { fields, errors } = this.state;
    const name = e.target.getAttribute('name');
    if (name === 'username') e.target.value = e.target.value.trim();
    fields[name] = e.target.value;
    errors[name] = false;
    this.setState({ fields });
  }

  checkForm() {
    const { numberInterests, fields } = this.state;
    const { username, password, password2, first_name, last_name, phone_number } = fields;
    const errors = {};
    errors.username = !username;
    errors.password = !password || (password !== password2);
    errors.password2 = !password2 || (password !== password2);
    errors.first_name = !first_name;
    errors.last_name = !last_name;
    errors.phone_number = !phone_number;
    errors.interest = numberInterests === 1;

    this.setState({ errors });

    if (Object.values(errors).includes(true)) return false;
    document.querySelector('.signupForm').submit();
    return true;
  }

  renderInterests() {
    const { errors: { interest }, numberInterests } = this.state;
    const interestBoxes = [];
    for (let i = 0; i < numberInterests; i++) {
      interestBoxes.push('Interest:',
        <input
          name="interest"
          type="text"
          key={`interest${i}`}
          className={(numberInterests === 1 && interest) ? 'error' : ''}
          onChange={() => {
            if (i === numberInterests - 1) this.setState({ numberInterests: numberInterests + 1 });
          }}
        />);
    }
    return interestBoxes;
  }

  render() {
    const { errors: { username, password, password2, first_name, last_name, phone_number } } = this.state;

    return (
      <div className="signupPage">
        <div className="signupHeader">
          <h1>Findr</h1>
          <h3>Signup here to begin your search!</h3>
        </div>
        <div className="signupEntry">
          <form className="signupForm" action="/api/friends" method="post" >
            {'Username:'}
            <input name="username" type="text" onChange={this.changeFormEntry} className={username ? 'error' : ''} />
            {'Password:'}
            <input name="password" type="password" onChange={this.changeFormEntry} className={password ? 'error' : ''} />
            {'Password Again:'}
            <input name="password2" type="password" onChange={this.changeFormEntry} className={password2 ? 'error' : ''} />
            {'First Name'}
            <input name="first_name" type="text" onChange={this.changeFormEntry} className={first_name ? 'error' : ''} />
            {'Last Name'}
            <input name="last_name" type="text" onChange={this.changeFormEntry} className={last_name ? 'error' : ''} />
            {'Phone Number:'}
            <input name="phone_number" type="text" onChange={this.changeFormEntry} className={phone_number ? 'error' : ''} />
            {this.renderInterests()}
            <div />
            <input type="button" value="Signup" onClick={this.checkForm} />
          </form>
        </div>
      </div>
    );
  }
}

export default SignupPage;
