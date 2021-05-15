/* global chrome */

import React, { Component } from 'react';

import cameraYes from './imgComponents/CameraYes.png';
import cameraNo from './imgComponents/CameraNo.png';

import './settingsComponents.css';


class CameraAccess extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classCameraAccess : null,
        textCameraAccess : null,
        pictureCameraAccess : null,
        mediaDevices : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.mediaDevices)
    {
      this.state = ({
        classCameraAccess:  true,
        textCameraAccess: true,
        pictureCameraAccess: true,
        mediaDevices: true});
    }
    else
    {
      this.state = ({
        classCameraAccess: false,
        textCameraAccess: false,
        pictureCameraAccess: false,
        mediaDevices: false});
    }
  }

  render () {
    let btnCameraAccess = this.state.classCameraAccess ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtCameraAccess = this.state.textCameraAccess ? "On" : "Off";
    let picCameraAccess = this.state.pictureCameraAccess ? cameraYes : cameraNo;
    let settingCameraAccess = this.state.mediaDevices ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Camera" : "Πρόσβαση σε";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Access" : "Συσκευές";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable access to connected input devices like a camera or microphones."  : "Απενεργοποιήστε την πρόσβαση σε συνδεδεμένες συσκευές εισόδου, όπως κάμερα ή μικρόφωνα."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picCameraAccess} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}<br />{elementTextPart2}</h5></div>
              <div><button type="button"className={btnCameraAccess}
              onClick={() => this.onChangeCameraAccess()}>{txtCameraAccess}</button></div>
            </div>
        </div>

    )

  }


 onChangeCameraAccess () {
   this.setState({classCameraAccess: !this.state.classCameraAccess})
   this.setState({textCameraAccess: !this.state.textCameraAccess});
   this.setState({pictureCameraAccess: !this.state.pictureCameraAccess});
   this.setState({mediaDevices: !this.state.mediaDevices});
   this.props.parentCallback(!this.state.mediaDevices);
 }

}


export default CameraAccess
