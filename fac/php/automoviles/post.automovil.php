<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

print_r("lo que sale en post");
print_r($_POST);
//print_r("lo que sale en files");
//print_r($_FILES);



$postdata = file_get_contents("php://input");

$request = json_decode($postdata);
$request = (array) $request;


if( isset( $request['id'] )  ){  // ACTUALIZAR

	$sql = "UPDATE automoviles 
				SET
					marca    	= '". $request['marca'] ."',
					precio    	= '". $request['precio'] ."',
					foto      	= '". $request['foto'] ."',
					tipo 		= '". $request['tipo'] ."',
					descripcion = '". $request['descripcion'] ."'
			WHERE id=" . $request['id'];

	$hecho = Database::ejecutar_idu( $sql );

	
	if( is_numeric($hecho) OR $hecho === true ){
		$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro actualizado' );
	}else{
		$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );
	}



}else{  // INSERT

	//print_r($request);

	// Verificamos si el tipo de archivo es un tipo de imagen permitido.
    // y que el tamaño del archivo no exceda los 64MB
    $permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png");
    $limite_kb = 65536;

    // Comprobamos si ha ocurrido un error.
	if (!isset($_FILES['file']) || $_FILES["file"]["error"]["file"] > 0)
	{
    	echo "Ha ocurrido un error.";
	}

    if (in_array($_FILES['file']['type']['file'], $permitidos) && $_FILES['file']['size']['file'] <= $limite_kb * 1024)
    {

    	// directorio donde se guardan las imagenes
    	$uploads_dir = 'C:/xampp/htdocs/udemy/ANGULAR JS/facturacion login/fac/img/bd'; 
    	

	    // Archivo temporal
	    $imagen_temporal = (string) $_FILES['file']['name']['file'];
	    $tmp_nombre = (string) $_FILES['file']['tmp_name']['file'];

	    //datos del post
	    $marca = (string) $_POST['file']['marca'];
	    $precio = (string) $_POST['file']['precio'] ;
	    $descripcion = (string) $_POST['file']['descripcion'];

	    // datos del archivo
	    $tipo = (string) $_FILES['file']['type']['file'];
	    $aux = (string) $_FILES['file']['name']['file'];
	    $nombre = basename($aux);
	    

	    // lo que estaba aqui se corto y paso al final
	    
	    move_uploaded_file($tmp_nombre, "$uploads_dir/$nombre");
	    // Insertamos en la base de datos.

    	$sql = "INSERT INTO automoviles( marca, precio, foto, tipo, descripcion ) 
    		VALUES ('". $marca . "',
					'". $precio . "',
					'". $nombre . "',
					'". $tipo . "',
					'". $descripcion . "')";

		$hecho = Database::ejecutar_idu( $sql );


		if( is_numeric($hecho) OR $hecho === true ){

			$respuesta = array( 'err'=>false, 'Mensaje'=>'Registro insertado' );

		}else{

			$respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );

		}

        echo "El archivo imagen ha sido copiado exitosamente.";

        
    }else{

        echo "Formato de archivo imagen no permitido o excede el tamaño límite de $limite_kb Kbytes.";
        
    }

}

echo json_encode( $respuesta );

// Leemos el contenido del archivo temporal en binario.
/*$fp = fopen($imagen_temporal, 'r+b');
$data = fread($fp, filesize($imagen_temporal));
fclose($fp);*/

//Podríamos utilizar también la siguiente instrucción en lugar de las 3 anteriores.
// $data=file_get_contents($imagen_temporal);

// Escapamos los caracteres para que se puedan almacenar en la base de datos correctamente.
//$data = mysql_escape_string($data);

?>

