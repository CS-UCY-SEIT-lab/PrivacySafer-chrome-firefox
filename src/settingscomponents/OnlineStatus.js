/* global chrome */

import React, { Component } from 'react';

import onlineYes from './imgComponents/OnLineYes.png';
import onlineNo from './imgComponents/OnLineNo.png';

import './settingsComponents.css';


class OnlineStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classOnlineStatus : null,
        textOnlineStatus : null,
        pictureOnlineStatus : null,
        onLine : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.onLine)
    {
      this.state = ({
        classOnlineStatus:  true,
        textOnlineStatus: true,
        pictureOnlineStatus: true,
        onLine: true});
    }
    else
    {
      this.state = ({
        classOnlineStatus: false,
        textOnlineStatus: false,
        pictureOnlineStatus: false,
        onLine: false});
    }
  }

  render () {
    let btnOnlineStatus = this.state.classOnlineStatus ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtOnlineStatus = this.state.textOnlineStatus ? "On" : "Off";
    let picOnlineStatus = this.state.pictureOnlineStatus ? onlineYes : onlineNo;
    let settingOnlineStatus = this.state.onLine ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Online" : "Κατάσταση";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Status" : "Φυλλομετρητή";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Change browser status from online to offline."  : "Αλλάξτε την κατάσταση του φυλλομετρητή."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picOnlineStatus} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}<br/>{elementTextPart2}</h5></div>
              <div><button type="button"className={btnOnlineStatus}
              onClick={() => this.onChangeOnlineStatus()}>{txtOnlineStatus}</button></div>
            </div>
        </div>

    )

  }


 onChangeOnlineStatus () {
   this.setState({classOnlineStatus: !this.state.classOnlineStatus})
   this.setState({textOnlineStatus: !this.state.textOnlineStatus});
   this.setState({pictureOnlineStatus: !this.state.pictureOnlineStatus});
   this.setState({onLine: !this.state.onLine});
   this.props.parentCallback(!this.state.onLine);
 }

}


export default OnlineStatus
