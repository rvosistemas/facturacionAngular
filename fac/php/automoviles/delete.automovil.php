<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;

//print_r($request['id'] );

if( isset( $request['id'] )  ){
	
	/* //////------------------------------//////
					ELIMINAR (en este caso no se elimina el registro si no que cambia el estado)
	////////------------------------------///// */ 

	$activo = 0; // activo 1 si aparecen los datos en la aplicacion con cero no.

	$sql = "UPDATE automoviles 
				SET
					activo = '". $activo ."'
			WHERE id=" . $request['id'];

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro eliminado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}

}else{

	echo "No se encontro categoria con el id ".$request['id'];

}