<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

//$id = $_GET['var'];

session_start();

$correo = $_SESSION['email'];

$sql="SELECT id, permiso, codigo, nombre, foto FROM usuarios WHERE correo = '$correo' ";

$respuesta = Database::get_json_row($sql);

echo $respuesta;

?>