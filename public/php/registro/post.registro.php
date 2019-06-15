<?php
session_start();
require_once("../clases/class.Database.php");


$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request =  (array) $request;


$respuesta = array(
	'err' => true,
	'mensaje' => 'Error al registrar los datos',
);


// ================================================
//   Encriptar la contraseña maestra (UNICA VEZ)
// ================================================
// encriptar_usuario();


if(  isset($request['codigo']) && isset($request['usuario']) && isset($request['contrasena'])  ){ // INGRESAR

	$cod 	= addslashes( $request['codigo'] );
	$user 	= addslashes( $request['usuario'] );
	$pass	= addslashes( $request['contrasena'] );
	$fecha	= NOW();

	$user 	= strtoupper($user);


	// Verificar que el usuario exista
	$sql = "SELECT count(*) as existe FROM usuarios where codigo = '$cod'";
	$existe = Database::get_valor_query( $sql, 'existe' );


	if( $existe != 1 ){

		$sql = "INSERT INTO usuarios (permiso,codigo,nombre,contrasena,ultimoacceso) 
		VALUES (3,'$cod','$user','$pass','$fecha')";

		Database::ejecutar_idu($sql);


	}else{

		$respuesta = array(
				'err' => true,
				'mensaje' => 'Usuario ya existe',
			);

	}

}


// sleep(1.5);
echo json_encode( $respuesta );





// Esto se puede borrar despues
// ================================================
//   Funcion para Encriptar
// ================================================
// function encriptar_usuario(){

// 	$usuario_id = '1';
// 	$contrasena = '123456';
// 	$contrasena_crypt = Database::crypt( $contrasena );

// 	$sql = "UPDATE usuarios set contrasena = '$contrasena_crypt' where id = '$usuario_id'";
// 	Database::ejecutar_idu($sql);

// }


?>