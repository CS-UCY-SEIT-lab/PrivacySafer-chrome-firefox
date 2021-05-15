/* global chrome */

import React, { Component } from 'react';

import browserYes from './imgComponents/browserYes.png';
import browserkNo from './imgComponents/browserNo.png';

import './settingsComponents.css';


class BrowserInformation extends Component {

  constructor(props) {
    super(props);
    this.state = { }
    this.state = {
        classBrowserInformation : null,
        textBrowserInformation : null,
        pictureBrowserInformation : null,
        userAgent : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.userAgent)
    {
      this.state = ({
        classBrowserInformation:  true,
        textBrowserInformation: true,
        pictureBrowserInformation: true,
        userAgent: true});
    }
    else
    {
      this.state = ({
        classBrowserInformation: false,
        textBrowserInformation: false,
        pictureBrowserInformation: false,
        userAgent: false});
    }
  }

  render () {
    let btnBrowserInformation = this.state.classBrowserInformation ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtBrowserInformation = this.state.textBrowserInformation ? "On" : "Off";
    let picBrowserInformation = this.state.pictureBrowserInformation ? browserYes : browserkNo;
    let settingBrowserInformation = this.state.userAgent ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Browser Information" : "Πληροφορίες Φυλλομετρητή";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the information about the browser."  : "Απενεργοποιήστε τις πληροφορίες σχετικά με το φυλλομετρητή ιστού."

    return (
        <div class="card CardDiv"  title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picBrowserInformation} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}</h5></div>
              <div><button type="button"className={btnBrowserInformation}
              onClick={() => this.onChangeBrowserInformation()}>{txtBrowserInformation}</button></div>
            </div>
        </div>

    )

  }


  onChangeBrowserInformation () {
   this.setState({classBrowserInformation: !this.state.classBrowserInformation})
   this.setState({textBrowserInformation: !this.state.textBrowserInformation});
   this.setState({pictureBrowserInformation: !this.state.pictureBrowserInformation});
   this.setState({userAgent: !this.state.userAgent});
   this.props.parentCallback(!this.state.userAgent);
 }

}


export default BrowserInformation
