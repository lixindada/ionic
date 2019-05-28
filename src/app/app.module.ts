import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { Flashlight } from '@ionic-native/flashlight/ngx'; // 手电筒
// import { ZBar } from '@ionic-native/zbar/ngx'; // 扫码
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// import { Push } from '@ionic-native/push/ngx'; // 推送
import { BaiduPush } from '@ionic-native/baidu-push/ngx'; // 百度推送
// import { CodePush } from '@ionic-native/code-push/ngx'; // 微软推送
import { ActionSheet } from '@ionic-native/action-sheet/ngx'; // 底部弹出框
import { HTTP } from '@ionic-native/http/ngx'; // http
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx'; // 跳转
// jPush
import { Device } from '@ionic-native/device/ngx';
import { JPush } from '@jiguang-ionic/jpush/ngx';

// http
import { AppGlobal,AppService,CommonMethods } from './config/config.service';
import { HttpClientModule } from '@angular/common/http';

// file
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ModalPage } from './modal/modal.page';
import { ModalPageModule } from './modal/modal.module';


import { AppMinimize } from '@ionic-native/app-minimize/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ModalPageModule
  ],
  providers: [
    // Flashlight,
    // ZBar,
    QRScanner,
    // BarcodeScanner,
    BaiduPush,
    // CodePush,
    ActionSheet,
    HTTP,
    // 请求
    AppGlobal,
    AppService,
    CommonMethods,
    // end
    NativePageTransitions,
    File,
    FileTransfer,
    // Push,
    Device,
    JPush,
    StatusBar,
    SplashScreen,
    AppMinimize,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
