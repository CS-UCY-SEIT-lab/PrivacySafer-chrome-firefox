/* global chrome */

import React, { Component } from 'react';

import notificYes from './imgComponents/NotificationYes2.png';
import notificNo from './imgComponents/NotificationNo2.png';

import './settingsComponents.css';


class WebNotifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classWebNotifications : null,
        textWebNotifications : null,
        pictureWebNotifications : null,
        notification : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.notification)
    {
      this.state = ({
        classWebNotifications: true,
        textWebNotifications: true,
        pictureWebNotifications: true,
        notification: true});
    }
    else
    {
      this.state = ({
        classWebNotifications: false,
        textWebNotifications: false,
        pictureWebNotifications: false,
        notification: false});
    }
  }

  render () {
    let btnWebNotifications = this.state.classWebNotifications ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtWebNotifications = this.state.textWebNotifications ? "On" : "Off";
    let picWebNotifications = this.state.pictureWebNotifications ? notificYes : notificNo;
    let settingWebNotifications = this.state.notification ? true : false ;

    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Web" : "Ειδοποιήσεις";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Notifications" : "Φυλλομετρητή";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable Web Notifications alerts."  : "Απενεργοποίηση ειδοποιήσεων από τις ιστοσελίδες"

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picWebNotifications} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
    <div><h5 class="card-title CardTitle">{elementTextPart1}<br />{elementTextPart2}</h5></div>
              <div><button type="button"className={btnWebNotifications}
              onClick={() => this.onChangeWebNotifications()}>{txtWebNotifications}</button></div>
            </div>
        </div>

    )

  }


 onChangeWebNotifications () {
   this.setState({classWebNotifications: !this.state.classWebNotifications})
   this.setState({textWebNotifications: !this.state.textWebNotifications});
   this.setState({pictureWebNotifications: !this.state.pictureWebNotifications});
   this.setState({notification: !this.state.notification});
   this.props.parentCallback(!this.state.notification);
 }

}


export default WebNotifications
