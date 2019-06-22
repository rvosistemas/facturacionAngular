<?php
session_start();

if( !isset( $_SESSION['user'] ) ){
  echo "Acceso denegado.";
  die;

}

?>

<!DOCTYPE html>

<html ng-app="facturacionApp" ng-controller="mainCtrl">

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
    <link rel="stylesheet" href="dist/fontawesome/css/all.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="dist/ionicons/css/ionicons.min.css">
    <!-- Chartsjs -->
    <script src="plugins/chartjs/Chart.js"></script>
    <!-- Sweet Alert 2 -->
    <script src="dist/sweet-alert2/dist/sweetalert2.all.min.js"></script>
    <link rel="stylesheet" href="dist/sweet-alert2/dist/sweetalert2.all.min.js">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. se ha escogido la skin azul para empezar esta pagina. Sin embargo, se pude escoger otra skin. pero se tiene que aplicar la skin en la clase de la etiqueta body para que haga efecto -->
    <link rel="stylesheet" href="dist/css/skins/skin-black.min.css">
    <link rel="stylesheet" href="dist/css/skins/skin-black-light.min.css">
    <link rel="stylesheet" href="dist/css/skins/skin-red.min.css">
    <link rel="stylesheet" href="dist/css/skins/skin-blue.min.css">

    <!-- Estilos Personalizados -->
    <link rel="stylesheet" href="dist/css/animate.css"> 
    <link rel="stylesheet" href="dist/css/style.css"> 

    <!-- Importaciones de angular -->
    <script src="angular/lib/angular.min.js"></script>
    <script src="angular/lib/angular-route.min.js"></script>
    <script src="angular/lib/jcs-auto-validate.min.js"></script>
    <script src="angular/lib/ng-file-upload.min.js"></script>

    <!--==========================
    =       CONTROLADORES        =
    ===========================-->
    <script src="angular/app.js"></script>
    <script src="angular/config.js"></script>
    <script src="angular/controladores/dashboardCtrl.js"></script>
    <script src="angular/controladores/categoriasCtrl.js"></script>
    <script src="angular/controladores/clientesCtrl.js"></script>
    <script src="angular/controladores/automovilesCtrl.js"></script>
    <script src="angular/controladores/computadoresCtrl.js"></script>

    <!--==========================
    =          SERVICIOS         =
    ===========================-->
    <script src="angular/servicios/configuracion_service.js"></script>
    <script src="angular/servicios/mensajes_service.js"></script>
    <script src="angular/servicios/notificaciones_service.js"></script>
    <script src="angular/servicios/dashboard_service.js"></script>
    <script src="angular/servicios/categorias_service.js"></script>
    <script src="angular/servicios/usuario_service.js"></script>
    <script src="angular/servicios/clientes_service.js"></script>
    <script src="angular/servicios/automoviles_service.js"></script>

  </head>
  
  <!--====  End of head  ====-->


  <!--==========================
  =            body            =
  ===========================-->
   
   <body class="hold-transition skin-blue sidebar-mini">
     
    <div class="wrapper">

      <!--=================================
      =            main-header            =
      ==================================-->
      
      <header class="main-header">

        <!-- Logo -->
        <a href="index2.html" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>{{ config.iniciales[0] }}</b>{{ config.iniciales | quitarletra }}</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b> {{ config.aplicativo }} </b>{{ config.iniciales }}</span>
        </a>

        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button --> 
          <a href="" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <i class="fa fa-bars"></i>
            <span class="sr-only">Toggle navigation</span>
          </a>

          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

              <!-- carrito: style can be found in dropdown.less-->
              <li class="dropdown notifications-menu"
                  ng-include="'template/carrito.html'">
              </li>
              <!-- /.carrito-menu -->

              <!-- Messages: style can be found in dropdown.less-->
              <li class="dropdown messages-menu"
                  ng-include="'template/mensajes.html'">
              </li>
              <!-- /.messages-menu -->

              <!-- Notifications Menu -->
              <li class="dropdown notifications-menu"
                  ng-include="'template/notificaciones.html'">
              </li>

              <!-- User Account Menu -->
              <li class="dropdown user user-menu"
                  ng-include="'template/usuario.html'">
              </li>

            </ul>
          </div>
        </nav>
      </header>
      
      <!--====  End of main-header  ====-->
      
      
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar"
          ng-include="'template/menu.html'">
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
    <script src="dist/js/app.min.js"></script>

    <!-- Optionally, you can add Slimscroll and FastClick plugins.
         Both of these plugins are recommended to enhance the
         user experience. Slimscroll is required when using the
         fixed layout. -->
  </body>
   
  <!--====  End of body  ====-->
 
</html>
