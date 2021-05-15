/* global chrome */
import React, { Component } from "react";


class About extends Component {

  render() {

    let pageMenuTitle = this.props.selectedLanguage == 'en' ? "About" : "Σχετικά";

    let pageDescriptionPartOne = this.props.selectedLanguage == 'en' ?  'PrivacySaferII is a web extension that is implemented under the ' : 'Το PrivacySaferII είναι μια επέκταση ιστού που υλοποιείται στο πλαίσιο του έργου ';
    let pageDescriptionPartTwo = this.props.selectedLanguage == 'en' ? '. Its target audience is high school students, their parents, and guardians. You can use PrivacySaferII to limit the collection of sensitive and personal data from various web applications based on your preferences and choices. The extension can protect the privacy of each child from the potential dangers regarding access to personal data.' : 
    '. Η εφαρμογή αφορά μαθητές γυμνασίου, γονείς και κηδεμόνες. Μπορείτε να χρησιμοποιήσετε το PrivacySaferII για να περιορίσετε τη συλλογή ευαίσθητων και προσωπικών δεδομένων από διάφορες εφαρμογές ιστού με βάση τις προτιμήσεις και τις επιλογές σας. Η επέκταση μπορεί να προστατεύσει το απόρρητο κάθε παιδιού από τους πιθανούς κινδύνους που σχετίζονται με την πρόσβαση σε προσωπικά δεδομένα';

    let workMaintenedPartOne = this.props.selectedLanguage == 'en' ? "This work is maintained by the" : "Το έργο αυτό συντηρείται από το εργαστήριο" ; 
    let workMaintenedPartTwo = this.props.selectedLanguage == 'en' ? " lab of the Department of Computer Science at the University of Cyprus." : " του τμήματος Επιστήμης Υπολογιστών του Πανεπιστημίου Κύπρου."
    let researchersPartOne = this.props.selectedLanguage == 'en' ? "The involved researchers are " :  "Οι εμπλεκόμενοι ερευνητές είναι η ";
    let researchersPartTwo = this.props.selectedLanguage == 'en' ? " and " : " και η ";
    let gkapi = this.props.selectedLanguage == 'en' ? "Georgia M. Kapitsaki" : "Γεωργία Μ. Καπιτσάκη" ;
    let gchara = this.props.selectedLanguage == 'en' ? 'Georgia Charalambous' : 'Γεωργία Χαραλάμπους' ;

    let contactMenu = this.props.selectedLanguage == 'en' ? "Contact" : "Εποικοινωνία";

    let emailContacts = this.props.selectedLanguage == 'en' ? 'Georgia M. Kapitsaki (gkapi_AT_cs.ucy.ac.cy) or Georgia Charalambous (gchara04_AT_cs.ucy.ac.cy)' : 'Γεωργία Μ. Καπιτσάκη (gkapi_AT_cs.ucy.ac.cy) ή Γεωργία Χαραλάμπους (gchara04_AT_cs.ucy.ac.cy)';

    let feedbackMenu = this.props.selectedLanguage == 'en' ? 'Feedback' : 'Ανατροφοδότηση';
    let feedbackText = this.props.selectedLanguage == 'en' ? 'Please give us your valuable feedback for PrivacySaferII by completing this ' : 'Παρακαλώ δώστε μας τα πολύτιμα σχόλιά σας για το PrivacySaferII συμπληρώνοντας αυτό το '
    let feedbackText2 = this.props.selectedLanguage == 'en' ? 'questionnaire.' : 'ερωτηματολόγιο';

    return (
      <div>
        <h2>{pageMenuTitle}</h2>
        <hr/>
        <br />

    
    <p>{pageDescriptionPartOne}  <a href={'https://www.cybersafety.cy/'} target="_blank">CyberSafety</a> (CEF Safer Internet project) {pageDescriptionPartTwo} </p>
    <br />
    <p>{workMaintenedPartOne} <a href={'http://www.cs.ucy.ac.cy/seit/'} target="_blank">SEIT</a>{workMaintenedPartTwo}
      
     <br/>
       {researchersPartOne} <a href={'http://www.cs.ucy.ac.cy/~gkapi/'} target="_blank">{gkapi}</a>
       {researchersPartTwo} <a href={'https://www.linkedin.com/in/gchara04/'} target="_blank">{gchara}</a>
     </p>

     <br />

     <h2>{feedbackMenu}</h2>
     <hr />
     <p>{feedbackText}<a href={'https://docs.google.com/forms/d/e/1FAIpQLSc_amY8vBCBdLlDZw60lWDhrcK8DWIioB_6dTowyfnlUIkJXg/formResponse'} target="_blank">{feedbackText2}</a></p> 
     <br />
     <h2>{contactMenu}</h2>
     <hr/>
      <h4>Email</h4>
      {emailContacts}


      </div>
    );
  }
}

export default About;
