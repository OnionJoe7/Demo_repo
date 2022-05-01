<!DOCTYPE html>
<html>

<head>

<title>Login with Validation PHP, MySQLi</title>
<link rel="stylesheet" href="cs.css">
</head>
<body>
<!-- 
    function regLocation() {
        window.location.href="../Authsynth/main.html";
</script> -->

<?php
 
// define variables and set to empty values
$conn = mysqli_connect("localhost", "root", "root", "login");
$Message = $ErrorUname = $ErrorPass = "";
// $newURL = ;


if ($_SERVER["REQUEST_METHOD"] == "POST") {
 
    $username = check_input($_POST["username"]);
 
    if (!preg_match("/^[a-zA-Z0-9_]*$/",$username)) {
      $ErrorUname = "Space and special characters not allowed but you can use underscore(_)."; 
    }
    else{
        $fusername=$username;
    }
 
    $fpassword = check_input($_POST["password"]);
 
  if ($ErrorUname!=""){
    $Message = "Login failed! Errors found";
  }
  else{
  // include('conn.php');
 
  $query=mysqli_query($conn,"select * from `users` where username='$fusername' && password='$fpassword'");
  $num_rows=mysqli_num_rows($query);
  $row=mysqli_fetch_array($query);
 
  if ($num_rows>0){
      $Message = "Login Successful!";
      header('Location: ./SynthLogin/main.html');
      // header();
  }
  else{
    $log_file_name = 'failed-logins.log'; 
    $str1 = 'Username: ';
    $str1 .= $_POST['username'];
    $str1 .= "    x"; // username
    $str1 .= "\n---------\n";
    file_put_contents($log_file_name, ($str1), FILE_APPEND);
    $Message = "Login Failed! User not found";
  }
 
  }
}
 
function check_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
 <main id="main-holder">
 <h1 id="login-header">Syntherizer</h1> <!-- <h2>Login Form</h2> --> 
<!-- <p><span class="message">* required field.</span></p> -->
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
 <input type="text" name="username" class=login-form-field placeholder="Username" id="username-field" required>
     <span class="message">* <?php echo $ErrorUname;?></span>
<input type="password" name="password" class="login-form-field" id="password-field" placeholder="Password" required>
  <span class="message">* <?php echo $ErrorPass;?></span>


  <input type="submit" name="submit" id="login-form-submit" value="Login">
  
  
</form>
<form method="POST" action='../Register/main.html'>
<input type="submit" value="Register" class="Register" id="register-form-submit">
</form>
</mainholder>


<span class="message">
<?php

    if ($Message=="Login Successful!"){
        // header('Location: ../../Syntherizer/Authsynth/main.html');
        // exit;
        
        // echo $Message;
        // echo 'Welcome, ';
        
    }
    else{
        echo $Message;
    }
 
?>
</span>
 


</body>
</html>

<!--  .$row['fullname'] -->