<?php
    header("Content-Tyep:application/json;charset=utf8");
    require("init.php");
    @$currPage = $_REQUEST['cur'];
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
 jsx
    $offsetPage = ($currPage - 1) * $pageSize;

    // 分页
    // $sql = "SELECT uid,uname,email,phone,avatar,user_name,gender FROM xz_user LIMIT $currPage,$pageSize";
    // $result = mysqli_query($conn,$sql);
    // if(mysqli_error($conn)){
    //     echo mysqli_error();
    // }
    // $rows = mysqli_fetch_all($result,1);

    // 查询总记录数
    $sql = "SELECT count(*) FROM xz_user";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_row($result);
    $count = intval($row[0]);

    echo json_encode($rows);
 ?>
