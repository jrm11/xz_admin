<?php
// var_dump($_REQUEST); // 为空数组
// var_dump($_FILES); //不为空

//// 当使用FormData配合ajax上传文件时，$_REQUEST、$_POST都是空数组，php://input也是null
//if (isset($_FILES['myfile']) && !empty($_FILES['myfile'])) {
//    if (move_uploaded_file($_FILES['myfile']['tmp_name'], "upload/".$_FILES['myfile']['name'])) {
//        echo '{"result": 1, "filename": "' . $_FILES['myfile']['name'] . '"}';
//    } else {
//        echo '{"result": 0}';
//    }
//}

$rs = empty($_FILES);
if($rs){
    die ('{"code":-1,"msg":"没有上传文件请检查"}');
}
$filename = $_FILES['myfile']['name'];
$filesize = $_FILES['myfile']['size'];
if($filesize> 512*1024 ){
    die('{"code":-2,"msg":“上传文件过大”}');
}

$type = strstr($filename,".");
if($type !=".gif" &&$type !=".png"&&$type !=".jpg"&&$type !=".jpeg" &&$type !=".avi"&&$type !=".mp4"){
    die('{"code":-3,"msg":"格式不正确"}');
}

$fileName = time().rand(1,9999).$type;
$src = $_FILES['myfile']['tmp_name'];
$des = "upload/".$fileName;
$sql = "UPDATE xz_user "
move_uploaded_file($src,$des);
echo '{"code":1,"msg":"上传成功"}';
