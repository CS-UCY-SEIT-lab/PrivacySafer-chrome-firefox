/* global chrome */
import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import TimeRange from 'react-time-range';
import moment from 'moment';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';

var savedAdvancedPages = [];

class ViewSettings extends Component {

  constructor(props){
  super(props);

  this.state = {
   listitems : [],
   searchPage : "",
   placeholderName : "Search Saved Settings",
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
   txtsinglepage : '',
   txtgrouppage : '',
   checkedMonday : false,
   checkedTuesday : false,
   checkedWednesday: false,
   checkedThursday: false,
   checkedFriday: false,
   checkedSaturday: false,
   checkedSunday: false,
 };
}

componentWillMount() {
  const savedUserOptions = JSON.parse(localStorage.getItem('user'));
  console.log(savedUserOptions);
  for (var key in savedUserOptions)
  {
    //console.log(Object.keys(savedUserOptions[key]["user-advanced-options"]));
    this.state.listitems.push(Object.keys(savedUserOptions[key]["user-advanced-options"]));
  }
}

searchSavedSettings = (event) => {
  const savedUserOptions = JSON.parse(localStorage.getItem('user'));
  let pageName = this.state.searchPage;
  let newList = [];
  for (var key in savedUserOptions)
  {
    let page = Object.keys(savedUserOptions[key]["user-advanced-options"]);
    if (page[0].includes(pageName)) {
        newList.push(Object.keys(savedUserOptions[key]["user-advanced-options"]));
    }
  }
   this.setState({listitems : newList},  () => console.log("ITEMS : ",this.state.listitems))
}

searchPageName = (event) => {
  this.setState({searchPage: event.target.value});
}

refreshListPage = () => {
  const savedUserOptions = JSON.parse(localStorage.getItem('user'));
  let newList = [];
  for (var key in savedUserOptions)
  {
    console.log(Object.keys(savedUserOptions[key]["user-advanced-options"]));
    newList.push(Object.keys(savedUserOptions[key]["user-advanced-options"]));
  }
   this.setState({listitems : newList},  () => console.log("ITEMS : ",this.state.listitems));
   this.setState({placeholderName : "Search Saved Settings"}, ()=> console.log(this.state.placeholderName));
   this.setState({searchPage : ""});
}

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
}

submit = (page) => {
  confirmAlert({
    title: 'PrivacySafer II',
    message: this.state.language == "en" ? 'Are you sure you want to delete this?' : 'Είστε βέβαιοι ότι θέλετε να διαγράψετε;' ,
    buttons: [
      {
        label: this.state.language == "en" ? 'Yes' : 'Ναί',
        onClick: () => this.deletePage(page)
      },
      {
        label: this.state.language == "en" ? 'No' : 'Όχι'
      }
    ]
  });
};

  render() {

    let pageMenuTitle = this.props.selectedLanguage == 'en' ? "Saved Settings" : "Αποθηκευμένες Ρυθμίσεις";
    let pageDescription = this.props.selectedLanguage == 'en' ? "On this page, you can view, filter, or delete your custom saved settings for specific pages." : "Σε αυτήν τη σελίδα, μπορείτε να δείτε, να φιλτράρετε ή να διαγράψετε τις προσαρμοσμένες αποθηκευμένες ρυθμίσεις σας για συγκεκριμένες σελίδες."
    let searchButton = this.props.selectedLanguage == 'en' ? "Search" : "Αναζήτηση";
    let clearButton = this.props.selectedLanguage == 'en' ? "Clear" : "Καθαρισμός";
    let deleteButtonn = this.props.selectedLanguage == "en" ? "Delete" : "Διαγραφή";


    return (
      <div>
        <h2>{pageMenuTitle}</h2>
    <p>{pageDescription}</p>
        <hr/>
        <input type="text" id="SearchBox" className="input" placeholder={this.state.placeholderName} onChange={this.searchPageName} value={this.state.searchPage} />&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit" class="btn" onClick={this.searchSavedSettings} >{searchButton}</button>&nbsp;&nbsp;
        <button type="button" class="btn" onClick={this.refreshListPage} >{clearButton}</button>
        <br /><br /><br />

        <ul className="list-group">
          {this.state.listitems.map(listitem => (
            <li
              key={listitem}
              className="list-group-item list-group-item-primary"
            >
            <span>
              {listitem}
            </span>
            <span className="spanDelete">
              <button type="submit" class="btn" onClick={() => this.submit(listitem)}>{deleteButtonn}</button>
            </span>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default ViewSettings;
