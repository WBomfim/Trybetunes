import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.setMusics();
  }

  setMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musics,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
    });
  }

  render() {
    const { artistName, albumName, musics } = this.state;

    return (
      <div className="Album" data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="album-name">{ albumName }</h2>
          <h3 data-testid="artist-name">{ artistName }</h3>
        </div>
        <div>
          { musics.map((music) => <MusicCard key={ music.trackId } music={ music } />) }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
