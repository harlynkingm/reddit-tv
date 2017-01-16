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
    this.renderMediaPreview = this.renderMediaPreview.bind(this);
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

  componentWillReceiveProps(nextProps){
    if (this.state.flickity){
      this.state.flickity.selectCell(nextProps.current, false, false);
    }
  }

  selectNext() {
    if (this.state.flickity){
      const i = this.state.flickity.selectedIndex
      this.state.flickity.selectCell(i + 3, false, false);
    }
  }

  selectPrev() {
    if (this.state.flickity){
      const i = this.state.flickity.selectedIndex
      this.state.flickity.selectCell(i - 3, false, false);
    }
  }

  renderMediaPreview(video, index){
    return <MediaPreview key={index} index={index} video={video.data} current={this.props.current} changeCurrent={this.props.changeCurrent}/>;
  }

  render() {
    if (!this.props.videos) {
      return null;
    }
    return (
      <div className="browserContainer">
        <div className="browser">
        {
          this.props.videos.map(this.renderMediaPreview)
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
