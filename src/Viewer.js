import React, { Component } from 'react';
import $ from 'jquery';
import Browser from './Browser';
import './Viewer.css';
import arrow from '../public/images/arrow.png';
import navArrow from '../public/images/navArrow.png';

class Viewer extends Component {

  constructor(props){
    super(props);
    this.state = {
      current: 0,
      title: "",
      link: "",
      upvotes: 0,
      comments: 0,
      embed: ""
    };
    const parent = this;
    document.addEventListener("keydown", function(event){
      parent.handleKeyPress(event, parent);
    }, false);
    this.nextVideo = this.nextVideo.bind(this);
    this.prevVideo = this.prevVideo.bind(this);
  }

  updateVideo(videos, current){
    const vid = videos[current].data;
    console.log(vid);
    var link = "https://reddit.com" + vid.permalink;
    var embed = vid.media_embed.content;
    var embed_autoplay = $(embed).attr('src', $(embed).attr('src') + 'rel=0&autoplay=1');
    $(embed_autoplay).height('100%').width('100%');
    $(".frame").html(embed_autoplay);
    this.setState({
      title: vid.title,
      link: link,
      upvotes: vid.ups,
      comments: vid.num_comments,
      embed: embed
    })
  }

  handleKeyPress(event, parent){
    if (event.key === "ArrowRight"){
      parent.nextVideo();
      event.preventDefault();
    } else if (event.key === "ArrowLeft"){
      parent.prevVideo();
      event.preventDefault();
    }
  }

  nextVideo() {
    if (this.props.videos){
      this.updateVideo(this.props.videos, this.state.current + 1);
      this.setState({
        current: this.state.current + 1
      })
    }
  }

  prevVideo() {
    if (this.props.videos && this.state.current > 0){
      this.updateVideo(this.props.videos, this.state.current - 1);
      this.setState({
        current: this.state.current - 1
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.videos){
      this.updateVideo(nextProps.videos, this.state.current);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="viewer">
          <div className="row">
            <h6 className="alpha">
              Currently Viewing&nbsp;
              <a href={"https://reddit.com/" + this.props.subreddit} className="contentLink" target="_blank">
                <b>{this.props.subreddit}</b>
              </a>
            </h6>
          </div>
          <div className="row">
            <div className="screen">
              <div className="arrowContainer">
                <img src={navArrow} alt="Next Video" className="nextArrow" onClick={this.nextVideo}/>
                <img src={navArrow} alt="Previous Video" className="prevArrow" onClick={this.prevVideo}/>
              </div>
              <div className="frame"></div>
            </div>
          </div>
          <div className="row">
            <a className="contentLink" target="_blank" href={this.state.link}>
              <p className="contentTitle contentLink">{this.state.title}</p>
            </a>
          </div>
          <div className="row viewerBorder">
            <p className="contentStats noselect nomargin">
              <img src={arrow} className="arrow arrowUpvote" alt="upvotes"/>&nbsp;
              {this.state.upvotes}&nbsp;•&nbsp;
              <a className="contentLink" target="_blank" href={this.state.link}>
                {this.state.comments} Comments
              </a>
            </p>
          </div>
          <Browser videos={this.props.videos} current={this.state.current}/>
        </div>
      </div>
    );
  }
}

export default Viewer;
