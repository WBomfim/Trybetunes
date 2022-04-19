import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      checkLogin: true,
      username: '',
      loading: false,
    };
  }

  hendleChange = ({ target: { value } }) => {
    const inputValue = value;
    this.setState({ username: inputValue }, () => { this.checkInputUser(); });
  }

  checkInputUser = () => {
    const { username } = this.state;
    const minCharacteres = 3;
    if (username.length >= minCharacteres) {
      this.setState({ checkLogin: false });
    } else {
      this.setState({ checkLogin: true });
    }
  }

  saveUser = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { history } = this.props;
    const { username } = this.state;
    const objUser = { name: username };
    await createUser(objUser);
    history.push('/search'); // Utilizado o objct history para redirecionar, solução discutida na thread do Gustavo Silva.
  }

  changeHender = () => {
    const { loading, user, checkLogin } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <form>
        <input
          type="text"
          placeholder="Nome de Usuário"
          name="usuario"
          value={ user }
          onChange={ this.hendleChange }
          data-testid="login-name-input"
        />
        <button
          type="submit"
          disabled={ checkLogin }
          onClick={ this.saveUser }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="Login" data-testid="page-login">
        { this.changeHender() }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
