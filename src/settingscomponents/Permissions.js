/* global chrome */

import React, { Component } from 'react';

import permissionYes from './imgComponents/lockedYes.png';
import permissionNo from './imgComponents/lockedNo.png';

import './settingsComponents.css';


class Permissions extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classPermissions : null,
        textPermissions : null,
        picturePermissions : null,
        permissions : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.permissions)
    {
      this.state = ({
        classPermissions : true,
        textPermissions : true,
        picturePermissions : true,
        permissions : true});
    }
    else
    {
      this.state = ({
        classPermissions: false,
        textPermissions: false,
        picturePermissions: false,
        permissions: false});
    }
  }

  render () {
    let btnPermission = this.state.classPermissions ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtPermission = this.state.textPermissions ? "On" : "Off";
    let picPermission = this.state.picturePermissions ? permissionYes : permissionNo;
    let settingPermission = this.state.permissions ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Permissions" : "Δικαίωμα";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "" : "Πρόσβασης";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the ability of web application to ask user consents for features like notification or geolocation."  : "Απενεργοποιήστε τη δυνατότητα διαφάφορων εφαρμογών ιστού να ζητούν την συγκατάθεση του χρήση για πρόσβαση σε διάφορες πληροφορίες όπως ειδοποήσεις ή γεωγραφική τοποθεσία."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picPermission} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}<br />{elementTextPart2}</h5></div>
              <div><button type="button"className={btnPermission}
              onClick={() => this.onChangePermissions()}>{txtPermission}</button></div>
            </div>
        </div>

    )

  }


  onChangePermissions () {
   this.setState({classPermissions: !this.state.classPermissions})
   this.setState({textPermissions: !this.state.textPermissions});
   this.setState({picturePermissions: !this.state.picturePermissions});
   this.setState({permissions: !this.state.permissions});
   this.props.parentCallback(!this.state.permissions);
 }

}


export default Permissions
