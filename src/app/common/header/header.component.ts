import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import * as $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //判断是否登录
  isLogin:boolean;
  //保存用户名
  userName:any;
  //用户ID
  uid:any;
  //购物车产品数据
  cartProduct:any;
  priceSum:any = 0;
  totalCount:any = 0;
  constructor(private cartLoadHttp: UserService) { }

  ngOnInit() {
    //获取购物车数据
    this.uid = sessionStorage.uid;
    this.loadCart();

    ///购物车下拉菜单
    $(".s_cart").mouseover(function(){
      $(".cart_dropdown").stop().slideDown(100);
    });
    $(".s_cart").mouseout(function(){
        $(".cart_dropdown").stop().slideUp(100);
    });
  }
  ngAfterContentInit(){
    
  }
  ngAfterContentChecked(){
    this.userName = sessionStorage.uname;
    if(sessionStorage.uid){
      this.isLogin = false;
    }else{
      this.isLogin = true;
    }
  }

  //点击退出按钮
  logout(event){
    event.preventDefault();
    sessionStorage.clear();
  }
  //加载购物车
  loadCart(){
    this.cartLoadHttp.cart_load(this.uid).subscribe((data:any)=>{
      console.log(data)
      this.cartProduct = data.product;
      for(var i = 0; i < data.product.length; i++){
        this.priceSum += data.product[i].price;
        this.totalCount += data.product[i].count;
      }
    });
  }

  navText(text){
    //console.log(text);
    $(".nav>ul>li").each(function(){
        var thisText=$(this).children("a").text();
        if(thisText==text){
            //console.log(thisText);
            $("nav li").removeClass("cur");
            $(this).addClass("cur");
        }
    });
  }
  
}
