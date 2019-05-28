import { Component, OnInit } from '@angular/core';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";
import { JPush } from '@jiguang-ionic/jpush/ngx';

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  smsCode:"";
  userName:"";
  password:"";

  constructor(private appGlobal:AppGlobal, private appService:AppService, private commonMethods:CommonMethods, private router: Router,private jpush: JPush,) {
  }

  login(){
    // console.log(AppGlobal.BASE_URL);
    if(localStorage.getItem("end") == "pc"){
      const data = {
        password:this.password,
        sms_code:this.smsCode,
        user_name:this.userName,
        jp_registration_id:"190e35f7e00c6a8cdee"
      };
      this.appService.post(AppGlobal.BASE_URL()+"my/login",data).then(xhr=>{
        console.log(xhr);
        let data:any;
        data = xhr;
        this.commonMethods.toast("bottom","ios",data.msg);
        if(data.code == 0){
          localStorage.setItem("app-Token",data.data.token);
          this.jpush.setAlias({sequence:12,alias:data.data.user.id}).then((xhr:any)=>{
            console.log("alias="+JSON.stringify(xhr));
          }).catch((err:any)=>{
            console.log(err);
          })
          this.router.navigate(['/tabs/tab1']);
        }
      }).catch(err=>{
        console.log(err);
      })
    } else {
      this.jpush.getRegistrationID().then((value:any)=>{
        console.log("RegistrationID="+value);
        const data = {
          password:this.password,
          sms_code:this.smsCode,
          user_name:this.userName,
          jp_registration_id:value || "190e35f7e00c6a8cdee"
        };
        console.log(data);
        
        this.appService.post(AppGlobal.BASE_URL()+"my/login",data).then(xhr=>{
          console.log(xhr);
          let data:any;
          data = xhr;
          if(data.code == 0){
            this.commonMethods.toast("bottom","ios",data.msg);
            localStorage.setItem("app-Token",data.data.token);
            this.jpush.setAlias({sequence:12,alias:data.data.user.id}).then((xhr:any)=>{
              console.log("alias="+JSON.stringify(xhr));
            }).catch((err:any)=>{
              console.log(err);
            })
            this.router.navigate(['/tabs/tab1']);
          }
        })
      });
    }
  }

  ngOnInit() {
  }

}
