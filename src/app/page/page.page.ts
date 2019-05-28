import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonMethods } from "../../app/config/config.service";


@Component({
  selector: 'app-page',
  templateUrl: './page.page.html',
  styleUrls: ['./page.page.scss']
})
export class PagePage {
  @Input() total:any;
  @Input() size:any;
  @Output('checked') checkedBack = new EventEmitter<any>();
  page: number = 1;
  pageNum: number = 0;
  pageKey: number = this.page;
  constructor(
    private commonMethods:CommonMethods
  ) { }

  ngOnInit() {
    console.log(this.total);
  }
    
  ngOnChanges() {
    console.log(this.total)
    this.pageNum = Math.ceil(this.total / this.size);
  }
  // 设置页数
  setPage(page:number){
    this.page = page;
    this.checkedBack.emit({page:this.page,size:this.size});
  }
  // 一页多少条
  selectSizeChange(e:any){
    this.size = e.detail.value;
    this.checkedBack.emit({page:this.page,size:this.size});
  }
  // 上一页/下一页
  nextPage(type:number){
    console.log(type,this.page);
    if(type){
      console.log("+");    
      if(this.page < this.pageNum){
        console.log("+");
        this.page++;
        this.checkedBack.emit({page:this.page,size:this.size});
      }
    } else {
      console.log("-");    
      if(this.page > 1){
        console.log("-");
        this.page--;
        this.checkedBack.emit({page:this.page,size:this.size});
      }
    }
  }
  pageKeyUp(e:any){
    console.log(e);
    if(e.keyCode == 13){
      if(this.pageKey <= this.pageNum && this.pageKey >= 1){
        this.page = this.pageKey;
        this.checkedBack.emit({page:this.page,size:this.size});
      } else {
        this.commonMethods.toast("bottom",{},"输入的页数超出已有页数");
      }
    }
  }

}
