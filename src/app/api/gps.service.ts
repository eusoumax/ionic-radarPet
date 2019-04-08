import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { AppModule } from '../app.module';
import { Toast } from '@ionic-native/toast/ngx';
@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private API_URL: string = AppModule.getUrl_Api();
  //private API_URL: string = 'http://192.168.0.12:8000';
  constructor(
    public http: HttpClient,
    private toast: Toast) { }



  buscarGeo(data: any){
    console.log('buscarGeo' + JSON.stringify(data));
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    var f = this.http.post(this.API_URL + '/gps', { data });
    return f;
  }

  
  salvarPontoAtual(data: any){
    console.log('buscarGeo' + JSON.stringify(data));
    this.toast.show('buscarGeo' + JSON.stringify(data), '1000', 'center');
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    var f = this.http.post(this.API_URL + '/gps', { data });
    return f;
  }

  enviarPonto(){
    let data:any = {"porra": "porra", "queisso":"legal"};
    let params = new URLSearchParams();
    params.append("porra", data.porra);
    params.append("queisso", data.queisso);
    console.log('enviarPonto' + JSON.stringify(data));
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    var f = this.http.get(this.API_URL + '/gps2', {"headers":headers, "params":data});
    return f;
  }

  enviarPonto2(data:any){
    console.log('enviarPonto2' + JSON.stringify(data));
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    var f = this.http.get(this.API_URL + '/gps2', {"headers":headers, "params":data});
    return f;
  }
  
}
