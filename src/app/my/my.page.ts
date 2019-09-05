import { Component, OnInit,HostListener } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";
import { ModalPage } from '../modal/modal.page';



// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {

  myInfo:any = null;

  constructor(
    private appGlobal:AppGlobal, 
    private appService:AppService, 
    private commonMethods:CommonMethods, 
    private router:Router, 
    public modalController: ModalController,
    public alertController: AlertController
  ) { 
    this.onload();
  }

  // load 
  onload(){
    const data = {};
    this.appService.post(AppGlobal.BASE_URL()+"my/detail",data).then(xhr=>{
      console.log(xhr);
      let data:any;
      data = xhr;
      if(data.code == 0){
        console.log(data);
        this.myInfo = data.data;
      }
    })
  }

  ngOnInit() {
  }
  // 修改密码
  // editPwd(){

  // }

  async editPwd() {
    console.log(ModalPage);
    
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { value: 123 }
    });
    console.log(modal);
    
    return await modal.present();
  }
  // 登出
  logout(){
    const data = {};
    this.appService.post(AppGlobal.BASE_URL()+"my/logout",data).then(xhr=>{
      let data:any;
      data = xhr;
      if(data.code == 0){
        this.commonMethods.toast("bottom","",data.msg);
        this.router.navigate(['/login']);
        localStorage.clear();
      }
    });
  }
  // 弹出框
  async presentAlertConfirm(msg:string) {
    const alert = await this.alertController.create({
      header: '提示：',
      message: '确认登出',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Okay');
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }
}
