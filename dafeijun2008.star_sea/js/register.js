$(function () {

  $('#uname').autocomplete({
    delay : 0,
    autoFocus : true,
    source : function (request, response) {
      //获取用户输入的内容
      //alert(request.term);
      //绑定数据源的
      //response(['aa', 'aaaa', 'aaaaaa', 'bb']);

      var hosts = ['qq.com', '163.com', '263.com', 'sina.com.cn','gmail.com', 'hotmail.com'],
          term = request.term,		//获取用户输入的内容
          name = term,				//邮箱的用户名
          host = '',					//邮箱的域名
          ix = term.indexOf('@'),		//@的位置
          result = [];				//最终呈现的邮箱列表


      result.push(term);

      //当有@的时候，重新分别用户名和域名
      if (ix > -1) {
        name = term.slice(0, ix);
        host = term.slice(ix + 1);
      }

      if (name) {
        //如果用户已经输入@和后面的域名，
        //那么就找到相关的域名提示，比如bnbbs@1，就提示bnbbs@163.com
        //如果用户还没有输入@或后面的域名，
        //那么就把所有的域名都提示出来

        var findedHosts = (host ? $.grep(hosts, function (value, index) {
              return value.indexOf(host) > -1
            }) : hosts),
            findedResult = $.map(findedHosts, function (value, index) {
              return name + '@' + value;
            });

        result = result.concat(findedResult);
      }

      response(result);
    },
  });


  var uname,phone,pwd,pwd2;
  //失去焦点
  $('#uname').blur(unameCheck);
  $("#phone").blur(phoneCheck);
  $("#upwd").blur(pwdCheck);
  $("#upwd2").blur(pwdCheck2);
  //当“用户注册协议”复选框被点击时
  $(".li_checkbox input").click(function(){
    $('#register').prop('disabled',!$(this).prop('checked')).toggleClass('disabled');
  });
  //提交注册
  $('#register').click(function(){
    var unameR=unameCheck();
    var phoneR=phoneCheck();
    var pwdR=pwdCheck();
    var pwdR2=pwdCheck2();
    if(unameR && phoneR && pwdR && pwdR2){
      $.ajax({
        type:'post',
        url:'php/user_register.php',
        data:{uname:uname,phone:phone,upwd:pwd},
        success:function(data){
          //console.log(data);
          if(data.code==1){
            //注册成功后，自动登录，并且跳转到登录前页面
            alert("注册成功！")
            sessionStorage.uid=data.uid;
            sessionStorage.uname=data.uname;
            history.go(-1);
          }
        }
      });
    }
  });


  //用户名验证
  function unameCheck(){
    uname= $.trim($('#uname').val());
    var regEmail=/^\w+@\w+\.\w+(\.\w+)?$/;
    if(!uname){//是否为空
      $('#uname').siblings('em').show().attr('class','icon_error');
      $('#uname').siblings('i').show().text('请输入邮箱');
      return false;
    }else if(!regEmail.test(uname)){//格式不正确
      $('#uname').siblings('em').show().attr('class','icon_error');
      $('#uname').siblings('i').show().text('您输入的邮箱格式不正确');
      return false;
    }else if(unameExist()){//邮箱已存在
      $('#uname').siblings('em').show().attr('class','icon_error');
      $('#uname').siblings('i').show().text('该邮箱已被注册');
      return false;
    }else{//可注册
      console.log(unameExist());
      $('#uname').siblings('em').show().attr('class','icon_ok');
      $('#uname').siblings('i').hide()
      return true;
    }
  }
  //验证邮箱是否存在
  function unameExist(){
    var back;
    $.ajax({
      type:'post',
      url:'php/user_uname_check.php',
      data:{uname:uname},
      async:false,
      success:function(data){
        //console.log(data);
        if(data.code==1){//存在
          back=true;
        }else{//不存在
          back=false;
        }
      }
    });
    return back;
  }

  //验证手机号
  function phoneCheck(){
    phone= $.trim($("#phone").val());
    var regPhone= /^1[3578]\d{9}$/;
    if(!phone){
      $("#phone").siblings("em").show().attr("class","icon_error");
      $("#phone").siblings("i").show().text("请填写您的手机号");
      return false;
    }else if(!regPhone.test(phone)){
      $("#phone").siblings("em").show().attr("class","icon_error");
      $("#phone").siblings("i").show().text("请输入正确的手机号码");
      return false;
    }else if(phoneExist()){
      $("#phone").siblings("em").show().attr("class","icon_error");
      $("#phone").siblings("i").show().text("此手机号已被其他用户绑定");
      return false;
    }else{
      $("#phone").siblings("em").show().attr("class","icon_ok");
      $("#phone").siblings("i").hide();
      return true;
    }
  }
//验证手机号是否被绑定
  function phoneExist(){
    var back=false;
    $.ajax({
      type:"post",
      url:"php/user_phone_check.php",
      data:{phone:phone},
      async:false,
      success:function(d){
        if(d.code==1){//用户名已经存在
          back=true;
        }else{
          back=false;
        }
      }
    });
    return back;
  }
//验证密码
  function pwdCheck(){
    var pwdSize= $.trim($("#upwd").val()).length;
    if(!pwdSize){
      $("#upwd").siblings("em").show().attr("class","icon_error");
      $("#upwd").siblings("i").show().text("请输入您的密码");
      return false;
    }else if(pwdSize<6||pwdSize>12){
      $("#upwd").siblings("em").show().attr("class","icon_error");
      $("#upwd").siblings("i").show().text("密码长度应为6~12个字符之间");
      return false;
    }else{
      $("#upwd").siblings("em").show().attr("class","icon_ok");
      $("#upwd").siblings("i").hide();
      return true;
    }
  }
//验证重复密码
  function pwdCheck2(){
    pwd= $.trim($("#upwd").val());
    pwd2= $.trim($("#upwd2").val());
    if(pwdCheck()){
      if(pwd!=pwd2){
        $("#upwd2").siblings("em").show().attr("class","icon_error");
        $("#upwd2").siblings("i").show().text("两次输入的密码不一致");
        return false;
      }else{
        $("#upwd2").siblings("em").show().attr("class","icon_ok");
        $("#upwd2").siblings("i").hide();
        return true;
      }
    }
  }
})

