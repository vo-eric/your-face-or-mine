import React, { Component } from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const app = new Clarifai.App({
  apiKey: '5451de26b81f47aab587046d34bac2bb'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boundingBox: {}
    };
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(res => this.displayBoundingBox(this.calculateBoxLocation(res)))
      .catch(err => console.log(err));
  };

  calculateBoxLocation = data => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box,
      image = document.getElementById('input-image'),
      width = Number(image.width),
      height = Number(image.height);

    console.log(data);

    return {
      left: face.left_col * width,
      right: width - face.right_col * width,
      top: face.top_row * height,
      bottom: height - face.bottom_row * height
    };
  };

  displayBoundingBox = boundingBox => {
    console.log(boundingBox);
    this.setState({ boundingBox });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition
          boundingBox={this.state.boundingBox}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
