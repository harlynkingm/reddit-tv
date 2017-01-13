import React, { Component } from 'react';
import './MediaPreview.css';

class MediaPreview extends Component {
  render() {
    var url = this.props.video.thumbnail;
    if (url === 'nsfw'){
      url = 'http://b.thumbs.redditmedia.com/pDX5LeJM_Z5ZDh3-VqrDdNO0fAqvNzMWA9Es0qO-2Wc.png';
    }
    const style = {
      backgroundImage: 'url(' + url + ')'
    };
    return (
      <div className="preview" style={style}></div>
    )
  }
}

export default MediaPreview;
