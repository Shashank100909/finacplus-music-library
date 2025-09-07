import React, { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";
import "./LibraryApp.css";

export default function LibraryApp({ newSongs = [], role, onAddSong }) {
const [songs, setSongs] = useState(() => {
  const storedSongs = localStorage.getItem("songs");
  const parsedSongs = storedSongs ? JSON.parse(storedSongs) : null;
  
  
  if (!parsedSongs || parsedSongs.length === 0) {
    
return [
  { 
    title: "Viva La Vida",
    album: "Viva La Vida or Death and All His Friends",
    artist: "Coldplay",
    cover: "https://upload.wikimedia.org/wikipedia/en/8/84/Coldplay_-_Viva_la_Vida.jpg"
  },
  { 
    title: "Yellow",
    album: "Parachutes",
    artist: "Coldplay",
    cover: "https://upload.wikimedia.org/wikipedia/en/9/9b/Yellow_cover_art.JPG" 
  },
  { 
    title: "The Scientist",
    album: "A Rush of Blood to the Head",
    artist: "Coldplay",
    cover: "https://res-4.cloudinary.com/synchtank-com/image/upload/s--m739O33L--/c_fill,g_auto,h_500,w_500/q_auto:eco/object-273216684.jpg" 
  },
  { 
    title: "Fix You",
    album: "X&Y",
    artist: "Coldplay",
    cover: "https://upload.wikimedia.org/wikipedia/en/b/b1/Coldplay_-_Fix_You.jpg" 
  },
  { 
    title: "Clocks",
    album: "A Rush of Blood to the Head",
    artist: "Coldplay",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaNbs9TZ54v-rUI3T8XAbpduh_meEUTv0Cvg&s" 
  },
  { 
    title: "Bad Guy",
    album: "When We All Fall Asleep, Where Do We Go?",
    artist: "Billie Eilish",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Y1WDpDp13-Gi0yNZs73T450vjHzYKhV_sg&s" 
  },
  { 
    title: "Bury a Friend",
    album: "When We All Fall Asleep, Where Do We Go?",
    artist: "Billie Eilish",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9YpgfwtZWiq3vepHkI5JRTTFAlJbI16gGtQ&s" 
  },
  { 
    title: "Therefore I Am",
    album: "Happier Than Ever",
    artist: "Billie Eilish",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpISsTym602BrflvCUkXUThb7uuEP5Mh4sw&s" 
  },
  { 
    title: "Shape of You",
    album: "÷ (Divide)",
    artist: "Ed Sheeran",
    cover: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png" 
  },
  { 
    title: "Perfect",
    album: "÷ (Divide)",
    artist: "Ed Sheeran",
    cover: "https://i.pinimg.com/736x/9a/22/fb/9a22fbaa1c35182063a67cae7913175c.jpg" 
  }
];
  }
  return parsedSongs; 
});
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("Album");
  const [groupBy, setGroupBy] = useState("Artist");

  useEffect(() => {
    if (newSongs.length > 0) {
      const latest = newSongs[newSongs.length - 1];
      setSongs((prev) => {
        const updated = [...prev, latest];
        localStorage.setItem("songs", JSON.stringify(updated));
        return updated;
      });
    }
  }, [newSongs]);

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

const handleDeleteSong = (songToDelete) => {
  const updated = songs.filter((s) => s !== songToDelete);
  setSongs(updated);
  localStorage.setItem("songs", JSON.stringify(updated));
};

  const filteredSongs = songs.filter((song) =>
    (song.title + song.album + song.artist)
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );


const sortedSongs = [...filteredSongs].sort((a, b) => {
  const key = sortBy.toLowerCase(); 
  if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
  if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
  return 0;
});


const groupedSongs = sortedSongs.reduce((acc, song) => {
  const key = groupBy === "Album" ? song.album : song.artist;
  acc[key] = acc[key] || [];
  acc[key].push(song);
  return acc;
}, {});


  return (
    <div className="library-wrapper">
      <div className="search-sort-group">
        <input
          type="text"
          placeholder="Search songs..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="search-input"
        />

        <div className="sort-group-controls">
          <label>
            Sort By
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Title">Title</option>
              <option value="Artist">Artist</option>
              <option value="Album">Album</option>
            </select>
          </label>

          <label>
            Group By
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="Album">Album</option>
              <option value="Artist">Artist</option>
            </select>
          </label>
        </div>

        {role === "admin" && (
          <button className="btn btn-primary add-song-btn" onClick={onAddSong}>
            Add Song
          </button>
        )}
      </div>

      {Object.keys(groupedSongs).length === 0 && <p>No songs found.</p>}

      {Object.keys(groupedSongs).map((groupKey) => (
        <div key={groupKey} className="album-group">
          <h3 className="album-group-title">{groupBy === "Album" ? `Album: ${groupKey}` : `Artist: ${groupKey}`}</h3>
          <div className="library-container">
            {groupedSongs[groupKey].map((song, idx) => (
              <AlbumCard
                key={idx}
                album={song}
                role={role}
                onDelete={() => handleDeleteSong(song)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
