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
  }

  componentDidMount(){
    this.loadData(this.state.subreddit);
  }

  loadData(subreddit){
    const r = this;
    $.ajax({
      type: 'GET',
      url: 'https://www.reddit.com/' + subreddit + '/hot.json?raw_json=1',
      data: {limit: 100},
      success: function(data){
        const videos = data.data.children.filter(
          function(val){ return val.data.media != null }
        )
        r.setState({
          subreddit: subreddit,
          videos: videos
        });
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        <Viewer subreddit={this.state.subreddit} videos={this.state.videos}/>
      </div>
    );
  }
}

export default App;
