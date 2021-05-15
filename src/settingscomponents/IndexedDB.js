/* global chrome */

import React, { Component } from 'react';

import notificYes from './imgComponents/NotificationYes2.png';
import notificNo from './imgComponents/NotificationNo2.png';

import dataYes from './imgComponents/DataYes.png';
import dataNo from './imgComponents/dataNo.png';

import './settingsComponents.css';


class IndexedDB extends Component {

  constructor(props) {
    super(props);
    this.state = {
        classIndexedDB : null,
        textIndexedDB : null,
        pictureIndexedDB : null,
        indexedDB : null}
    this.updateState();
  }

  updateState()
  {
    if (this.props.savedUserSettings.indexedDB)
    {
      this.state = ({
        classIndexedDB:  true,
        textIndexedDB: true,
        pictureIndexedDB: true,
        indexedDB: true});
    }
    else
    {
      this.state = ({
        classIndexedDB: false,
        textIndexedDB: false,
        pictureIndexedDB: false,
        indexedDB: false});
    }
  }

  render () {
    let btnIndexedDB = this.state.classIndexedDB ? "btn btn-outline-success btn-sm CardButton" : "btn btn-outline-danger btn-sm CardButton" ;
    let txtIndexedDB = this.state.textIndexedDB ? "On" : "Off";
    let picIndexedDB = this.state.pictureIndexedDB ? dataYes : dataNo;
    let settingIndexedDB = this.state.indexedDB ? true : false ;
    let elementDescription = this.props.savedUserSettings.language == 'en' ? "Disable the access and retrieval of saved files of the device."  : "Απενεργοποιήστε την πρόσβαση και ανάκτηση αποθηκευμένων αρχείων της συσκευής."

    return (
        <div class="card CardDiv" title={elementDescription}>
            <div><img class="card-img-top cardImage" src={picIndexedDB} alt="Card image cap" /></div>
            <div class="card-body CardBody CardTitle">
              <div><h5 class="card-title CardTitle">IndexedDB<br/><br/></h5></div>
              <div><button type="button"className={btnIndexedDB}
              onClick={() => this.onChangeIndexedDB()}>{txtIndexedDB}</button></div>
            </div>
        </div>

    )

  }


 onChangeIndexedDB () {
   this.setState({classIndexedDB: !this.state.classIndexedDB})
   this.setState({textIndexedDB: !this.state.textIndexedDB});
   this.setState({pictureIndexedDB: !this.state.pictureIndexedDB});
   this.setState({indexedDB: !this.state.indexedDB});
   this.props.parentCallback(!this.state.indexedDB);
 }

}


export default IndexedDB
