import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    const { image, name, email, description } = user;
    this.setState({ image, name, email, description, loading: false });
  }

  render() {
    const { image, name, email, description, loading } = this.state;
    return (
      <div className="Profile" data-testid="page-profile">
        <Header />
        <div>
          {loading && <Loading />}
          {!loading && (
            <>
              <img
                src={ image }
                alt={ `Imagem de ${name}` }
                data-testid="profile-image"
              />
              <h2>{ name }</h2>
              <p>{ email }</p>
              <p>{ description }</p>
              <div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
