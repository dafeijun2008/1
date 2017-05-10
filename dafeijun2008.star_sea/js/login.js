
$(function(){
    var uname,upwd;
    //当文本框失去焦点的时候，验证用户的输入
    $('#uname').blur(unameCheck);
    $('#upwd').blur(upwdCheck);

    //当点击登录按钮的时候，先进行表单验证，如果验证不通过，则显示错误提示信息，不提交ajax；如果验证通过，则提交ajax请求去登录
    $('#login').click(function(){
        var unameR=unameCheck();
        var upwdR=upwdCheck();
        if(unameR && upwdR){
            $.ajax({
                type:'post',
                url:'php/user_login.php',
                data:{unameOrPhone:uname,upwd:upwd},
                success:function(data){
                    //console.log(data);
                    if(data.code==1){//登录成功
                        //记录用户登录状态并且跳转到登录前页面
                        sessionStorage.uid=data.uid;
                        sessionStorage.uname=data.uname;
                        history.go(-1);
                    }else{//登录不成功
                        $('#uname_tips').show().text('用户名或密码错误');
                    }
                }
            });
        }
    });

    //验证用户名
    function unameCheck(){
        uname= $.trim($('#uname').val());
        if(!uname){//为空
            $('#uname_tips').show().text('用户名不能为空');
            $('#uname').siblings('i').show();
            return false;
        }else{
            $('#uname_tips').hide();
            $('#uname').siblings('i').hide();
            return true;
        }
    }

    //验证密码
    function upwdCheck(){
        upwd= $.trim($('#upwd').val());
        if(!upwd){//为空
            $('#upwd_tips').show();
            $('#upwd').siblings('i').show();
            return false;
        }else{
            $('#upwd_tips').hide();
            $('#upwd').siblings('i').hide();
            return true;
        }
    }
});