<?php
header('Content-Type: application/json');

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'oss_yongin');
define('DB_PASSWORD', '');
define('DB_NAME', 'oss');

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
    die("Connection failed: ". $mysqli->error);
}

$query = sprintf("SELECT * FROM `import` INNER JOIN `world` ON import.world_id = world.id JOIN `commodity` ON import.commodity = commodity.commodity;");

$result = $mysqli->query($query);

$data = array();
foreach ($result as $row){
    $data[]=$row;
}

print json_encode($data);

$result->close();

$mysqli->close(); 
?>
