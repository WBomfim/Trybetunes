import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div className="Favorites" data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}

export default Favorites;
