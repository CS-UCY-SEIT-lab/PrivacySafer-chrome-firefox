/* global chrome */

import React, { Component } from 'react';

import screenOriYes from './imgComponents/ScreenOrientationYes.png';
import screenOriNo from './imgComponents/ScreenOrientationNo.png';

import './settingsComponents.css';


class ScreenOrientation extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classScreenOrientation : null,
        textScreenOrientation : null,
        pictureScreenOrientation : null,
        orientationchange : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.orientationchange)
    {
      this.state = ({
        classScreenOrientation:  true,
        textScreenOrientation: true,
        pictureScreenOrientation: true,
        orientationchange: true});
    }
    else
    {
      this.state = ({
        classScreenOrientation: false,
        textScreenOrientation: false,
        pictureScreenOrientation: false,
        orientationchange: false});
    }
  }


  render () {
    let btnScreenOrientation = this.state.classScreenOrientation ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtScreenOrientation = this.state.textScreenOrientation ? "On" : "Off";
    let picScreenOrientation = this.state.pictureScreenOrientation ? screenOriYes : screenOriNo;
    let settingScreenOrientation = this.state.orientationchange ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Screen Orientation" : "Προσανατολισμός οθόνης";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the information related to the current orientation of the document."  : "Απενεργοποιήστε τις πληροφορίες που σχετίζονται με τον τρέχοντα προσανατολισμό του εγγράφου."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picScreenOrientation} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}</h5></div>
              <div><button type="button"className={btnScreenOrientation}
              onClick={() => this.onChangeScreenOrientation()}>{txtScreenOrientation}</button></div>
            </div>
        </div>

    )

  }


 onChangeScreenOrientation () {
   this.setState({classScreenOrientation: !this.state.classScreenOrientation})
   this.setState({textScreenOrientation: !this.state.textScreenOrientation});
   this.setState({pictureScreenOrientation: !this.state.pictureScreenOrientation});
   this.setState({orientationchange: !this.state.orientationchange});
   this.props.parentCallback(!this.state.orientationchange);
 }

}


export default ScreenOrientation
