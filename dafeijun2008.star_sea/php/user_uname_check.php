<?php
/*  验证用户名是否存在
    请求参数：uname
    输出结果：
        {"code":1,"msg":"exist"}存在
        或
        {"code":2,"msg":"non-exist"}不存在
*/
require('init.php');
@$uname=$_REQUEST['uname'] or die('uname required');
$sql="SELECT * FROM user WHERE uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row){
    $output['code']=1;
    $output['msg']='exist';
}else{
    $output['code']=2;
    $output['msg']='non-exist';
}
echo json_encode($output);




