<?php
    header("Content-Type:application/json;charset=utf8");

    require("init.php");

    @$low = $_REQUEST['low'];
    @$high = $_REQUEST['high'];
    @$kw = $_REQUEST['kw'];
    @$currPage = $_REQUEST['pno'];
    @$pageSize = $_REQUEST['pageSize'];

    if(!$low){
        $low = 0;
    }

    if(!$high){
        $low = 1000000;
    }

    if(!$currPage){
        $currPage = 1;
    }

    if(!$pageSize){
        $pageSize = 8;
    }
    // 查询符合条件的记录数
    $sql = "SELECT count(*) FROM xz_laptop WHERE title LIKE '%$kw%' AND price >='$low' AND price<= '$high'";
    $result = mysqli_query($conn,$sql);
    $rows = mysqli_fetch_row($result);
    $recordCount = intval($rows[0]);

    $sql = "SELECT p.lid,p.price,p.title,p.os,pic.sm,f.fname FROM
                xz_laptop p,xz_laptop_pic pic, xz_laptop_family f WHERE p.title LIKE '%$kw%' AND p.price>='$low' AND p.price <= '$high' GROUP BY p.lid LIMIT $currPage,$pageSize";
    $result = mysqli_query($conn,$sql);
    if(mysqli_error($conn)){
        echo mysqli_error($conn);
    }

    $rows = mysqli_fetch_all($result,1);
    $pageCount = ceil($recordCount/$pageSize);

    $output = [
       "kw"=>$kw,
       "low"=>$low,
       "high"=>$high,
       "pno"=>$currPage,
       "pageSize"=>$pageSize,
       "pageCount"=>$pageCount,
       "data"=>$rows
    ];
    echo json_encode($output);
 ?>
