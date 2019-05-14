import { Component } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { ActionSheetController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx'; // 跳转
import { log } from 'util';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  tabAct = true;
  messageList = [{
    title:"title",
    time:"2019-1-1"
  },{
    title:"title",
    time:"2019-1-1"
  },{
    title:"title",
    time:"2019-1-1"
  },{
    title:"title",
    time:"2019-1-1"
  },{
    title:"title",
    time:"2019-1-1"
  }];
  constructor(private flashlight: Flashlight, public actionSheetController: ActionSheetController, private nativePageTransitions: NativePageTransitions) {
    
  }

  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
       direction: 'up',
       duration: 500,
       slowdownfactor: 3,
       slidePixels: 20,
       iosdelay: 100,
       androiddelay: 150,
       fixedPixelsTop: 0,
       fixedPixelsBottom: 60
      };
    this.nativePageTransitions.slide(options)
      .then(data=>{
        console.log(data);
      })
      .catch(onError=>{
        console.log(onError);
      });
   }
   
   // example of adding a transition when pushing a new page
   openPage(page: any) {
    //  this.nativePageTransitions.slide(options);
    //  this.navCtrl.push(page);
   }

  // 切换tab
  async switchTab(n){
    console.log(n);
    n ? this.tabAct = false : this.tabAct = true;
  }

  async segmentButtonClicked(ev: any) {
    console.log('Segment button clicked', ev);
  }

  // 底部弹出框
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  openFlashlight(){
    this.flashlight.switchOn();
  }

  closeFlashlight(){
    this.flashlight.switchOff();
  }
}
