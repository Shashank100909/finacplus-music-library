import React from "react";
import "../../styles/AlbumCard.css";

export default function AlbumCard({ album, role, onDelete }) {
  return (
    <div className="album-card">
      <img
        src={album.cover || "https://via.placeholder.com/150"}
        alt={album.title}
        className="album-cover"
      />
      <h4 className="album-title">{album.title}</h4>
      <p className="album-artist">{album.artist}</p>
      {album.album && <p className="album-name">{album.album}</p>}
      {role === "admin" && (
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  );
}
