/* global chrome */

import React, { Component } from 'react';

import addressYes from './imgComponents/AddressYes.png';
import addressNo from './imgComponents/AddressNo.png';

import './settingsComponents.css';


class AddressInformation extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classAddressInformation : null,
        textAddressInformation : null,
        pictureAddressInformation : null,
        paymentAddress : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.paymentAddress)
    {
    this.state= ({
      classAddressInformation : true,
      textAddressInformation : true,
      pictureAddressInformation : true,
      paymentAddress : true});
    }
    else
    {
      this.state= ({
        classAddressInformation: false,
        textAddressInformation: false,
        pictureAddressInformation: false,
        paymentAddress: false});
    }
  }

  render () {
    let btnAddressInformation = this.state.classAddressInformation ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtAddressInformation = this.state.textAddressInformation ? "On" : "Off";
    let picAddressInformation = this.state.pictureAddressInformation ? addressYes : addressNo;
    let settingAddressInformation = this.state.paymentAddress ? true : false ;

    return (
        <div class="card CardDiv" title="Change the shipping address provided by the user.">
            <div><img class="card-img-top cardImage" src={picAddressInformation} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">Address Information</h5></div>
              <div><button type="button"className={btnAddressInformation}
              onClick={() => this.onChangeAddressInformation()}>{txtAddressInformation}</button></div>
            </div>
        </div>

    )

  }


 onChangeAddressInformation () {
   this.setState({classAddressInformation: !this.state.classAddressInformation})
   this.setState({textAddressInformation: !this.state.textAddressInformation});
   this.setState({pictureAddressInformation: !this.state.pictureAddressInformation});
   this.setState({paymentAddress: !this.state.paymentAddress});
   this.props.parentCallback(!this.state.paymentAddress);
 }


}


export default AddressInformation
