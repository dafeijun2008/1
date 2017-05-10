<?php
/*  用户登录验证
    请求参数：
    unameOrPhone-邮箱或手机号
    upwd-密码
    输出结果：
    {"code":1,"uid":1,"uname":"","phone":""}-登录成功
    或
    {"code":400}-登录失败
*/
require('init.php');

/*获取前端提交的用户名和密码*/
@$unameOrPhone = $_REQUEST['unameOrPhone'] or die('uname or phone required');
@$upwd = $_REQUEST['upwd'] or die('upwd required');
/*去数据库中查询*/
$sql = "SELECT uid,uname,phone FROM user WHERE (uname='$unameOrPhone' AND upwd='$upwd') OR (phone='$unameOrPhone' AND upwd='$upwd')";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
/*判断结果集中的数据是否存在*/
if($row){
    $output['code']=1;
    $output['uid']=intval($row['uid']);
    $output['uname']=$row['uname'];
    $output['phone']=$row['phone'];
}else{
    $output['code']=400;
}
/*给前端输出结果*/
echo json_encode($output);


