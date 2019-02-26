import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import {
  Window,
  TitleBar,
  Toolbar,
  ToolbarNav,
  ToolbarNavItem
} from 'react-desktop/macOs';
import { remote } from 'electron';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import LoginPage from './containers/LoginPage';

export default class Routes extends Component {
  state = {
    isFullscreen: false,
    selected: 1
  };

  componentDidMount() {
    this.currnetWindow = remote.getCurrentWindow();
  }

  checkCurrentWindowIsExist = () => !!this.currnetWindow;

  currnetWindow = null;

  close = () => {
    if (this.checkCurrentWindowIsExist()) {
      this.currnetWindow.hide();
    }
  };

  minimize = () => {
    if (this.checkCurrentWindowIsExist() && !this.currnetWindow.isMinimized()) {
      this.currnetWindow.minimize();
    }
  };

  restore = () => {
    if (this.checkCurrentWindowIsExist() && this.currnetWindow.isMaximized()) {
      this.currnetWindow.restore();
    }
  };

  resize = () => {
    if (this.checkCurrentWindowIsExist()) {
      if (!this.currnetWindow.isMaximized()) {
        this.currnetWindow.maximize();
        this.setState({
          isFullscreen: true
        });
      } else {
        this.currnetWindow.unmaximize();
        this.setState({
          isFullscreen: false
        });
      }
    }
  };

  render() {
    const { isFullscreen, selected } = this.state;

    return (
      <App data-cid="App">
        {true ? (
          <LoginPage />
        ) : (
          <Window data-cid="Window" chrome padding="10px">
            <TitleBar
              data-cid="TitleBar"
              title="Home"
              controls
              onCloseClick={this.close}
              onMinimizeClick={this.minimize}
              onResizeClick={this.resize}
              isFullscreen={isFullscreen}
            >
              <Toolbar data-cid="Toolbar" horizontalAlignment="left">
                <ToolbarNav data-cid="ToolbarNav">
                  <ToolbarNavItem
                    data-cid="ToolbarNavItem"
                    title="Home"
                    selected={selected === 1}
                    onClick={() => this.setState({ selected: 1 })}
                  />
                  <ToolbarNavItem
                    data-cid="ToolbarNavItem"
                    title="Login"
                    selected={selected === 2}
                    onClick={() => this.setState({ selected: 2 })}
                  />
                </ToolbarNav>
              </Toolbar>
            </TitleBar>

            <Switch>
              <Route path={routes.COUNTER} component={CounterPage} />
              <Route path={routes.HOME} component={HomePage} />
            </Switch>
          </Window>
        )}
      </App>
    );
  }
}
