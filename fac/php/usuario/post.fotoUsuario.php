<?php
// Incluir el archivo de base de datos
include_once("../clases/class.Database.php");

//print_r("lo que sale en files");
//print_r($_FILES);

session_start();

$correo = $_SESSION['email'];

// Verificamos si el tipo de archivo es un tipo de imagen permitido.
// y que el tamaño del archivo no exceda los 64MB
$permitidos = array("image/jpg", "image/jpeg", "image/gif", "image/png");
$limite_kb = 65536;

$respuesta = array( 'err'=>true, 'Mensaje'=>'NO encontro usuario' );

if ($_FILES["file"]["error"]["file"] > 0)
{
    echo "Ha ocurrido un error en la imagen.";
}

if (in_array($_FILES['file']['type']['file'], $permitidos) && $_FILES['file']['size']['file'] <= $limite_kb * 1024){

    // directorio donde se guardan las imagenes
    $uploads_dir = 'C:/xampp/htdocs/udemy/ANGULAR JS/facturacion login/fac/img/usuarios/'; 
    

    // Archivo temporal
    $imagen_temporal 	= (string) $_FILES['file']['name']['file'];
    $tmp_nombre 		= (string) $_FILES['file']['tmp_name']['file'];
    // datos del archivo
    $tipo 		= (string) $_FILES['file']['type']['file'];
    $aux 		= (string) $_FILES['file']['name']['file'];
    $nombreFoto = basename($aux);

    // lo que estaba aqui se corto y paso al final
    
    //Con esto pasamos la imagen a un directorio dentro del servidor
    move_uploaded_file($tmp_nombre, "$uploads_dir/$nombreFoto");

    // Insertamos en la base de datos.
    $sql = "UPDATE usuarios 
        SET
            foto = '". $nombreFoto ."',
            tipo = '". $tipo ."' 
        WHERE correo = '$correo'";

    $hecho = Database::ejecutar_idu( $sql );


    if( is_numeric($hecho) OR $hecho === true ){

        $respuesta = array( 'err'=>false, 'Mensaje'=>'Registro ACTUALIZADO' );

    }else{

        $respuesta = array( 'err'=>true, 'Mensaje'=>$hecho );

    }

    echo "El archivo imagen ha sido copiado exitosamente.";
    
}else{

    echo "Formato de archivo imagen no permitido o excede el tamaño límite de $limite_kb Kbytes.";
    
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

