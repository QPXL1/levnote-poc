import React from 'react';

const NotesFolder = ({ notes, selectedTab, onSelectTab }) => {
  const tabs = ['My Notes', 'Saved Notes', 'Drafts', 'Favorites'];

  return (
    <div className="notes-folder">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={selectedTab === index ? 'active' : ''}
            onClick={() => onSelectTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            {note.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesFolder;
