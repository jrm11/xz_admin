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
//require("init.php");
//$file = $_REQUEST['myfile'];
//$uid = $_REQUEST['uid'];
//$sql = "UPDATE xz_user SET avatar = '$file' WHERE uid = $uid";
//$result = mysqli_query($conn,$sql);
//if($result){
//    echo '{"code":1,"msg":"更新成功"}';
//}else{
//    echo '{"code":-1,"msg":"更新失败"}';
//}
 require("init.php");
 require("00_imageUtils.php");
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
//   文件名
 $fileName = time().rand(1,99999).$type;
 $src = $_FILES['myfile']['tmp_name'];
 $des = "../upload/".$fileName;

// $imgLocation = move_uploaded_file($src,$des);
 move_uploaded_file($src,$des);

  $uid = $_REQUEST['uid'];
  $sql = "UPDATE xz_user SET avatar = '$fileName' WHERE uid = $uid";
  $result = mysqli_query($conn,$sql);
  $rows = mysqli_affected_rows($conn);
  if(mysqli_error($conn)){
    echo mysqli_error($conn);
  }
  mkThumbnail($des,50,50,"../upload/s_".$fileName);
  mkThumbnail($des,80,80,"../upload/m_".$fileName);
  if($result && $rows>0){
      echo '{"code":1,"msg":"上传成功"}';
  }else{
      echo '{"code":-1,"msg":"上传失败"}';
  }
// echo '{"code":1,"msg":"上传成功"}';
