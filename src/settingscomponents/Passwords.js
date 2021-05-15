/* global chrome */

import React, { Component } from 'react';

import passwordYes from './imgComponents/lockedYes.png';
import passwordNo from './imgComponents/lockedNo.png';

import './settingsComponents.css';


class Passwords extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classPassword : null,
        textPassword : null,
        picturePassword : null,
        credentials : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.credentials)
    {
      this.state = ({
        classPassword : true,
        textPassword : true,
        picturePassword : true,
        credentials : true});
    }
    else
    {
      this.state = ({
        classPassword: false,
        textPassword: false,
        picturePassword: false,
        credentials: false});
    }
  }

  render () {
    let btnPermission = this.state.classPassword ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtPermission = this.state.textPassword ? "On" : "Off";
    let picPermission = this.state.picturePassword ? passwordYes : passwordNo;
    let settingPassword = this.state.credentials ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Save" : "Αποθήκευση";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Credentials" : "Στοιχείων";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the ability of web application to ask user to store/save his credential."  : "Απενεργοποιήστε τη δυνατότητα διαφάφορων εφαρμογών ιστού να ζητούν την συγκατάθεση του χρήση για αποθήκευση των στοιχείων πρόσβασης του."

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
   this.setState({classPassword: !this.state.classPassword})
   this.setState({textPassword: !this.state.textPassword});
   this.setState({picturePassword: !this.state.picturePassword});
   this.setState({credentials: !this.state.credentials});
   this.props.parentCallback(!this.state.credentials);
 }

}


export default Passwords
