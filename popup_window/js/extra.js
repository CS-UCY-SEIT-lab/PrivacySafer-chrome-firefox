// User Unique ID //
var HARDWARE_SUPPORTED = ["geolocation","bluetooth","vibrate","onLine","mediaDevices","oscpu","deviceorientation","orientationchange","notification","indexedDB","batteryaccess","connection","devicelight","userproximity"];

// parameters relevant to obfuscation to be stored
var OBFUSCATION_PARAMETERS = ["geolocationlatitude", "geolocationlongitude", "radius"];

// Function that sets the saved settings //
$("#settings-button").on("click",restoreUserSettings);

//$("#footer-scan-page").on("click",scanWebPage);
$("#newpage").on("click",openInNewTab);

// Function for showing and hiding the tabs in every hardware section 
$("a.list-group-item").on("click",function(){
    var t = $("*.collapse.internal").collapse("hide");
    $("."+$(this).href).collapse("show");
});

// Function that highlights the selected section of hardware 
$(".list-group-item.api").on("click",function () {

    if ($(this).hasClass("active-hover")){
        $(".list-group-item.api").removeClass("active-hover");
    } else{
        $(".list-group-item.api").removeClass("active-hover");
        $(this).addClass("active-hover");
    }
});

var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isIOSChrome = winNav.userAgent.match("CriOS");
    
// hide for Firefox
if (typeof InstallTrigger !== 'undefined') {
	$('#battery').hide(); 
	$('#network').hide(); 
}
// hide for Chrome
if (isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc.") {
	$('#light').hide(); 
	$('#proximity').hide(); 
}

// show/hide areas for obfuscation
$('#geolocationcoordinates').hide(); 
$('#geolocationradius').hide(); 

$("#obfuscationnone").on("click",function(){
	$('#geolocationcoordinates').hide(); 
	$('#geolocationradius').hide(); 
});
$("#obfuscationauto").on("click",function(){
	$('#geolocationcoordinates').hide(); 
	$('#geolocationradius').hide(); 
});
$("#obfuscationspecific").on("click",function(){
	$('#geolocationcoordinates').show(); 
	$('#geolocationradius').hide();
});
$("#obfuscationradius").on("click",function(){
	$('#geolocationcoordinates').hide(); 
    $('#geolocationradius').show();  
})

// Function that runs when user selects a setting to save the new settings
$("#dev .list-group .list-group-item").on("click",function(){
    setTimeout(takeUserSettings,100);
});
$("#comm .list-group .list-group-item").on("click",function(){
    setTimeout(takeUserSettings,100);
});
$("#dataa .list-group .list-group-item").on("click",function(){
    setTimeout(takeUserSettings,100);
});

$("#geolocationobfuscationtype input[name='optradio']").on('change', function() {
   setTimeout(takeUserSettings,100);
});
$("#geolocationlatitude").on("click",function(){
	setTimeout(takeUserSettings,1000);
	$("#radius").reset(); 	// clear radius
});
$("#geolocationlongitude").on("click",function(){
	setTimeout(takeUserSettings,1000);
	$("#radius").reset(); 	// clear radius
});
$("#radius").on("click",function(){
	setTimeout(takeUserSettings,500);
	// clear coordinates
	$("#geolocationlatitude").reset();
	$("#geolocationlongitude").reset();
});

// Function that takes the user settings from panel//
function takeUserSettings() {
    var userOption = {};
    for (var i = 0; i < HARDWARE_SUPPORTED.length; i++) {
    	// if it is supported in the browser 
    	if(document.getElementById(HARDWARE_SUPPORTED[i])) {
    		userOption[HARDWARE_SUPPORTED[i]] = document.getElementById(HARDWARE_SUPPORTED[i]).checked;	
    	}
    }
	// save obfuscation
    userOption["geolocationobfuscationtype"] = $("#geolocationobfuscationtype input[name='optradio']:checked").val();
	for (var k = 0; k < OBFUSCATION_PARAMETERS.length; k++) {
      userOption[OBFUSCATION_PARAMETERS[k]] = document.getElementById(OBFUSCATION_PARAMETERS[k]).value;
    }
	
    saveUserSettings(userOption);
}


// function that saves user settings
function saveUserSettings(settings){
    chrome.storage.local.set({"user-settings":JSON.stringify(settings)},function(){
           console.log("Data Saved");
    });
}

// function that retrieves user settings from local storage //
function restoreUserSettings() {
    var userOptions = chrome.storage.local.get("user-settings", function (userOptions) {
        console.log("Data Retrieved");
        userOptions = JSON.parse(userOptions["user-settings"]);
        console.log(userOptions);
        for (var key in userOptions) {
			if (HARDWARE_SUPPORTED.includes(key)) {
			   if (userOptions[key] === true) {
				  document.getElementById(key).checked = true;
				   $("#" + key).bootstrapToggle('on');
			   } else {
				   document.getElementById(key).checked = false;
				  $("#" +  key).bootstrapToggle('off');
			  }
			}
			else if (key === "geolocationobfuscationtype") {
				document.getElementById(userOptions[key]).checked = true; 
				if (userOptions[key] == "obfuscationspecific") {
					$('#geolocationcoordinates').show();
				}
				else if (userOptions[key] == "obfuscationradius") {
					$('#geolocationradius').show();  
				}
			}
			else if (OBFUSCATION_PARAMETERS.includes(key)) {
				 document.getElementById(key).value = userOptions[key];
			}
		
       }
      });
}

function openInNewTab() {
    var win = window.open("./popup_window/components/page.html", '_blank');
    win.focus();
}