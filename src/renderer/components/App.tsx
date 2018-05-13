import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ipcRenderer } from 'electron';
import { Watermark } from './Watermark';

class App extends React.Component<{}, { count: number }> {
  state = { count: 1 };

  handleButtonClick = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
    // ipcRenderer.send('window:create');
  };

  render() {
    return (
      <div>
        <h1>Hello World from Renderer {this.state.count}</h1>
        <button onClick={this.handleButtonClick}>increment</button>
        {/* <button onClick={this.handleButtonClick}>Create New Window</button> */}
        <Watermark />
      </div>
    );
  }
}

export default hot(module)(App);
