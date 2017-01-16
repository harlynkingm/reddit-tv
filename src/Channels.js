import React, { Component } from 'react';
import './Channels.css'
import channels from '../public/images/channels.png';

class Channels extends Component {
  constructor(props){
    super(props);
    this.state = {
      hidden: false,
      newSub: ''
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
    this.hideChannels = this.hideChannels.bind(this);
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
    const i = this.props.channels.indexOf(this.props.currentChannel);
    if (i + change >= 0 && i + change < this.props.channels.length){
      this.props.changeChannel(this.props.channels[i + change]);
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
    this.props.addChannel(this.state.newSub);
    this.props.changeChannel(this.state.newSub);
    this.setState({
      newSub: ''
    });
  }

  hideChannels(){
    this.setState({
      hidden: !this.state.hidden
    })
  }

  renderChannel(channel, index){
    if (channel === this.props.currentChannel){
      return <p className="channel selected" key={index}>{channel}</p>
    } else {
      return <p className="channel" key={index} onClick={this.handleClick}>{channel}</p>
    }
  }

  render() {
    var mainClasses = "channels noselect";
    if (this.state.hidden){
      mainClasses += " channelsHidden";
    }
    return (
      <div className={mainClasses}>
        <div className="channelContent">
          <p className="channel channelHeader">Channels</p>
          {
            this.props.channels.map(this.renderChannel)
          }
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.newSub} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} className="newChannel" placeholder="Add Channel..."/>
            <input type="submit" value="Add" className="newChannelButton"/>
          </form>
        </div>
        <img src={channels} alt="Show/Hide Channel" className="channelHide" onClick={this.hideChannels}/>
      </div>
    );
  }
}

export default Channels;
