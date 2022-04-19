import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div className="Profile" data-testid="page-profile">
        <Header />
      </div>
    );
  }
}

export default Profile;
