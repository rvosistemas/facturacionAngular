<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$nombreCategoria = $_GET['var'];

$sql="SELECT id, marca, descripcion FROM automoviles WHERE categoria = '$nombreCategoria' LIMIT 5";

$respuesta = Database::get_json_rows($sql);

echo $respuesta;

?>