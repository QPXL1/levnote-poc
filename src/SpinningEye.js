import React, { useState } from 'react';
import './SpinningEye.css';

const SpinningEye = ({ style, onEyeCleared }) => {
  const [visible, setVisible] = useState(true);

  const handleMouseEnter = () => {
    setVisible(false);
    if (onEyeCleared) {
      onEyeCleared();
    }
  };

  return visible ? (
    <div className="eye" style={style} onMouseEnter={handleMouseEnter}>
      <div className="circle">
        <div className="ring" />
      </div>
    </div>
  ) : null;
};

export default SpinningEye;
