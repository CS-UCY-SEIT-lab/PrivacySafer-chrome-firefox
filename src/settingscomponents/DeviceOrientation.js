/* global chrome */

import React, { Component } from 'react';

import deviceOriYes from './imgComponents/DeviceOriYes.png';
import deviceOriNo from './imgComponents/DeviceOriNo.png';

import './settingsComponents.css';


class DeviceOrientation extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classDeviceOrientation : null,
        textDeviceOrientation : null,
        pictureDeviceOrientation : null,
        deviceorientation : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.deviceorientation)
    {
      this.state = ({
          classDeviceOrientation : true,
          textDeviceOrientation : true,
          pictureDeviceOrientation : true,
          deviceorientation : true});
    }
    else
    {
      this.state = ({
          classDeviceOrientation : false,
          textDeviceOrientation : false,
          pictureDeviceOrientation : false,
          deviceorientation : false});
    }
  }

  render () {
    let btnDeviceOrientation = this.state.classDeviceOrientation ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtDeviceOrientation = this.state.textDeviceOrientation ? "On" : "Off";
    let picDeviceOrientation = this.state.pictureDeviceOrientation ? deviceOriYes : deviceOriNo;
    let settingDeviceOrientation = this.state.deviceorientation ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Device Orientation" : "Προσανατολισμός συσκευής";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the information related to the physical orientation of the device."  : "Απενεργοποιήστε τις πληροφορίες που σχετίζονται με τον φυσικό προσανατολισμό της συσκευής."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picDeviceOrientation} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle"><span className="redstar">*</span>{elementTextPart1}</h5></div>
              <div><button type="button"className={btnDeviceOrientation}
              onClick={() => this.onChangeDeviceOrientation()}>{txtDeviceOrientation}</button></div>
            </div>
        </div>

    )

  }


 onChangeDeviceOrientation () {
   this.setState({classDeviceOrientation: !this.state.classDeviceOrientation})
   this.setState({textDeviceOrientation: !this.state.textDeviceOrientation});
   this.setState({pictureDeviceOrientation: !this.state.pictureDeviceOrientation});
   this.setState({deviceorientation: !this.state.deviceorientation});
   this.props.parentCallback(!this.state.deviceorientation);
 }

}


export default DeviceOrientation
