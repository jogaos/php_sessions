<?php
session_start();
include_once 'components/header.php';
?>

<?php
include_once 'components/navbar.php';
?>

<?php
if (!isset($_SESSION["user"])) {
    header("Location:login.php");
}
?>

    <div class="container jumbotron">
        <div class="container-center">
            <h2>¡Bienvenido <?php echo $_SESSION["name"];?>!</h2>
            <h2>Rol: <?php echo $_SESSION["role"];?></h2>
            <form>
                <div class="lead">
                    <input type="hidden" value="3" name="type" id="type">
                    <input type="button" class="btn btn-primary" id="createUser" onclick="logout()" value="Salir">
                </div>
                <div class="lead">
                    <span class="lead" id="resultMessage"> </span>
                </div>
            </form>
        </div>
    </div>

<?php
include_once 'components/footer.php';
?>