import React, { Component } from 'react';
import './App.css';
import advSettingManual from './files/PrivaySaferII_UserManualAdvanced.pdf';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import AddSetting from "./AddSetting";
import SearchSettings from "./SearchSettings";
import ViewSettings from "./ViewSettings";
import ReportPage from "./ReportPage";
import EditSetting from "./EditSetting";
import About from "./About";

class App extends Component {
  constructor(props){
    super(props);
  
    this.state = {
        pageLanguage : "en",
    };
  }

  changeEnglishLanguage = (e) => {
    e.preventDefault();
    console.log('The language is English');
    this.setState({pageLanguage: 'en'});
    var element = document.getElementById("greekLang");
    element.classList.remove("active");
    var element2 = document.getElementById("englishLang");
    element2.classList.add("active");
  };

  changeGreekLanguage = (e) => {
    e.preventDefault();
    console.log('The language is Greek');
    this.setState({pageLanguage: 'gr'});
    var element = document.getElementById("englishLang");
    element.classList.remove("active");
    var element2 = document.getElementById("greekLang");
    element2.classList.add("active");
  };


  render() {
    let pageTitle = this.state.pageLanguage == 'en' ? "Custom Advanced Settings" : "Σελίδα Προχωρημένων Ρυθμίσεων"
    let viewMenu = this.state.pageLanguage == 'en' ? "View" : "Προβολή";
    let editMenu = this.state.pageLanguage == 'en' ? "Edit" : "Επεξεργασία";
    let addMenu = this.state.pageLanguage == 'en' ? "Add" : "Προσθήκη";
    let reportMenu = this.state.pageLanguage == 'en' ? "Report" : "Αναφορά Σελίδας";
    let aboutMenu = this.state.pageLanguage == 'en' ? "About" : "Σχετικά";
    let tutorialMenu = this.state.pageLanguage == 'en' ? "User Manual" : "Οδηγίες Χρήσης"; 

    return (
      <HashRouter>
      <div>
    <h1>PrivacySaferII : {pageTitle}</h1>
        <ul className="header">
        <li><NavLink exact to="/">{viewMenu}</NavLink></li>
        <li><NavLink to="/editSet">{editMenu}</NavLink></li>
        <li><NavLink to="/addSet">{addMenu}</NavLink></li>
        <li><NavLink to="/reportPage">{reportMenu}</NavLink></li>
        <li><NavLink to="/aboutPage">{aboutMenu}</NavLink></li>
        <li><a href = {advSettingManual} target = "_blank">{tutorialMenu}</a></li>
        <li className='active' id="englishLang"><a href ="#" onClick={this.changeEnglishLanguage}>EN</a></li>
        <li id="greekLang"><a href ="#" onClick={this.changeGreekLanguage}>ΕΛ</a></li>
        </ul>
        <div className="content">
        <Route exact path="/" render={props => (<ViewSettings {...props} selectedLanguage={this.state.pageLanguage}/>)}/>
        <Route path="/editSet" render={props => (<EditSetting {...props} selectedLanguage={this.state.pageLanguage}/>)}/>
        <Route path="/addSet" render={props => (<AddSetting {...props} selectedLanguage={this.state.pageLanguage}/>)}/>
        <Route path="/reportPage" render={props => (<ReportPage {...props} selectedLanguage={this.state.pageLanguage}/>)}/>
        <Route path ="/aboutPage" render={props => (<About {...props} selectedLanguage={this.state.pageLanguage}/>)}/>
        </div>
      </div>
      </HashRouter>
    );


  }
}
export default App;
