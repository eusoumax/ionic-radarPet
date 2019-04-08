import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet'

import {Geolocation} from '@ionic-native/geolocation/ngx'
import { Toast} from '@ionic-native/toast/ngx';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    LeafletModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ,Geolocation,
    Toast
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  //private static url_api: string = "http://192.168.0.12:8001";
  private static url_api: string = "http://sennanet.pythonanywhere.com/gps2";


  static getUrl_Api() {
    return this.url_api;
}
}
