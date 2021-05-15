import React, { Component } from "react";

import './SearchSettings.css'

class SearchSettings extends Component {
  constructor(props){
  super(props);

  this.state = {
   listitems : [],
   searchPage : "",
 };
}

componentWillMount() {

}

searchSavedSettings = (event) => {
  const savedUserOptions = JSON.parse(localStorage.getItem('user'));
  let pageName = this.state.searchPage;
  this.setState({
    listitems: [],
});
console.log(this.state.listitems);
  let joined;
  for (var key in savedUserOptions)
  {
    let page = Object.keys(savedUserOptions[key]["user-advanced-options"]);
    if (page[0].includes(pageName)) {
      //this.state.listitems.push(Object.keys(savedUserOptions[key]["user-advanced-options"]));
      // Add item to it
      joined = this.state.listitems.concat(Object.keys(savedUserOptions[key]["user-advanced-options"]));
    }
  }
  this.setState({ listitems: joined });
}

searchPageName = (event) => {
  this.setState({searchPage: event.target.value});
}
  render() {
    return (
      <div>
        <h2>Search Saved Settings</h2>
        <p>In this page user will search his/her saved settings</p>
        <input type="text" id="SearchBox" className="input" placeholder="Search Saved Settings" onChange={this.state.searchPageName} />&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="submit" class="btn" onClick={this.searchSavedSettings} >Search</button>&nbsp;&nbsp;
        <button type="button" class="btn" >Clear</button>
        <br /><br /> <br />

        <ul className="list-group">
          {this.state.listitems.map(listitem => (
            <li
              key={listitem}
              className="list-group-item list-group-item-primary"
            >
            <span>
              {listitem}
            </span>
            <span className="spanEdit">
               <a>Edit</a>
            </span>
            <span className="spanDelete">
               <a>Delete</a>
            </span>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default SearchSettings;
