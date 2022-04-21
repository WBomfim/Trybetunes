import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  hendleFavorite = ({ target }) => {
    this.setState({
      favorite: target.checked,
    }, () => this.setFavorite());
  }

  setFavorite = async () => {
    this.setState({ loading: true });
    const { favorite } = this.state;
    const { music } = this.props;
    if (favorite) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ loading: false });
  }

  getFavorite = async () => {
    this.setState({ loading: true });
    const { music } = this.props;
    const { trackId } = music;
    const favoriteSongs = await getFavoriteSongs();
    const favorite = favoriteSongs.some((song) => song.trackId === trackId);
    this.setState({ favorite }, () => this.setState({ loading: false }));
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { favorite, loading } = this.state;

    return (
      <div className="MusicCard">
        { loading && <Loading /> }
        { !loading && (
          <>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="favorite">
              <input
                id="favorite"
                type="checkbox"
                checked={ favorite }
                onChange={ (event) => this.hendleFavorite(event) }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
