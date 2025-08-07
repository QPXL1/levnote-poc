import React, { useState, useEffect, useRef } from 'react';
import { onSnapshot, collection, getFirestore } from 'firebase/firestore';

import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';     
import './MapComponent.css';

const MapComponent = ({ markers, onMapClick }) => {
  const [viewport, setViewport] = useState({
    latitude: 51.0577591,
    longitude: -114.1530893,
    zoom: 12,
  });

  const [notes, setNotes] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const db = getFirestore();
    const notesCollection = collection(db, 'notes');
    const unsubscribe = onSnapshot(notesCollection, (querySnapshot) => {
      const notesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    if (!mapRef.current || !notes.length) return;

    notes.forEach((note) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = '⭕';
      el.style.fontSize = '24px';
      el.style.cursor = 'pointer';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<p>${note.message}</p>`
      );

      new mapboxgl.Marker(el)
        .setLngLat([note.location.longitude, note.location.latitude])
        .setPopup(popup)
        .addTo(mapRef.current);
    });

    // Add the map click event listener
    if (mapRef.current) {
      mapRef.current.on('click', (e) => {
        if (onMapClick) {
          onMapClick(e.lngLat);
        }
      });
    }
  }, [mapRef, notes, onMapClick]);

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      className="react-map-gl"
      style={{ backgroundColor: 'red' }}
      onLoad={(event) => (mapRef.current = event.target)}
    />
  );
};

export default MapComponent;
