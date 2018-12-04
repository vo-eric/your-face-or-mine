import React from 'react';

import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boundingBox }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="input-image" src={imageUrl} alt="" />
        <div
          className="bounding-box"
          style={{
            top: boundingBox.top,
            bottom: boundingBox.bottom,
            right: boundingBox.right,
            left: boundingBox.left
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
