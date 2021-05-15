/* global chrome */

import React, { Component } from 'react';


import locationYes from './imgComponents/LocationYes.png';
import locationNo from './imgComponents/LocationNo.png';

import './settingsComponents.css';


class CurrentPosition extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classPosition : null,
        textPosition : null,
        picturePosition : null,
        geolocation : null}
    this.updateState();
  }

  updateState()
  {
    //userSettings();
    if (this.props.savedUserSettings.geolocation)
    {
      this.state = ({
        classPosition :  true,
        textPosition : true,
        picturePosition : true,
        geolocation : true});
    }
    else
    {
      this.state = ({
        classPosition: false,
        textPosition : false,
        picturePosition : false,
        geolocation : false});
    }
  }


  render () {
    let btnPosition = this.state.classPosition ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtPosition = this.state.textPosition ? "On" : "Off";
    let picPosition = this.state.picturePosition ? locationYes : locationNo;
    let settingPosition = this.state.geolocation ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Current" : "Τρέχουσα";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Position" : "Τοποθεσία";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable your location to web applications.\nFor example, hide your current location on a map."  : "Απενεργοποιήστε την τοποθεσία σας από τις ιστοσελίδες.\nΓια παράδειγμα, αποκρύψτε την τρέχουσα τοποθεσία σας από κάποιο χάρτη"

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picPosition} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle"> 
              <div><h5 class="card-title CardTitle">{elementTextPart1}<br />{elementTextPart2}</h5></div>
              <div><button id="currentLocation" type="button"className={btnPosition}
              onClick={() => this.onChangeCurrentPosition()}>{txtPosition}</button></div>
            </div>
        </div>

    )

  }


 onChangeCurrentPosition () {
   this.setState({classPosition: !this.state.classPosition})
   this.setState({textPosition: !this.state.textPosition});
   this.setState({picturePosition: !this.state.picturePosition});
   this.setState({geolocation: !this.state.geolocation});
   this.props.parentCallback(!this.state.geolocation);
 }



}


export default CurrentPosition
