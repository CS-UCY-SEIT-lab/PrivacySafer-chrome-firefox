/* global chrome */
var a = window.location.href;
const tldts = require('tldts');
let currentPage = tldts.parse(a);
let domain = currentPage.publicSuffix;
let pagename = currentPage.hostname;

localStorage.setItem("curDomain", domain);
localStorage.setItem("curPageName", a);

var DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday'];
var today = DAYS[new Date().getDay()];


let ss = {storage : {}};
var store = [];

function getData(sKey) {
  return new Promise(function(resolve, reject) {
    chrome.storage.local.get(sKey, function(items) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(items[sKey]);
         localStorage.setItem('user-preferences', JSON.stringify(items[sKey]));
      }
    });
  });
}

function findData(sKey) {
  return new Promise(function(resolve, reject) {
    chrome.storage.local.get(sKey, function(items) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(items[sKey]);
         localStorage.setItem('user-options', items[sKey]);
      }
    });
  });
}

findData('user').then(function(item) {
    console.log("Read Advance Options");

});

getData('user-preferences').then(function(item) {
  var navigatorScript = window.document.createElement("script");
  navigatorScript.type = "text/javascript";
  navigatorScript.id = "navigator";

  navigatorScript.innerHTML = 'console.log("change page settings");' +
  'var nav = window.navigator;' +
  'const savedUserOptionsSaved = JSON.parse(localStorage.getItem("user-preferences"));' +
    'if (savedUserOptionsSaved.hasOwnProperty("onLine") && savedUserOptionsSaved["onLine"] == false) {' +
    'console.log("disable online status");'+
    'delete Object.getPrototypeOf(window.navigator).onLine;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("mediaDevices") && savedUserOptionsSaved["mediaDevices"] == false) {' +
    'console.log("disable media devices");'+
    'delete Object.getPrototypeOf(window.navigator).mediaDevices;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("oscpu") && savedUserOptionsSaved["oscpu"] == false) {' +
    'console.log("disable os information");'+
    'delete Object.getPrototypeOf(window.navigator).appVersion;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("connection") && savedUserOptionsSaved["connection"] == false) {' +
    'console.log("disable network information");'+
    'delete Object.getPrototypeOf(window.navigator).connection;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("userAgent") && savedUserOptionsSaved["userAgent"] == false) {' +
    'console.log("disable browser Information");'+
    'delete Object.getPrototypeOf(window.navigator).userAgent;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("permissions") && savedUserOptionsSaved["permissions"] == false) {' +
    'console.log("disable permissions");'+
    'delete Object.getPrototypeOf(window.navigator).permissions;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("credentials") && savedUserOptionsSaved["credentials"] == false) {' +
    'console.log("disable store credentials");'+
    'delete Object.getPrototypeOf(window.navigator).credentials;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("deviceMemory") && savedUserOptionsSaved["deviceMemory"] == false) {' +
    'console.log("disable device memory");'+
    'delete Object.getPrototypeOf(window.navigator).deviceMemory;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("vibrate") && savedUserOptionsSaved["vibrate"] == false) {' +
    'console.log("disable vibrate settings");'+
    'delete Object.getPrototypeOf(window.navigator).vibrate;'+
    '}'+
    'if (savedUserOptionsSaved.hasOwnProperty("indexedDB") && savedUserOptionsSaved["indexedDB"] == false) {' +
    '     console.log("Disabled indexedDB access");' +
    '     delete window.indexedDB;' +
    '}' +
    ' if (savedUserOptionsSaved.hasOwnProperty("notification") && savedUserOptionsSaved["notification"] == false) {' +
    '   console.log("Disabled web notifications");' +
    '   delete Notification;' +
    ' }' +
    'if (savedUserOptionsSaved.hasOwnProperty("geolocation") && savedUserOptionsSaved["geolocation"] == false) {' +
    '    console.log("Change geolocation position");' +
    '    delete Object.getPrototypeOf(window.navigator).geolocation;' +
   '}'
  window.document.getElementsByTagName('html')[0].insertBefore(navigatorScript,document.getElementsByTagName("head")[0]);

  var eventScript = window.document.createElement('script');
  eventScript.type = 'text/javascript';
  eventScript.id = 'envents';
  eventScript.innerHTML = 'console.log("changing event settings"); ' +
  'const savedUserOptionsSavedEvent = JSON.parse(localStorage.getItem("user-preferences"));' +
  '' +
  'if (savedUserOptionsSavedEvent.hasOwnProperty("deviceorientation") && savedUserOptionsSavedEvent["deviceorientation"] == false) {' +
  ' console.log("disable device orientation");' +
   'delete Object.getPrototypeOf(window.DeviceMotionEvent).acceleration;'+
   'delete Object.getPrototypeOf(window.DeviceMotionEvent).accelerationIncludingGravity;'+
   'delete Object.getPrototypeOf(window.DeviceMotionEvent).rotationRate;'+
   'delete Object.getPrototypeOf(window.DeviceMotionEvent).interval;'+
   'delete Object.getPrototypeOf(window.DeviceOrientationEvent).absolute;'+
   'delete Object.getPrototypeOf(window.DeviceOrientationEvent).alpha;'+
   'delete Object.getPrototypeOf(window.DeviceOrientationEvent).beta;'+
   'delete Object.getPrototypeOf(window.DeviceOrientationEvent).gamma;'+
   'delete DeviceOrientationEvent;'+
   'delete DeviceMotionEvent;' +
   'window.remoevEventListener("deviceorientation", function(e) {});' +
   'window.remoevEventListener("devicemotion", function(e) {});' +
  '}' +
  'if (savedUserOptionsSavedEvent.hasOwnProperty("orientationchange") && savedUserOptionsSavedEvent["orientationchange"] == false) {' +
  ' console.log("disable screen orientations");' +
  ' delete Object.getPrototypeOf(window.screen).orientation;' +
  '}' +
  'if (savedUserOptionsSavedEvent.hasOwnProperty("devicelight") && savedUserOptionsSavedEvent["devicelight"] == false) {' +
  ' console.log("disable brightness");' +
  'delete DeviceLightEvent;' +
  'window.remoevEventListener("devicelight", function(e) {});' +
  '}';
  window.document.getElementsByTagName('html')[0].insertBefore(eventScript,document.getElementsByTagName("head")[0]);
  
   changePaymentBasicSettings();
   changeNavigationAdvancedSettings();
   changePaymentAdvancedSettings();
   changeDeviceOrientationAdvancedSettings();
   changeScreenOrientationAdvancedSettings();
   changeBrightnessAdvancedSettings();
});

function changePaymentBasicSettings() {
    const savedPaymentSettings = JSON.parse(localStorage.getItem("user-preferences"));

    let changeSettings = 0;

    if (savedPaymentSettings.hasOwnProperty("paymentRequest") && savedPaymentSettings["paymentRequest"] == false) {
      changeSettings = 1;
    }

    if (changeSettings == 1) {
      var paymentScriptBasic = window.document.createElement('script');
      paymentScriptBasic.type = 'text/javascript';
      paymentScriptBasic.id = 'basicpayment';
      paymentScriptBasic.innerHTML = 'console.log("changing payment settings from basic setting"); ' +
    '' +
    ' delete window.PaymentRequest;'+
    ' console.log("disable payment request for basic settings");' ;
     window.document.getElementsByTagName('html')[0].insertBefore(paymentScriptBasic,document.getElementsByTagName("head")[0]);
    }

}

function changeNavigationAdvancedSettings() {
  const savedNavigationAdvanced = JSON.parse(localStorage.getItem("user-options"));
  let useAdvance = 0;
  let textForNavigationScript = 'console.log("changing Navigation Settings from Advanced");';
  for (var key in savedNavigationAdvanced) {
    let page = Object.keys(savedNavigationAdvanced[key]["user-advanced-options"]);
    if (page[0] == '.' + domain || page[0] == a) {
      useAdvance = 1;
      const settingforcurpage = savedNavigationAdvanced[key]["user-advanced-options"][page];
      if (settingforcurpage[today]['onLine']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['onLine']['from'] && n <= settingforcurpage[today]['onLine']['to'] )
        {
          textForNavigationScript = textForNavigationScript + 'delete Object.getPrototypeOf(window.navigator).onLine;';
        }
      }
      if (settingforcurpage[today]['connection']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['connection']['from'] && n <= settingforcurpage[today]['connection']['to'] )
        {
          textForNavigationScript = textForNavigationScript + 'delete Object.getPrototypeOf(window.navigator).connection;';
        }
      }
      if (settingforcurpage[today]['indexedDB']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['indexedDB']['from'] && n <= settingforcurpage[today]['indexedDB']['to'] )
        {
          textForNavigationScript = textForNavigationScript + 'delete window.indexedDB;';
        }
      }
      if (settingforcurpage[today]['notification']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['notification']['from'] && n <= settingforcurpage[today]['notification']['to'] )
        {
          textForNavigationScript = textForNavigationScript + 'delete window.Notification;';
        }
      }
      if (settingforcurpage[today]['geolocation']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['geolocation']['from'] && n <= settingforcurpage[today]['geolocation']['to'] )
        {
          textForNavigationScript = textForNavigationScript +  'delete Object.getPrototypeOf(window.navigator).geolocation;'
        }
      }
      if (settingforcurpage[today]['oscpu']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['oscpu']['from'] && n <= settingforcurpage[today]['oscpu']['to'] )
        {
          textForNavigationScript = textForNavigationScript +  'delete Object.getPrototypeOf(window.navigator).appVersion;'
        }
      }
      if (settingforcurpage[today]['mediaDevices']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['mediaDevices']['from'] && n <= settingforcurpage[today]['mediaDevices']['to'] )
        {
          textForNavigationScript = textForNavigationScript +  'delete Object.getPrototypeOf(window.navigator).mediaDevices;'
        }
      }
      if (settingforcurpage[today]['vibrate']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['vibrate']['from'] && n <= settingforcurpage[today]['vibrate']['to'] )
        {
          textForNavigationScript = textForNavigationScript +  'delete Object.getPrototypeOf(window.navigator).vibrate;'
        }
      }
      if (settingforcurpage[today]['userAgent']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['userAgent']['from'] && n <= settingforcurpage[today]['userAgent']['to'] )
        {
          textForNavigationScript = textForNavigationScript +  'delete Object.getPrototypeOf(window.navigator).userAgent;'
        }
      }
      if (settingforcurpage[today]['permissions']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['permissions']['from'] && n <= settingforcurpage[today]['permissions']['to'] )
        {
          textForNavigationScript = textForNavigationScript +  'delete Object.getPrototypeOf(window.navigator).permissions;'
        }
      }
      if (settingforcurpage[today]['credentials']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['credentials']['from'] && n <= settingforcurpage[today]['credentials']['to'] )
        {
          textForNavigationScript = textForNavigationScript +  'delete Object.getPrototypeOf(window.navigator).credentials;'
        }
      }
    }
  }

  if (useAdvance == 1)
  {
    var navigatorScript = window.document.createElement('script');
    navigatorScript.type = 'text/javascript';
    navigatorScript.id = 'navigationScript';
    navigatorScript.innerHTML = textForNavigationScript;
     window.document.getElementsByTagName('html')[0].insertBefore(navigatorScript,document.getElementsByTagName("head")[0]);
  }
}

function changePaymentAdvancedSettings() {
  const savedUserOptionsSavedPayment = JSON.parse(localStorage.getItem("user-options"));
  let useAdvance = 0;
  for (var key in savedUserOptionsSavedPayment)
  {
    let page = Object.keys(savedUserOptionsSavedPayment[key]["user-advanced-options"]);
    if (page[0] == '.' + domain || page[0] == a) {
      const settingforcurpage = savedUserOptionsSavedPayment[key]["user-advanced-options"][page];
      //console.log(settingforcurpage[today]['paymentRequest']);
      if (settingforcurpage[today]['paymentRequest']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['paymentRequest']['from'] && n <= settingforcurpage[today]['paymentRequest']['to'] )
        {
          useAdvance = 1;
        }
      }
    }
  }
  if (useAdvance == 1)
  {
    var paymentScriptAdvanced = window.document.createElement('script');
    paymentScriptAdvanced.type = 'text/javascript';
    paymentScriptAdvanced.id = 'payment';
    paymentScriptAdvanced.innerHTML = 'console.log("changing payment settings from advanced setting"); ' +
    '' +
    ' delete window.PaymentRequest;'+
    ' console.log("disable payment request for advanced settings");' ;
     window.document.getElementsByTagName('html')[0].insertBefore(paymentScriptAdvanced,document.getElementsByTagName("head")[0]);
  }
}

function changeDeviceOrientationAdvancedSettings() {
  const savedUserOptionsSaved = JSON.parse(localStorage.getItem("user-options"));
  let useAdvance = 0;
  for (var key in savedUserOptionsSaved)
  {
    let page = Object.keys(savedUserOptionsSaved[key]["user-advanced-options"]);
    if (page[0] == '.' + domain || page[0] == a) {
      const settingforcurpage = savedUserOptionsSaved[key]["user-advanced-options"][page];
      if (settingforcurpage[today]['deviceorientation']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['deviceorientation']['from'] && n <= settingforcurpage[today]['deviceorientation']['to'] )
        {
          useAdvance = 1;
        }
      }
    }
  }
  if (useAdvance == 1)
  {
    var deviceOrientationScriptAdvanced = window.document.createElement('script');
    deviceOrientationScriptAdvanced.type = 'text/javascript';
    deviceOrientationScriptAdvanced.id = 'deviceorientation';
    deviceOrientationScriptAdvanced.innerHTML = 'console.log("changing device orientation settings from advanced setting"); ' +
    '' +
    'delete Object.getPrototypeOf(window.DeviceMotionEvent).acceleration;'+
    'delete Object.getPrototypeOf(window.DeviceMotionEvent).accelerationIncludingGravity;'+
    'delete Object.getPrototypeOf(window.DeviceMotionEvent).rotationRate;'+
    'delete Object.getPrototypeOf(window.DeviceMotionEvent).interval;'+
    'delete Object.getPrototypeOf(window.DeviceOrientationEvent).absolute;'+
    'delete Object.getPrototypeOf(window.DeviceOrientationEvent).alpha;'+
    'delete Object.getPrototypeOf(window.DeviceOrientationEvent).beta;'+
    'delete Object.getPrototypeOf(window.DeviceOrientationEvent).gamma;'+
    'delete DeviceOrientationEvent;'+
    'delete DeviceMotionEvent;' +
    'window.remoevEventListener("deviceorientation", function(e) {});' +
    'window.remoevEventListener("devicemotion", function(e) {});' +
    ' console.log("disable device orientation request for advanced settings");' ;
     window.document.getElementsByTagName('html')[0].insertBefore(deviceOrientationScriptAdvanced,document.getElementsByTagName("head")[0]);
  }
}

function changeScreenOrientationAdvancedSettings() {
  const savedUserOptionsSaved = JSON.parse(localStorage.getItem("user-options"));
  let useAdvance = 0;
  for (var key in savedUserOptionsSaved)
  {
    let page = Object.keys(savedUserOptionsSaved[key]["user-advanced-options"]);
    if (page[0] == '.' + domain || page[0] == a) {
      const settingforcurpage = savedUserOptionsSaved[key]["user-advanced-options"][page];
      if (settingforcurpage[today]['orientationchange']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['orientationchange']['from'] && n <= settingforcurpage[today]['orientationchange']['to'] )
        {
          useAdvance = 1;
        }
      }
    }
  }
  if (useAdvance == 1)
  {
    var screenOrientationScriptAdvanced = window.document.createElement('script');
    screenOrientationScriptAdvanced.type = 'text/javascript';
    screenOrientationScriptAdvanced.id = 'screenorientation';
    screenOrientationScriptAdvanced.innerHTML = 'console.log("changing screen orientation settings from advanced setting"); ' +
    '' +
    ' console.log("disable screen orientations");' +
    ' delete Object.getPrototypeOf(window.screen).orientation;' +
    ' console.log("disable screen orientation request for advanced settings");' ;
     window.document.getElementsByTagName('html')[0].insertBefore(screenOrientationScriptAdvanced,document.getElementsByTagName("head")[0]);
  }
}

function changeBrightnessAdvancedSettings() {
  const savedUserOptionsSaved = JSON.parse(localStorage.getItem("user-options"));
  let useAdvance = 0;
  for (var key in savedUserOptionsSaved)
  {
    let page = Object.keys(savedUserOptionsSaved[key]["user-advanced-options"]);
    if (page[0] == '.' + domain || page[0] == a) {
      const settingforcurpage = savedUserOptionsSaved[key]["user-advanced-options"][page];
      if (settingforcurpage[today]['devicelight']['access'] == 'off')
      {
        var d = new Date();
        var n = d.getHours();
        if (n >= settingforcurpage[today]['devicelight']['from'] && n <= settingforcurpage[today]['devicelight']['to'] )
        {
          useAdvance = 1;
        }
      }
    }
  }
  if (useAdvance == 1)
  {
    var brightnessScriptAdvanced = window.document.createElement('script');
    brightnessScriptAdvanced.type = 'text/javascript';
    brightnessScriptAdvanced.id = 'devicelight';
    brightnessScriptAdvanced.innerHTML = 'console.log("changing brightness etting from advanced setting"); ' +
    '' +
    ' delete DeviceLightEvent;' +
    ' window.removeEventListener("devicelight", function(e) {});' +
    ' console.log("disable brightness request for advanced settings");' ;
     window.document.getElementsByTagName('html')[0].insertBefore(brightnessScriptAdvanced,document.getElementsByTagName("head")[0]);
  }
}
