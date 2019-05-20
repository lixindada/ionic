import { Component, OnInit } from '@angular/core';
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
    console.log("A">="a");
    
  }

  ngOnInit() {
  }
  // 已读标识
  readTypeChange(e:any){
    this.todoStatus = e.detail.value;
    this.page = 1;
    this.getData();
    this.menu.close();
    console.log(this.todoStatus);
  }
  // 一页多少条
  selectSizeChange(e:any){
    this.msgZize = e.detail.value;
    this.getData();
  }
  // 搜索
  searchFun(){
    console.log(this.searchVal);
    this.getData();
  }
  pageKeyUp(e:any){
    console.log(e);
    if(e.keyCode == 13){
      if(this.pageKey <= this.pageNum && this.pageKey >= 1){
        this.page = this.pageKey;
        this.getData();
      } else {
        this.commonMethods.toast("bottom",{},"输入的页数超出已有页数");
      }
    }
  }
  // 消息列表
  getData(){
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
  // 消息详情
  msgDetailsClick(item:any){
    this.router.navigate(["/todo-details"],{queryParams:{id:item.form_id,type:item.form_type}});
  }
  // 上一页/下一页
  nextPage(type:number){
    console.log(type,this.page);
    
    if(type){
      console.log("+");    
      if(this.page < this.pageNum){
        console.log("+");
        this.page++;
        this.getData();
      }
    } else {
      console.log("-");    
      if(this.page > 1){
        console.log("-");
        this.page--;
        this.getData();
      }
    }
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