
$(function() {

  //根据屏幕宽度的变化决定轮播图片应该展示什么

  function resize() {
    // 获取屏幕宽度
    var windowWidth = $(window).width();
    // 判断屏幕属于大还是小
    var isSmallScreen = windowWidth < 768;
    // 根据大小为界面上的每一张轮播图设置背景
    // 获取到的是一个DOM数组（多个元素）
    $('#main_ad > .carousel-inner > .item').each(function (i, item) {
      // 因为拿到是DOM对象 需要转换
      var $item = $(item);
      var imgSrc =
          isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

      // 设置背景图片
      $item.css('backgroundImage', 'url("' + imgSrc + '")');

      if (isSmallScreen) {
        $item.html('<img src="' + imgSrc + '" alt="" />');
      } else {
        $item.empty();
      }
    });
  }

  $(window).on('resize', resize).trigger('resize');

  //加载动画，头部，脚部
  new WOW().init();
  $('.navbar-collapse a').click(function () {
    $('.navbar-collapse').collapse('hide');
  });
  $('.header_box').load('header.html');
  $('.footer_box').load('footer.html')
})

//登陆判定

$(function(){

  if(sessionStorage.uid) {
    var userHtml = `<span>${sessionStorage.uname}</span>，您好~
    <a href="" id="user_quit">退出登陆</a>
    <span><a href="" id="userdata">个人中心</a></span>`;
    $('#nav_user').html(userHtml);
  }
  //退出登录
  $('#user_quit').click(function(){
    sessionStorage.clear();
  })
})

//验证码刷新
function refresh(){
  var back;
  $.ajax({
    type:'post',
    url:'php/vcode.php',
    success:function(data){
      //console.log(data);
      $('.vcode').attr("src","php/vcode.php")
    }
  });
}




