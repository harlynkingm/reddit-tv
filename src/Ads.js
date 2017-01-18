import React, { Component } from 'react';

class Ads extends Component {

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    const adstyle = {"display": "block"}
    return (
    <div className="ad">
      <ins className="adsbygoogle"
         style={adstyle}
         data-ad-client="ca-pub-5302196165226715"
         data-ad-slot="2322040588"
         data-ad-format="auto"></ins>
    </div>
    )
  }
}

export default Ads;
