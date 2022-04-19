import React, { Component } from 'react';
import Header from '../components/Header';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      checkSearch: true,
    };
  }

  hendleChange = ({ target: { value } }) => {
    const inputValue = value;
    this.setState({ artistName: inputValue }, () => { this.checkInputSearch(); });
  }

  checkInputSearch = () => {
    const { artistName } = this.state;
    const minCharacteres = 2;
    if (artistName.length >= minCharacteres) {
      this.setState({ checkSearch: false });
    } else {
      this.setState({ checkSearch: true });
    }
  }

  render() {
    const { artistName, checkSearch } = this.state;

    return (
      <div>
        <Header />
        <div className="Search" data-testid="page-search">
          <form>
            <input
              type="text"
              name="artistName"
              placeholder="Nome do Artista"
              value={ artistName }
              onChange={ this.hendleChange }
              data-testid="search-artist-input"
            />
            <button
              type="submit"
              disabled={ checkSearch }
              onClick={ this.searchArtist }
              data-testid="search-artist-button"
            >
              Procurar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
