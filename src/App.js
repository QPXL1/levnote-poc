import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import MapComponent from './MapComponent';
import RandomSpinningEyes from './RandomSpinningEyes';
import PostItNote from './PostItNote';
import NavBar from './NavBar';
import './App.css';
import useUser from './useUser';
import useNotes from './useNotes';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };

function App() {
  const { user, loading, setUser, setLoading } = useUser();
  const { postItNotes, addNote, deleteNote, setPostItNotes, fetchNotes } = useNotes(user);

  const [eyesCleared, setEyesCleared] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [jackedInMessageVisible, setJackedInMessageVisible] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [enterPressed, setEnterPressed] = useState(false);
  const [noteContents, setNoteContents] = useState({
    message: '',
    location: { latitude: 0, longitude: 0 },
  });

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error.message);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const handleMapClick = async (lngLat) => {
    const [longitude, latitude] = lngLat;
    setNoteContents({
      message: '',
      location: { latitude, longitude },
    });
  };

  const addPostItNote = async () => {
    if (!user) {
      alert("You must be signed in to add a note.");
      return;
    }

    const newNote = {
      message: noteContents.message,
      location: noteContents.location,
      userId: user.uid,
      createdAt: new Date(),
    };

    setPostItNotes([...postItNotes, newNote]);
    addNote(newNote);

    try {
      const docRef = await addDoc(collection(db, 'notes'), newNote);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        fetchNotes();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setUser, setLoading, fetchNotes]);

  useEffect(() => {
    if (user && eyesCleared) {
      setWelcomeVisible(true);
      setTimeout(() => {
        setWelcomeVisible(false);
      }, 5000);
    }
  }, [user, eyesCleared]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const lastName = user ? user.displayName.split(' ').pop() : '';

  return (
    <div className="map-container">
      {user && !welcomeVisible && !jackedInMessageVisible && showMap && (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <MapComponent markers={postItNotes} onMapClick={handleMapClick} />
        </div>
      )}
      {postItNotes.map((note, index) => (
        <PostItNote
          key={index}
          onTextChange={(text) => {
            const newNotes = [...postItNotes];
            newNotes[index].message = text;
            setPostItNotes(newNotes);
            setNoteContents({ ...noteContents, message: text });
            if (text.includes('\n')) {
              addPostItNote();
            }
          }}
          onDelete={() => deleteNote(index)}
        >
          TakaNote {index + 1}:
        </PostItNote>
      ))}
      <NavBar
        user={user}
        signOut={signOutUser}
        addPostIt={addPostItNote}
        toggleMap={toggleMap}
      />
      {user ? (
        <div className="signed-in-container">
          {user && !eyesCleared && (
            <p>Jacked in. Clear This Noise. Leave a Note.</p>
          )}
          <RandomSpinningEyes
            onEyesCleared={() => {
              setEyesCleared(true);
              setJackedInMessageVisible(false);
            }}
          />
          {welcomeVisible && (
            <div className="welcome-text-container">
              <h1>Welcome Agent: {lastName}</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="content-container">
          <h1>Welcome Dearest Explorer,</h1>
          <p>Sign in with Google to get started.</p>
          <button onClick={signIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
