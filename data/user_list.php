<?php
    header("Content-Tyep:application/json;charset=utf8");
    require("init.php");
    @$currPage = $_REQUEST['pno'];
    @$pageSize = $_REQUEST['pageSize'];
    if(!$currPage){
        $currPage = 1;
    }else{
        $currPage = intval($currPage);
    }

    if(!$pageSize){
        $pageSize = 8;
    }else{
        $pageSize = intval($pageSize);
    }
    $offsetPage = ($currPage - 1) * $pageSize;

    // 分页
    $sql = "SELECT uid,uname,email,phone,avatar,user_name,gender FROM xz_user  GROUP BY uid LIMIT $offsetPage,$pageSize";
    $result = mysqli_query($conn,$sql);
    if(mysqli_error($conn)){
        echo mysqli_error();
    }
    $rows = mysqli_fetch_all($result,1);

    // 查询总记录数
    $sql = "SELECT count(*) FROM xz_user";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_row($result);
    $count = intval($row[0]);
    $pageCount = ceil($count/$pageSize);
    $output = [
      "recordCount"=>$count,   //总记录数
      "pageSize"=>$pageSize,   //页大小
      "pageCount"=>$pageCount, //总页数
      "pno"=>$currPage,             //当前页码
      "data"=>$rows            //当前页内容
    ];

    echo json_encode($output);
 ?>
