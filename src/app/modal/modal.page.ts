import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";


@Component({
  selector: 'modal-page',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  value:"";
  oldPwd:null;
  newPwd:null;
  dbPwd:null;

  constructor(private appGlobal:AppGlobal, private appService:AppService, private commonMethods:CommonMethods, private modalController: ModalController) { }

  ngOnInit() {
  }

  // 关闭弹框
  closeModal(){
    this.modalController.dismiss();
  }

  // 完成
  complete(){
    const data = {
      new_password:this.newPwd
    };
    this.appService.post(AppGlobal.BASE_URL+"my/change-password",data).then(xhr=>{
      console.log(xhr);
      let data:any;
      data = xhr;
      if(data.code == 0){
        this.commonMethods.toast("bottom","ios",data.msg);
        this.closeModal();
      }
    })
  }

}
