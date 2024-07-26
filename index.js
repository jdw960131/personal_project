$(document).ready(function(){
    $(".gnb>li").mouseenter(function(){
        $(".gnb>li>.sub").stop().slideDown();
    })
    $(".gnb>li").mouseleave(function(){
        $(".gnb>li>.sub").stop().slideUp()
    })
    $(".hamburger>img").click(function(){
        $(".side_menu").stop().animate({"right":"0%"});
    });
    $(".hamburger .side_menu .close").click(function(){
        $(".side_menu").stop().animate({"right":"-100%"});
    });
})




// $(document).ready(function(){
//     $(".gnb>li").mouseenter(function(){
//         $(".gnb>li .sub").stop().slideDown();
//     })
//     $(".gnb>li").mouseleave(function(){
//         $(".gnb>li .sub").stop().slideUp()
//     })
// })