<?php
    $url='localhost';
    $username='root';
    $password='root';
    $conn=mysqli_connect($url,$username,$password,"fregister");
    if(!$conn){
        die('Could not Connect My Sql:' .mysql_error());
    }
?>