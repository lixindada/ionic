import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController,LoadingController } from '@ionic/angular';

import { BaseUI } from '../../assets/js/baseui'
// Router
import { Router } from '@angular/router';
import { log } from 'util';

@Injectable()
export class AppGlobal {
  // static BASE_URL='http://172.168.30.230:7001/';
  // static BASE_URL='/testapi/';
  static BASE_URL () {
    const ua = navigator.userAgent;
    // let url = "http://172.168.30.230:7001/"; // test
    let url = "http://47.92.151.49:7001/"  // test
    // let url = "http://47.92.254.91:7001/"
    if(/MRA58N/i.test(ua)){
      // url = "/testapi/";
      url = "/www/";
      // url = "/api/";
    }
    return url;
  }
  constructor(){
    console.log();
  }
}

@Injectable()
export class AppService extends BaseUI  {
  loading:any;
  constructor(
    private http: HTTP, 
    private httpPc: HttpClient,
    public toastController: ToastController,
    public loadingController: LoadingController, 
    private router: Router,
  ) {
    super();
  }
  // post
  post(url:string,param:any) {
    const that = this;
      return new Promise( function(resolve, reject) {
        // pc test
        // ---------------------------------------------------------------------------
        const ua = navigator.userAgent;
      if(/MRA58N/i.test(ua)){
        console.log("pc");
        const headers = new HttpHeaders({
          "x-token":localStorage.getItem("app-Token") || ""
        });
          that.httpPc.post(url,param, {headers:headers}).subscribe(
            (val) => {
              // console.log("POST call successful value returned in body", val);
              let datas:any;
              datas = val;
              if(datas.code == 401){
                that.toast("bottom","ios",datas.msg);
                that.router.navigate(['/login']);
              }
              resolve(datas);
            },
            response => {
                // console.log("POST call in error", response);
            },
            () => {
                // console.log("The POST observable is now completed.");
            }
          );
        } else {
          //------------------------------------------------------------------------------
          that.http.setDataSerializer('json');
          that.http.post(url, param, {"x-token":localStorage.getItem("app-Token") || "","Content-Type": "application/json"})
          .then(data => {
            if(data.status == 200){
              const datas = JSON.parse(data.data);
              if(datas.code == 401){
                that.toast("bottom","ios",datas.msg);
                that.router.navigate(['/login']);
              }
              resolve(datas);
            }
          })
          .catch(error => {
            reject(error);
          });
        }
      });
    // }
  }

  // post
  get(url:string,param:any) {
    const that = this;
      console.log(url,param);
      return new Promise( function(resolve, reject) {
        // pc test
        // ---------------------------------------------------------------------------
        const ua = navigator.userAgent;
      if(/MRA58N/i.test(ua)){
        console.log("pc");
        const headers = new HttpHeaders({
          "x-token":localStorage.getItem("app-Token") || ""
        });
          that.httpPc.get(url,{headers:headers}).subscribe(
            (val) => {
              // console.log("POST call successful value returned in body", val);
              let datas:any;
              datas = val;
              if(datas.code == 401){
                that.toast("bottom","ios",datas.msg);
                that.router.navigate(['/login']);
              }
              resolve(datas);
            },
            response => {
                // console.log("POST call in error", response);
            },
            () => {
                // console.log("The POST observable is now completed.");
            }
          );
        } else {
          //------------------------------------------------------------------------------
          that.http.get(url, param, {"x-token":localStorage.getItem("app-Token") || ""})
          .then(data => {
            if(data.status == 200){
              const datas = JSON.parse(data.data);
              if(datas.code == 401){
                that.toast("bottom","ios",datas.msg);
                that.router.navigate(['/login']);
              }
              resolve(datas);
            }
          })
          .catch(error => {
            reject(error);
          });
        }
      });
  }

  async toast(position,mode,message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      // mode: mode,
      position: position
    });
    toast.present();
  }
}

@Injectable()
export class CommonMethods  {
  constructor(public toastController: ToastController) { }
  /**
   * @methods toast
   * @param position "bottom" | "middle" | "top" 
   * ------ mode 	"ios" | "md" 
   * ------ message 	string 
   */
  async toast(position,mode,message){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      // mode: mode,
      position: position
    });
    toast.present();
  }
}