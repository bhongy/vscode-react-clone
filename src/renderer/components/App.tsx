import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ipcRenderer } from 'electron';
import { Watermark } from './Watermark';
import './base.css';

class App extends React.Component {
  handleButtonClick = () => {
    ipcRenderer.send('window:create');
  };

  render() {
    return (
      <div>
        <h1>Hello World from Renderer</h1>
        <button onClick={this.handleButtonClick}>Create New Window</button>
        <Watermark />
      </div>
    );
  }
}

export default hot(module)(App);
