// useNotes.js

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

import { db } from './App';

const useNotes = (user) => {
  const [postItNotes, setPostItNotes] = useState([]);

  const fetchNotes = async () => {
    const notesCollection = collection(db, 'notes');
    const notesSnapshot = await getDocs(notesCollection);
    const notesList = notesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPostItNotes(notesList);
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const addNote = async (newNote) => {
    setPostItNotes([...postItNotes, newNote]);

    try {
      const docRef = await addDoc(collection(db, 'notes'), newNote);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const deleteNote = async (index) => {
    const newNotes = [...postItNotes];
    newNotes.splice(index, 1);
    setPostItNotes(newNotes);

    const noteToDelete = postItNotes[index];
    if (noteToDelete.id) {
      const docRef = doc(db, 'notes', noteToDelete.id);
      await deleteDoc(docRef);
    }
  };

  return {
    postItNotes,
    addNote,
    deleteNote,
    setPostItNotes, // Include this if needed in the App component
    fetchNotes
  };
};

export default useNotes;
