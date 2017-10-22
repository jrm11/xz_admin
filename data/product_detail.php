<?php
    header("Content-Type:application/json;charset=utf8");
    require("init.php");
    @$lid = $_REQUEST['lid'];
    @$pname = $_REQUEST['pname'];
    @$price = $_REQUEST['price'];
     $sql = "SELECT lid,lname,price,os,spec FROM xz_laptop WHERE lid='$lid'";

     $result = mysqli_query($conn,$sql);
     $row = mysqli_fetch_assoc($result);
     echo json_encode($row);
 ?>
