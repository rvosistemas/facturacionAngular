<?php

    require_once("../clases/class.Database.php");

    $postdata = file_get_contents("php://input");
    
    $request = json_decode($postdata);
    $request =  (array) $request;

    $respuesta = array(
        'err' => true,
        'mensaje' => 'Error al activar cuenta',
    );

    if(  isset($request['email']) && isset($request['token'])  ){ 

        $correo = addslashes( $request['email'] );
        $token	= addslashes( $request['token'] );
    
        // Verificar que el correo exista
        $sql 	= "SELECT count(*) AS existe FROM usuarios WHERE correo = '$correo'";
        $existe = Database::get_valor_query( $sql, 'existe' );

        // se traen los datos para verificar
    
    
        if( $existe == 1 ){

            $sql = "SELECT correo,token FROM usuarios WHERE correo = '$correo' ";
            $datosBD = Database::get_row( $sql );

            //print_r($datosBD);
            
            if( $datosBD['correo'] == $correo && $datosBD['token'] == $token ){
                
                $sql = "UPDATE usuarios SET activo = 1 WHERE correo = '$correo'";
                Database::ejecutar_idu($sql);
        
                $respuesta = array(
                    'err' => false,
                    'mensaje' => 'Activacion Exitosa',
                    
                );
            }else{

                $respuesta = array(
                    'err' => true,
                    'mensaje' => 'DATOS INCORRECTOS, Verificar Correo y token',
                );

            }

            
    
        }else{
    
            $respuesta = array(
                'err' => true,
                'mensaje' => 'DATOS INCORRECTOS, Verificar Correo',
            );
    
        }
    
    }
    
    
    // sleep(1.5);
    echo json_encode( $respuesta );

    return $respuesta;

?>