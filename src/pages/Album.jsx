import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import './Album.css';

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
    const filteredMusics = this.filterMusics(musics);
    this.setState({
      musics: filteredMusics,
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
    });
  }

  filterMusics(musics) {
    return musics.filter((music) => music.trackId !== undefined);
  }

  render() {
    const { artistName, albumName, musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="Album">
          <div>
            <h2 data-testid="album-name">{ albumName }</h2>
            <h3 data-testid="artist-name">{ artistName }</h3>
          </div>
          <div className="musicPreview">
            { musics.map((music) => <MusicCard key={ music.trackId } music={ music } />) }
          </div>
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
