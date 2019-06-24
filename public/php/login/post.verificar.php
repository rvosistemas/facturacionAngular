<?php
session_start();
require_once("../clases/class.Database.php");


$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request =  (array) $request;


$respuesta = array(
	'err' => true,
	'mensaje' => 'Correo/Contraseña incorrectos',
);


// ================================================
//   Encriptar la contraseña maestra (UNICA VEZ)
// ================================================
// encriptar_usuario();




if(  isset( $request['correo'] ) && isset( $request['contrasena'] ) ){

	$correo = addslashes( $request['correo'] );
	$pass = addslashes( $request['contrasena'] );

	$correo	= strtolower($correo);

	// Verificar que el usuario exista
	$sql = "SELECT count(*) AS existe FROM usuarios WHERE correo = '$correo' AND activo = 1 ";
	$existe = Database::get_valor_query( $sql, 'existe' );


	if( $existe == 1 ){

		$sql = "SELECT contrasena FROM usuarios WHERE correo = '$correo' ";
		$data_pass = Database::get_valor_query( $sql, 'contrasena' );


		// Encriptar usando el mismo metodo
		//$pass = Database::uncrypt( $pass, $data_pass );

		// Verificar que sean iguales las contraseñas
		if( $data_pass == $pass ){

			$respuesta = array(
				'err' => false,
				'mensaje' => 'Login válido',
				'url' => '../fac/',
			);

			$_SESSION['email'] = $correo; // para manejar la sesion

			// actualizar ultimo acceso
			$sql = "UPDATE usuarios set ultimoacceso = NOW() where correo = '$correo'";
			Database::ejecutar_idu($sql);
		}


	}else{
		$respuesta = array(
			'err' => true,
			'mensaje' => 'Usuario NO existe, o no ha activado su cuenta (verificar su email)',
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