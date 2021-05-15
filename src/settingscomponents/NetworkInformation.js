/* global chrome */

import React, { Component } from 'react';

import networkYes from './imgComponents/WifiYes.png';
import networkNo from './imgComponents/WifiNo.png';

import './settingsComponents.css';


class NetworkInformation extends Component {

  constructor(props) {
    super(props);
    this.state = { }
    this.state = {
        classNetworkInformation : null,
        textNetworkInformation : null,
        pictureNetworkInformation : null,
        connection : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.connection)
    {
      this.state = ({
        classNetworkInformation:  true,
        textNetworkInformation: true,
        pictureNetworkInformation: true,
        connection: true});
    }
    else
    {
      this.state = ({
        classNetworkInformation: false,
        textNetworkInformation: false,
        pictureNetworkInformation: false,
        connection: false});
    }
  }

  render () {
    let btnNetworkInformation = this.state.classNetworkInformation ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtNetworkInformation = this.state.textNetworkInformation ? "On" : "Off";
    let picNetworkInformation = this.state.pictureNetworkInformation ? networkYes : networkNo;
    let settingNetworkInformation = this.state.connection ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Network Information" : "Πληροφορίες Δικτύου";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the information about the network connection of a device."  : "Απενεργοποιήστε τις πληροφορίες σχετικά με τη σύνδεση τη συσκευής στο δίκτυο."

    return (
        <div class="card CardDiv"  title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picNetworkInformation} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}</h5></div>
              <div><button type="button"className={btnNetworkInformation}
              onClick={() => this.onChangeNetworkInformation()}>{txtNetworkInformation}</button></div>
            </div>
        </div>

    )

  }


 onChangeNetworkInformation () {
   this.setState({classNetworkInformation: !this.state.classNetworkInformation})
   this.setState({textNetworkInformation: !this.state.textNetworkInformation});
   this.setState({pictureNetworkInformation: !this.state.pictureNetworkInformation});
   this.setState({connection: !this.state.connection});
   this.props.parentCallback(!this.state.connection);
 }

}


export default NetworkInformation
