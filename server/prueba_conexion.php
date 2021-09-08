
<?php

include 'basededatos/conexion_bd.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['emple_id'])){
        $query="select * from empleados where emple_id=".$_GET['emple_id']." and emple_estado='ACTIVO'";
        $resultado=procesoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from empleados where emple_estado='ACTIVO'";
        $resultado=procesoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $emple_nombre=$_POST['emple_nombre'];
    $emple_apellidos=$_POST['emple_apellidos'];
    $query="insert into empleados(emple_nombre, emple_apellidos, emple_estado) values ('$emple_nombre', '$emple_apellidos', 'ACTIVO')";
    $queryAutoIncrement="select MAX(emple_id) as id_emple from empleados";
    $resultado=procesoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $emple_id=$_GET['emple_id'];
    $emple_nombre=$_POST['emple_nombre'];
    $emple_apellidos=$_POST['emple_apellidos'];
    $query="UPDATE empleados SET emple_nombre='$emple_nombre',emple_apellidos='$emple_apellidos' WHERE emple_id='$emple_id'";
    $resultado=procesoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $emple_id=$_GET['emple_id'];
    $query="UPDATE empleados SET emple_estado='BORRADO' WHERE emple_id='$emple_id'";
    $resultado=procesoDelete($query);
    echo json_encode($query);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>