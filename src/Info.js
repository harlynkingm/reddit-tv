import React, { Component } from 'react';
import './Info.css';
import info from '../public/images/info.png';

class Info extends Component {

  constructor(props){
    super(props);
    this.state = {
      hidden: false,
      left: "",
      right: "",
      up: "",
      down: ""
    };
    const parent = this;
    document.addEventListener("keydown", function(event){
      parent.handleKeyPress(event, parent, true);
    }, false);
    document.addEventListener("keyup", function(event){
      parent.handleKeyPress(event, parent, false);
    }, false);
    this.hideInfo = this.hideInfo.bind(this);
  }

  handleKeyPress(event, parent, keydown){
    if (!parent.state.hidden){
      if (event.key === "ArrowUp"){
        parent.setState({
          up: keydown ? "keyActive" : ""
        })
        event.preventDefault();
      } else if (event.key === "ArrowDown"){
        parent.setState({
          down: keydown ? "keyActive" : ""
        })
        event.preventDefault();
      } else if (event.key === "ArrowLeft"){
        parent.setState({
          left: keydown ? "keyActive" : ""
        })
        event.preventDefault();
      } else if (event.key === "ArrowRight"){
        parent.setState({
          right: keydown ? "keyActive" : ""
        })
        event.preventDefault();
      }
    }
  }

  hideInfo(){
    this.setState({
      hidden: !this.state.hidden
    })
  }

  render() {
    var mainClasses = "info noselect";
    if (this.state.hidden){
      mainClasses += " infoHidden";
    }
    return (
      <div className={mainClasses}>
        <div className="infoContent noselect">
          <p className="infoHeader">About</p>
          <p className="infoBody">
            <b>RedditTV</b> provides a new way to explore reddit video content.
          </p>
          <p className="infoBody">
            Like a telvision remote, you can use your <b>arrow keys</b> to navigate.
          </p>
          <p className="infoBody arrowKeys">
            <span className={this.state.left}>←</span>
            &nbsp;&nbsp;&nbsp;
            <span className={this.state.right}>→</span>
          </p>
          <p className="infoBody">Use the <b>left</b> and <b>right</b> arrow keys to change videos.</p>
          <p className="infoBody arrowKeys">
            <span className={this.state.up}>↑</span>
            &nbsp;&nbsp;&nbsp;
            <span className={this.state.down}>↓</span>
          </p>
          <p className="infoBody">Use the <b>up</b> and <b>down</b> arrow keys to change the channel.</p>
          <p className="infoBody">Go ahead, try it.</p>
          <br />
        </div>
        <img src={info} alt="Show/Hide Info" className="infoHide" onClick={this.hideInfo}/>
      </div>
    )
  }
}

export default Info;
