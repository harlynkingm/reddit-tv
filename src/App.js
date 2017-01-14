import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header';
import Viewer from './Viewer';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      subreddit: 'r/videos',
      videos: null
    };
    this.loadData = this.loadData.bind(this);
    this.loadedData = this.loadedData.bind(this);
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
        <Viewer subreddit={this.state.subreddit} videos={this.state.videos} currentChannel={this.state.subreddit} changeChannel={this.loadData}/>
      </div>
    );
  }
}

export default App;
