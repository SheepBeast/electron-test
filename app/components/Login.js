// @flow
import React, { Component, Fragment } from 'react';
import { ipcRenderer, shell, remote } from 'electron';
import {
  Window,
  TitleBar,
  Text,
  TextInput,
  View,
  Button,
  Link
} from 'react-desktop/macOs';

import styles from './Login.css';
import arrowRightLine from '../assets/arrow-right-light.png';
import qr_code from '../assets/QR_code.png';

const LoginStyle = {
  window: {
    flexDirection: 'flex-end'
  },
  titleBar: {
    backgroundImage: 'none',
    borderTop: 'none',
    borderBottom: 'none'
  },

  link: {
    cursor: 'pointer'
  }
};

const urls = {
  register: 'https://gongyu.hxjiot.com/#/user/register',
  forgetPassword: 'https://gongyu.hxjiot.com/#/user/forget-password'
};

type Props = {};

type URL = string;

export default class Login extends Component<Props> {
  props: Props;

  login = () => {
    console.log('login');
    ipcRenderer.send('childWindow');
  };

  openURLOnExternalBrowser = url => {
    shell.openExternal(url);
  };

  close = () => {
    remote.getCurrentWindow().close()
  };

  render() {
    return (
      <Fragment>
        <Window data-cid="window" chrome padding="10px" background="white">
          <TitleBar
            data-cid="title-bar"
            style={LoginStyle.titleBar}
            controls
            onCloseClick={this.close}
          />

          <div data-cid="form" className={styles.form}>
            <div className={styles.formItem}>
              <img
                src="https://file.hxjiot.com/1536999364405.1.jpg"
                className={styles.avatar}
              />
            </div>

            <div className={styles.formItem}>
              <Text>nuomimaru</Text>
            </div>

            <div className={styles.formItem}>
              <TextInput
                centerPlaceholder
                placeholder="用户名"
                //  width="70vw"
              />
            </div>

            <div className={styles.formItem}>
              <TextInput
                centerPlaceholder
                password
                placeholder="密码"
                // width="70vw"
              />

              <span className={styles.next} onClick={this.login}>
                <img src={arrowRightLine} className={styles.nextArrow} />
              </span>
            </div>

            <div className={`${styles.formItem} ${styles.linkWrapper}`}>
              <Link
                color="red"
                style={LoginStyle.link}
                onClick={() => {
                  this.openURLOnExternalBrowser(urls.forgetPassword);
                }}
              >
                忘记密码？
              </Link>
              <Link
                marginLeft="auto"
                style={LoginStyle.link}
                onClick={() => {
                  this.openURLOnExternalBrowser(urls.register);
                }}
              >
                注册账号
              </Link>
            </div>

            <div className={styles.QRCodeWrapper}>
              <img src={qr_code} className={styles.QRCode} />
            </div>
          </div>
        </Window>
      </Fragment>
    );
  }
}
