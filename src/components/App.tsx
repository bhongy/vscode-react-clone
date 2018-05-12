import * as React from 'react';
import { ipcRenderer } from 'electron';

class App extends React.Component {
  handleButtonClick = () => {
    ipcRenderer.send('window:create');
  };

  render() {
    return (
      <div>
        <h1>Hello World from Renderer</h1>
        <button onClick={this.handleButtonClick}>Create New Window</button>
      </div>
    );
  }
}

export default App;
