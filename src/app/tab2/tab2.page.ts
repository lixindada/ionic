import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
// import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// import { BaiduPush } from '@ionic-native/baidu-push/ngx';
// import { CodePush } from '@ionic-native/code-push/ngx';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { HTTP } from '@ionic-native/http/ngx';
// 上传文件
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
// bar 
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {

  constructor(
    // private zbar: ZBar ,
    // private codePush: CodePush ,
    private actionSheet: ActionSheet ,
    private http: HTTP, 
    private transfer: FileTransfer, 
    private file: File, 
    // private qrScanner: QRScanner,
    private statusBar: StatusBar,
    // private barcodeScanner: BarcodeScanner
  ) { }

  configUrlss = 'https://ts130.immaohao.com/tuoshui/likeUser/friendCircle';
  configUrl = 'http://api.cxyhome.ink/public/index.php/index/Index/userid_list';
  configUrls = 'http://192.168.1.220:7001/my/login';

  messageList = null;
  log = null;

  fileTransfer: FileTransferObject = this.transfer.create();
  // 设置状态栏
  async setBar(){
    this.statusBar.backgroundColorByHexString('#ffffff');
  }

  upload() {
    // http://ionicframework.com/docs/native/file-transfer/
    //
    const fileTransfer: FileTransferObject = this.transfer.create();
    // 更多的 Options 可以点进去自己看看，不懂的就谷歌翻译他的注释
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',  // 文件类型
      headers: {},
      params: {}    // 如果要传参数，写这里
    }
  
    fileTransfer.upload('http://www.example.com/file.pdf', '<api endpoint>', options)
    .then((data) => {
      console.log(data);
      // success
    }, (err) => {
      console.log(err);
      // error
    })
  }

  // 下载
  download() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://www.example.com/file.pdf';
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log(error);
      // handle error
    });
  }

  // 获取http请求
  getData(){
    this.http.get(this.configUrlss, {}, {token:'4890fadaa7955785288d63b97b31eeb5'})
    .then(data => {
      const datas = JSON.parse(data.data);
      this.log = "datas=" + datas + "datas=" + datas.result + "datas=" + datas.result.friendList;
      this.messageList = JSON.parse(data.data).result.friendList;
      console.log(data);
      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);
    })
    .catch(error => {
      this.log = error;
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  // 底部弹出框
  showActionSheet(){
    let buttonLabels = ['Share via Facebook', 'Share via Twitter'];

    const options: ActionSheetOptions = {
      title: 'What do you want with this image?',
      subtitle: 'Choose an action',
      buttonLabels: buttonLabels,
      addCancelButtonWithLabel: 'Cancel',
      addDestructiveButtonWithLabel: 'Delete',
      // androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
      destructiveButtonLast: true
    };

    this.actionSheet.show(options).then((buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
    });
  }
  // 推送
  messagePush(){
    // this.baiduPush.startWork('测试')
    //   .then((res: any) => console.log(res))
    //   .catch((error: any) => console.error(error));
    // this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
    // const downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
    // this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
  }
  // 获取数据
  getDatas(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'token': '4890fadaa7955785288d63b97b31eeb5'
      })
    };
    this.http.post(this.configUrls, {
      password:"123456",
      sms_code:"12345",
      user_name:"root"
    }, {})
    .then(data => {
      console.log("lxx");
      console.log(data);
      console.log("lxx");
    })
    .catch(error => {
      console.log("lxx");
      console.log(error);
      console.log("lxx");
    });
  }
  // 扫码
  scan() {
    // let options: ZBarOptions = {
    //   flash: 'off',
    //   text_title: '扫码',
    //   drawSight: false
    // };

    // this.zbar.scan(options)
    //   .then(result => {
    //     alert("结果：" + result); // Scanned code
    //   })
    //   .catch(error => {
    //     alert(error); // Error message
    //   });
  }
  scan2() {
    // this.barcodeScanner.scan().then(barcodeData => {
    //   console.log('Barcode data', barcodeData);
    //  }).catch(err => {
    //      console.log('Error', err);
    //  });
  }
}
