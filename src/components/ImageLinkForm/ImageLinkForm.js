import React from 'react';

const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">Upload an image and any faces will be detected!</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input className="f4 pa2 w-70 center" type="text" />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;