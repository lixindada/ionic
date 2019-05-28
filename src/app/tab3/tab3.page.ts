import { Component } from '@angular/core';
// import { Flashlight } from '@ionic-native/flashlight/ngx';
import { ActionSheetController } from '@ionic/angular';
// import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx'; // 跳转

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  light: boolean;//判断闪光灯
  frontCamera: boolean;//判断摄像头
  isShow: boolean = false;//控制显示背景，避免切换页面卡顿
  constructor(
    private qrScanner: QRScanner,
  ) {
    //默认为false
    this.light = false;
    this.frontCamera = false;
    this.ionViewDidLoad();
  }
  
  ionViewDidLoad() {
    console.log("load");
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      console.log(status);
      if (status.authorized) {
        // camera permission was granted
        // start scanning
        console.log(status);
        
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          alert(text)
          console.log('Scanned something', text);
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  ionViewDidEnter(){
    //页面可见时才执行
    console.log("1111111111111");
    this.showCamera();
    this.isShow = true;//显示背景
  }

  /**
   * 闪光灯控制，默认关闭
   */
  toggleLight() {
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }

  /**
   * 前后摄像头互换
   */
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
    this.qrScanner.show();
  }

  hideCamera() {    
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
    this.qrScanner.destroy();//关闭
  }

  ionViewWillLeave() {
    this.hideCamera();
  }
}
