import React, { Component } from 'react';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      boundingBox: {},
      route: 'signin',
      isSignedIn: false
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

    return {
      left: face.left_col * width,
      right: width - face.right_col * width,
      top: face.top_row * height,
      bottom: height - face.bottom_row * height
    };
  };

  displayBoundingBox = boundingBox => {
    this.setState({ boundingBox });
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route ==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route});
  }

  render() {
    const {isSignedIn, imageUrl, route, boundingBox} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation 
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ?  <div> 
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition
                boundingBox={boundingBox}
                imageUrl={imageUrl}
              />
            </div>
          : (
            route === 'signout' 
            ? <Signin onRouteChange={this.onRouteChange} /> 
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
