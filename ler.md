Projeto criando ionic usando o o framework leaflet


1)criar projeto
ionic start radarPet blank
2) install plataform android
ionic cordova platform add android

3) ajudar sobre cordova
ionic cordova platform --help

#leaflet + angular

https://github.com/Asymmetrik/ngx-leaflet
npm install leaflet --save
npm install @asymmetrik/ngx-leaflet --save
npm install --save-dev @types/leaflet


#install leaflet draw

npm install leaflet
npm install leaflet-draw
npm install @asymmetrik/ngx-leaflet
npm install @asymmetrik/ngx-leaflet-draw


#angular.json:

"styles": [
    {
    "input": "src/theme/variables.scss"
    },
    {
    "input": "src/global.scss"
    },
    {
    "input": "./node_modules/leaflet/dist/leaflet.css"
    }
],

"assets": [
{
    "glob": "**/*",
    "input": "node_modules/leaflet/dist/images",
    "output": "leaflet"
    }

],
+++++++++++++++++++++++++++++++++++++++++++

ionic cordova platform --help

ionic cordova run