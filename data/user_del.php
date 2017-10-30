<?php
    header("Content-Type:application/json;charset=utf8");
    require("init.php");

    @$uid = $_REQUEST['uid'];
    $sql = "DELETE FROM xz_user WHERE uid = $uid";
    $result = mysqli_query($conn,$sql);
    $row = mysql_affected_rows($conn);
    if($result && $row > 0){
        echo '{"code":1,"msg":"删除成功"}';
    }else{
        echo '{"code":-1,"msg":"删除失败"}';
    }
?>