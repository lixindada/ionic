import { Component, OnInit } from '@angular/core';
import { AppGlobal,AppService,CommonMethods } from "../../app/config/config.service";

// Router
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  todoId:number = this.activatedRoute.snapshot.queryParams.id;
  formType:string = this.activatedRoute.snapshot.queryParams.type;
  todoDetails:any = null;
  lotList:any = null;
  lotPaging:any = null;
  msgTotal:any = null;
  msgZize:any = 20;
  pageNum:any = 0;
  page:number = 1;
  pageKey:number = 1;
  // lists
  lotLists:any = null;
  msgTotals:any = null;
  msgZizes:any = 20;
  pageNums:any = 0;
  pages:number = 1;
  pageKeys:number = 1;
  constructor(private appGlobal:AppGlobal, private appService:AppService, private commonMethods:CommonMethods, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.getDetails();
    this.getLotList();
    this.getLotLists();
  }

  // 详情数据
  getDetails(){
    switch (this.formType) {
      case "transfer": // 调拨单
        this.appService.post(AppGlobal.BASE_URL()+"form-transfer/detail",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;

      case "purchasing_requisition": // 采购申请单
        this.appService.post(AppGlobal.BASE_URL()+"form-purchasing-requisition/detail",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;

      case "barter": // 易货单
        this.appService.post(AppGlobal.BASE_URL()+"form-barter/detail",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;
        
      case "purchasing_plan": // 计划采购
        this.appService.post(AppGlobal.BASE_URL()+"form-purchasing-plan/detail ",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
            this.todoDetails.list.map((item:any)=>{
              item.act=false;
            })
            console.log(this.todoDetails.list);
            
          }
        });
        break;
        
      case "purchasing_exception": // 例外采购
        this.appService.post(AppGlobal.BASE_URL()+"form-purchasing-exception/detail ",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;

      case "in": // 盘盈入库
        this.appService.post(AppGlobal.BASE_URL()+"form-in/detail ",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;

      case "out": // 盘亏出库
        this.appService.post(AppGlobal.BASE_URL()+"form-out/detail ",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;
        
      case "borrowing_inner": // 内部借货
        this.appService.post(AppGlobal.BASE_URL()+"form-borrowing-inner/detail ",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;
        
      case "order": // 销售订单
        this.appService.post(AppGlobal.BASE_URL()+"form-order/detail ",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;
        
      case "invoice": // 售货发票
        this.appService.post(AppGlobal.BASE_URL()+"form-invoice/detail ",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;
        
      case "prepayment": // 预付账款
        this.appService.post(AppGlobal.BASE_URL()+"form-prepayment/detail ",{
          form_id:this.todoId
        }).then(xhr=>{
          console.log(xhr);
          const datas:any = xhr;
          if(datas.code == 0){
            this.todoDetails = datas.data;
          }
        });
        break;
      default:
        break;
    }
    console.log(this.todoId);
    
  }
  
  // 物品列表
  getLotList(){
    switch (this.formType) {
      case "transfer": // 调拨单
        this.appService.post(AppGlobal.BASE_URL()+"form-transfer/lot-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      case "purchasing_requisition": // 采购申请单
        this.appService.post(AppGlobal.BASE_URL()+"form-purchasing-requisition/specification-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      case "purchasing_exception": // 列外采购
        this.appService.post(AppGlobal.BASE_URL()+"form-purchasing-exception/aogSearch",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      case "barter": // 易货单
        this.appService.post(AppGlobal.BASE_URL()+"form-barter/out-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      case "in": // 盘盈入库
        this.appService.post(AppGlobal.BASE_URL()+"form-in/lot-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      case "out": // 盘亏出库
        this.appService.post(AppGlobal.BASE_URL()+"form-out/lot-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      case "borrowing_inner": // 内部借货
        this.appService.post(AppGlobal.BASE_URL()+"form-borrowing-inner/lot-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      case "order": // 销售订单
        this.appService.post(AppGlobal.BASE_URL()+"form-order/lot-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      case "invoice": // 售货发票
        this.appService.post(AppGlobal.BASE_URL()+"form-invoice/lot-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotList = data.data.list;
            this.lotPaging = data.data.paging;
            this.lotList.map((item:any)=>{
              item.act=false;
            })
            console.log(this.lotList);
            
            this.msgTotal = data.data.paging.total;
            this.msgZize = data.data.paging.size;
            this.pageNum = Math.ceil(this.msgTotal / this.msgZize);
          }
        });
        break;
      default:
        break;
    }
  }

  // 易货单列表(易入)
  getLotLists(){
    switch (this.formType) {
      case "barter": // 易货单
        this.appService.post(AppGlobal.BASE_URL()+"form-barter/in-search",{
          form_id:this.todoId,
          page:this.page,
          size:this.msgZize
        }).then(xhr=>{
          let data:any = xhr;
          if(data.code == 0){
            this.lotLists = data.data.list;
            this.lotLists.map((item:any)=>{
              item.act=false;
            })
            this.msgTotals = data.data.paging.total;
            this.msgZizes = data.data.paging.size;
            this.pageNums = Math.ceil(this.msgTotals / this.msgZizes);
          }
        });
        break;
      default:
        break;
    }
  }

  // 点击按钮
  clickBtn(type:string,url:string,opt:any){
    const data:any = {
      form_id:this.todoDetails.form_id
    };
    if(type == "audit"){
      data.audit = opt.audit
    }
    if(type == "remark"){
      data.remark = opt.remark
    }
    this.appService.post(AppGlobal.BASE_URL()+url,data).then((xhr:any)=>{
      if(xhr.code == 400){
        this.commonMethods.toast("bottom","",xhr.msg);
      } else {
        this.commonMethods.toast("bottom","","操作成功");
        this.getDetails();
      }
    })
  }

  // 点击查看更多
  stockMore(item:any){
    item.act = !item.act;
  }
  pageKeyUp(e:any){
    console.log(e);
    if(e.keyCode == 13){
      if(this.pageKey <= this.pageNum && this.pageKey >= 1){
        this.page = this.pageKey;
        this.getLotList();
      } else {
        this.commonMethods.toast("bottom",{},"输入的页数超出已有页数");
      }
    }
  }
  // 一页多少条
  selectSizeChange(e:any){
    this.msgZize = e.detail.value;
    this.getLotList();
  }
  // 上一页/下一页
  nextPage(type:number){
    console.log(type,this.page);
    
    if(type){
      console.log("+");    
      if(this.page < this.pageNum){
        console.log("+");
        this.page++;
        this.getLotList();
      }
    } else {
      console.log("-");    
      if(this.page > 1){
        console.log("-");
        this.page--;
        this.getLotList();
      }
    }
  }
  // 标准时间转换
  setTime(time:any){
    var d = new Date(time);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  ngOnInit() {
  }

}
