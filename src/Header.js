import React, { Component } from 'react';
import './Header.css'
import logo from '../public/images/logo.png';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <a href="/"><img src={logo} alt="Reddit TV"/></a>
        <div className="header-right">
          <h6 className="inline header-right-button">About</h6>
          <h6 className="inline header-right-button">Random Subreddit</h6>
        </div>
      </div>
    );
  }
}

export default Header;
