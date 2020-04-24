<?php

require('posts.php');

//routeur du site
//appel un controleur selon la valeur de $_GET['page'] (la page demandée)
//si pas de $_GET['page'] ou que $_GET['page'] ne correspond à rien de voulu, affichage de la page index

if(isset($_GET['controller'])){
    switch ($_GET['controller']) {
        case 'ajax' :
            require 'controllers/ajaxController.php';
            break;
        default :
            require 'controllers/indexController.php';
    }
}
else{
    require 'controllers/indexController.php';
}
