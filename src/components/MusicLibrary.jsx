import React from 'react';
import AlbumCard from './AlbumCard';
import '../styles/MusicLibrary.css';

const albums = [
  { title: 'Album 1', artist: 'Artist A', cover: 'https://via.placeholder.com/150' },
  { title: 'Album 2', artist: 'Artist B', cover: 'https://via.placeholder.com/150' },
  { title: 'Album 3', artist: 'Artist C', cover: 'https://via.placeholder.com/150' },
  { title: 'Album 4', artist: 'Artist D', cover: 'https://via.placeholder.com/150' },
];

export default function MusicLibrary() {
  return (
    <div className="library-container">
      {albums.map((album, idx) => (
        <AlbumCard
        key={idx}
         album={song}
       role={role}
      onDelete={handleDeleteSong}/>
      ))}
    </div>
  );
}
