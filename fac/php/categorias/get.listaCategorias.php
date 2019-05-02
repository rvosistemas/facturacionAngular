<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$sql="SELECT id, nombre FROM categorias";

$respuesta = Database::get_json_rows($sql);

echo $respuesta;

?>