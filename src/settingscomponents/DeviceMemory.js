/* global chrome */

import React, { Component } from 'react';

import deviceMemoryYes from './imgComponents/RamYes.png';
import deviceMemoryNo from './imgComponents/RamNo.png';

import './settingsComponents.css';


class DeviceMemory extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classDeviceMemory : null,
        textDeviceMemory : null,
        pictureDeviceMemory : null,
        deviceMemory : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.deviceMemory)
    {
      this.state = ({
        classDeviceMemory : true,
        textDeviceMemory : true,
        pictureDeviceMemory : true,
        deviceMemory : true});
    }
    else
    {
      this.state = ({
        classDeviceMemory: false,
        textDeviceMemory: false,
        pictureDeviceMemory: false,
        deviceMemory: false});
    }
  }

  render () {
    let btnDeviceMemory= this.state.classDeviceMemory ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtDeviceMemory = this.state.textDeviceMemory ? "On" : "Off";
    let picDeviceMemory = this.state.pictureDeviceMemory ? deviceMemoryYes : deviceMemoryNo;
    let settingdeviceMemory = this.state.deviceMemory ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Device" : "Μνήμη";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Memory" : "Συσκευής";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the ability of Web applications to access the information related to the size of the RAM memory."  : "Απενεργοποιήστε τη δυνατότητα διαφάφορων εφαρμογών ιστού να έχουν πρόσβαση σε πληροφορίες που αφορούν τη RAM μνήμη της συσκευής."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picDeviceMemory} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}<br />{elementTextPart2}</h5></div>
              <div><button type="button"className={btnDeviceMemory}
              onClick={() => this.onChangeDeviceMemory()}>{txtDeviceMemory}</button></div>
            </div>
        </div>

    )

  }


  onChangeDeviceMemory () {
   this.setState({classDeviceMemory: !this.state.classDeviceMemory})
   this.setState({textDeviceMemory: !this.state.textDeviceMemory});
   this.setState({pictureDeviceMemory: !this.state.pictureDeviceMemory});
   this.setState({deviceMemory: !this.state.deviceMemory});
   this.props.parentCallback(!this.state.deviceMemory);
 }

}


export default DeviceMemory
