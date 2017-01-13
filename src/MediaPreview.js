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
      url = 'http://b.thumbs.redditmedia.com/pDX5LeJM_Z5ZDh3-VqrDdNO0fAqvNzMWA9Es0qO-2Wc.png';
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
