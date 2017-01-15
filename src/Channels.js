import React, { Component } from 'react';
import './Channels.css'

class Channels extends Component {
  constructor(props){
    super(props);
    this.state = {
      newSub: '',
      channels: [
      'r/videos',
      'r/youtubehaiku',
      'r/cringe',
      'r/trailers',
      'r/musicvideos',
      'r/standupcomedy',
      'r/deepintoyoutube'
      ]
    };
    const parent = this;
    document.addEventListener("keydown", function(event){
      parent.handleKeyPress(event, parent);
    }, false);
    this.renderChannel = this.renderChannel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchChannel = this.switchChannel.bind(this);
  }

  handleKeyPress(event, parent){
    if (event.key === "ArrowUp"){
      parent.switchChannel(-1);
      event.preventDefault();
    } else if (event.key === "ArrowDown"){
      parent.switchChannel(1);
      event.preventDefault();
    }
  }

  switchChannel(change){
    const i = this.state.channels.indexOf(this.props.currentChannel);
    if (i + change >= 0 && i + change < this.state.channels.length){
      this.props.changeChannel(this.state.channels[i + change]);
      this.props.resetCurrent();
    }
  }

  handleClick(e){
    this.props.changeChannel(e.currentTarget.textContent);
    this.props.resetCurrent();
  }

  handleChange(e){
    var newValue = e.target.value;
    if (newValue.length < 2){
      newValue = 'r/'
    } else if (!newValue.startsWith('r/')){
      newValue = 'r/' + newValue;
    }
    this.setState({
      newSub: newValue
    });
  }

  handleFocus(e){
    if (e.target.value === ''){
      this.setState({
        newSub: 'r/'
      });
    }
  }

  handleBlur(e){
    if (e.target.value === 'r/'){
      this.setState({
        newSub: ''
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const c = this.state.channels;
    c.push(this.state.newSub);
    this.props.changeChannel(this.state.newSub);
    this.setState({
      newSub: '',
      channels: c
    });
  }

  renderChannel(channel, index){
    if (channel === this.props.currentChannel){
      return <p className="channel selected" key={index}>{channel}</p>
    } else {
      return <p className="channel" key={index} onClick={this.handleClick}>{channel}</p>
    }
  }

  render() {
    return (
      <div className="channels noselect">
        <p className="channel channelHeader">Channels</p>
        {
          this.state.channels.map(this.renderChannel)
        }
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.newSub} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} className="newChannel" placeholder="Add Channel..."/>
          <input type="submit" value="Add" className="newChannelButton"/>
        </form>
      </div>
    );
  }
}

export default Channels;
