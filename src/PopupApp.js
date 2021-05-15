/* global chrome */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Collapsible from 'react-collapsible';
import * as emailjs from 'emailjs-com';
import CurrentPosition from './settingscomponents/CurrentPosition';
import DeviceOrientation from './settingscomponents/DeviceOrientation';
import ScreenOrientation from './settingscomponents/ScreenOrientation';
import Brightness from './settingscomponents/Brightness';
import ProximitySensor from './settingscomponents/ProximitySensor';
import VibrationAccess from './settingscomponents/VibrationAccess';
import CameraAccess from './settingsComponents/CameraAccess';
import OnlineStatus from './settingsComponents/OnlineStatus';
import NetworkInformation from './settingsComponents/NetworkInformation';
import WebNotifications from './settingsComponents/WebNotifications';
import IndexedDB from './settingsComponents/IndexedDB';
import OsInformation from './settingsComponents/OsInformation';
import PaymentInformation from './settingsComponents/PaymentInformation';
import AddressInformation from './settingsComponents/AddressInformation';
import BrowserInformation from './settingscomponents/BrowserInformation';
import Permissions from './settingscomponents/Permissions';
import Passwords from './settingscomponents/Passwords';
import DeviceMemory from './settingscomponents/DeviceMemory';
import basicSettingManual from './files/PrivaySaferII_UserManual_BasicSettings.pdf';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  browserName, 
  CustomView,
  isChromium,
  osName
} from "react-device-detect";

import PropTypes from 'prop-types';
 
// Translation Higher Order Component


import logoPic from './logo-CyberSafety.svg';
import logoCs from './CS-UCY.png';
import seitlab from './seitlab.png';

import './bootstrap.css';
import './PopupApp.css';

const Chrome_NEW_TAB = 'chrome://newtab'

const { detect } = require('detect-browser');
const browser = detect();

class PopupApp extends Component {
  componentWillMount() {
  }

  constructor(props) {
    super(props);
    this.state = { geolocation : true,
              deviceorientation: true,
              orientationchange: true,
              devicelight : true,
              userproximity : true,
              vibrate : true,
              mediaDevices: true,
              onLine : true,
              notification : true,
              connection : true,
              oscpu : true,
              indexedDB : true,
              paymentRequest : true,
              paymentAddress : true,
              userAgent: true,
              permissions: true,
              credentials: true,
              deviceMemory : true,
              language:'en'};
              this.resetUserSettings();
        console.log(window.navigator.connection);
        console.log("agent" + window.navigator.appVersion);
  }


  handleSubmit() {

     if (this.state.language == "en") 
     {
        var messageInput = prompt("Please enter the page and the setting that does not work", "e.g. www.example.com, Current Position");
     }
     else
     {
      var messageInput = prompt("Παρακαλώ αναφέρετε τη σελίδα και τη ρύθμιση που δεν λειτουργεί", "π.χ. www.example.com, Current Position");
     }
      

      if (messageInput != null) {
        const templateId = 'privacysaferbasictemplate';
        const userid ='user_pr5aoCGtppWN34hr83BLs'
        const message = messageInput;
        this.sendFeedback(templateId, message, userid)
      }
  }

  sendFeedback (templateId, message,  userid) {
      emailjs.send(
            'gmail', templateId,
            {message},
            userid
          ).then(res => {
          console.log('Email successfully sent!')
          })
          // Handle errors here however you like, or use a React error boundary
          .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
        }


  reset() {
      chrome.storage.sync.clear(() => {
        chrome.tabs.create({});
      });
  }

  setInitialState = () => {
    this.state = ({ geolocation : true,
              deviceorientation: true,
              orientationchange: true,
              devicelight : true,
              userproximity : true,
              vibrate : true,
              mediaDevices: true,
              onLine : true,
              notification : true,
              connection : true,
              oscpu : true,
              indexedDB : true,
              paymentRequest : true,
              paymentAddress : true,
              userAgent: true,
              permissions : true,
              credentials : true,
              deviceMemory : true,
              language:'en'});
              chrome.storage.local.set({'user-preferences': this.state}, function() {
               console.log('Settings saved');
               console.log(this.state);
             });
  }

   resetUserSettings = () => {
      const savedUserOptions = JSON.parse(localStorage.getItem('user-preferences'));
      console.log(savedUserOptions);
      if (savedUserOptions !== null)
      {
        const restoreUserPreferences = savedUserOptions.newState;
        this.state = ({ geolocation : restoreUserPreferences.geolocation,
                deviceorientation: restoreUserPreferences.deviceorientation,
                orientationchange: restoreUserPreferences.orientationchange,
                devicelight : restoreUserPreferences.devicelight,
                userproximity : restoreUserPreferences.userproximity,
                vibrate : restoreUserPreferences.vibrate,
                mediaDevices: restoreUserPreferences.mediaDevices,
                onLine : restoreUserPreferences.onLine,
                notification : restoreUserPreferences.notification,
                connection : restoreUserPreferences.connection,
                oscpu : restoreUserPreferences.oscpu,
                indexedDB : restoreUserPreferences.indexedDB,
                paymentRequest : restoreUserPreferences.paymentRequest,
                paymentAddress : restoreUserPreferences.paymentAddress,
                userAgent: restoreUserPreferences.userAgent,
                permissions : restoreUserPreferences.permissions,
                credentials : restoreUserPreferences.credentials,
                deviceMemory : restoreUserPreferences.deviceMemory,
                language:restoreUserPreferences.language});
                console.log(this.state);
      }
      else {
        this.setInitialState();
      }
   }

  setNewPositionState = (childData) => {
    let newState = Object.assign({}, this.state);
    newState.geolocation = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewDeviceOrientationState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.deviceorientation = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewScreenOrientationState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.orientationchange = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewBrightnessState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.devicelight = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewProximitySensorState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.userproximity = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewVibrationAccessState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.vibrate = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewCameraAccessState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.mediaDevices = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewOnlineStatusState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.onLine = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewNetworkInfoState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.connection = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewWebNotifState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.notification = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewIndexedDBState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.indexedDB = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewOSInfoState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.oscpu = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewPaymentInfo = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.paymentRequest = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setBrowserInfo = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.userAgent = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setPermissions = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.permissions = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setCredentials = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.credentials = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setDeviceMemory = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.deviceMemory = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  setNewAddressInfoState = (childData) => {
    this.resetUserSettings();
    let newState = Object.assign({}, this.state);
    newState.paymentAddress = childData;
    this.state = ({ newState });
    localStorage.setItem('user-preferences', JSON.stringify(this.state));
    chrome.storage.local.set({'user-preferences': newState}, function() {
     console.log('Settings saved');
     console.log(newState);
   });
  }

  changeEnglishLanguage = (e) => {
    e.preventDefault();
    console.log('The language is English');
    this.setState({language: 'en'});
    var element = document.getElementById("englishLang");
    element.classList.add("active");
    var element2 = document.getElementById("greekLang");
    element2.classList.remove("active");
  };

  changeGreekLanguage = (e) => {
    e.preventDefault();
    console.log('The language is Greek');
    this.setState({language: 'gr'});
    var element = document.getElementById("englishLang");
    element.classList.remove("active");
    var element2 = document.getElementById("greekLang");
    element2.classList.add("active");
  };

  render() {

    let advancedButtonText = this.state.language == 'en' ? "Advanced Settings Page" : "Σελίδα Προχωρημένων Ρυθμίσεων";
    let advancedDescrText = this.state.language == 'en' ? "Open the advanced settings page" : "Άνοιξε Σελίδα Προχωρημένων Ρυθμίσεων";
    let advancedMenu = this.state.language == 'en' ? "More Options" : "Περισσότερες Επιλογές";
    let basicMenu = this.state.language == 'en' ? "Basic Settings" : "Βασικές Ρυθμίσεις";
    let deviceMenu = this.state.language == 'en' ? "Device Access" : "Πληροφορίες που αφορούν πρόσβαση στη συσκευή";
    let commMenu = this.state.language == 'en' ? "Communication Access" : "Πληροφορίες που σχετίζονται με επικοινωνία";
    let dataMenu = this.state.language == 'en' ? "Data and File Access" : "Πληροφορίες που σχετίζονται με δεδομένα";
    let reportDesc = this.state.language == 'en' ? "Send an email and report if any of your defined settings not working on a page you visit." : "Στείλτε ένα email και αναφέρετε εάν κάποια από τις καθορισμένες ρυθμίσεις σας δεν λειτουργεί σε μια σελίδα που επισκέπτεστε.";
    let reportButton = this.state.language == 'en' ? "Report Page" : "Αναφορά Σελίδας";
    let developedByText = this.state.language == 'en' ? "Developed by" : "Αναπτύχθηκε από";
    let basicTutorial = this.state.language == 'en' ? "Click here to view how to use basic settings." : "Κάντε κλικ εδώ για να δείτε πώς να χρησιμοποιήσετε τις βασικές ρυθμίσεις.";
    let englishText =  this.state.language == 'en' ? "Change to English" : "Άλλαξε σε Αγγλικά";
    let greekText =  this.state.language == 'en' ? "Change to Greek" : "Άλλαξε σε Ελληνικά";
    let experimentalText = this.state.language == 'en' ? 'This is an experimental technology. Expect behavior to change in the future.' : 'Πειραματική τεχνολογία. Πιθανή αλλαγή συμπεριφοράς στο μέλλον.'


    return (

      <div id="popup" className="text-center">
        <div id="top-bar">
          <div id="logo"><img id="logoPicture" src= {logoPic} /></div>
          <div id="plugIn"><span id="plugInName">PrivacySafer II</span></div>
          <div id="help"><span id="helpSpan"><a  id="helpLink" href = {basicSettingManual} target = "_blank" title={basicTutorial}> ?</a></span></div>
        </div>
        <Collapsible trigger={basicMenu} >
<Collapsible trigger={deviceMenu}>
<div class="card-group CardGroupBox">
  <CurrentPosition savedUserSettings = {this.state} parentCallback = {this.setNewPositionState} />
  <CameraAccess savedUserSettings = {this.state} parentCallback = {this.setNewCameraAccessState} />
  <Permissions savedUserSettings = {this.state} parentCallback = {this.setPermissions} />
</div>
<div class="card-group CardGroupBox">
<MobileView><VibrationAccess savedUserSettings = {this.state} parentCallback = {this.setNewVibrationAccessState} /> </MobileView>
<MobileView><ScreenOrientation savedUserSettings = {this.state} parentCallback = {this.setNewScreenOrientationState} /> </MobileView>
<MobileView><DeviceOrientation savedUserSettings = {this.state} parentCallback = {this.setNewDeviceOrientationState} /> </MobileView>
</div>
    <div class="card-group CardGroupBox">
    <CustomView condition={browserName === "Firefox"}>
<Brightness savedUserSettings = {this.state} parentCallback = {this.setNewBrightnessState} />
</CustomView>
      </div>

<CustomView condition={browserName === "Firefox" || osName === "Android" }><span className="redstar">*</span><label className="experimentalmessage" >{experimentalText}</label></CustomView> 
</Collapsible>
<Collapsible trigger={commMenu}>
<div class="card-group CardGroupBox">
  <OnlineStatus savedUserSettings = {this.state} parentCallback = {this.setNewOnlineStatusState} />
  <WebNotifications savedUserSettings = {this.state} parentCallback = {this.setNewWebNotifState} />
  <BrowserInformation savedUserSettings = {this.state} parentCallback = {this.setBrowserInfo} />
</div>
<div class="card-group CardGroupBox">
  <CustomView condition={browserName !== "Firefox"}>
  <NetworkInformation savedUserSettings = {this.state} parentCallback = {this.setNewNetworkInfoState} />
  </CustomView>

</div>
</Collapsible>
<Collapsible trigger={dataMenu}>
<div class="card-group CardGroupBox">
  <OsInformation savedUserSettings = {this.state} parentCallback = {this.setNewOSInfoState} />
  <Passwords savedUserSettings = {this.state} parentCallback = {this.setCredentials} />
  <PaymentInformation savedUserSettings = {this.state} parentCallback = {this.setNewPaymentInfo} />
</div>
<div class="card-group CardGroupBox">
<IndexedDB savedUserSettings = {this.state} parentCallback = {this.setNewIndexedDBState} />
<CustomView condition={browserName !== "Firefox"}>
  <DeviceMemory savedUserSettings = {this.state} parentCallback = {this.setDeviceMemory} />
  </CustomView>
</div>
</Collapsible>
</Collapsible>
<BrowserView>
<Collapsible trigger={advancedMenu}>
<div title={advancedDescrText}>
  <button className="btn btn-warning"
          onClick={() => this.reset()}>
            {advancedButtonText}
  </button>
</div>
<br />
<div title={reportDesc}>
  <button className="btn btn-warning"
          onClick={() => this.handleSubmit()}>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{reportButton}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </button>
</div>
</Collapsible>
</BrowserView>
      <div id="footer">
      <div id="footerWrap">
          <span id="footerText">{developedByText}</span>
          <div id="footerPicDiv">< a href={'http://www.cs.ucy.ac.cy/seit/'} target="_blank"><img id="footerPic" src= {seitlab} /></a></div>
      </div>
      <div id="footerLanguage">
          <p><a id="englishLang" class="LanguageLink active" onClick={this.changeEnglishLanguage} title={englishText}> EN </a> | <a id="greekLang" class="LanguageLink" onClick={this.changeGreekLanguage} title={greekText}> ΕΛ </a></p>
      </div>
      </div>
      </div>
    );
  }
}



export default PopupApp;
