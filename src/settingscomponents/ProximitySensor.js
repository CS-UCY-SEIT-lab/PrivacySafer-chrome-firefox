/* global chrome */

import React, { Component } from 'react';

import proximityYes from './imgComponents/UserProximityYes.png';
import proximityNo from './imgComponents/UserProximityNo.png';

import './settingsComponents.css';


class ProximitySensor extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classProximitySensor : null,
        textProximitySensor : null,
        pictureProximitySensor : null,
        userproximity : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.userproximity)
    {
      this.state = ({
        classProximitySensor:  true,
        textProximitySensor: true,
        pictureProximitySensor: true,
        userproximity: true});
    }
    else
    {
      this.state = ({
        classProximitySensor: false,
        textProximitySensor: false,
        pictureProximitySensor: false,
        userproximity: false});
    }
  }

  render () {
    let btnProximitySensor = this.state.classProximitySensor ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtProximitySensor = this.state.textProximitySensor ? "On" : "Off";
    let picProximitySensor = this.state.pictureProximitySensor ? proximityYes : proximityNo;
    let settingProximitySensor = this.state.userproximity ? true : false ;
    let elementTextPart1 = this.props.savedUserSettings.language == 'en'  ? "Proximity" : "Αισθητήρας";
    let elementTextPart2 = this.props.savedUserSettings.language == 'en'  ? "Sensor" : "Εγγύτητας";
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the information which indicates the nearby presence of physical objects."  : "Απενεργοποιήστε τις πληροφορίες που υποδεικνύουν την κοντινή παρουσία φυσικών αντικειμένων."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picProximitySensor} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">{elementTextPart1}<br/>{elementTextPart2}</h5></div>
              <div><button type="button"className={btnProximitySensor}
              onClick={() => this.onChangeProximitySensor()}>{txtProximitySensor}</button></div>
            </div>
        </div>

    )

  }


 onChangeProximitySensor () {
   this.setState({classProximitySensor: !this.state.classProximitySensor})
   this.setState({textProximitySensor: !this.state.textProximitySensor});
   this.setState({pictureProximitySensor: !this.state.pictureProximitySensor});
   this.setState({userproximity: !this.state.userproximity});
   this.props.parentCallback(!this.state.userproximity);
 }

}


export default ProximitySensor
