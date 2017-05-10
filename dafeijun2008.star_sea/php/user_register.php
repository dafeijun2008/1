<?php
/*  用户注册
    请求参数：
        uname   -用户名
        phone   -手机号
        upwd    -密码
    输出结果：
        {"code":1,"uid":1,"uname":"","phone":""}
        或
        {"code":500}
*/
require('init.php');

@$uname=$_REQUEST['uname'] or die('uname required');
@$phone=$_REQUEST['phone'] or die('phone required');
@$upwd=$_REQUEST['upwd'] or die('upwd required');

$sql="INSERT INTO user (uid,uname,phone,upwd) VALUES(NULL,'$uname','$phone','$upwd')";
$result=mysqli_query($conn,$sql);
if($result){
    $output['code']=1;
    $output['uid']=intval(mysqli_insert_id($conn));
    $output['uname']=$uname;
    $output['phone']=$phone;
}else{
    $output['code']=500;
}
echo json_encode($output);




