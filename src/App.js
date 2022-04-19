import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Switch>
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/search" component={ Search } />
        <Route exact path="/" render={ () => <Login /> } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
