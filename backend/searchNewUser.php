<?php
include_once 'database.php';
$result = mysqli_query($conn,"SELECT * FROM user WHERE user='" . $_GET['newUser'] . "'");
$row= mysqli_fetch_array($result);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(array("success"=>true, "message"=>"Id ya existe"));
} else {
    echo json_encode(array("success"=>false, "message"=>"Id no existe"));
}


?>