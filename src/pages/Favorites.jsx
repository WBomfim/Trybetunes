import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import './Favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs }, () => this.setState({ loading: false }));
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="Favorites">
          { loading && <Loading /> }
          { !loading && (favoriteSongs
            .map((music) => (
              <MusicCard
                key={ music.trackId }
                music={ music }
                trackId={ Number(music.trackId) }
                update={ () => this.getFavorite() }
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
