/**
 * Created by Administrator on 2017/10/19.
 */
$(function () {
    "use strict";
    var userName = sessionStorage.getItem("uname");
    if(userName){
        $("#js-user-name").html(userName);
    }else{
        location.href = "login.html";
    }
    $(".sub").on("click", "li a",  function(){
        const action = $(this).attr("data-action");
        const wrap = $("#main-content");
        switch (action) {
            //产品列表
            case "product-list":
                wrap.load("product_manager/product_list.html");
                break;
            // 产品查询
            case "product-search":
                wrap.load("product_manager/product_search.html");
                break;

            // 添加产品
            case "add-product":
                wrap.load("product_manager/product_add.html");
                break;

            // 用户列表
            case "user-list":
                wrap.load("user_manager/user_list.html");
                break;

            // 用户查询
            case "user-search":
                wrap.load("user_manager/user_search.html");
                break;

            // 订单列表
            case "order-list":
                wrap.load("order_manager/order_list.html");
                break;

            // 订单查询
            case "order-search":
                wrap.load("order_manager/order_search.html");
                break;

            // 轮播
            case "carousel":
                wrap.load("home_product_manager/carousel_manager.html");
                break;

            // 首页推荐
            case "home-recommend":
                wrap.load("home_product_manager/home_recommend.html");
                break;

            // 新品推荐
            case "new-arrival":
                wrap.load("home_product_manager/new_arrival.html");
                break;

            // 热销单品
            case "hot-list":
                wrap.load("home_product_manager/hot_list.html");
                break;

            // 404错误
            case "403-error":
                wrap.load("error/403.html");
                break;

            // 500错误
            case "404-error":
                wrap.load("error/404.html");
                break;

            // 500错误
            case "503-error":
                wrap.load("error/503.html");
                break;
        }
    });
});
