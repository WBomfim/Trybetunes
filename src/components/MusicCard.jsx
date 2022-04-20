import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends Component {
  render() {
    const { music } = this.props;
    const { trackName, previewUrl } = music;
    return (
      <div className="MusicCard">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
