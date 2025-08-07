import React from 'react';
import './PostItNote.css';

const PostItNote = ({ children, onTextChange, onDelete, onEnter, onDiscard }) => {
  return (
    <div className="post-it-note">
      {children}
      <textarea onChange={(e) => onTextChange(e.target.value)} />
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEnter}>Enter</button>
      <button className="discard-button" onClick={onDiscard}>×</button>
    </div>
  );
};

export default PostItNote;
