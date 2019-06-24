<?php

    $respuesta = array(
        'err' => true,
        'mensaje' => 'Error al enviar token al correo',
    );

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require_once('../clases/PHPMailer/src/Exception.php');
    require_once('../clases/PHPMailer/src/PHPMailer.php');
    require_once('../clases/PHPMailer/src/SMTP.php');
    //require_once("../clases/class.Database.php");
    
    $postdata = file_get_contents("php://input");

    $request = json_decode($postdata);
    $request =  (array) $request;

    $token      = $request['token'];
    $email      = $request['email'];
    $usuario    = $request['nombre'];
    //var_dump($token);

    //$url_activacion = 'http://localhost/udemy/ANGULAR JS/facturacion login/public/activacion.html';
    $url_activacion = 'http://localhost/udemy/ANGULAR%20JS/facturacion%20login/public/#!/activacion';

    $correo = new PHPMailer(true);
    try{
        //servidor
        $correo -> SMTPDebug        = 2;
        $correo -> isSMTP();
        $correo -> Host             = 'in-v3.mailjet.com';
        $correo -> SMTPAuth         = true;
        $correo -> Username         = '85d92de4f2c99bc709f75707df475a3f';
        $correo -> Password         = '3787d986bd594698bf598a844884ea4f';
        $correo -> SMTPSecure       = 'tls';
        $correo -> Port             = 587;
        $correo -> CharSet = 'UTF-8';
        //Usuarios
        $correo -> setFrom('dark_rd@hotmail.com','facturacion.com');
        $correo -> addAddress($email,$usuario);
        //Contenido
        $correo -> isHTML(true);
        $correo -> Subject          = "Bienvenido a facturacion.com";
        $correo -> Body             = "Gracias por registrarte, aqui tu token de activacion <b>".$token."<b> click en siguiente link para activar tu cuenta <link>".$url_activacion."</link>";
        $correo -> AltBody          = "click en siguiente link para registrarte <link>".$url_activacion."</link>";

        $correo -> send();

        $respuesta = array(
            'err' => false,
            'mensaje' => 'Envio del token al correo exitoso',
        );

    }catch(Exception $e){
        $respuesta = array(
            'err' => true,
            'mensaje' => 'El mensaje no pudo ser enviado. Mailer Error: '.$correo->ErrorInfo,
        );
    }

    return $respuesta;

?>