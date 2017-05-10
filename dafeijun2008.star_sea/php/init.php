<?php

header('Content-Type:application/json;charset=UF-8');
$conn=mysqli_connect('127.0.0.1','root','','app_xchjr',3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);

$output=[];


