// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.gmeteor-app',
  name: 'gmeteor-app',
  description: 'gmeteor-app description',
  author: 'gmeteor-app author',
  email: 'user@gmeteor-app.com',
  website: 'http://gmeteor-app.com'
});

// Set up resources such as icons and launch screens.
//App.icons({
//  'iphone': 'app/icon.png',
//  'android_ldpi': 'app/icon.png',
//  'android_mdpi': 'app/icon.png',
//  'android_hdpi': 'app/icon.png',
//  'android_xhdpi': 'app/icon.png'
//});
//
//App.launchScreens({
//  'iphone': 'app/splash.png',
//  'android_ldpi_portrait': 'app/splash.png',
//  'android_mdpi_portrait': 'app/splash.png',
//  'android_hdpi_portrait': 'app/splash.png',
//  'android_xhdpi_portrait': 'app/splash.png'
//});

// Set PhoneGap/Cordova preferences
App.setPreference('Orientation', 'portrait');
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('android-minSdkVersion', '16');
App.setPreference('android-targetSdkVersion', '16');
App.accessRule("*", {launchExternal: true});
//// Pass preferences for a particular PhoneGap/Cordova plugin
//App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//  APP_ID: '1234567890',
//  API_KEY: 'supersecretapikey'
//});