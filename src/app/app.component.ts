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
