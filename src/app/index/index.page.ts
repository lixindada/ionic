import { Component, OnInit } from '@angular/core';
import { MenuController,PickerController } from '@ionic/angular';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";

// import {MultiPickerModule} from 'ion-multi-picker';
// Router
import { Router,ActivatedRoute } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  timeStartValue:string = "";
  timeEndValue:string = "";
  companyList:any = null;
  msgTotal:any = null;
  msgZize:any = 20;
  pageNum:any = 0;
  page:number = 1;
  pageKey:number = 1;
  statusList:any = null;
  classList:any = null;
  stockList:any = null;
  goodBrandist:any = null;
  goodsAliasList:any = null;
  // 筛选
  category_id:any = 0;
  keyword:any = "";
  brandObj:any = {text:"",value:0};
  seriesObj:any = {text:"",value:0};
  alias1Obj:any = {text:"",value:0};
  alias2Obj:any = {text:"",value:0};
  companyObj:any = {text:"",value:0};
  departmentObj:any = {text:"",value:0};
  contactObj:any = {text:"",value:0};
  alias_id_1:any = 0;
  alias_id_2:any = 0;
  location_company_id:any = 0;
  location_department_id:any = 0;
  location_contact_id:any = 0;
  expire_time_begin:any = 0;
  expire_time_end:any = 0;
  inventory_status:any = [];
  constructor(
    private menu:MenuController,
    private picker:PickerController,
    private appGlobal:AppGlobal, 
    private appService:AppService, 
    private commonMethods:CommonMethods, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.getData();
    this.getStockList();
  }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    if(this.activatedRoute.snapshot.queryParams.code){
      this.keyword = this.activatedRoute.snapshot.queryParams.code;
      this.getStockList();
    }
  }
  ngDoCheck(){
    console.log("库存~~~");
    console.log(this.activatedRoute.snapshot.queryParams);
    
    if(this.activatedRoute.snapshot.queryParams.code){
      this.keyword = this.activatedRoute.snapshot.queryParams.code;
      this.getStockList();
    }
  }
  // 下拉刷新
  doRefresh(event:any) {
    console.log('Begin async operation');
    this.page = 1;
    this.getStockList();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  // 返回分页
  checkedBack(e:any){
    console.log(e);
    this.page = e.page;
    this.msgZize = e.size;
    this.getStockList();
  }

  // qr-scanner
  getScanner(){
    this.router.navigate(["/tab3"]);
  }

  // 清楚筛选状态
  clearStatus(){
    this.page = 1;
    this.msgZize = 20;
    this.keyword = "";
    this.brandObj = {text:"",value:0};
    this.seriesObj = {text:"",value:0};				
    this.category_id = 0;
    this.alias1Obj = {text:"",value:0};
    this.alias2Obj = {text:"",value:0};
    this.companyObj = {text:"",value:0};
    this.departmentObj = {text:"",value:0};
    this.contactObj = {text:"",value:0};
    this.timeStartValue = "";
    this.timeEndValue = "";
    this.inventory_status = [];
    this.getStockList();
    this.menu.close();
  }
  // 库存列表
  getStockList(){
    console.log(parseInt(this.contactObj.value));
    console.log(typeof parseInt(this.contactObj.value));
    
    this.appService.post(AppGlobal.BASE_URL()+"inventory/search",{
      page:this.page,
      size:this.msgZize,
      keyword:this.keyword,
      brand_id: this.brandObj ? this.brandObj.value : 0,
	    series_id: this.seriesObj ? this.seriesObj.value : 0,					
	    category_id: this.category_id,
	    alias_id_1: this.alias1Obj ? this.alias1Obj.value : 0,			
	    alias_id_2: this.alias2Obj ? this.alias2Obj.value : 0,
	    location_company_id: this.companyObj.value,	
	    location_department_id: parseInt(this.departmentObj.value),
	    location_contact_id: parseInt(this.contactObj.value),
	    expire_time_begin: this.timeStartValue!="" ? this.setTime(this.timeStartValue) : "",
      expire_time_end: this.timeEndValue!="" ? this.setTime(this.timeEndValue) : "",
      inventory_status: this.inventory_status
    }).then(xhr=>{
      console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.stockList = data.data.list;
        this.stockList.map(item=>{
          item.act=false;
        })
        console.log(this.stockList);
        
        this.msgTotal = data.data.paging.total;
        this.msgZize = data.data.paging.size;
        this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
      }
    })
  }
  
  // 点击查看更多
  stockMore(item:any){
    item.act = !item.act;
  }

  // 筛选条件
  selectFun(e:any,type:string){
    console.log(e);
    switch (type) {
      case "category_id":
        const data = this.classList;
        data.map((item:any)=>{
          console.log(item);
          if(item.category_name == e.detail.value){
            this.category_id = item.id;
          }
        })
        break;
      case "inventory_status":
        this.inventory_status = [];
        e.detail.value.map((items:any)=>{
          console.log(items);
          this.statusList.map((item:any)=>{
            console.log(item);
            if(item.inventory_status_name == items){
              this.inventory_status.push(item.inventory_status);
            }
          })
        })
        break;
      default:
        break;
    }
    this.getStockList();
  }

  // 打开picker
  openPicker(type:string,data:any,opt:any){
    // console.log(data);
    let datas:any = [];
    switch (type) {
      case "goodBrandist":
        datas = [{
          name:"brand_id",
          options:[]
        }];
        data.map((item:any)=>{
          console.log(item);
          datas[0].options.push({
            text:item.label,
            value:item.value
          })
        })
        break;
      case "series_id":
        datas = [{
          name:"series_id",
          options:[]
        }];
        data.map((item:any)=>{
          console.log(item);
          if(item.value == opt.value){
            console.log(item);
            datas[0].options.push({
              text:"请选择",
              value:0,
            });
            item.children.map((items:any)=>{
              datas[0].options.push({
                text:items.label,
                value:items.value
              })
            })
          }
        })
        break;
      case "goodsAliasList":
        datas = [{
          name:"alias_id_1",
          options:[]
        }];
        data.map((item:any)=>{
          console.log(item);
          datas[0].options.push({
            text:item.label,
            value:item.value
          })
        })
        break;
      case "alias_id_2":
        datas = [{
          name:"alias_id_2",
          options:[]
        }];
        data.map((item:any)=>{
          console.log(item);
          if(item.value == opt.value){
            console.log(item);
            datas[0].options.push({
              text:"请选择",
              value:0,
            });
            item.children.map((items:any)=>{
              datas[0].options.push({
                text:items.label,
                value:items.value
              })
            })
          }
        })
        break;
      case "companyList":
        datas = [{
          name:"location_company_id",
          options:[]
        }];
        data.map((item:any)=>{
          // console.log(item);
          datas[0].options.push({
            text:item.label,
            value:item.value
          })
        })
        break;
      case "location_department_id":
        datas = [{
          name:"location_department_id",
          options:[]
        }];
        data.map((item:any)=>{
          // console.log(item);
          if(item.value == opt.value){
            // console.log(item);
            datas[0].options.push({
              text:"请选择",
              value:0,
            });
            item.children.map((items:any)=>{
              datas[0].options.push({
                text:items.label,
                value:items.value
              })
            })
          }
        })
        break;
      case "location_contact_id":
        datas = [{
          name:"location_contact_id",
          options:[]
        }];
        data.map((item:any)=>{
          // console.log(item);
          if(item.value == this.companyObj.value){
            item.children.map((items:any)=>{
              console.log(opt);
              
              if(items.value == opt.value){
                console.log("lxxx");
                console.log(items);
                console.log("lxxx");
                datas[0].options.push({
                  text:"请选择",
                  value:0,
                });
                items.children.map((companyItem:any)=>{
                  datas[0].options.push({
                    text:companyItem.label,
                    value:companyItem.value
                  })
                })
              }
            })
            
          }
        })
        break;
      default:
        break;
    }
    console.log(datas);
    // {
    //   name:"series_id",
    //   options:[]
    // }
    this.presentPicker(datas);
  }
  // 弹出picker
  async presentPicker(data:any) {
    const picker = await this.picker.create({
    animated: true,
    buttons: [{
      text: '取消',
      handler: () => console.log('Clicked Save!')
    }, {
      text: '确定',
      handler: (val) => {
        console.log('Clicked Log. Do not Dismiss.', val);
        console.log(val.hasOwnProperty("brand_id"));
        if(val.hasOwnProperty("brand_id")){
          this.brandObj = val.brand_id;
          this.openPicker("series_id",this.goodBrandist,val.brand_id);
        } else if(val.hasOwnProperty("series_id")){
          this.seriesObj = val.series_id;
        } else if(val.hasOwnProperty("alias_id_1")){
          this.alias1Obj = val.alias_id_1;
          this.openPicker("alias_id_2",this.goodsAliasList,val.alias_id_1);
        } else if(val.hasOwnProperty("alias_id_2")){
          this.alias2Obj = val.alias_id_2;
        } else if(val.hasOwnProperty("location_company_id")){
          this.companyObj = val.location_company_id;
          this.openPicker("location_department_id",this.companyList,val.location_company_id);
        } else if(val.hasOwnProperty("location_department_id")){
          this.departmentObj = val.location_department_id;
          this.openPicker("location_contact_id",this.companyList,val.location_department_id);
        } else if(val.hasOwnProperty("location_contact_id")){
          this.contactObj = val.location_contact_id;
        }
        this.getStockList();
      }
    }],
    columns: data,
    cssClass: 'picker-hours',
    mode: 'md',
    });
    picker.present();
  }

  // 选项详情
  getData(){
    // 分类
    this.appService.get(AppGlobal.BASE_URL()+"goods-category",{}).then(xhr=>{
      // console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.classList = data.data.list;
        // console.log(this.classList);
      }
    })
    // 库房
    this.appService.post(AppGlobal.BASE_URL()+"linkage/company",{}).then(xhr=>{
      // console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.companyList = data.data;
      }
    })
    // 状态
    this.appService.post(AppGlobal.BASE_URL()+"inventory/status-map",{"dataType": "array"}).then(xhr=>{
      // console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.statusList = data.data;
      }
    })
    // 厂商/品牌
    this.appService.post(AppGlobal.BASE_URL()+"linkage/goods-brand",{}).then(xhr=>{
      // console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.goodBrandist = data.data;
      }
    })
    // 系列/俗称
    this.appService.post(AppGlobal.BASE_URL()+"linkage/goods-alias",{}).then(xhr=>{
      // console.log(xhr);
      let data:any = xhr;
      if(data.code == 0){
        this.goodsAliasList = data.data;
      }
    })
  }
  
  // 搜索
  clickedSearch(){
    this.getStockList();
  }
  // 打开筛选侧边栏
  openScreenModal() {
    this.menu.enable(true, 'indexMenu');
    this.menu.open('indexMenu');
  }
  // 时间选择
  timeChange(){
    // console.log(this.timeStartValue);
    this.getStockList();
  }
  // 标准时间转换
  setTime(time:any){
    var d = new Date(time);
    return d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' ' + (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ':' + (d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?"0"+d.getSeconds():d.getSeconds());
  }
}
