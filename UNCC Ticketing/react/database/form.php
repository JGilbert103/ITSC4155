//http://localhost/test/formsubmit.php
<?php 
    header('Access-Control-Allow-Origin: *');
     
    $conn = new mysqli("localhost","root","password","tickets");
     
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $name = $_POST['firstname'];
         
        $sql = "INSERT INTO reactusers(name) VALUES('$name');";
        $res = mysqli_query($conn, $sql);
         
        if($res){
            echo "Success!";
        }
        else{
            echo "Error!";
        }
        $conn->close();
    }
?>