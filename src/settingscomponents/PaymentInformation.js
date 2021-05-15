/* global chrome */

import React, { Component } from 'react';

import payReqYes from './imgComponents/PaymentReqYes.png';
import payReqNo from './imgComponents/PaymentReqNo.png';

import './settingsComponents.css';


class PaymentInformation extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classPaymentInformation : null,
        textPaymentInformation : null,
        picturePaymentInformation : null,
        paymentRequest : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.paymentRequest)
    {
      this.state = ({
        classPaymentInformation:  true,
        textPaymentInformation: true,
        picturePaymentInformation: true,
        paymentRequest: true});
    }
    else
    {
      this.state = ({
        classPaymentInformation: false,
        textPaymentInformation: false,
        picturePaymentInformation: false,
        paymentRequest: false});
    }
  }

  render () {
    let btnPaymentInformation = this.state.classPaymentInformation ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtPaymentInformation = this.state.textPaymentInformation ? "On" : "Off";
    let picPaymentInformation = this.state.picturePaymentInformation ? payReqYes : payReqNo;
    let settingPaymentInformation = this.state.paymentRequest ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Payment Request" : "Αίτημα πληρωμής";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the ability to complete an online payment."  : "Απενεργοποιήστε τη δυνατότητα ολοκλήρωσης μιας ηλεκτρονικής πληρωμής."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picPaymentInformation} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}</h5></div>
              <div><button type="button"className={btnPaymentInformation}
              onClick={() => this.onChangePaymentInformation()}>{txtPaymentInformation}</button></div>
            </div>
        </div>

    )

  }


 onChangePaymentInformation () {
   this.setState({classPaymentInformation: !this.state.classPaymentInformation})
   this.setState({textPaymentInformation: !this.state.textPaymentInformation});
   this.setState({picturePaymentInformation: !this.state.picturePaymentInformation});
   this.setState({paymentRequest: !this.state.paymentRequest});
   this.props.parentCallback(!this.state.paymentRequest);
 }

}


export default PaymentInformation
