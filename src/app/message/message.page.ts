import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild("appPage") child:any;
  searchVal:string = "";
  messageList:null;
  msgTotal:any = null;
  msgZize:any = 20;
  pageNum:any = 0;
  msgZizeAct:any = null;
  readType:number = 0;
  page:number = 1;
  pageKey:number = 1;
  constructor(private menu:MenuController,private appGlobal:AppGlobal, private appService:AppService, private commonMethods:CommonMethods, private router: Router) { 
    this.getData();
  }

  ngOnInit() {
  }
  // 下拉刷新
  doRefresh(event:any) {
    console.log('Begin async operation');
    this.child.setPage(1);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  // 已读标识
  readTypeChange(e:any){
    this.readType = e.detail.value;
    this.getData();
    this.menu.close();
    console.log(this.readType);
  }
  // 返回分页
  checkedBack(e:any){
    console.log(e);
    this.page = e.page;
    this.msgZize = e.size;
    this.getData();
  }
  // 搜索
  searchFun(){
    console.log(this.searchVal);
    this.getData();
  }
  // 消息列表
  getData(){
    this.appService.post(AppGlobal.BASE_URL()+"my/msg-search",{
      is_read:this.readType,
      page:this.page,
      size:this.msgZize,
      by:this.searchVal
    }).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.messageList = data.data.list;
        console.log(this.messageList);
        
        this.msgTotal = data.data.paging.total;
        this.msgZize = data.data.paging.size;
        this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
      }
    })
  }
  // 消息详情
  msgDetailsClick(item:any){
    if(item.is_read){
      return false;
    }
    console.log(item.is_read);
    
    this.appService.post(AppGlobal.BASE_URL()+"my/msg-detail",{id:item.id}).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        item.is_read = 1;
      }
    });
  }
  // 搜索
  clickedSearch(){

  }
  // 打开筛选侧边栏
  openScreenModal() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
