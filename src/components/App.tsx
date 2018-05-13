import * as React from 'react';
import { ipcRenderer } from 'electron';
import { Watermark } from './Watermark';

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

export default App;
