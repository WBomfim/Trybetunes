import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      checkSearch: true,
      loading: false,
      searchName: '',
      albums: [],
      NotAlbums: false,
    };
  }

  hendleChange = ({ target: { value } }) => {
    const inputValue = value;
    this.setState({ searchValue: inputValue }, () => { this.checkInputSearch(); });
  }

  checkInputSearch = () => {
    const { searchValue } = this.state;
    const minCharacteres = 2;
    if (searchValue.length >= minCharacteres) {
      this.setState({ checkSearch: false });
    } else {
      this.setState({ checkSearch: true });
    }
  }

  searchArtist = async (event) => {
    event.preventDefault();
    const { searchValue } = this.state;
    this.setState({
      searchName: searchValue,
      loading: true,
    }, () => this.setState({ searchValue: '' }));
    const albums = await searchAlbumsAPI(searchValue);
    this.setState({ albums, loading: false }, () => this.verifyNotAlbums());
  }

  verifyNotAlbums = () => {
    const { albums } = this.state;
    if (albums.length === 0) {
      this.setState({ NotAlbums: true });
    } else {
      this.setState({ NotAlbums: false });
    }
  }

  renderAlbuns = () => {
    const { albums } = this.state;
    return albums.map((album) => (
      <div key={ album.collectionId }>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <div>
            <h2>{album.collectionName}</h2>
            <p>{album.artistName}</p>
          </div>
        </Link>
      </div>
    ));
  }

  render() {
    const {
      searchValue,
      checkSearch,
      loading,
      searchName,
      albums,
      NotAlbums,
    } = this.state;

    return (
      <div>
        <Header />
        <div className="Search" data-testid="page-search">
          { loading && <Loading /> }
          { !loading
            && (
              <>
                <form>
                  <input
                    type="text"
                    name="searchValue"
                    placeholder="Nome do Artista"
                    value={ searchValue }
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
                <div>
                  { albums.length !== 0
                    ? <p>{ `Resultado de álbuns de: ${searchName}` }</p> : null }
                  { NotAlbums && <p>Nenhum álbum foi encontrado</p> }
                  { this.renderAlbuns() }
                </div>
              </>
            )}
        </div>
      </div>
    );
  }
}

export default Search;
