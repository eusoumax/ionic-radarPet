npm install -g ionic


cd myApp 
ionic serve


ionic cordova plugin add cordova-plugin-geolocation
npm install @ionic-native/geolocation


cordova platform add android --save


ANDROID_HOME
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools

ANDROID_SDK_ROOT = %ANDROID_HOME%

https://edupala.com/how-to-add-leaflet-map-in-ionic-3/

npm install --save ionic-angular
npm install --save rxjs-compat

#gps:
ionic cordova plugin add cordova-plugin-geolocation
npm install @ionic-native/geolocation

#debug android
ionic cordova run --platform android --list
ionic cordova run --platform android --target=6ab09793 -l

#leaflet
npm install leaflet --save


#Toast
https://ionicframework.com/docs/native/toast
ionic cordova plugin add cordova-plugin-x-toast
npm install @ionic-native/toast

#Ionic Create Components
https://ionicframework.com/docs/cli/commands/generate
ionic generate
ionic generate page
ionic generate page contact
ionic generate component contact/form
ionic generate component login-form --change-detection=OnPush
ionic generate directive ripple --skip-import
ionic generate service api/user

ionic generate service api/gps



# instalar moment

npm install moment --save
+ moment@2.24.0


teste