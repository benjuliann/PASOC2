"use client";

import { useEffect, useState } from "react";

export default function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("/api/photos")
      .then(res => res.json())
      .then(data => setPhotos(data.mediaItems || []));
  }, []);

  // group the photos by album name
  const albums = photos.reduce((acc, photo) => {
    const name = photo.albumName || "Unknown album";
    if (!acc[name]) acc[name] = [];
    acc[name].push(photo);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(albums).map(([albumName, items]) => (
        <section key={albumName}>
          <h2 className="text-xl font-semibold my-4">{albumName}</h2>
          <div className="grid grid-cols-4 gap-4">
            {items.map(photo => (
              <img
                key={photo.id}
                src={`${photo.baseUrl}=w300-h300`}
                alt=""
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}