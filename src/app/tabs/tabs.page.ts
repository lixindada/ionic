import { Component,HostListener } from '@angular/core';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(
    private appMinimize: AppMinimize
  ){}
  
  @HostListener('document:ionBackButton', ['$event'])
  private overrideHardwareBackAction($event: any) {
    $event.detail.register(100, async () => {
      // Do what you want
      console.log(111111111111);
      this.appMinimize.minimize();
      // this.router.navigateByUrl('相应路径');
    });
  }
}
