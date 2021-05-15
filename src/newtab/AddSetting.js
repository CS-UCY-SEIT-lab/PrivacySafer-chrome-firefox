/* global chrome */
import React, { Component } from "react";
import TimeRange from 'react-time-range';
import moment from 'moment';
import InputRange from 'react-input-range';

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

class AddSetting extends Component {
  constructor(props){
  super(props);

  this.state = {
      selectedOption:"single",
      groupPageType :"hidden",
      singlePageType:"show",
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
      valueBrowserInfo: {min:0, max:0},
      valuePermissions: {min:0, max:0},
      valuePasswords: {min:0, max:0},
      valueDeviceMemory: {min:0, max:0},
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
  var theSavedOptions = {};

  theSavedOptions["user-advanced-options"] = userSettings;

  store.push(theSavedOptions);

   localStorage.setItem('user', JSON.stringify(store));
   chrome.storage.local.set({'user':JSON.stringify(store)},function(){
      console.log("Data Saved");
    });
var today = new Date();
var date = today.getDate() +'-'+(today.getMonth()+1)+'-' + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
if (this.props.selectedLanguage == 'en') 
{
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
  let pageName = '';
  let validPage = 0;
  let savedSettings = 0;
  let advancedSaved = '';
   if (this.state.selectedOption == "single") {
    pageName = this.state.txtsinglepage;
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
   if (!!pattern.test(pageName) == false)
   {
    if (this.props.selectedLanguage == 'en') {
     this.setState({labelInfo: "Oops, please enter a valid web page."});
    }
     else {
      this.setState({labelInfo: "Ωχ, παρακαλώ εισαγάγετε μια έγκυρη ιστοσελίδα."});
     }
     validPage = 0;
   }
   else if (pageName == '')
   {
    if (this.props.selectedLanguage == 'en') {
      this.setState({labelInfo: "Oops, please enter a valid web page."});
     }
      else {
       this.setState({labelInfo: "Ωχ, παρακαλώ εισαγάγετε μια έγκυρη ιστοσελίδα."});
      }
     validPage = 0;
   }
   else {
     validPage = 1;
     savedSettings = 2;
   }
 }
 else {
   pageName = this.state.txtgrouppage;
   if (pageName.charAt(0) != '.')
   {
    if (this.props.selectedLanguage == 'en') {
     this.setState({labelInfo: "Oops, please enter a valid domain (e.g. .com)"});
    }
    else {
      this.setState({labelInfo: "Ωχ, παρακαλώ εισαγάγετε έναν έγκυρο τομέα (π.χ. .com)"});
    }
     validPage = 0;
   }
   else if (pageName == '')
   {
    if (this.props.selectedLanguage == 'en') {
      this.setState({labelInfo: "Oops, please enter a valid domain (e.g. .com)"});
     }
     else {
       this.setState({labelInfo: "Ωχ, παρακαλώ εισαγάγετε έναν έγκυρο τομέα (π.χ. .com)"});
     }
     validPage = 0;
   }
   else {
     validPage = 1;
     savedSettings = 3;
   }
}

if (validPage == 1 )
{
  let checkedForDays = 0;
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
        let duplicatepage = 0;
        const savedUserOptions = JSON.parse(localStorage.getItem('user'));
        for (var key in savedUserOptions)
        {
          let page = Object.keys(savedUserOptions[key]["user-advanced-options"]);
          if (page[0] === pageName) {
              duplicatepage = 1;
          }
        }

        if (duplicatepage == 0)
        {
          settingsForPage = this.findSettingsforPages(settingsForPage);
          userSettings[pageName] = settingsForPage;

          if (savedSettings == 1)
          {
            advancedSaved = 'user-advanced-settings';
          }
          else if (savedSettings == 2)
          {
            advancedSaved = 'user-advanced-settings';
          }
          else if (savedSettings == 3)
          {
            advancedSaved = 'user-group-settings';
          }

          this.saveAllOptions(userSettings,advancedSaved);
        }
        else {
          if (this.props.selectedLanguage == 'en') {
              this.setState({labelInfo: "Oops, this page already exists."});
          }
          else {
            this.setState({labelInfo: "Ωχ, αυτή η σελίδα υπάρχει ήδη."});
          }
        }
  }
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

clearScreen = (event) => {
  this.setState({groupPageType:"hidden"});
  this.setState({singlePageType:"show"});
  this.setState({selectedOption:"single"});
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
  this.setState({labelInfo: ""});
  if (event.target.value === "group")
  {
    this.setState({groupPageType:"show"});
    this.setState({singlePageType:"hidden"});
  }
  else if (event.target.value === "single")
  {
    this.setState({groupPageType:"hidden"});
    this.setState({singlePageType:"show"});
  }
  this.setState({selectedOption:event.target.value});
}


  render() {

    let pageTitle = this.props.selectedLanguage == 'en' ? "Add new Custom Setting" : "Προσθήκη νέας προσαρμοσμένης ρύθμισης";
    let pageDescriprion = this.props.selectedLanguage == 'en' ? "On this page, you can add custom settings to limit access to personal information on specific pages at specific days and times." : "Σε αυτήν τη σελίδα, μπορείτε να προσθέσετε προσαρμοσμένες ρυθμίσεις για να περιορίσετε την πρόσβαση σε προσωπικές πληροφορίες σε συγκεκριμένες σελίδες σε συγκεκριμένες ημέρες και ώρες.";
    let addButton = this.props.selectedLanguage == 'en' ? "Add" : "Προσθήκη";
    let resetButton = this.props.selectedLanguage == 'en' ? "Reset" : "Επαναφορά";

    let deviceMenu = this.props.selectedLanguage == 'en' ? "Device Access :" : "Πληροφορίες που αφορούν πρόσβαση στη συσκευή :";
    let commMenu = this.props.selectedLanguage == 'en' ? "Communication Access :" : "Πληροφορίες που σχετίζονται με επικοινωνία :";
    let dataMenu = this.props.selectedLanguage == 'en' ? "Data and File Access :" : "Πληροφορίες που σχετίζονται με δεδομένα :";
   
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

    let experimentalText = this.props.selectedLanguage == 'en' ? 'This is an experimental technology. Expect behavior to change in the future.' : 'Πειραματική τεχνολογία. Πιθανή αλλαγή συμπεριφοράς στο μέλλον.'

    let daysText = this.props.selectedLanguage == 'en'  ? "Days" : "Ημέρες";
    let mondayText = this.props.selectedLanguage == 'en'  ? "Monday" : "Δευτέρα";
    let tuesdayText = this.props.selectedLanguage == 'en'  ? "Tuesday" : "Τρίτη";
    let wednesdayText = this.props.selectedLanguage == 'en'  ? "Wednesday" : "Τετάρτη";
    let thursdayText = this.props.selectedLanguage == 'en'  ? "Thursday" : "Πέμπτη";
    let fridayText = this.props.selectedLanguage == 'en'  ? "Friday" : "Παρασκευή";
    let saturdayText = this.props.selectedLanguage == 'en'  ? "Saturday" : "Σάββατο";
    let sundayText = this.props.selectedLanguage == 'en'  ? "Sunday" : "Κυριακή";

    return (
<div>
    <h2>{pageTitle}</h2>
      <p>{pageDescriprion}</p>
      <hr/>
      <button type="button" class="btn btn-primary" onClick={this.saveCustomSetting}>{addButton}</button> &nbsp;&nbsp;
      <button type="button" class="btn" onClick={this.clearScreen}>{resetButton}</button> <br />
      <label>{this.state.labelInfo}</label>
      <hr/>
      <div>
        <select className="dropdown" value={this.state.selectedOption} onChange={this.handleChange}>
    <option value="single">{individualPageText}</option>
          <option value="group">{groupPageText}</option>
          </select>
     </div>
     <br/>
    <input type="text" name="singlepage" placeholder={this.state.placeholderSinglePage} className="form-control input" type={this.state.singlePageType} onChange={this.singlePageName} value={this.state.txtsinglepage} />
    <input type="text" name="grouppage" placeholder={this.state.placeholderGroupPage} className="form-control input" type={this.state.groupPageType} onChange={this.groupPageName} value={this.state.txtgrouppage} />
    <br />
    <h1 className="HeaderTitle"> {mondayText} </h1>
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
      <input type="checkbox" checked={this.state.checkedSunday} onChange={this.handleSundayChange} value="checkedSunday" /> {sundayText}
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
    <label>{deviceText}<span className="redstar">*</span> :</label>
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
<label>{brightnessText}<span className="redstar">*</span> :</label>
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

<CustomView condition={browserName === "Firefox" || osName === "Android" }><span className="redstar">*</span><label className="experimentalmessage" >{experimentalText}</label></CustomView> 

</div>
    );
  }
}

export default AddSetting;
