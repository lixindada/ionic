import { Component, OnInit } from '@angular/core';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";

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

  constructor(private appGlobal:AppGlobal, private appService:AppService, private commonMethods:CommonMethods, private router: Router) { }

  login(){
    // console.log(AppGlobal.BASE_URL);
    const data = {
      password:this.password,
      sms_code:this.smsCode,
      user_name:this.userName
    };
    this.appService.post(AppGlobal.BASE_URL+"my/login",data).then(xhr=>{
      console.log(xhr);
      let data;
      data = xhr;
      if(data.code == 0){
        this.commonMethods.toast("bottom","ios",data.msg);
        localStorage.setItem("app-Token",data.data.token);
        this.router.navigate(['/tabs/tab1']);
      }
    })
  }

  ngOnInit() {
  }

}
