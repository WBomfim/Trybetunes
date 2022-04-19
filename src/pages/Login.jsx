import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
      redirect: false,
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
    const { username } = this.state;
    const objUser = { name: username };
    await createUser(objUser);
    this.setState({
      loading: false,
      username: '',
      redirect: true,
    });
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
    const { redirect } = this.state;
    return (
      <div className="Login" data-testid="page-login">
        { redirect ? <Redirect to="/search" /> : this.changeHender() }
      </div>
    );
  }
}

export default Login;
