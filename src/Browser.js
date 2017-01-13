import React, { Component } from 'react';
import MediaPreview from './MediaPreview';
import './Browser.css';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import navArrow from '../public/images/navArrow.png';

class Browser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flickity: null
    }
    this.selectNext = this.selectNext.bind(this);
    this.selectPrev = this.selectPrev.bind(this);
  }

  componentDidUpdate() {
    if (this.props.videos){
      var elem = document.querySelector('.browser');
      var flkty = new Flickity(elem, {
          cellAlign: 'left',
          contain: true,
          freeScroll: true,
          prevNextButtons: false,
          pageDots: false
      });
      this.state = {
        flickity: flkty
      }
    }
  }

  selectNext() {
    if (this.state.flickity){
      this.state.flickity.next(false, false);
    }
  }

  selectPrev() {
    if (this.state.flickity){
      this.state.flickity.previous(false, false);
    }
  }

  render() {
    if (!this.props.videos) {
      return null;
    }
    return (
      <div className="browserContainer">
        <div className="browser">
        {
          this.props.videos.map(function(video) {
            return <MediaPreview key={video.data.id} video={video.data} />;
          })
        }
        </div>
        <div className="arrowContainer smallArrows">
          <img src={navArrow} alt="Next Video" className="nextArrow" onClick={this.selectNext}/>
          <img src={navArrow} alt="Previous Video" className="prevArrow" onClick={this.selectPrev}/>
        </div>
      </div>
    )
  }
}

export default Browser;
