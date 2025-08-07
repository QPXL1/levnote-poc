import React, { useEffect, useState } from 'react';
import SpinningEye from './SpinningEye';
import './RandomSpinningEyes.css';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const isInsideExclusionZone = (x, y, exclusionZone, eyeSize) => {
  return (
    x + eyeSize > exclusionZone.x &&
    x < exclusionZone.x + exclusionZone.width &&
    y + eyeSize > exclusionZone.y &&
    y < exclusionZone.y + exclusionZone.height
  );
};

const createSpinningEye = (exclusionZone) => {
  const eyeSize = getRandomInt(50, 200);
  const x = getRandomInt(0, window.innerWidth - eyeSize);
  const y = getRandomInt(0, window.innerHeight - eyeSize);

  if (isInsideExclusionZone(x, y, exclusionZone, eyeSize)) {
    return createSpinningEye(exclusionZone);
  }

  return {
    x,
    y,
    eyeSize,
  };
};

const RandomSpinningEyes = ({ onEyesCleared }) => {
  const [eyes, setEyes] = useState([]);
  const [clearedEyes, setClearedEyes] = useState(0);

  useEffect(() => {
    const exclusionZone = {
      x: window.innerWidth * 0.25,
      y: window.innerHeight * 0.1,
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.35,
    };

    const generatedEyes = [];
    for (let i = 0; i < 10; i++) {
      generatedEyes.push(createSpinningEye(exclusionZone));
    }
    setEyes(generatedEyes);
  }, []);

  const handleEyeCleared = () => {
    setClearedEyes(clearedEyes + 1);
    if (clearedEyes + 1 === eyes.length && onEyesCleared) {
      onEyesCleared();
    }
  };

  return (
    <>
      {eyes.map((eye, index) => (
        <SpinningEye
          key={index}
          style={{
            position: 'absolute',
            top: eye.y,
            left: eye.x,
            width: eye.eyeSize,
            height: eye.eyeSize,
          }}
          onEyeCleared={handleEyeCleared}
        />
      ))}
    </>
  );
};

export default RandomSpinningEyes;
