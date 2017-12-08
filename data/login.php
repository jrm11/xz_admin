<?php
   // 指定允许其他域名访问
    header('Access-Control-Allow-Origin:*');
    header("Content-Type:application/json;charset-utf8");
    require("init.php");
    @$u = $_REQUEST["uname"];
    @$p = $_REQUEST["upwd"];

    //验证密码用户名验证码
    $uPattern='/[\x4E00-\x9FA5\w]{4,20}/';
    $pPattern='/.{6,20}/';
    $vPattern='/[A-Za-z0-9]{4}/';

    // if(!preg_match($uPattern,$u)){
    //     echo '{"code":-2,"msg":"用户名格式不正确"}';
    //     exit;
    // }
    //
    // if(!preg_match($pPattern,$p)){
    //     echo '{"code":-2,"msg":"密码格式不正确"}';
    //     exit;
    // }

    $sql = "SELECT * FROM user  WHERE uname='$u' AND upwd='$p'";
    @$result = mysqli_query($conn,$sql);
    @$row = mysqli_fetch_assoc($result);
    if($row==null){
        echo '{"code":-2,"msg":"用户名或密码有误"}';
    }else{
        $id = $row["id"];
        echo '{"code":1,"msg":"登录成功","id":'.$id.'}';
    }
?>
