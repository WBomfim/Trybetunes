import React, { Component } from 'react';
import propTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
      checkInformation: true,
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    const { image, name, email, description } = user;
    this.setState({ image, name, email, description, loading: false });
    this.checkForm();
  }

  hendleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.checkForm());
  }

  checkForm = () => {
    const { image, name, email, description } = this.state;
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})|$/i); // Regex de emial retirado do course.
    const checkInformation = !image || !name || !email || !validEmail[0] || !description;
    this.setState({ checkInformation });
  }

  saveInformationUser = async () => {
    this.setState({ loading: true });
    const { history } = this.props;
    const { image, name, email, description } = this.state;
    const user = { image, name, email, description };
    await updateUser(user);
    history.push('/profile');
  }

  render() {
    const { image, name, email, description, checkInformation, loading } = this.state;
    return (
      <div className="ProfileEdit" data-testid="page-profile-edit">
        <Header />
        <div>
          { loading && <Loading /> }
          { !loading && (
            <form>
              <label htmlFor="image">
                Foto:
                <input
                  id="image"
                  type="text"
                  name="image"
                  value={ image }
                  onChange={ this.hendleChange }
                  data-testid="edit-input-image"
                />
              </label>
              <label htmlFor="name">
                Nome:
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.hendleChange }
                  data-testid="edit-input-name"
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={ email }
                  onChange={ this.hendleChange }
                  data-testid="edit-input-email"
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <textarea
                  id="description"
                  name="description"
                  value={ description }
                  onChange={ this.hendleChange }
                  data-testid="edit-input-description"
                />
              </label>
              <button
                type="submit"
                disabled={ checkInformation }
                onClick={ this.saveInformationUser }
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
