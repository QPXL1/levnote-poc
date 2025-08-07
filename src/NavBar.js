import React from 'react';
import './NavBar.css';

const getUserInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const NavBar = ({ user, signOut, addPostIt, toggleMap }) => {
  const userInitials = user && getUserInitials(user.displayName);

  return (
    <nav>
      <div className="nav-bar">
        {user && (
          <div className="profile-picture">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" />
            ) : (
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                {userInitials}
              </div>
            )}
          </div>
        )}
        {user && (
          <div className="nav-buttons">
            <button onClick={addPostIt}>Leva</button>
            <button>Notes</button>
            <button>Search</button>
            <button onClick={toggleMap}>Map</button>
          </div>
        )}
        {user && (
          <div className="dropdown-menu">
            <button className="dropbtn">Menu</button>
            <div className="dropdown-content">
              <button onClick={() => {/* Link 1 action */}}>Link 1</button>
              <button onClick={() => {/* Link 2 action */}}>Link 2</button>
              <button onClick={() => {/* Link 3 action */}}>Link 3</button>
              <button
                onClick={signOut}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '12px 16px',
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
