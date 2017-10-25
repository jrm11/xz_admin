<?php
    header("Content-Type:application/json;charset=utf8");
    require("init.php");
    @$u = $_REQUEST["uname"];
    @$p = $_REQUEST["upwd"];
    @$v = $_REQUEST["vcode"];//输入次数
    @$code = $_REQUEST["code"];//用户输入的验证码

    //验证密码用户名验证码
    $uPattern='/[\x4E00-\x9FA5\w]{4,20}/';
    $pPattern='/.{6,20}/';
    $vPattern='/[a-z0-9]{4}/';
    //验证用户名密码验证码
    //防止用户输入错误超过4次刷新页面，“刷新页面立即验证”
    // $uPattern='/[a-z0-9]{3,12}/';
    // $pPattern='/[a-z0-9]{3,12}/';
    // $vPattern='/[a-z0-9]{4}/';

    if(!preg_match($uPattern,$u)){
        echo '{"code":-2,"msg":"用户名格式不正确"}';
        exit;
    }

    if(!preg_match($pPattern,$p)){
        echo '{"code":-2,"msg":"密码格式不正确"}';
        exit;
    }

    if($v>4){
         @$sessionFailCount = $_SESSION["failCount"];
         if($sessionFailCount!=$code){
            echo '{"code":-3,"msg":"验证码有误"}';
            exit;
         }
    }

    $sql = "SELECT * FROM xz_user  WHERE uname='$u' AND upwd='$p'";
    @$result = mysqli_query($conn,$sql);
    @$row = mysqli_fetch_assoc($result);
    if($row==null){
        echo '{"code":-2,"msg":"用户名或密码有误"}';
    }else{
        $uid = $row["uid"];
        echo '{"code":1,"msg":"登录成功","uid":'.$uid.'}';
    }
?>
