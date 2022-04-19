import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getNameUser();
  }

  getNameUser = async () => {
    this.setState({ loading: true });
    const userObject = await getUser();
    const { name } = userObject;
    this.setState({ userName: name, loading: false });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : (
            <div>
              <div className="title">
                <h1>Trybetunes</h1>
                <p data-testid="header-user-name">{ userName }</p>
              </div>
              <nav>
                <div>
                  <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
                </div>
                <div>
                  <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
                </div>
                <div>
                  <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
                </div>
              </nav>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
