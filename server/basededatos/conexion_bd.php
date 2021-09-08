<?php
$pdo=null;
$host="localhost";
$user="root";
$password="";
$bd="empresa_importante";

function conectateporfavor(){
    try{
        $GLOBALS['pdo']=new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['bd']."", $GLOBALS['user'], $GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e){
        print "Error de conexión a la base de datos".$bd."<br/>";
        print "\nERROR! ERROR! PELIGRO! ERROR!: ".$e."<br/>";
        die();
    }
}

function desconectateporfavor() {
    $GLOBALS['pdo']=null;
}

function procesoGet($query){
    try{
        conectateporfavor();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        desconectateporfavor();
        return $sentencia;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function procesoPost($query, $queryAutoIncrement){
    try{
        conectateporfavor();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $idAutoIncrement=procesoGet($queryAutoIncrement)->fetch(PDO::FETCH_ASSOC);
        $resultado=array_merge($idAutoIncrement, $_POST);
        $sentencia->closeCursor();
        desconectateporfavor();
        return $resultado;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}



function procesoPut($query){
    try{
        conectateporfavor();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $resultado=array_merge($_GET, $_POST);
        $sentencia->closeCursor();
        desconectateporfavor();
        return $resultado;
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

function procesoDelete($query){
    try{
        conectateporfavor();
        $sentencia=$GLOBALS['pdo']->prepare($query);
        $sentencia->execute();
        $sentencia->closeCursor();
        desconectateporfavor();
        return $_GET['emple_id'];
    }catch(Exception $e){
        die("Error: ".$e);
    }
}

?>