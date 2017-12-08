<?php
    header("Content_type:application/json;charset=utf8");
    require("init.php");
    $sql = "SELECT * FROM xz_role";
    $result = mysqli_query($conn,$sql);

    $row = mysqli_fetch_all($result,1);
    echo json_encode($row);

 ?>
