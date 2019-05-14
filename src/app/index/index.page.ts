import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  timeStartValue:null;
  companyList:null;
  statusList:any = null;
  classList:any = null;
  constructor(private menu:MenuController,private appGlobal:AppGlobal, private appService:AppService, private commonMethods:CommonMethods, private router: Router) { 
    this.getData();
  }

  ngOnInit() {
  }
  // 选项详情
  getData(){
    // 分类
    this.appService.get(AppGlobal.BASE_URL+"goods-category",{}).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.classList = data.data.list;
        console.log(this.classList);
        
      }
    })
    // 库房
    this.appService.post(AppGlobal.BASE_URL+"linkage/company",{}).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.companyList = data.data;
      }
    })
    // 状态
    this.appService.post(AppGlobal.BASE_URL+"inventory/status-map",{"dataType": "array"}).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.statusList = data.data;
      }
    })
    // 厂商/品牌
    this.appService.post(AppGlobal.BASE_URL+"linkage/goods-brand",{}).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.companyList = data.data;
      }
    })
    // 系列/俗称
    this.appService.post(AppGlobal.BASE_URL+"linkage/goods-alias",{}).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.companyList = data.data;
      }
    })
  }
  // 搜索
  clickedSearch(){

  }
  // 打开筛选侧边栏
  openScreenModal() {
    this.menu.enable(true, 'indexMenu');
    this.menu.open('indexMenu');
  }
  // 时间选择
  timeChange(){
    console.log(this.timeStartValue);
  }
}
