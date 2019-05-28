import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController,Platform } from '@ionic/angular';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild("appPage") child:any;
  searchVal:string = "";
  messageList:null;
  msgTotal:any = null;
  msgZize:any = 20;
  pageNum:any = 0;
  msgZizeAct:any = null;
  todoStatus:number = 1;
  page:number = 1;
  pageKey:number = 1;
  constructor(
    private menu:MenuController,
    private appGlobal:AppGlobal, 
    private appService:AppService, 
    private commonMethods:CommonMethods,
    private router: Router
  ) {
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
    this.todoStatus = e.detail.value;
    this.page = 1;
    this.getData();
    this.menu.close();
    console.log(this.todoStatus);
  }
  // 搜索
  searchFun(){
    console.log(this.searchVal);
    this.getData();
  }
  // 消息列表
  getData(){
    console.log(this.page);
    
    this.appService.post(AppGlobal.BASE_URL()+"my/todo-search",{
      todo_status:this.todoStatus,
      page:this.page,
      size:this.msgZize,
      by:this.searchVal
    }).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.messageList = data.data.list;
        this.msgTotal = data.data.paging.total;
        this.msgZize = data.data.paging.size;
        this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
      }
    })
  }
  // 返回分页
  checkedBack(e:any){
    console.log(e);
    this.page = e.page;
    this.msgZize = e.size;
    this.getData();
  }
  // 消息详情
  msgDetailsClick(item:any){
    this.router.navigate(["/todo-details"],{queryParams:{id:item.form_id,type:item.form_type}});
  }
  // 搜索
  clickedSearch(){

  }
  // 打开筛选侧边栏
  openScreenModal() {
    this.menu.enable(true, 'dealtMenu');
    this.menu.open('dealtMenu');
  }
}