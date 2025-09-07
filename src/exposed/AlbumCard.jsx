import React from "react";
import "./AlbumCard.css";
import Swal from "sweetalert2";

export default function AlbumCard({ album, role, onDelete }) {
  const defaultCover = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

const handleDelete = () => {
  Swal.fire({
    title: `Are you sure you want to delete "${album.title}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(album); 
      Swal.fire({
        title: "Deleted!",
        text: `"${album.title}" has been deleted.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};

  return (
    <div className="album-card">
      <img
        src={album.cover && album.cover.trim() !== "" ? album.cover : defaultCover}
        alt={album.title}
        className="album-cover"
      />
      <h4 className="album-title">{album.title}</h4>
      <p className="album-artist">{album.artist}</p>
      <p className="album-name">{album.album}</p>

      {role === "admin" && (
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
}
