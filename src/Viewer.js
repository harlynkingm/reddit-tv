import React, { Component } from 'react';
import $ from 'jquery';
import './Viewer.css';
import arrow from '../public/images/arrow.png';

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
  }

  updateVideo(videos, current){
    const vid = videos[current].data;
    console.log(vid);
    var link = "https://reddit.com" + vid.permalink;
    var embed = vid.media_embed.content;
    var embed_autoplay = $(embed).attr('src', $(embed).attr('src') + 'rel=0&autoplay=1');
    $(embed_autoplay).height('100%').width('100%');
    $(".screen").html(embed_autoplay);
    this.setState({
      title: vid.title,
      link: link,
      upvotes: vid.ups,
      comments: vid.num_comments,
      embed: embed
    })
  }

  // handleKeyPress(event){
  //   if (event.key === "ArrowRight"){
  //     ctx.nextVideo();
  //     event.preventDefault();
  //   } else if (event.key === "ArrowLeft"){
  //     ctx.prevVideo();
  //     event.preventDefault();
  //   }
  // }

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
          <h6 className="alpha">
            Currently Viewing&nbsp;
            <a href={"https://reddit.com/" + this.props.subreddit} className="contentLink" target="_blank">
              <b>{this.props.subreddit}</b>
            </a>
          </h6>
          <div className="screen"></div>
          <div className="row">
            <a className="contentLink" target="_blank" href={this.state.link}>
              <p className="contentTitle contentLink">{this.state.title}</p>
            </a>
          </div>
          <div className="row">
            <p className="contentStats">
              <img src={arrow} className="arrow arrowUpvote noselect" alt="upvotes"/>&nbsp;
              {this.state.upvotes}&nbsp;•&nbsp;
              <a className="contentLink" target="_blank" href={this.state.link}>
                {this.state.comments} Comments
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
