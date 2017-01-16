import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header';
import Viewer from './Viewer';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      subreddit: 'r/Videos',
      videos: null,
      channels: [
      'r/Videos',
      'r/YouTubeHaiku',
      'r/ContagiousLaughter',
      'r/Cringe',
      'r/Trailers',
      'r/UnexpectedThugLife',
      'r/AccidentalComedy',
      'r/YouTubeClassics',
      'r/DeepIntoYouTube',
      'r/PlayItAgainSam',
      'r/ArtisanVideos',
      'r/MealTimeVideos'
      ]
    };
    this.loadData = this.loadData.bind(this);
    this.loadedData = this.loadedData.bind(this);
    this.addChannel = this.addChannel.bind(this);
  }

  addChannel(newChannel){
    const c = this.state.channels;
    c.push(newChannel);
    this.setState({
      channels: c
    });
  }

  componentDidMount(){
    this.loadData(this.state.subreddit);
  }

  loadData(subreddit){
    $.ajax({
      type: 'GET',
      url: 'https://www.reddit.com/' + subreddit + '/hot.json?raw_json=1',
      data: {limit: 99},
      success: this.loadedData
    });
    this.setState({
      subreddit: subreddit,
      videos: null
    });
  }

  loadedData(data){
    const videos = data.data.children.filter(
      function(val){ return val.data.media != null }
    )
    this.setState({
      videos: videos
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Viewer subreddit={this.state.subreddit} videos={this.state.videos} currentChannel={this.state.subreddit} changeChannel={this.loadData} channels={this.state.channels} addChannel={this.addChannel}/>
      </div>
    );
  }
}

export default App;
