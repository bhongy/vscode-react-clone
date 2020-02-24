'use strict';

import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ipcRenderer } from 'electron';
import { QuickOpen } from './QuickOpen';
import { Watermark } from './Watermark';
import { Statusbar } from './Statusbar';
import './base.css';
import './App.css';

// function __TEMPORARY__boot() {
  // start service: environment -> commands
  //    register commands by mounting services
// }

type LayoutContainer = React.FunctionComponent<{ children: React.ReactNode }>;

const Sidebar: LayoutContainer = ({ children }) => ( // App-level (layout)
  <div className="Sidebar">{children}</div>
);

const Main: LayoutContainer = ({ children }) => ( // App-level (layout)
  <div className="Main">{children}</div>
);

const MainPanel: LayoutContainer = ({ children }) => ( // App-level (layout)
  <div className="MainPanel">{children}</div>
);

const Footer: LayoutContainer = ({ children }) => ( // App-level (layout)
  <div className="Footer">{children}</div>
);

const Exploror = () => <div className="Explorer" />;

class App extends React.Component {
  handleButtonClick = () => {
    ipcRenderer.send('window:create');
  };

  render() {
    return (
      <div className="App">
        <div className="App__PositionContext">
          <p>Hello World from Renderer</p>
          <button onClick={this.handleButtonClick}>Create New Window</button>
          <QuickOpen />
          <Sidebar>
            <Exploror />
          </Sidebar>
          <Main>
            <Watermark />
            <MainPanel>Placeholder for MainPanel</MainPanel>
          </Main>
          <Footer>
            <Statusbar />
          </Footer>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
