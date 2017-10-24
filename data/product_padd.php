<?php
        header("Content-Type:application/json;charset=utf8");
        require("init.php");
        $sql = "SELECT fid, fname FROM xz_laptop_family";

        $result = mysqli_query($conn,$sql);

        $list = mysqli_fetch_all($result,1);
        echo json_encode($list);
 ?>
