<?php
include_once 'backend/database.php';

session_start();

// Read POST data
$data = json_decode(file_get_contents("php://input"));

if (isset($data)) {

    $type = $data->type;

    if ($type == 1) {
        $user = $data->user;
        $name = $data->name;
        $password = $data->password;
        $role = $data->role;

        $sql = "INSERT INTO user (user, name, password, role) VALUES ('$user', '$name', '$password', '$role')";

        if (mysqli_query($conn, $sql)) {
            echo json_encode(array("success" => true, "message" => "Usuario creado con éxito."));
        } else {
            echo json_encode(array("success" => false, "message" => "Error: " . $sql . " " . mysqli_error($conn)));
        }
        mysqli_close($conn);
    } else if ($type == 2) {
        $user = $data->user;
        $password = $data->password;

        $sql = "SELECT * FROM user WHERE user='" . $user . "' AND password = '" . $password . "'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_array($result);

        if (mysqli_num_rows($result) > 0) {
            $_SESSION["user"] = $row['user'];
            $_SESSION["name"] = $row['name'];
            $_SESSION["role"] = $row['role'];
            echo json_encode(array("success" => true, "message" => "Usuario encontrado"));
        } else {
            echo json_encode(array("success" => false, "message" => "Usuario no encontrado"));
        }
        mysqli_close($conn);
    } else if ($type == 3) {

        unset($_SESSION["user"]);
        unset($_SESSION["name"]);
        unset($_SESSION["role"]);

        session_destroy();

        echo json_encode(array("success" => true, "message" => "Sesión borrada"));

    }
}
?>