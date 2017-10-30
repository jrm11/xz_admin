<?php
    header("Content-Type:application/json;charset=utf8");
    require("init.php");
    @$uid = $_REQUEST['uid'];
    @$oldpwd = $_REQUEST['old-pwd'];
    @$newpwd = $_REQUEST['new-pwd'];
    $sql = "SELECT * FROM xz_user WHERE uid = $uid and upwd = '$oldpwd'";

    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    if($row){
        $sql = "UPDATE xz_user SET upwd = '$newpwd' WHERE uid = $uid";
        $update = mysqli_query($conn,$sql);
        $rowCount = mysqli_affected_rows($conn);
        if($update  && $rowCount>0){
            echo "update success";
        }else{
            echo "update faild";
        }
    }else{
        echo "update faild";
    }
?>