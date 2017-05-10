<?php
/*
*接收客户端提交的蛋糕类型编号typeId，返回该类型下有哪些蛋糕，以JSON字符串格式
*/
header('Content-Type: application/json');

@$tid = $_REQUEST['leixing'] or die('{"err":"typeId required"}');

require('init.php');

$sql = "SELECT * FROM chanpin WHERE leixing=$tid";
$result = mysqli_query($conn,$sql);

//此处省略了$result为false的判断——SQL语法错误
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

//PHP中把数组编码为JSON字符串
$str = json_encode($list);
echo $str;