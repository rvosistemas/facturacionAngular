<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

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


	// Verificamos si el tipo de archivo es un tipo de imagen permitido.
    // y que el tamaño del archivo no exceda los 16MB
    $permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png");
    $limite_kb = 65536;

    if (in_array($request['foto']['type'], $permitidos) && $request['foto']['size'] <= $limite_kb * 1024)
    {

	    // Archivo temporal
	    $imagen_temporal = $request['foto']['tmp_name'];

	    // Tipo de archivo
	    $tipo = $request['foto']['type'];

	    // Leemos el contenido del archivo temporal en binario.
	    $fp = fopen($imagen_temporal, 'r+b');
	    $data = fread($fp, filesize($imagen_temporal));
	    fclose($fp);
	    
	    //Podríamos utilizar también la siguiente instrucción en lugar de las 3 anteriores.
	    // $data=file_get_contents($imagen_temporal);

	    // Escapamos los caracteres para que se puedan almacenar en la base de datos correctamente.
	    $data = mysql_escape_string($data);

	    // Insertamos en la base de datos.

    	$sql = "INSERT INTO automoviles( marca, precio, foto, tipo, descripcion ) 
    		VALUES ('". $request['marca'] . "',
					'". $request['precio'] . "',
					'". $data . "',
					'". $tipo . "',
					'". $request['descripcion'] . "')";

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



?>