<?php
	session_start();
	unset( $_SESSION['user'] );

?>

<!DOCTYPE html>
<html ng-app="loginApp" ng-controller="mainCtrl">

  <!--==========================
  =            head            =
  ===========================-->

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Sistema de {{ config.aplicativo }}</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    
    <!-- Sweet Alert 2 -->
    <script src="sweet-alert2/dist/sweetalert2.all.min.js"></script>
    <link rel="stylesheet" href="sweet-alert2/dist/sweetalert2.all.min.js">
    
    <!-- Theme style -->
    <link rel="stylesheet" href="AdminLTE.min.css">
    
    <!-- AdminLTE Skins. se ha escogido la skin azul para empezar esta pagina. Sin embargo, se pude escoger otra skin. pero se tiene que aplicar la skin en la clase de la etiqueta body para que haga efecto -->
    <link rel="stylesheet" href="css/skins/skin-black.min.css">
    <link rel="stylesheet" href="css/skins/skin-black-light.min.css">
    <link rel="stylesheet" href="css/skins/skin-red.min.css">
    <link rel="stylesheet" href="css/skins/skin-blue.min.css">
    <link rel="stylesheet" href="css/skins/skin-yellow.min.css">

    <!-- Estilos Personalizados -->
    <link rel="stylesheet" href="css/animate.css"> 
    <link rel="stylesheet" href="css/style.css"> 
    
    <!-- Importaciones de angular -->
    <script src="angular/lib/angular.min.js"></script>
    <script src="angular/lib/angular-route.min.js"></script>
   
    <!--==========================
    =       CONTROLADORES        =
    ===========================-->
    <script src="angular/app.js"></script>
    <script src="angular/config.js"></script>
    <script src="angular/controladores/loginCtrl.js"></script>
    <script src="angular/controladores/registroCtrl.js"></script>
    <script src="angular/controladores/productosCtrl.js"></script>
 

    <!--==========================
    =          SERVICIOS         =
    ===========================-->
    <script src="angular/servicios/login_service.js"></script>
    <script src="angular/servicios/configuracion_service.js"></script>
    <script src="angular/servicios/categorias_service.js"></script>
    <script src="angular/servicios/productos_service.js"></script>

  </head>

  <!--====  End of head  ====-->


  <!--==========================
  =            body            =
  ===========================-->

  <body class="hold-transition skin-yellow sidebar-mini">

    <div class="wrapper">
      
      <!--=================================
      =            main-header            =
      ==================================-->
      
      <header class="main-header">

        <!-- Logo -->
        <a href="#!/" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>{{ config.iniciales[0] }}</b>{{ config.iniciales | quitarletra }}</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b> {{ config.aplicativo }} </b>{{ config.iniciales }}</span>
        </a>

        <!-- Header Navbar -->
        <nav class="navbar navbar-fixed-top" role="navigation">
          <!-- Sidebar toggle button --> 
          <a href="" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <i class="fa fa-bars"></i>
            <span class="sr-only">Toggle navigation</span>
          </a>
          
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

            <p class="navbar-text navbar-left">
              <a class="nav-link" href="#!/login">Login </a> |
              <a class="nav-link" href="#!/registro">Registro</a>
            </p>

            </ul>
          </div>

        </nav>

      </header>

      <!--====  End of main-header  ====-->
      
      
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar"
          ng-include="'menu.html'">
      </aside>

    
      <!--=====================================
      =            content wrapper            =
      ======================================-->
      
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">

      <!-- Content Header (Page header) -->
      <section class="content-header">

        <h1>
          {{ titulo }}
          <small>{{ subtitulo }}</small>
        </h1>

      </section>

        <!-- Main content -->
        <section class="content" ng-view>
          
          <!-- Your Page Content Here -->

        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->
      
      <!--====  End of content wrapper  ====-->

            <!--=================================
        =            main-footer            =
        ==================================-->
        
        <footer class="main-footer">
          <!-- To the right -->
          <div class="pull-right hidden-xs">
            {{ config.version }}
          </div>
          <!-- Default to the left -->
          <strong>Copyright &copy; {{ config.anio }} 
              <a href="{{ config.web }}" target="blank">Compañía</a>.
          </strong> Derechos reservados.
        </footer>
        
        <!--====  End of main-footer  ====-->
        
      
    </div><!-- ./wrapper -->

      <!-- REQUIRED JS SCRIPTS -->

      <!-- jQuery 2.1.4 -->
      <script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
      <!-- Bootstrap 3.3.5 -->
      <script src="bootstrap/js/bootstrap.min.js"></script>
      <!-- AdminLTE App -->
      <script src="js/app.min.js"></script>

      <!-- Optionally, you can add Slimscroll and FastClick plugins.
          Both of these plugins are recommended to enhance the
          user experience. Slimscroll is required when using the
          fixed layout. -->
    
      <!--====  End of body  ====-->

  </body>

</html>

