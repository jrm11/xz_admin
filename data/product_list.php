<?php
header("Content-Type:application/json;charset=utf8");
require("init.php");
@$pno = $_REQUEST["pno"];
if(!$pno){
 $pno = 1;//默认显示第一页
}else{
 $pno = intval($pno);
}
//1.1 获取一页中记录条数 8
@$pageSize = $_REQUIRE["pageSize"];
if(!$pageSize){
 $pageSize = 8; //默认每页显示8条记录
}else{
 $pageSize = intval($pageSize);
}

$currentPage = ($pno-1)*$pageSize;

$selectSql = " SELECT p.lid,p.price ,p.os,p.spec,pic.sm,f.fname FROM xz_laptop p, xz_laptop_family f, xz_laptop_pic pic GROUP BY p.lid LIMIT $currentPage,$pageSize";
$result = mysqli_query($conn,$selectSql);
$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);

$sql = "SELECT count(*) FROM xz_laptop";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);//索引
$count = intval($row[0]);
$pageCount = ceil($count/$pageSize);

$output = [
  "recordCount"=>$count,   //总记录数
  "pageSize"=>$pageSize,   //页大小
  "pageCount"=>$pageCount, //总页数
  "pno"=>$pno,             //当前页码
  "data"=>$rows            //当前页内容
];

//11:输出
echo json_encode($output);
?>
