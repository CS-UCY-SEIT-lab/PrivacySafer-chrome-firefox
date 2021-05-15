import React, { Component } from "react";
import * as emailjs from 'emailjs-com';
import './SearchSettings.css'
import { confirmAlert } from 'react-confirm-alert';

class ReportPage extends Component {
  constructor(props) {
 	  super(props);
 	this.state = { feedback: '',
                 name: 'User',
                 email: 'privacysafer@gmail.com',
                 pageUrl: '',
                settingoption: '',
                senderEmail:'',
                senderName:'',
                message: '',
                checkedPosition:false,
                checkedDeviceOr: false,
                checkedScreenOr: false,
                checkedOnlineStatus: false,
                checkedWebNotif: false,
                checkedIndexedDB: false,
                checkedOSInfo: false,
                checkedPaymeReq: false,
                checkedCamera: false,
                checkedVibrate: false,
                checkedProximi: false,
                checkedBrightn: false,
                checkedNetInfo: false,
                checkedBrowserInfo : false,
                checkedPermissions : false,
                checkedPasswords : false,
                checkedDeviceMemory : false,
                valuePosition: '',
                valueDevOri: '',
                valueScrOri: '',
                valueOnline: '',
                valueWebNot: '',
                valueIndexD: '',
                valueOsInfo: '',
                valuePayReq: '',
                valueCamera: '',
                valueVibrate: '',
                valueProximi: '',
                valueBrighti: '' ,
                valueBrowser: '',
                valuePermissions: '',
                valuePasswords: '',
                valueDeviceMemory: '',
                valueNetInfo: ''};
 	this.handleChange = this.handleChange.bind(this);
  this.handlePageChanged = this.handlePageChanged.bind(this);
  this.handleEmailChange = this.handleEmailChange.bind(this);
  this.handleNameChange = this.handleNameChange.bind(this);
 	this.handleSubmit = this.handleSubmit.bind(this);
  this.handlePositionChanged = this.handlePositionChanged.bind(this);
  this.handleDeviceChanged = this.handleDeviceChanged.bind(this);
  this.handleScreenChanged = this.handleScreenChanged.bind(this);
  this.handleCameraChanged = this.handleCameraChanged.bind(this);
  this.handleVibrateChanged = this.handleVibrateChanged.bind(this);
  this.handleProximityChanged = this.handleProximityChanged.bind(this);
  this.handleBrigtnessChanged = this.handleBrigtnessChanged.bind(this);
  this.handleOnlineStatusChanged = this.handleOnlineStatusChanged.bind(this);
  this.handleWebNotificationChanged = this.handleWebNotificationChanged.bind(this);
  this.handleNetworkChanged = this.handleNetworkChanged.bind(this);
  this.handleBrowserChanged = this.handleBrowserChanged.bind(this);
  this.handleIndexedDBChanged = this.handleIndexedDBChanged.bind(this);
  this.handleOSInfoChanged = this.handleOSInfoChanged.bind(this);
  this.handlePaymentChanged = this.handlePaymentChanged.bind(this);
  this.handlePermissionsChanged = this.handlePermissionsChanged.bind(this);
  this.handlePasswordsChanged = this.handlePasswordsChanged.bind(this);
  this.handleDeviceMemoryChanged = this.handleDeviceMemoryChanged.bind(this);
   }

   handleDeviceMemoryChanged = (event) => {
    this.setState({checkedDeviceMemory: event.target.checked});
    if (event.target.checked == true)
    {
       this.setState({valueDeviceMemory: 'Device Memory'});
    }
    else
    {
     this.setState({valueDeviceMemory: ''});
    }
  }

   handlePasswordsChanged = (event) => {
    this.setState({checkedPasswords: event.target.checked});
    if (event.target.checked == true)
    {
       this.setState({valuePasswords: 'Save Credentials'});
    }
    else
    {
     this.setState({valuePasswords: ''});
    }
  }

   handlePermissionsChanged = (event) => {
    this.setState({checkedPermissions: event.target.checked});
    if (event.target.checked == true)
    {
       this.setState({valuePermissions: 'Permissions'});
    }
    else
    {
     this.setState({valuePermissions: ''});
    }
  }

   handleBrowserChanged = (event) => {
    this.setState({checkedBrowserInfo: event.target.checked});
    if (event.target.checked == true)
    {
       this.setState({valueBrowser: 'Browser Info'});
    }
    else
    {
     this.setState({valueBrowser: ''});
    }
  }

   handlePositionChanged = (event) => {
     this.setState({checkedPosition: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valuePosition: 'Current Position'});
     }
     else
     {
      this.setState({valuePosition: ''});
     }
   }

   handleDeviceChanged = (event) => {
     this.setState({checkedDeviceOr: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueDevOri: 'Device Orientation'});
     }
     else
     {
      this.setState({valueDevOri: ''});
     }
   }

   handleScreenChanged = (event) => {
     this.setState({checkedScreenOr: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueScrOri: 'Screen Orientation'});
     }
     else
     {
      this.setState({valueScrOri: ''});
     }
   }

   handleCameraChanged = (event) => {
     this.setState({checkedCamera: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueCamera: 'Camera Access'});
     }
     else
     {
      this.setState({valueCamera: ''});
     }
   }

   handleVibrateChanged = (event) => {
     this.setState({checkedVibrate: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueVibrate: 'Vibration Access'});
     }
     else
     {
      this.setState({valueVibrate: ''});
     }
   }

   handleProximityChanged = (event) => {
     this.setState({checkedProximi: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueProximi: 'Proximity Sensor'});
     }
     else
     {
      this.setState({valueProximi: ''});
     }
   }

   handleBrigtnessChanged = (event) => {
     this.setState({checkedBrightn: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueBrighti: 'Brightness'});
     }
     else
     {
      this.setState({valueBrighti: ''});
     }
   }

   handleOnlineStatusChanged = (event) => {
     this.setState({checkedOnlineStatus: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueOnline: 'Online Status'});
     }
     else
     {
      this.setState({valueOnline: ''});
     }
   }

   handleWebNotificationChanged = (event) => {
     this.setState({checkedWebNotif: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueWebNot: 'Web Notifications'});
     }
     else
     {
      this.setState({valueWebNot: ''});
     }
   }

   handleNetworkChanged = (event) => {
     this.setState({checkedNetInfo: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueNetInfo: 'Network Information'});
     }
     else
     {
      this.setState({valueNetInfo: ''});
     }
   }

   handleIndexedDBChanged = (event) => {
     this.setState({checkedIndexedDB: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueIndexD: 'IndexedDB'});
     }
     else
     {
      this.setState({valueIndexD: ''});
     }
   }

   handleOSInfoChanged = (event) => {
     this.setState({checkedOSInfo: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valueOsInfo: 'OS Information'});
     }
     else
     {
      this.setState({valueOsInfo: ''});
     }
   }

   handlePaymentChanged = (event) => {
     this.setState({checkedPaymeReq: event.target.checked});
     if (event.target.checked == true)
     {
        this.setState({valuePayReq: 'Payment Request'});
     }
     else
     {
      this.setState({valuePayReq: ''});
     }
   }

  render() {

    let pageMenuTitle = this.props.selectedLanguage == 'en' ? "Report Page" : "Αναφορά Σελίδας";
    let pageDescription = this.props.selectedLanguage == 'en' ? "On this page you can report any page in which any of the settings that limit access to personal information is not working." : "Σε αυτήν τη σελίδα μπορείτε να αναφέρετε οποιαδήποτε σελίδα στην οποία δεν λειτουργεί καμία από τις ρυθμίσεις που περιορίζουν την πρόσβαση σε προσωπικές πληροφορίες.";
    let nameText = this.props.selectedLanguage == 'en' ? "Name" : "Όνομα" ;
    let emailText = this.props.selectedLanguage == 'en' ? "Email address" : "Ηλεκτρονική διευθύνση" ;
    let pageText = this.props.selectedLanguage == 'en' ? "Page" : "Σελίδα";
    let messageText = this.props.selectedLanguage == 'en' ? "Message" : "Μήνυμα";
    let messagePlaceHolder = this.props.selectedLanguage == 'en' ? "Your message...." : "Το μήνυμα σου...";
    let settingDescription = this.props.selectedLanguage == 'en' ? "Please specify which setting did not work" : "Παρακαλώ αναφέρετε ποια ρύθμιση δεν λειτούργησε";
    let submitButton = this.props.selectedLanguage == 'en' ? "Submit" : "Υποβολή";
    
    
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
    let browserText = this.props.selectedLanguage == 'en'  ? "Browser Information" : "Πληροφορίες Φυλλομετρητή";
    let permissionText = this.props.selectedLanguage == 'en' ? "Permissions" : "Δικαίωμα Πρόσβασης";
    let passwordText = this.props.selectedLanguage == 'en' ? "Save Credentials" : "Αποθήκευση Στοιχείων";
    let deviceMemoryText  = this.props.selectedLanguage == 'en' ? "Device Memory" : "Μνήμη Συσκευής";

    return (
      <div>
        <h2>{pageMenuTitle}</h2>
        <p>{pageDescription}</p>
              <hr/>
        <form className="test-mailing">
        <div className="form-group">
    <label htmlFor="name">{nameText}</label>
    <input type="text" className="form-control" onChange={this.handleNameChange} value={this.state.senderName}  />
</div>
<div className="form-group">
    <label htmlFor="exampleInputEmail1">{emailText}</label>
    <input type="email" id="email" className="form-control" aria-describedby="emailHelp" onChange={this.handleEmailChange} value={this.state.senderEmail}  />
</div>
<div className="form-group">
    <label htmlFor="name">{pageText}</label>
    <input type="text" className="form-control" onChange={this.handlePageChanged} value={this.state.pageUrl}/>
</div>

<div className="form-group">
    <label htmlFor="message">{messageText}</label>
    <textarea className="form-control" rows="5"  style={{height: '150px'}}
                         onChange={this.handleChange}
              placeholder= {messagePlaceHolder}
               required
               value={this.state.message} />
</div>

<div className="form-group">
    <label htmlFor="message">{settingDescription}</label>
<br/>

<div className="form-group">
<label htmlFor="message">{deviceMenu} &nbsp;&nbsp;</label>


<label className="checkbox-inline labelMargin">
<input type="checkbox" checked={this.state.checkedPosition} onChange={this.handlePositionChanged} value={this.state.valuePosition} />{positionText}
</label>

<label className="checkbox-inline labelMargin">
<input type="checkbox" checked={this.state.checkedDeviceOr} onChange={this.handleDeviceChanged} value={this.state.valueDevOri}/>{deviceText}
</label>

<label className="checkbox-inline labelMargin">
<input type="checkbox" checked={this.state.checkedScreenOr} onChange={this.handleScreenChanged} value={this.state.valueScrOri} />{screenText}
</label>

<label className="checkbox-inline labelMargin">
<input type="checkbox" checked={this.state.checkedCamera} onChange={this.handleCameraChanged} value={this.state.valueCamera} />{cameraText}
</label>

<label className="checkbox-inline labelMargin">
<input type="checkbox" checked={this.state.checkedVibrate} onChange={this.handleVibrateChanged} value={this.state.valueVibrate} />{vibrationText}
</label>

  <label className="checkbox-inline labelMargin">
    <input type="checkbox" checked={this.state.checkedBrightn} onChange={this.handleBrigtnessChanged} value={this.state.valueBrighti}/>{brightnessText}
  </label>

  <label className="checkbox-inline labelMargin">
    <input type="checkbox" checked={this.state.checkedPermissions} onChange={this.handlePermissionsChanged} value={this.state.valuePermissions}/>{permissionText}
  </label>
</div>

<div className="form-group">
    <label htmlFor="message" >{commMenu} &nbsp;&nbsp;</label>

<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedOnlineStatus} onChange={this.handleOnlineStatusChanged} value={this.state.valueOnline} />{statusText}
</label>
<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedWebNotif} onChange={this.handleWebNotificationChanged} value={this.state.valueWebNot} />{notificationText}
</label>
<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedBrowserInfo} onChange={this.handleBrowserChanged} value={this.state.valueBrowser} />{browserText}
</label>
<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedNetInfo} onChange={this.handleNetworkChanged} value={this.state.valueNetInfo} />{networkText}
</label>
</div>


<div className="form-group">
    <label htmlFor="message">{dataMenu} &nbsp;&nbsp;</label>
<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedIndexedDB} onChange={this.handleIndexedDBChanged} value={this.state.valueIndexD}/>IndexedDB
</label>
<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedOSInfo} onChange={this.handleOSInfoChanged} value={this.state.valueOsInfo} />{osInfoText}
</label>
<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedPaymeReq} onChange={this.handlePaymentChanged} value={this.state.valuePayReq}/>{paymentText}
</label>
<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedPasswords} onChange={this.handlePasswordsChanged} value={this.state.valuePasswords}/>{passwordText}
</label>
<label className="checkbox-inline labelMargin">
  <input type="checkbox" checked={this.state.checkedDeviceMemory} onChange={this.handleDeviceMemoryChanged} value={this.state.valueDeviceMemory}/>{deviceMemoryText}
</label>
</div>
</div>

          <input type="button" value={submitButton} className="btn" onClick={this.handleSubmit} />
      	</form>
      </div>
    );
  }

  handlePageChanged(event) {
    event.preventDefault();
    this.setState({pageUrl: event.target.value})
  }

  handleNameChange(event) {
    event.preventDefault();
    this.setState({senderName: event.target.value})
  }

  handleEmailChange(event) {
    event.preventDefault();
    this.setState({senderEmail: event.target.value})
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({message: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const templateId = 'privacysafertemplate';
    const userid ='user_pr5aoCGtppWN34hr83BLs'
    const message = this.state.message;
    const pageUrl = this.state.pageUrl;
    const settingoption = this.state.valuePosition + ',' + this.state.valueDevOri + ',' + this.state.valueScrOri + ','  +
                          this.state.valueCamera + ',' + this.state.valueVibrate + ','  +
                          this.state.valueBrighti + ',' + this.state.valueOnline + ',' + this.state.valueWebNot+ ',' +
                          this.state.valueNetInfo + ',' + this.state.valueIndexD + ',' + this.state.valueOsInfo + ',' +
                          this.state.valuePayReq + ',' + this.state.browserText + ',' + this.state.valuePermissions + ',' +
                          this.state.valuePasswords + ',' + this.state.valueDeviceMemory;
    const senderEmail = this.state.senderEmail;
    const senderName = this.state.senderName;
        console.log(senderEmail);
    this.sendFeedback(templateId, message, settingoption, pageUrl, senderName, senderEmail, userid)
  }

  sendFeedback (templateId, message, settingoption, pageUrl, senderName, senderEmail, userid) {
      emailjs.send(
            'gmail', templateId,
            {message, pageUrl, settingoption, senderEmail, senderName},
            userid
          ).then(res => {
          console.log('Email successfully sent!');
          confirmAlert({
            title: 'PrivacySafer II',
            message: this.props.selectedLanguage == 'en' ? 'Email send successfully! Thank you for your input!' : "Αποστολή email με επιτυχία! Σας ευχαριστούμε για τη συμβολή σας!",
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.resetForm()
              }
            ]
          });
          })
          // Handle errors here however you like, or use a React error boundary
          .catch(err => { console.error('Oh well, you failed. Here some thoughts on the error that occured:', err);
          confirmAlert({
            title: 'PrivacySafer II',
            message: this.props.selectedLanguage == 'en' ? 'Oops, something went wrong. Please try again later.' : 'Ωχ! Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά αργότερα.',
            buttons: [
              {
                label: 'Ok'
              }
            ]
          });
        })
        }

  resetForm() {
  this.setState({ feedback: ''});
  this.setState({name: 'User'});
  this.setState({mail: 'privacysafer@gmail.com'});
  this.setState({pageUrl: ''});
  this.setState({settingoption: ''});
  this.setState({senderEmail:''});
  this.setState({senderName:''});
  this.setState({message: ''});
  this.setState({checkedPosition:false});
  this.setState({checkedDeviceOr: false});
  this.setState({checkedScreenOr: false});
  this.setState({checkedOnlineStatus: false});
  this.setState({checkedWebNotif: false});
  this.setState({checkedIndexedDB: false});
  this.setState({checkedOSInfo: false});
  this.setState({checkedPaymeReq: false});
  this.setState({checkedCamera: false});
  this.setState({checkedVibrate: false});
  this.setState({checkedProximi: false});
  this.setState({checkedBrightn: false});
  this.setState({checkedNetInfo: false});
  this.setState({checkedBrowserInfo: false});
  this.setState({checkedPasswords: false});
  this.setState({checkedPermissions: false});
  this.setState({checkedDeviceMemory: false});
  this.setState({valuePosition: ''});
  this.setState({valueDevOri: ''});
  this.setState({valueScrOri: ''});
  this.setState({valueOnline: ''});
  this.setState({valueWebNot: ''});
  this.setState({valueIndexD: ''});
  this.setState({valueOsInfo: ''});
  this.setState({valuePayReq: ''});
  this.setState({valueCamera: ''});
  this.setState({valueVibrate: ''});
  this.setState({valueProximi: ''});
  this.setState({valueBrighti: ''});
  this.setState({valueNetInfo: ''});
  this.setState({valueBrowser: ''});
  this.setState({valueDeviceMemory: ''});
  this.setState({valuePasswords: ''});
  this.setState({valuePermissions: ''});
  }

}
export default ReportPage;
