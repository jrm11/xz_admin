<?php
    header("Content-Type:application/json;charset=utf8");
    require("init.php");

    @$lid = $_REQUEST['lid'];
    @$price = $_REQUEST['price'];

    $sql = "UPDATE  xz_laptop  SET  price = $price  WHERE lid = $lid";
    @$result = mysqli_query($conn,$sql);

    if($result){
        echo '{"code":1,"msg":"更新成功"}';
    }else{
        echo '{"code":-1,"msg":"更新失败"}';
    }
 ?>
