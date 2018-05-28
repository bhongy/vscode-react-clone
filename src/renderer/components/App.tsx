import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ipcRenderer } from 'electron';
import { Watermark } from './Watermark';
import './base.css';
import './App.css';

function __TEMPORARY__boot() {
  // start service: environment -> commands
  //    register commands by mounting services
}

class App extends React.Component {
  handleButtonClick = () => {
    ipcRenderer.send('window:create');
  };

  render() {
    return (
      <div className="app-shell">
        <p>Hello World from Renderer</p>
        <button onClick={this.handleButtonClick}>Create New Window</button>
        <Watermark />
      </div>
    );
  }
}

export default hot(module)(App);
