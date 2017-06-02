require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import {Icon} from 'react-fa';


class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    let materials = [
      { src: require('../images/material.png') },
      { src: require('../images/pure.png') }
    ];

    this.state = {
      'materials': materials,
      'selected.material': materials[0].src
    }
  }
  previewImage() {
    var file = this.refs.imagePicker.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        'selected.material': reader.result
      });
    }
    reader.readAsDataURL(file);
  }
  getCurrentStyle() {
    return {
      backgroundImage: `url(${this.state['selected.material']})`
    };
  }
  render() {
    return (
      <div className="main">
        <div className="current" style={this.getCurrentStyle()}>
          <div className="mask"></div>
        </div>
        <div className="candidates">
        {
          this.state.materials.map((m, i) => {
            return <div key={i}
                        style={{ backgroundImage: `url(${m.src})` }}
                        onClick={() => { this.setState({ 'selected.material': m.src }); }}/>
          })
        }
        <div>
          <label htmlFor="imagePicker"><Icon name="camera" size="4x" className="camera"/></label>
          <input ref="imagePicker"
                 id="imagePicker"
                 type="file"
                 onChange={this.previewImage.bind(this)} />
        </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
