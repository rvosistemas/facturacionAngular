<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

//$id = $_GET['var'];

session_start();

$user = $_SESSION['user'];

$sql="SELECT id, permiso, codigo, nombre, foto FROM usuarios WHERE codigo = '$user' ";

$respuesta = Database::get_json_row($sql);

echo $respuesta;

?>