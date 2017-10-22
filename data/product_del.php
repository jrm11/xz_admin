<?php
    header("Content-Type:application/json;charset=utf8");
    require("init.php");
    @$lid = $_REQUEST["lid"];
    // $sql = "UPDATE xz_laptop SET is_onsale = 1 WHERE lid = $lid";
    $sql = "DELETE FROM xz_laptop  WHERE lid = $lid";
    $result = sql_execute($sql);
    if($result){
        echo '{"code":1,"msg":"删除成功"}';
    }else{
        echo '{"code":-1,"msg","删除失败"}';
    }
 ?>
