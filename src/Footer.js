import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <div className="left">
          Created by <a href="http://maxharlynking.com" target="_blank">Max Harlynking</a> in 2017
        </div>
        <div className="right">
          RedditTV has no affiliation with <a href="https://reddit.com" target="_blank">reddit.com</a> or its properties.
        </div>
      </div>
    )
  }
}

export default Footer;
