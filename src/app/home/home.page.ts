import { Component, OnInit } from '@angular/core';

import { polyline, latLng, tileLayer,point, Map as lfMap,icon,marker,FeatureGroup,polygon,geoJSON} from 'leaflet';
import * as L from 'leaflet';
//import { } from '@types/leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { GpsService } from '../../app/api/gps.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public funMap: lfMap;

  // Define our base layers so we can reference them multiple times
  googleMaps = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });
  googleHybrid = tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    detectRetina: true
  });
  // Open Street Map definitions
  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });
  // Arcgis Map definitions
  LAYER_ARGIS = tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'ArcGis Map' });
  
  // mapbox so para demostracao
  acessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  mapboxAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>';
  mapboxMapUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  //LAYER_MAPBOX_ST = L.tileLayer(this.mapboxMapUrl, { maxZoom: 18, attribution: this.mapboxAttr, id: 'mapbox.streets'});
  //LAYER_MAPBOX_SS = tileLayer(this.mapboxMapUrl, { maxZoom: 18, attribution: this.mapboxAttr, id: 'mapbox.streets-satellite' });
  //LAYER_MAPBOX_LT = tileLayer(this.mapboxMapUrl, { maxZoom: 18, attribution: this.mapboxAttr, id: 'mapbox.light' });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = marker([46.78465227596462, -121.74141269177198], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });
  route = polyline([[46.78465227596462, -121.74141269177198],
  [46.80047278292477, -121.73470708541572],
  [46.815471360459924, -121.72521826811135],
  [46.8360239546746, -121.7323131300509],
  [46.844306448474526, -121.73327445052564],
  [46.84979408048093, -121.74325201660395],
  [46.853193528950214, -121.74823296256363],
  [46.85322881676257, -121.74843915738165],
  [46.85119913890958, -121.7519719619304],
  [46.85103829018772, -121.7542376741767],
  [46.85101557523012, -121.75431755371392],
  [46.85140013694763, -121.75727385096252],
  [46.8525277543813, -121.75995212048292],
  [46.85290292836726, -121.76049157977104],
  [46.8528160918504, -121.76042997278273]]);

  // Marker for the top of Mt. Ranier
  summit = marker([46.8523, -121.7603], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  layersControl = {
    baseLayers: {
       'Google Hybrid': this.googleHybrid
      ,'Google Maps': this.googleMaps
      ,'Open Street Map': this.LAYER_OSM
      ,'ArcGis Map': this.LAYER_ARGIS 
      //,'MapBox - Street': this.LAYER_MAPBOX_ST
      //,'MapBox - Street Satelite': this.LAYER_MAPBOX_SS
      //,'MapBox - Light': this.LAYER_MAPBOX_LT
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
      'Mt. Rainier Paradise Start': this.paradise,
      'Mt. Rainier Climb Route': this.route
    }
  };

  leafMarkers = [this.googleHybrid, this.route, this.summit, this.paradise];

  options:any = {
    //layers: [
    //  tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: '...' })
    //],
    layers: this.leafMarkers,
    zoom: 11,
    center: latLng([-22.878705724951253, -43.233261108398445])
  };

  constructor(
    private gpsService: GpsService,
    private geolocation: Geolocation,
    private toast: Toast) {

  }

  ngOnInit(){


    this.geolocation.getCurrentPosition().then((resp) => {
        
      this.toast.show(`Atual - longitude:${resp.coords.longitude} || latitude:${resp.coords.latitude}`, '5000', 'center').subscribe(
        toast => {
          console.log(`resultado do servidor:${toast}`);
        }
      );
       // setTimeout(()=>{
       //   console.log(resp);
       //   this.toast.show
       // }, 10000);
      // resp.coords.latitude
      // resp.coords.longitude
       }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
       //setTimeout(()=>{
       //  console.log(data);
       // }, 10000);

       this.gpsService.salvarPontoAtual({
        "dataAtual":moment().toDate(),
        "longitude": data.coords.longitude,
        "latitude": data.coords.latitude,
          }).subscribe((data:any) => {
            this.toast.show(data, '5000', 'center');
          },(error)=>{
            this.toast.show(error, '5000', 'center');
          });
          this.toast.show(`longitude:${data.coords.longitude} || latitude:${data.coords.latitude}`, '5000', 'center').subscribe(
            toast => {
              console.log(`resultado do servidor:${JSON.stringify(toast)}`);
            
            }
      );
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
    
  }
  

  enviarPonto(){
    this.gpsService.enviarPonto().subscribe((data:any) => {
          this.toast.show(`resposta do servidor: ${JSON.stringify(data)}`, '5000', 'center');
        },(error)=>{
          this.toast.show(`erro: ${error}`, '5000', 'center');
        }        
    );
  }

  enviarPonto2(){

  //this.geolocation.getCurrentPosition().then((resp) => {
  //      console.log("resp",resp);
        this.gpsService.enviarPonto2({"horaAtual":moment().toDate()}).subscribe((data:any) => {
              this.toast.show(`resposta do servidor: ${JSON.stringify(data)}`, '5000', 'center');
            },(error)=>{
              this.toast.show(`enviarPonto2 - erro: ${error}`, '5000', 'center');
            }        
        );
  //    }),(error:any) => {
  //    console.log('Error getting location', error);
  //  };

  }
}
