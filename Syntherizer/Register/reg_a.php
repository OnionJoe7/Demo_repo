<?php
extract($_POST);
include("database.php");
$sql=mysqli_query($conn,"SELECT * FROM register where Username='$username'");
if(mysqli_num_rows($sql)>0)
{
    echo "Username Already Exists"; 
	exit;
}
else(isset($_POST['save']))
{
    $file = rand(1000,100000)."-".$_FILES['file']['name'];
    $file_loc = $_FILES['file']['tmp_name'];
    $folder="upload/";
    $new_file_name = strtolower($file);
    $final_file=str_replace(' ','-',$new_file_name);
    if(move_uploaded_file($file_loc,$folder.$final_file))
    {
        $query="INSERT INTO register(Username, Password ) VALUES ('$username', 'md5($pass)')";
        $sql=mysqli_query($conn,$query)or die("Could Not Perform the Query");
        header ("Location: login.php?status=success");
    }
    else 
    {
		echo "Error.Please try again";
	}
}

?>