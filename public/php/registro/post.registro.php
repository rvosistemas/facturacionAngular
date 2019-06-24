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

//var_dump($request);  // si deja activo se envia junto con la respuesta

// ================================================
//   Encriptar la contraseña maestra (UNICA VEZ)
// ================================================
// encriptar_usuario();


if(  isset($request['codigo']) && isset($request['nombre']) && isset($request['email']) && isset($request['contrasena'])  ){ // INGRESAR

	$cod 	= addslashes( $request['codigo'] );
	$correo = addslashes( $request['email'] );
    $nombre	= addslashes( $request['nombre'] );
	$pass	= addslashes( $request['contrasena'] );
	$fecha	= date("Y-m-d H:i:s");

	$nombre	= strtoupper($nombre);
	$correo	= strtolower($correo);

	$token 	= random_int(10000, 99999);
	//var_dump($token);

	// Verificar que el usuario exista por medio del correo
	$sql 	= "SELECT count(*) as existe FROM usuarios where correo = '$correo'";
	$existe = Database::get_valor_query( $sql, 'existe' );


	if( $existe != 1 ){

		$sql = "INSERT INTO usuarios (permiso,codigo,nombre,correo,contrasena,token,ultimoacceso) 
		VALUES (3,'$cod','$nombre','$correo','$pass','$token','$fecha')";

		Database::ejecutar_idu($sql);

		$respuesta = array(
			'err' => false,
			'token' => $token,
			'mensaje' => 'Registro Exitoso',
			
		);

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