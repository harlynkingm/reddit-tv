import React, { Component } from 'react';
import './MediaPreview.css';

class MediaPreview extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.changeCurrent(this.props.index);
  }

  render() {
    var url = this.props.video.thumbnail;
    if (url === 'nsfw'){
      url = 'http://i.imgur.com/UHzw6.png';
    } else if (url === ''){
      if (this.props.video.domain === 'youtube.com'){
        url = this.props.video.media.oembed.thumbnail_url;
      } else {
        url = 'https://b.thumbs.redditmedia.com/vR7SUuNexkV8JKXTK5cR5sYBm8beynO5cBMACJAhfnI.png';
      }
    }
    var style = {
      backgroundImage: 'url(' + url + ')'
    };
    if (this.props.index === this.props.current){
      style.boxShadow = "inset 0px 0px 0px 10px #FF4300";
    }
    return (
      <div className="preview" style={style} onClick={this.handleClick}></div>
    )
  }
}

export default MediaPreview;
