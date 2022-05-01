 <?php

 // Saving $contents to database...
//   $log_file_name = '../Storage/keyboard.log'; 
  $username = $_POST['username'];
  $synthpas = $_POST['cleaned'];
  $stamp = time();
  $link = mysqli_connect("localhost", "root", "root", "login");
  if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}



$sql = mysqli_query($link, "select * from `users` where username='$username' && synth='$synthpas'");
$num_rows=mysqli_num_rows($sql);
$row=mysqli_fetch_array($sql);
 
if ($num_rows>0){
  echo '<script type="text/javascript"> alert("Correct");</script>';
  // header('Location:../login.php');
  // echo '<script type="text/javascript"> location.reload();</script>';
  // echo $row;
  // echo "Success!";


} else{
    $newSQL = mysqli_query($link, "select 'synth' from `users` where username='$username'");
    $newRow=mysqli_fetch_array($newSQL);
    $converted = json_encode($newRow);
    $log_file_name = '../failed-logins.log';

    $str1 = $stamp;
    $str1 .= ' -- Username: ';
    $str1 .= $_POST['username'];
    $str1 .= "    melody entered";
    $str1 .= ":   $synthpas";
    $str1 .= "\n---------\n";
    file_put_contents($log_file_name, ($str1), FILE_APPEND); 
    header("Location: ../login.php");
    // $Message = "Login Failed! User not found";
  }
// Close connection
mysqli_close($link);

?>


<!-- // echo "ERROR: Could not able to execute $sql. " . mysqli_error($link); -->
