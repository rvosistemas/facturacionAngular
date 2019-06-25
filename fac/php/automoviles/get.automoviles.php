<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$sql="SELECT * FROM automoviles WHERE activo = 1";

$respuesta = Database::get_json_rows($sql);

echo $respuesta;

?>