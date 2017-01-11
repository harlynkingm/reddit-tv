import React, { Component } from 'react';
import $ from 'jquery'
import './Viewer.css'

class Viewer extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 0
    };
  }

  updateVideo(vid){
    console.log(vid);
    var link = "https://reddit.com" + vid.permalink;
    var embed = vid.media_embed.content;
    var embed_autoplay = $(embed).attr('src', $(embed).attr('src') + 'rel=0&autoplay=1');
    $(embed_autoplay).height('100%').width('100%');
    $(".screen").html(embed_autoplay);
    $(".contentTitle").text(vid.title);
    $(".contentLink").attr("href", link);
    $(".commentsLink").attr("href", link);
    $("#upvotes").text(vid.ups);
    $("#downvotes").text(vid.downs);
    $("#comments").text(vid.num_comments);
  }

  render() {
    if (this.props.videos){
      this.updateVideo(this.props.videos[this.state.current].data);
    }
    return (
      <div className="container">
        <div className="viewer">
          <h6 className="alpha">Currently Viewing <b>{this.props.subreddit}</b></h6>
          <div className="screen">

          </div>
          <a className="contentLink"><h6 className="contentTitle"></h6></a>
          <p className="contentStats">
          ▲ <span id="upvotes"></span>&nbsp;
          ▼ <span id="downvotes"></span>&nbsp;•&nbsp;
          <a className="commentsLink"><span id="comments"></span> Comments</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Viewer;
