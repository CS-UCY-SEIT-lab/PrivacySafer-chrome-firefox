console.log("Injected");
console.log(window.navigator.connection);
console.log("agent " + window.navigator.appVersion);
var ss = {storage: {}};
var userSets = {};
var pageName=window.location.href;
if (!localStorage.hasOwnProperty("page-name")) {
    chrome.storage.local.get("user-settings", function (userOptions) {
        if (!isEmpty(userOptions)) {
            ss.storage["user-settings"] = JSON.parse(userOptions["user-settings"]);
        }
        chrome.storage.local.get("user", function (userOptions2) {
            if (userOptions2.hasOwnProperty("user")){
                userOptions2["user"] = JSON.parse(userOptions2["user"]);
               if (userOptions2.user.hasOwnProperty("user-advance-settings")) {
                   console.log("taking user-advance-settings");
                   ss.storage["user-advance-settings"] = userOptions2["user"]["user-advance-settings"];
                   console.log(ss.storage["user-advance-settings"]);
               }
               if (userOptions2.user.hasOwnProperty("user-group-settings")) {
                   ss.storage["user-group-settings"] = userOptions2["user"]["user-group-settings"];
               }
                if (isEmpty(ss.storage)){
                    load();
                    return;
                }

                if ( ss.storage.hasOwnProperty("user-advance-settings") &&!isEmpty(ss.storage["user-advance-settings"])){
                    console.log("in advance");
                    userSets = checkForAdvance(ss.storage["user-advance-settings"]);
                }
                if (isEmpty(userSets)){
                    console.log("in group");
                    if (ss.storage.hasOwnProperty("user-advance-settings")&&!isEmpty(ss.storage["user-group-settings"])) {
                        userSets = checkForGroups(ss.storage["user-group-settings"]);
                    } else {
                        userSets = {};
                    }
                }
            }
            if (isEmpty(userSets)){
                if (ss.storage.hasOwnProperty("user-advance-settings") && ss.storage["user-advance-settings"].hasOwnProperty("Override Default Settings")){
                    userSets = ss.storage["user-advance-settings"]["Override Default Settings"];
                    userSets = ovveride(userSets);
                }
                if (isEmpty(userSets)) {
                    if (!isEmpty(ss.storage["user-settings"])) {
                        userSets = ss.storage["user-settings"];
                    } else {
                        userSets = {};
                    }
                }
            }
            if (!isEmpty(userSets)) {
                userSets = JSON.stringify(userSets);
                localStorage.setItem("user-settings", userSets);
            }
            load();
        });

    });
    localStorage.setItem("page-name",pageName);
    window.stop();
} else {
    console.log("has checked");
    if (localStorage.hasOwnProperty("user-settings")) {
        createUserSettingsDeleteElement();
        deleteUserSettingsEvents();
    }
    localStorage.removeItem("user-settings");
    localStorage.removeItem("page-name");
}


function ovveride(settings){
    var DAYS = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    var today = DAYS[new Date().getDay()];
    var sets = createUserSettings(settings[today]);
    return sets;
}

function load(){
    window.location.href = localStorage.getItem("page-name");

}
function createUserSettingsDeleteElement(){
	console.log("createUserSettingsDeleteElement");
    var myScript = top.window.document.createElement('script');

    myScript.type = 'text/javascript';
    myScript.id="navigator";
	
    myScript.innerHTML = 'console.log("deleting"); ' +
    'var userSettings={};' +
    'var nav=navigator; ' +
    'delete window.navigator;' +
    'window.navigator = {};' +
    'userSettings = JSON.parse(localStorage.getItem("user-settings"));'+
    'console.log(userSettings);' +
    '' +
	' var changedLatitude, changedLongitude; ' +
    '' +
    'for (var navkey in nav){' +
	
	'	if(navkey=="geolocation"){' +
	'    console.log("found geolocation");' +
    '    }' +
    '   if(navkey=="appVersion"){' +
    '       if (userSettings["oscpu"]==false){' +
    '           continue;' +
    '       }' +
    '   }'+
    '   if (userSettings.hasOwnProperty(navkey) && userSettings[navkey]==false){' +
    '       continue;' +
    '   }' +
    ''+
    '   window.navigator[navkey]=nav[navkey];' +
    ''+
    '}' +
    ''+
    'if(userSettings.hasOwnProperty("indexedDB") && userSettings["indexedDB"]==false){' +
    '  delete indexedDB;' +
    '}' +
    '' +
    'if(userSettings.hasOwnProperty("notification") && userSettings["notification"]==false){' +
    '   delete Notification;' +
    '}' +
		
	'' +
    'if (userSettings.hasOwnProperty("batteryaccess") && userSettings["batteryaccess"]==true) {' + 
    '   window.navigator.getBattery = nav.getBattery;' +
    '   console.log(\'BATTERY ACCESS IS: \' + userSettings["batteryaccess"] + \' :: \' + window.navigator.getBattery);' +
    '} else {' +
    '   window.navigator.getBattery = null;' +
    '   console.log(\'BATTERY ACCESS IS: \' + userSettings["batteryaccess"] + \' :: \' + window.navigator.getBattery);' +
    '}' +
    '' +
       
	'if(userSettings.hasOwnProperty("geolocation") && userSettings["geolocation"]==true) {' +	 
	'	 if (userSettings.hasOwnProperty("geolocationobfuscationtype")) {' +
	'		if (userSettings["geolocationobfuscationtype"]=="obfuscationauto") {' +
	'			console.log("obfuscation auto");' +
	'			userSettings["radius"] = "20";' +
	'			window.navigator.geolocation.getCurrentPosition(successRadius, failure);	' +
	'			window.navigator.geolocation.getCurrentPosition = function(success, failure) { ' +
	'					success({ coords: { ' +
	'						latitude: changedLatitude, ' +
	'						longitude:changedLongitude,' +
	'					}, timestamp: Date.now() });' +
	'			}' +
	
	'		}' +
	'		else if (userSettings["geolocationobfuscationtype"]=="obfuscationspecific") {' +
	'			   console.log("obfuscation specific");' +
	'			   if(userSettings.hasOwnProperty("geolocationlatitude") && userSettings.hasOwnProperty("geolocationlongitude")' +
	'		       && userSettings["geolocationlatitude"].length != 0 && userSettings["geolocationlongitude"].length != 0) {' +
	'				window.navigator.geolocation.getCurrentPosition = function(success, failure) { ' +
	'					success({ coords: { ' +
	'						latitude: userSettings["geolocationlatitude"], ' +
	'						longitude: userSettings["geolocationlongitude"],' +
	'					}, timestamp: Date.now() });' +
	'				}' +
	'			   }' +
	'			   else {' +
	'				   window.navigator.geolocation.getCurrentPosition = function(success, failure) { ' +
	'					success({ coords: { ' +
	'						latitude: 40.730610,' + 
	'						longitude: -73.935242,' +
	'					}, timestamp: Date.now() });' +
	'				}' +
	'			}' +
	'		}' +
	'		else if (userSettings["geolocationobfuscationtype"]=="obfuscationradius") {' +
	'			if(userSettings.hasOwnProperty("radius") && userSettings["radius"].length != 0) {' +
	'				window.navigator.geolocation.getCurrentPosition(successRadius, failure);	' +
	'				window.navigator.geolocation.getCurrentPosition = function(success, failure) { ' +
	'				success({ coords: { ' +
	'					latitude: changedLatitude, ' +
	'					longitude:changedLongitude,' +
	'				}, timestamp: Date.now() });' +
	'			}' +
	'			}' +
	
	'		}' +
	
	'	}' +
	'}		' +
	'	function successRadius(position) {' +
		'	originLat = position.coords.latitude;' +
		'	originLong = position.coords.longitude;' +	
		'	r = userSettings["radius"]*1000/111300;' +
		'	u = Math.random();' +
		'	v = Math.random();' +
		'	w = r * Math.sqrt(u);' +
		'	t = 2 * Math.PI * v;' +
		'	x = w * Math.cos(t);' +
		'	y1 = w * Math.sin(t);' +
		'	x1 = x / Math.cos(originLat);' +	
		'	changedLatitude = originLat + y1;' +
		'	changedLongitude = originLong + x1;' +
		'}' +
    'function failure() {' +
	'}	' +
	
    '';
    '' +
    top.window.document.getElementsByTagName('html')[0].insertBefore(myScript, document.getElementsByTagName("head")[0]);
}

function deleteUserSettingsEvents(){
    var mySecondScript =top.window.document.createElement('script');
    mySecondScript.type = 'text/javascript';
    mySecondScript.id="events";
    mySecondScript.innerHTML = '' +
    'if (userSettings["deviceorientation"]==false){' +
    '   delete DeviceOrientationEvent;'+
    '   delete DeviceMotionEvent;   '+
    '}' +
    '' +
    'if (userSettings["orientationchange"]==false){' +
    '   delete ScreenOrientation;' +
    '   ' +
    '}' +
    '' +
    'if (userSettings.hasOwnProperty("devicelight") && userSettings["devicelight"]==false){' +
    '   delete DeviceLightEvent;' +
    '   window.removeEventListener("devicelight",function (e){});' +
    '}' +
    '' +
    'if (userSettings.hasOwnProperty("userproximity") && userSettings["userproximity"]==false){' +
    '   delete UserProximityEvent;' +
    '   delete DeviceProximityEvent;' +
    '}'+
    '' +
    '';
    top.window.document.getElementsByTagName('html')[0].insertBefore(mySecondScript, document.getElementsByTagName("head")[0]);
}

function checkForAdvance(store){
    var distances = {};
    var DAYS = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    var today = DAYS[new Date().getDay()];
    var sets = {};
    pageName= pageName.replace("http://","");
    pageName=pageName.replace("https://","");
    for(var key in store){
        if (pageName.indexOf(key)>-1){
            var dist = distanceString(pageName,key);
            distances[key] = dist;
        }
    }
    if (!isEmpty(distances)){
        var maxPageName = maxDistance(distances);
        if (maxPageName== undefined) { return {};}
        sets=  createUserSettings(store[maxPageName][today]);
    }
    return sets;
}


function createUserSettings(userSettings){
    //***** additions by kkyria16 for battery level check
    var batteryLevel = 0;
    var isBatteryLevelDependent = true;
    chrome.storage.local.get(["battery-level-settings"], function(result) {
              batteryLevel = result['battery-level-settings'];
    });

    if((nav.getBattery().level*100) < batteryLevel){
        isBatteryLevelDependent = true;
    }else{
        isBatteryLevelDependent = false;
    }
    //*****

    var today = new Date();
    var hourNow = today.getHours()*60 + today.getMinutes();
    var settings= {};
    for (var key in userSettings){
        if (userSettings[key].access=="off"){
            settings[key] = false;
        }else{
            var start =  userSettings[key].time.start.split(":");
            var end = userSettings[key].time.end.split(":");
            var hourStart = parseInt(start[0])*60+parseInt(start[1]);
            var hourEnd = parseInt(end[0])*60+parseInt(end[1]);
            if (hourStart<hourNow && hourNow < hourEnd && isBatteryLevelDependent){ //addition for battery level
                settings[key] = true;
            }else{
                settings[key] = false;
            }

        }

    }return settings;
}

function distanceString(str1,str2){

    var dist = 0;
    for (var i=0; i<str1.length && i<str2.length;i++){
        if (str1.charAt(i)==str2.charAt(i)){
            dist++;
        }else{
            return dist;
        }
    }

    return dist;
}


function maxDistance( t){
    var max = -1;
    var pageName = "";
    for (var key in t){
        if (t[key]>max){
            max = t[key];
            pageName = key;
        }
    }
    return pageName;
}

function isEmpty(e){

    for(var key in e){
        return false;
    }
    return true;
}


function checkForGroups(store){

    var DAYS = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    var today = DAYS[new Date().getDay()];

    for (var key in store){
        if (key.charAt(0)!='.'){
            continue;
        }
        if (pageName.indexOf(key)>1){
            return createUserSettings(store[key][today]);
        }


    }


}