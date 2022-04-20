import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCars extends Component {
  render() {
    const { music } = this.props;
    const { trackName, previewUrl } = music;
    return (
      <div className="MusicCars">
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

MusicCars.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCars;
