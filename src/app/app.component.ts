import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// push
import { JPush } from '@jiguang-ionic/jpush/ngx';

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private jpush: JPush,
    private router: Router
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // 极光推送
      jpush.init();
      jpush.setDebugMode(true);
      // jpush.getRegistrationID().then((value:any)=>{
      //   localStorage.setItem("jp_registration_id",value);
      //   console.log("RegistrationID="+value);
      // });
      // jpush.setTags({sequence:12,tags:["管理员","采购"]}).then((xhr:any)=>{
      //   console.log("tags="+JSON.stringify(xhr));
      // }).catch((err:any)=>{
      //   console.log(err);
      // })
    });
    this.initializeApp();
    this.isLogin();
  }

  // 是否登陆
  isLogin(){
    if (localStorage.getItem("app-Token")) {
      // console.log(this);
      // this.router.navigate(['/tabs/tab1']);
    } else {
      // console.log(this);
      this.router.navigate(['/login']);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
