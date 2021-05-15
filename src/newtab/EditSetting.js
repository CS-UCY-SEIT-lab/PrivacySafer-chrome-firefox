/* global chrome */
import React, { Component } from "react";
import TimeRange from 'react-time-range';
import moment from 'moment';
import InputRange from 'react-input-range';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-input-range/lib/css/index.css';

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

var store = [];
var localStore = [];
let editedSetting;

class EditSetting extends Component {
  constructor(props){
  super(props);

  console.log(this.props.selectedLanguage);


  this.state = {
       listitems : [],
      selectedOption:"default",
      valuePosition: { min: 0, max: 0 },
      valueDevOri: { min: 0, max: 0 },
      valueScreenOri: { min: 0, max: 0 },
      valueOnlineStatus: { min: 0, max: 0 },
      valueWebNot: { min: 0, max: 0 },
      valueNetwInfo: { min: 0, max: 0 },
      valueIndexedDB: { min: 0, max: 0 },
      valueOSInfo: { min: 0, max: 0 },
      valuePaymentReq: { min: 0, max: 0 },
      valueCameraAcc: { min: 0, max: 0 },
      valueVibrationAcc: { min: 0, max: 0 },
      valueProximitySens: { min: 0, max: 0 },
      valueBrightness: { min: 0, max: 0 },
      valueBrowserInfo: { min: 0, max: 0 },
      valuePermissions: { min: 0, max: 0 },
      valuePasswords: { min: 0, max: 0 },
      valueDeviceMemory: { min: 0, max: 0 },
      txtsinglepage : '',
      txtgrouppage : '',
      checkedMonday : false,
      checkedTuesday : false,
      checkedWednesday: false,
      checkedThursday: false,
      checkedFriday: false,
      checkedSaturday: false,
      checkedSunday: false,
      labelInfo: "",
      placeholderSinglePage: "www.example.com",
      placeholderGroupPage:"Pages of specific domain (e.g. .com)",
  };

  chrome.storage.local.get("user", function(data) {
    store = JSON.parse(data["user"]);
  });
  this.handleChange = this.handleChange.bind(this);
}

componentWillMount() {
  const savedUserOptions = JSON.parse(localStorage.getItem('user'));
  for (var key in savedUserOptions)
  {
    this.state.listitems.push(Object.keys(savedUserOptions[key]["user-advanced-options"]));
  }
}

savedForDay = () => {
  let savedOptions = {
    geolocation : {access:{} , from : {}, to : {} },
    deviceorientation: {access:{} , from : {}, to : {} },
    orientationchange: {access:{} , from : {}, to : {} },
    devicelight : {access:{} , from : {}, to : {} },
    userproximity : {access:{} , from : {}, to : {} },
    vibrate : {access:{} , from : {}, to : {} },
    mediaDevices: {access:{} , from : {}, to : {} },
    onLine : {access:{} , from : {}, to : {} },
    notification : {access:{} , from : {}, to : {} },
    connection : {access:{} , from : {}, to : {}},
    oscpu : {access:{} , from : {}, to : {} },
    indexedDB : {access:{} , from : {}, to : {} },
    userAgent : {access:{} , from : {}, to : {} },
    permissions : {access:{} , from : {}, to : {} },
    credentials : {access:{} , from : {}, to : {} },
    deviceMemory : {access:{} , from : {}, to : {} },
    paymentRequest : {access:{} ,from : {}, to : {} }
  };

  if (this.state.valuePosition.max > 0)
  {
    savedOptions.geolocation.access = "off";
    savedOptions.geolocation.from = this.state.valuePosition.min;
    savedOptions.geolocation.to = this.state.valuePosition.max;
  }
  else
  {
    savedOptions.geolocation.access = "on";
  }

  if (this.state.valueDevOri.max > 0)
  {
    savedOptions.deviceorientation.access = "off";
    savedOptions.deviceorientation.from = this.state.valueDevOri.min;
    savedOptions.deviceorientation.to = this.state.valueDevOri.max;
  }
  else
  {
    savedOptions.deviceorientation.access = "on";
  }

  if (this.state.valueScreenOri.max > 0)
  {
    savedOptions.orientationchange.access = "off";
    savedOptions.orientationchange.from = this.state.valueScreenOri.min;
    savedOptions.orientationchange.to = this.state.valueScreenOri.max;
  }
  else
  {
    savedOptions.orientationchange.access = "on";
  }

  if (this.state.valueBrightness.max > 0)
  {
    savedOptions.devicelight.access = "off";
    savedOptions.devicelight.from = this.state.valueBrightness.min;
    savedOptions.devicelight.to = this.state.valueBrightness.max;
  }
  else
  {
    savedOptions.devicelight.access = "on";
  }

  if (this.state.valueProximitySens.max > 0)
  {
    savedOptions.userproximity.access = "off";
    savedOptions.userproximity.from = this.state.valueProximitySens.min;
    savedOptions.userproximity.to = this.state.valueProximitySens.max;
  }
  else
  {
    savedOptions.userproximity.access = "on";
  }

  if (this.state.valueVibrationAcc.max > 0)
  {
    savedOptions.vibrate.access = "off";
    savedOptions.vibrate.from = this.state.valueVibrationAcc.min;
    savedOptions.vibrate.to = this.state.valueVibrationAcc.max;
  }
  else
  {
    savedOptions.vibrate.access = "on";
  }

  if (this.state.valueCameraAcc.max > 0)
  {
    savedOptions.mediaDevices.access = "off";
    savedOptions.mediaDevices.from = this.state.valueCameraAcc.min;
    savedOptions.mediaDevices.to = this.state.valueCameraAcc.max;
  }
  else
  {
    savedOptions.mediaDevices.access = "on";
  }

  if (this.state.valueOnlineStatus.max > 0)
  {
    savedOptions.onLine.access = "off";
    savedOptions.onLine.from = this.state.valueOnlineStatus.min;
    savedOptions.onLine.to = this.state.valueOnlineStatus.max;
  }
  else
  {
    savedOptions.onLine.access = "on";
  }

  if (this.state.valueWebNot.max > 0)
  {
    savedOptions.notification.access = "off";
    savedOptions.notification.from = this.state.valueWebNot.min;
    savedOptions.notification.to = this.state.valueWebNot.max;
  }
  else
  {
    savedOptions.notification.access = "on";
  }

  if (this.state.valueNetwInfo.max > 0)
  {
    savedOptions.connection.access = "off";
    savedOptions.connection.from = this.state.valueNetwInfo.min;
    savedOptions.connection.to = this.state.valueNetwInfo.max;
  }
  else
  {
    savedOptions.connection.access = "on";
  }

  if (this.state.valueOSInfo.max > 0)
  {
    savedOptions.oscpu.access = "off";
    savedOptions.oscpu.from = this.state.valueOSInfo.min;
    savedOptions.oscpu.to = this.state.valueOSInfo.max;
  }
  else
  {
    savedOptions.oscpu.access = "on";
  }

  if (this.state.valueIndexedDB.max > 0)
  {
    savedOptions.indexedDB.access = "off";
    savedOptions.indexedDB.from = this.state.valueIndexedDB.min;
    savedOptions.indexedDB.to = this.state.valueIndexedDB.max;
  }
  else
  {
    savedOptions.indexedDB.access = "on";
  }


  if (this.state.valuePaymentReq.max > 0)
  {
    savedOptions.paymentRequest.access = "off";
    savedOptions.paymentRequest.from = this.state.valuePaymentReq.min;
    savedOptions.paymentRequest.to = this.state.valuePaymentReq.max;
  }
  else
  {
    savedOptions.paymentRequest.access = "on";
  }

  if (this.state.valueBrowserInfo.max > 0)
  {
    savedOptions.userAgent.access = "off";
    savedOptions.userAgent.from = this.state.valueBrowserInfo.min;
    savedOptions.userAgent.to = this.state.valueBrowserInfo.max;
  }
  else
  {
    savedOptions.userAgent.access = "on";
  }

  if (this.state.valuePermissions.max > 0)
  {
    savedOptions.permissions.access = "off";
    savedOptions.permissions.from = this.state.valuePermissions.min;
    savedOptions.permissions.to = this.state.valuePermissions.max;
  }
  else
  {
    savedOptions.permissions.access = "on";
  }

  if (this.state.valuePasswords.max > 0)
  {
    savedOptions.credentials.access = "off";
    savedOptions.credentials.from = this.state.valuePasswords.min;
    savedOptions.credentials.to = this.state.valuePasswords.max;
  }
  else
  {
    savedOptions.credentials.access = "on";
  }

  if (this.state.valueDeviceMemory.max > 0)
  {
    savedOptions.deviceMemory.access = "off";
    savedOptions.deviceMemory.from = this.state.valueDeviceMemory.min;
    savedOptions.deviceMemory.to = this.state.valueDeviceMemory.max;
  }
  else
  {
    savedOptions.deviceMemory.access = "on";
  }


  return savedOptions;
}

setOffAccess = () => {
  let savedOptions = {
    geolocation : {access:{} , from : {}, to : {} },
    deviceorientation: {access:{} , from : {}, to : {} },
    orientationchange: {access:{} , from : {}, to : {} },
    devicelight : {access:{} , from : {}, to : {} },
    userproximity : {access:{} , from : {}, to : {} },
    vibrate : {access:{} , from : {}, to : {} },
    mediaDevices: {access:{} , from : {}, to : {} },
    onLine : {access:{} , from : {}, to : {} },
    notification : {access:{} , from : {}, to : {} },
    connection : {access:{} , from : {}, to : {}},
    oscpu : {access:{} , from : {}, to : {} },
    indexedDB : {access:{} , from : {}, to : {} },
    userAgent : {access:{} , from : {}, to : {} },
    permissions : {access:{} , from : {}, to : {} },
    credentials : {access:{} , from : {}, to : {} },
    deviceMemory : {access:{} , from : {}, to : {} },
    paymentRequest : {access:{} ,from : {}, to : {} }
  };

  savedOptions.geolocation.access = "on";
  savedOptions.deviceorientation.access = "on";
  savedOptions.orientationchange.access = "on";
  savedOptions.devicelight.access = "on";
  savedOptions.userproximity.access = "on";
  savedOptions.vibrate.access = "on";
  savedOptions.mediaDevices.access = "on";
  savedOptions.onLine.access = "on";
  savedOptions.notification.access = "on";
  savedOptions.connection.access = "on";
  savedOptions.oscpu.access = "on";
  savedOptions.indexedDB.access = "on";
  savedOptions.paymentRequest.access = "on";
  savedOptions.userAgent.access = "on";
  savedOptions.permissions.access = "on";
  savedOptions.credentials.access = "on";
  savedOptions.deviceMemory.access = "on";

  return savedOptions;
}

findSettingsforPages = (settingsForPage) => {
  if (this.state.checkedMonday == true) {
    var userOptions = this.savedForDay();
    settingsForPage.monday = userOptions;
  }
  else
  {
    var userOptions = this.setOffAccess();
    settingsForPage.monday = userOptions;
  }

  if (this.state.checkedTuesday == true) {
    var userOptions = this.savedForDay();
    settingsForPage.tuesday = userOptions;
  }
  else
  {
    var userOptions = this.setOffAccess();
    settingsForPage.tuesday = userOptions;
  }

  if (this.state.checkedWednesday == true) {
    var userOptions = this.savedForDay();
    settingsForPage.wednesday = userOptions;
  }
  else
  {
    var userOptions = this.setOffAccess();
    settingsForPage.wednesday = userOptions;
  }

  if (this.state.checkedThursday == true) {
    var userOptions = this.savedForDay();
    settingsForPage.thursday = userOptions;
  }
  else
  {
    var userOptions = this.setOffAccess();
    settingsForPage.thursday = userOptions;
  }

  if (this.state.checkedFriday == true) {
    var userOptions = this.savedForDay();
    settingsForPage.friday = userOptions;
  }
  else
  {
    var userOptions = this.setOffAccess();
    settingsForPage.friday = userOptions;
  }

  if (this.state.checkedSaturday == true) {
    var userOptions = this.savedForDay();
    settingsForPage.saturday = userOptions;
  }
  else
  {
    var userOptions = this.setOffAccess();
    settingsForPage.saturday = userOptions;
  }

  if (this.state.checkedSunday == true) {
    var userOptions = this.savedForDay();
    settingsForPage.sunday = userOptions;
  }
  else
  {
    var userOptions = this.setOffAccess();
    settingsForPage.sunday = userOptions;
  }

  return settingsForPage;
}

saveAllOptions = (userSettings,advancedSaved) => {
  let page = this.state.selectedOption;
  for (var key in store)
  {
      let pageName = Object.keys(store[key]["user-advanced-options"]);
      if (page == pageName[0])
      {
        delete store[key];
      }
  }
  store = store.filter(function (el) {
            return el != null;
  });
  var theSavedOptions = {};

  theSavedOptions["user-advanced-options"] = userSettings;

  store.push(theSavedOptions);
  localStorage.setItem('user', JSON.stringify(store));
  chrome.storage.local.set({'user':JSON.stringify(store)},function(){
     console.log("Data Saved");
   });
const savedUserOptions = JSON.parse(localStorage.getItem('user'));
editedSetting = savedUserOptions[key]["user-advanced-options"][page];
this.refreshListPage();
this.setOptionsForSelectedPage();
var today = new Date();
var date = today.getDate() +'-'+(today.getMonth()+1)+'-' + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

if (this.props.selectedLanguage == 'en') {
  this.setState({labelInfo: "Saved at " + dateTime});
}
else {
  this.setState({labelInfo: "Αποθηκεύτηκε στις " + dateTime});
}
}

saveCustomSetting = (event) => {
  let settingsForPage = {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {}
  };
  let userSettings = {};
  let checkedForDays = 0;
  let pageName = this.state.selectedOption;
  let validPage = 0;
  let savedSettings = 0;
  let advancedSaved = '';

  if (this.state.checkedMonday == false && this.state.checkedTuesday == false
      && this.state.checkedWednesday == false && this.state.checkedThursday == false
     && this.state.checkedFriday == false && this.state.checkedSaturday == false
     && this.state.checkedSunday == false)
  {
    if (this.props.selectedLanguage == 'en') {
      this.setState({labelInfo: "Oops, please select days before saving."});
      }
      else {
        this.setState({labelInfo: "Ωχ, επιλέξτε ημέρες πριν από την αποθήκευση"});
      }
    checkedForDays = 0;
  }
  else {
          settingsForPage = this.findSettingsforPages(settingsForPage);
          userSettings[pageName] = settingsForPage;
          advancedSaved = 'user-advanced-settings';
          this.saveAllOptions(userSettings,advancedSaved);
  }
}

singlePageName = (event) => {
  this.setState({txtsinglepage: event.target.value});
}

groupPageName = (event) => {
  this.setState({txtgrouppage: event.target.value});
}

handleMondayChange = (event) => {
  this.setState({checkedMonday: event.target.checked});
}

handleTuesdayChange = (event) => {
  this.setState({checkedTuesday: event.target.checked});
}

handleWednesdayChange = (event) => {
  this.setState({checkedWednesday: event.target.checked});
}

handleThursdayChange = (event) => {
  this.setState({checkedThursday: event.target.checked});
}

handleFridayChange = (event) => {
  this.setState({checkedFriday: event.target.checked});
}

handleSaturdayChange = (event) => {
  this.setState({checkedSaturday: event.target.checked});
}

handleSundayChange = (event) => {
  this.setState({checkedSunday: event.target.checked});
}

clearScreen = () => {
  this.setState({selectedOption:"default"});
  this.setState({valuePosition: { min: 0, max: 0 }});
  this.setState({valueDevOri: { min: 0, max: 0 }});
  this.setState({valueScreenOri: { min: 0, max: 0 }});
  this.setState({valueOnlineStatus: { min: 0, max: 0 }});
  this.setState({valueWebNot: { min: 0, max: 0 }});
  this.setState({valueNetwInfo: { min: 0, max: 0 }});
  this.setState({valueIndexedDB: { min: 0, max: 0 }});
  this.setState({valueOSInfo: { min: 0, max: 0 }});
  this.setState({valuePaymentReq: { min: 0, max: 0 }});
  this.setState({valueCameraAcc: { min: 0, max: 0 }});
  this.setState({valueVibrationAcc: { min: 0, max: 0 }});
  this.setState({valueProximitySens: { min: 0, max: 0 }});
  this.setState({valueBrightness: { min: 0, max: 0 }});
  this.setState({valueBrowserInfo: { min: 0, max: 0 }});
  this.setState({valuePermissions: { min: 0, max: 0 }});
  this.setState({valuePasswords: { min: 0, max: 0 }});
  this.setState({valueDeviceMemory: { min: 0, max: 0 }});
  this.setState({txtsinglepage : ''});
  this.setState({txtgrouppage : ''});
  this.setState({checkedMonday : false});
  this.setState({checkedTuesday : false});
  this.setState({checkedWednesday : false});
  this.setState({checkedThursday : false});
  this.setState({checkedFriday : false});
  this.setState({checkedSaturday : false});
  this.setState({checkedSunday : false});
  this.setState({labelInfo : ""});
  this.setState({placeholderSinglePage: "www.example.com"});
  this.setState({placeholderGroupPage:"Pages of specific domain (e.g. .com)"});
}

handleChange = (event) => {
  const savedUserOptions = JSON.parse(localStorage.getItem('user'));
  let page = event.target.value;
  for (var key in savedUserOptions)
  {
      let pageName = Object.keys(savedUserOptions[key]["user-advanced-options"]);
      if (page == pageName[0])
      {
        editedSetting = savedUserOptions[key]["user-advanced-options"][pageName];
      }
  }
  if (event.target.value === "default")
  {
    this.setState({selectedOption:"default"});
    this.clearScreen();
  }
  else
  {
    this.setState({labelInfo : ""});
    this.setState({selectedOption:event.target.value});
    this.setOptionsForSelectedPage();
  }
}


setOptionsForSelectedPage = () => {
  let optionTimeValues;
  let mondaychecked = this.isDaySelected(editedSetting.monday);
  if (mondaychecked == 1)
  {
      this.setState({checkedMonday : true});
      optionTimeValues = this.getOptionValues(editedSetting.monday.geolocation);
      this.setState({valuePosition: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.deviceorientation);
      this.setState({valueDevOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.orientationchange);
      this.setState({valueScreenOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.devicelight);
      this.setState({valueBrightness: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.userproximity);
      this.setState({valueProximitySens: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.vibrate);
      this.setState({valueVibrationAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.mediaDevices);
      this.setState({valueCameraAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.onLine);
      this.setState({valueOnlineStatus: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.notification);
      this.setState({valueWebNot: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.connection);
      this.setState({valueNetwInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.oscpu);
      this.setState({valueOSInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.indexedDB);
      this.setState({valueIndexedDB: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.paymentRequest);
      this.setState({valuePaymentReq: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.userAgent);
      this.setState({valueBrowserInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.permissions);
      this.setState({valuePermissions: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});
     
      optionTimeValues = this.getOptionValues(editedSetting.monday.credentials);
      this.setState({valuePasswords: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.monday.deviceMemory);
      this.setState({valueDeviceMemory: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});
  }

  let tuesdaychecked = this.isDaySelected(editedSetting.tuesday);
  if (tuesdaychecked == 1)
  {
      this.setState({checkedTuesday : true});
      optionTimeValues = this.getOptionValues(editedSetting.tuesday.geolocation);
      this.setState({valuePosition: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.deviceorientation);
      this.setState({valueDevOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.orientationchange);
      this.setState({valueScreenOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.devicelight);
      this.setState({valueBrightness: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.userproximity);
      this.setState({valueProximitySens: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.vibrate);
      this.setState({valueVibrationAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.mediaDevices);
      this.setState({valueCameraAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.onLine);
      this.setState({valueOnlineStatus: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.notification);
      this.setState({valueWebNot: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.connection);
      this.setState({valueNetwInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.oscpu);
      this.setState({valueOSInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.indexedDB);
      this.setState({valueIndexedDB: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.paymentRequest);
      this.setState({valuePaymentReq: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.userAgent);
      this.setState({valueBrowserInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.permissions);
      this.setState({valuePermissions: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.credentials);
      this.setState({valuePasswords: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.tuesday.deviceMemory);
      this.setState({valueDeviceMemory: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});
  }

  let wednesdaychecked = this.isDaySelected(editedSetting.wednesday);
  if (wednesdaychecked == 1)
  {
      this.setState({checkedWednesday : true});
      optionTimeValues = this.getOptionValues(editedSetting.wednesday.geolocation);
      this.setState({valuePosition: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.deviceorientation);
      this.setState({valueDevOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.orientationchange);
      this.setState({valueScreenOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.devicelight);
      this.setState({valueBrightness: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.userproximity);
      this.setState({valueProximitySens: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.vibrate);
      this.setState({valueVibrationAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.mediaDevices);
      this.setState({valueCameraAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.onLine);
      this.setState({valueOnlineStatus: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.notification);
      this.setState({valueWebNot: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.connection);
      this.setState({valueNetwInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.oscpu);
      this.setState({valueOSInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.indexedDB);
      this.setState({valueIndexedDB: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.paymentRequest);
      this.setState({valuePaymentReq: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.userAgent);
      this.setState({valueBrowserInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.permissions);
      this.setState({valuePermissions: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.credentials);
      this.setState({valuePasswords: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.wednesday.deviceMemory);
      this.setState({valueDeviceMemory: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});
  }

  let thursdaychecked = this.isDaySelected(editedSetting.thursday);
  if (thursdaychecked == 1)
  {
      this.setState({checkedThursday : true});
      optionTimeValues = this.getOptionValues(editedSetting.thursday.geolocation);
      this.setState({valuePosition: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.deviceorientation);
      this.setState({valueDevOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.orientationchange);
      this.setState({valueScreenOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.devicelight);
      this.setState({valueBrightness: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.userproximity);
      this.setState({valueProximitySens: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.vibrate);
      this.setState({valueVibrationAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.mediaDevices);
      this.setState({valueCameraAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.onLine);
      this.setState({valueOnlineStatus: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.notification);
      this.setState({valueWebNot: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.connection);
      this.setState({valueNetwInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.oscpu);
      this.setState({valueOSInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.indexedDB);
      this.setState({valueIndexedDB: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.paymentRequest);
      this.setState({valuePaymentReq: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.userAgent);
      this.setState({valueBrowserInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.permissions);
      this.setState({valuePermissions: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.credentials);
      this.setState({valuePasswords: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.thursday.deviceMemory);
      this.setState({valueDeviceMemory: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});
  }

  let fridaychecked = this.isDaySelected(editedSetting.friday);
  if (fridaychecked == 1)
  {
      this.setState({checkedFriday : true});

      optionTimeValues = this.getOptionValues(editedSetting.friday.geolocation);
      this.setState({valuePosition: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.deviceorientation);
      this.setState({valueDevOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.orientationchange);
      this.setState({valueScreenOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.devicelight);
      this.setState({valueBrightness: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.userproximity);
      this.setState({valueProximitySens: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.vibrate);
      this.setState({valueVibrationAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.mediaDevices);
      this.setState({valueCameraAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.onLine);
      this.setState({valueOnlineStatus: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.notification);
      this.setState({valueWebNot: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.connection);
      this.setState({valueNetwInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.oscpu);
      this.setState({valueOSInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.indexedDB);
      this.setState({valueIndexedDB: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.paymentRequest);
      this.setState({valuePaymentReq: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.userAgent);
      this.setState({valueBrowserInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.permissions);
      this.setState({valuePermissions: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.credentials);
      this.setState({valuePasswords: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.friday.deviceMemory);
      this.setState({valueDeviceMemory: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});
  }

  let saturdaychecked = this.isDaySelected(editedSetting.saturday);
  if (saturdaychecked == 1)
  {
      this.setState({checkedSaturday : true});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.geolocation);
      this.setState({valuePosition: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.deviceorientation);
      this.setState({valueDevOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.orientationchange);
      this.setState({valueScreenOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.devicelight);
      this.setState({valueBrightness: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.userproximity);
      this.setState({valueProximitySens: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.vibrate);
      this.setState({valueVibrationAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.mediaDevices);
      this.setState({valueCameraAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.onLine);
      this.setState({valueOnlineStatus: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.notification);
      this.setState({valueWebNot: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.connection);
      this.setState({valueNetwInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.oscpu);
      this.setState({valueOSInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.indexedDB);
      this.setState({valueIndexedDB: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.paymentRequest);
      this.setState({valuePaymentReq: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.userAgent);
      this.setState({valueBrowserInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.permissions);
      this.setState({valuePermissions: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.credentials);
      this.setState({valuePasswords: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.saturday.deviceMemory);
      this.setState({valueDeviceMemory: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});
  }

  let sundaychecked = this.isDaySelected(editedSetting.sunday);
  if (sundaychecked == 1)
  {
      this.setState({checkedSunday : true});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.geolocation);
      this.setState({valuePosition: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.deviceorientation);
      this.setState({valueDevOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.orientationchange);
      this.setState({valueScreenOri: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.devicelight);
      this.setState({valueBrightness: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.userproximity);
      this.setState({valueProximitySens: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.vibrate);
      this.setState({valueVibrationAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.mediaDevices);
      this.setState({valueCameraAcc: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.onLine);
      this.setState({valueOnlineStatus: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.notification);
      this.setState({valueWebNot: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.connection);
      this.setState({valueNetwInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.oscpu);
      this.setState({valueOSInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.indexedDB);
      this.setState({valueIndexedDB: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.paymentRequest);
      this.setState({valuePaymentReq: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.userAgent);
      this.setState({valueBrowserInfo: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.permissions);
      this.setState({valuePermissions: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.credentials);
      this.setState({valuePasswords: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});

      optionTimeValues = this.getOptionValues(editedSetting.sunday.deviceMemory);
      this.setState({valueDeviceMemory: { min: optionTimeValues.minVal, max: optionTimeValues.maxVal }});
  }
}

isDaySelected = (selectedDay) => {
  for (var key in selectedDay)
  {
    if (selectedDay[key].access == "off")
      return 1;
  }
  return 0;
}

getOptionValues = (savedoptionselected) => {
  let optionValues = {
    maxVal : {},
    minVal : {}
  };

  if (savedoptionselected.access == "off")
  {
    optionValues.maxVal = savedoptionselected.to;
    optionValues.minVal = savedoptionselected.from;
  }
  else
  {
    optionValues.maxVal = 0;
    optionValues.minVal = 0;
  }

  return optionValues;
}

deleteCustomSetting = () => {
  if (this.state.selectedOption == "default")
  {
    if (this.props.selectedLanguage == 'en') {
      this.setState({labelInfo: "Oops, please select a saved custom setting to delete"});
      }
      else {
        this.setState({labelInfo: "Ωχ, επιλέξτε μια αποθηκευμένη ρύθμιση για διαγραφή"});
      }
  }
  else
  {
    this.submit(this.state.selectedOption);
  }
}

submit = (page) => {
  confirmAlert({
    title: 'PrivacySafer II',
    message: this.state.selectedLanguage == "en" ? 'Are you sure you want to delete this?' : 'Είστε βέβαιοι ότι θέλετε να διαγράψετε;' ,
    buttons: [
      {
        label: this.state.selectedLanguage == "en" ? 'Yes' : 'Ναί',
        onClick: () => this.deletePage(page)
      },
      {
        label: this.state.selectedLanguage == "en" ? 'No' : 'Όχι'
      }
    ]
  });
};

deletePage = (page) => {
   const savedUserOptions = JSON.parse(localStorage.getItem('user'));
   for (var key in savedUserOptions)
   {
       let pageName = Object.keys(savedUserOptions[key]["user-advanced-options"]);
       if (page == pageName[0])
       {
         delete savedUserOptions[key];
       }
   }
   var filtered = savedUserOptions.filter(function (el) {
             return el != null;
         });
   localStorage.setItem('user', JSON.stringify(filtered));
   chrome.storage.local.set({'user':JSON.stringify(filtered)},function(){
      console.log("Data Saved");
    });
    this.refreshListPage();
    this.clearScreen();
    var today = new Date();
    var date = today.getDate() +'-'+(today.getMonth()+1)+'-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    if (this.props.selectedLanguage == 'en') {
      this.setState({labelInfo: "Deleted at " + dateTime});
    }
    else {
      this.setState({labelInfo: "Διαγράφηκε στις " + dateTime});
    }
}

refreshListPage = () => {
  const savedUserOptions = JSON.parse(localStorage.getItem('user'));
  let newList = [];
  for (var key in savedUserOptions)
  {
    newList.push(Object.keys(savedUserOptions[key]["user-advanced-options"]));
  }
   this.setState({listitems : newList},  () => console.log("ITEMS : ",this.state.listitems));
}

  render() {

    let pageTitle = this.props.selectedLanguage == 'en' ? "Edit Custom Setting" : "Επεξεργασία προσαρμοσμένης ρύθμισης";
    let pageDescriprion = this.props.selectedLanguage == 'en' ? "On this page, you can edit your custom settings to change the access to personal information for specific pages." : "Σε αυτήν τη σελίδα, μπορείτε να επεξεργαστείτε τις προσαρμοσμένες ρυθμίσεις σας για να αλλάξετε την πρόσβαση σε προσωπικές πληροφορίες για συγκεκριμένες σελίδες.";
    let saveButton = this.props.selectedLanguage == 'en' ? "Save" : "Αποθήκευση";
    let deleteButton = this.props.selectedLanguage == 'en' ? "Delete" : "Διαγραφή";
    let messageSaveSetting = this.props.selectedLanguage == 'en' ? "Select Saved Custom Setting" : "Επιλέξετε κάποια από τις αποθηκευμένες σελίδες"

    let deviceMenu = this.props.selectedLanguage == 'en' ? "Device Access :" : "Πληροφορίες που αφορούν πρόσβαση στη συσκευή :";
    let commMenu = this.props.selectedLanguage == 'en' ? "Communication Access :" : "Πληροφορίες που σχετίζονται με επικοινωνία :";
    let dataMenu = this.props.selectedLanguage == 'en' ? "Data and File Access :" : "Πληροφορίες που σχετίζονται με δεδομένα :";
   
    let experimentalText = this.props.selectedLanguage == 'en' ? 'This is an experimental technology. Expect behavior to change in the future.' : 'Πειραματική τεχνολογία. Πιθανή αλλαγή συμπεριφοράς στο μέλλον.';

    let brightnessText = this.props.selectedLanguage == 'en'  ? "Brightness" : "Φωτεινότητα";
    let cameraText = this.props.selectedLanguage == 'en'  ? "Camera Access" : "Πρόσβαση σε Συσκευές";
    let positionText = this.props.selectedLanguage == 'en'  ? "Current Position" : "Τρέχουσα Τοποθεσία";
    let deviceText = this.props.selectedLanguage == 'en'  ? "Device Orientation" : "Προσανατολισμός συσκευής";
    let networkText = this.props.selectedLanguage == 'en'  ? "Network Information" : "Πληροφορίες Δικτύου";
    let statusText = this.props.selectedLanguage == 'en'  ? "Online Status" : "Κατάσταση Φυλλομετρητή";
    let osInfoText = this.props.selectedLanguage == 'en'  ? "OS Information" : "Πληροφορίες ΛΣ";
    let paymentText = this.props.selectedLanguage == 'en'  ? "Payment Request" : "Αίτημα πληρωμής";
    let proximityText = this.props.selectedLanguage == 'en'  ? "Proximity Sensor" : "Αισθητήρας Εγγύτητας";
    let screenText = this.props.selectedLanguage == 'en'  ? "Screen Orientation" : "Προσανατολισμός οθόνης";
    let vibrationText = this.props.selectedLanguage == 'en'  ? "Vibration Access" : "Πρόσβαση στη Δόνηση";
    let notificationText = this.props.selectedLanguage == 'en'  ? "Web Notifications" : "Ειδοποιήσεις Φυλλομετρητή";
    let browserInfoText = this.props.selectedLanguage == 'en' ? "Browser Information" : "Πληροφορίες Φυλλομετρητή";
    let permissionText = this.props.selectedLanguage == 'en' ? "Permissions" : "Δικαίωμα Πρόσβασης";
    let passwordText = this.props.selectedLanguage == 'en' ? "Save Credentials" : "Αποθήκευση Στοιχείων";
    let deviceMemoryText  = this.props.selectedLanguage == 'en' ? "Device Memory" : "Μνήμη Συσκευής";
    let individualPageText = this.props.selectedLanguage == 'en'  ? "Individual Page" : "Συγκεκριμένη Σελίδα";
    let groupPageText = this.props.selectedLanguage == 'en'  ? "Group of Pages" : "Ομάδα σελίδων";

    let daysText = this.props.selectedLanguage == 'en'  ? "Days" : "Ημέρες";
    let mondayText = this.props.selectedLanguage == 'en'  ? "Monday" : "Δευτέρα";
    let tuesdayText = this.props.selectedLanguage == 'en'  ? "Tuesday" : "Τρίτη";
    let wednesdayText = this.props.selectedLanguage == 'en'  ? "Wednesday" : "Τετάρτη";
    let thursdayText = this.props.selectedLanguage == 'en'  ? "Thursday" : "Πέμπτη";
    let fridayText = this.props.selectedLanguage == 'en'  ? "Friday" : "Παρασκευή";
    let saturdayText = this.props.selectedLanguage == 'en'  ? "Saturday" : "Σάββατο";
    let sundayText = this.props.selectedLanguage == 'en'  ? "Sunday" : "Κυριακή";


    let arrayOfData = this.state.listitems;
    let options = arrayOfData.map((data) =>
        <option
            key={data}
            value={data}
        >
            {data}
        </option>
    );

    return (
<div>
      <h2>{pageTitle}</h2>
      <p>{pageDescriprion}</p>
      <hr/>
      <button type="button" class="btn btn-primary" onClick={this.saveCustomSetting}>{saveButton}</button> &nbsp;&nbsp;
      <button type="button" class="btn btn-warning" onClick={this.deleteCustomSetting}>{deleteButton}</button> &nbsp;&nbsp;<br />
      <label>{this.state.labelInfo}</label>
      <hr/>
      <div>
        <select className="dropdown" value={this.state.selectedOption} onChange={this.handleChange}>
        <option value="default">{messageSaveSetting}</option>
        {options}
          </select>
     </div>
     <br/>
    <h1 className="HeaderTitle"> {daysText} </h1>
        <hr/>
    <div>
  <form>
    <label className="checkbox-inline labelMargin">
      <input type="checkbox" checked={this.state.checkedMonday} onChange={this.handleMondayChange} value="checkedMonday"/>{mondayText}
    </label>
    <label className="checkbox-inline labelMargin">
      <input type="checkbox" checked={this.state.checkedTuesday} onChange={this.handleTuesdayChange} value="checkedTuesday" />{tuesdayText}
    </label>
    <label className="checkbox-inline labelMargin">
      <input type="checkbox" checked={this.state.checkedWednesday} onChange={this.handleWednesdayChange} value="checkedWednesday" />{wednesdayText}
    </label>
    <label className="checkbox-inline labelMargin">
      <input type="checkbox" checked={this.state.checkedThursday} onChange={this.handleThursdayChange} value="checkedThursday" />{thursdayText}
    </label>
    <label className="checkbox-inline labelMargin">
      <input type="checkbox" checked={this.state.checkedFriday} onChange={this.handleFridayChange} value="checkedFriday" />{fridayText}
    </label>
    <label className="checkbox-inline labelMargin">
      <input type="checkbox" checked={this.state.checkedSaturday} onChange={this.handleSaturdayChange} value="checkedSaturday" />{saturdayText}
    </label>
    <label className="checkbox-inline labelMargin">
      <input type="checkbox" checked={this.state.checkedSunday} onChange={this.handleSundayChange} value="checkedSunday" />{sundayText}
    </label>
  </form>
</div>

<br/>
    <h1 className="HeaderTitle"> {deviceMenu} </h1>
    <hr />
    <div class="row">
    <div class="col-md-4">
    <label>{positionText} :</label>
    <div className="sliderRange">
          <InputRange
           maxValue={24}
           minValue={0}
           formatLabel={value => `${value}:00`}
           value={this.state.valuePosition}
           onChange={value => this.setState({ valuePosition : value })} />
    </div>
    </div>
    <div class="col-md-4">
<label>{cameraText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valueCameraAcc}
    onChange={value => this.setState({ valueCameraAcc : value })} />
</div>
</div>

<div class="col-md-4">
<label>{permissionText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valuePermissions}
    onChange={value => this.setState({ valuePermissions : value })} />
</div>
</div>

</div>
<br />
<div class="row">
<MobileView viewClassName="col-md-4">
    <label>{deviceText}<span className="redstar">*</span>:</label>
    <div className="sliderRange">
        <InputRange
        maxValue={24}
        minValue={0}
        formatLabel={value => `${value}:00`}
        value={this.state.valueDevOri}
        onChange={value => this.setState({ valueDevOri : value })} />
    </div>
    </MobileView>

    <MobileView viewClassName="col-md-4">
    <label>{screenText} :</label>
    <div className="sliderRange">
        <InputRange
        maxValue={24}
        minValue={0}
        formatLabel={value => `${value}:00`}
        value={this.state.valueScreenOri}
        onChange={value => this.setState({ valueScreenOri : value })} />
    </div>
    </MobileView>

    <MobileView viewClassName="col-md-4">
<label>{vibrationText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valueVibrationAcc}
    onChange={value => this.setState({ valueVibrationAcc : value })} />
</div>
</MobileView>

</div>

<br />
<div class="row">

<CustomView condition={browserName === "Firefox"} viewClassName="col-md-4"> 
<label>{brightnessText} <span className="redstar">*</span>:</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valueBrightness}
    onChange={value => this.setState({ valueBrightness : value })} />
</div>
</CustomView>

</div>

<br />
<h1 className="HeaderTitle"> {commMenu} </h1>
<hr />
<div class="row">
<div class="col-md-4">
<label>{statusText} :</label>
<div className="sliderRange">
      <InputRange
       maxValue={24}
       minValue={0}
       formatLabel={value => `${value}:00`}
       value={this.state.valueOnlineStatus}
       onChange={value => this.setState({ valueOnlineStatus : value })} />
</div>
</div>
<div class="col-md-4">
<label>{notificationText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valueWebNot}
    onChange={value => this.setState({ valueWebNot : value })} />
</div>
</div>
<div class="col-md-4">
<label>{browserInfoText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valueBrowserInfo}
    onChange={value => this.setState({ valueBrowserInfo : value })} />
</div>
</div>
</div>
<br />
<div class="row">
<CustomView condition={browserName !== "Firefox"} viewClassName="col-md-4">  
<label>{networkText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valueNetwInfo}
    onChange={value => this.setState({ valueNetwInfo : value })} />
</div>
</CustomView> 
</div>
<br />

<h1 className="HeaderTitle"> {dataMenu} </h1>
<hr />

<div class="row">

<div class="col-md-4">
<label>{osInfoText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valueOSInfo}
    onChange={value => this.setState({ valueOSInfo : value })} />
</div>
</div>

<div class="col-md-4">
<label>{passwordText} :</label>
<div className="sliderRange">
      <InputRange
       maxValue={24}
       minValue={0}
       formatLabel={value => `${value}:00`}
       value={this.state.valuePasswords}
       onChange={value => this.setState({ valuePasswords : value })} />
</div>
</div>

<div class="col-md-4">
<label>{paymentText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valuePaymentReq}
    onChange={value => this.setState({ valuePaymentReq : value })} />
</div>
</div>
</div>

<div class="row">
<div class="col-md-4">
<label>IndexedDB :</label>
<div className="sliderRange">
      <InputRange
       maxValue={24}
       minValue={0}
       formatLabel={value => `${value}:00`}
       value={this.state.valueIndexedDB}
       onChange={value => this.setState({ valueIndexedDB : value })} />
</div>
</div>

<CustomView condition={browserName !== "Firefox"} viewClassName="col-md-4">  
<label>{deviceMemoryText} :</label>
<div className="sliderRange">
    <InputRange
    maxValue={24}
    minValue={0}
    formatLabel={value => `${value}:00`}
    value={this.state.valueDeviceMemory}
    onChange={value => this.setState({ valueDeviceMemory : value })} />
</div>
</CustomView> 

</div>

<CustomView condition={browserName === "Firefox" || osName === "Android" }>
  <span className="redstar">*</span><label className="experimentalmessage" >{experimentalText}</label>
  </CustomView> 

</div>
    );
  }
}

export default EditSetting;
