/* global chrome */

import React, { Component } from 'react';


import osYes from './imgComponents/OsYes.png';
import osNo from './imgComponents/OsNo.png';


import './settingsComponents.css';


class OSInformation extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classOSInformation : null,
        textOSInformation : null,
        pictureOSInformation : null,
        oscpu : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.oscpu)
    {
      this.state = ({
        classOSInformation:  true,
        textOSInformation: true,
        pictureOSInformation: true,
        oscpu: true});
    }
    else
    {
      this.state = ({
        classOSInformation: false,
        textOSInformation: false,
        pictureOSInformation: false,
        oscpu: false});
    }
  }

  render () {
    let btnOSInformation = this.state.classOSInformation ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtOSInformation = this.state.textOSInformation ? "On" : "Off";
    let picOSInformation = this.state.pictureOSInformation ? osYes : osNo;
    let settingOSInformation = this.state.oscpu ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "OS" : "Πληροφορίες";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Information" : "ΛΣ";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the information about the operating system of the device."  : "Απενεργοποιήστε τις πληροφορίες σχετικά με το λειτουργικό σύστημα της συσκευής."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picOSInformation} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}<br />{elementTextPart2}</h5></div>
              <div><button type="button"className={btnOSInformation}
              onClick={() => this.onChangeOSInformation()}>{txtOSInformation}</button></div>
            </div>
        </div>

    )

  }


 onChangeOSInformation () {
   this.setState({classOSInformation: !this.state.classOSInformation})
   this.setState({textOSInformation: !this.state.textOSInformation});
   this.setState({pictureOSInformation: !this.state.pictureOSInformation});
   this.setState({oscpu: !this.state.oscpu});
   this.props.parentCallback(!this.state.oscpu);
 }

}


export default OSInformation
