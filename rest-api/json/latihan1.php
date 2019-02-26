<?php

// $mahasiswa = [
//     "nama" => "Rafel",
//     "nim"   => "145314010",
//     "email" => "rafelino@outlook.com"

// ];

//var_dump($mahasiswa);
$dbh = new PDO('mysql:host=localhost;dbname=ex_mahasiswa', 'root', '');

$db = $dbh->prepare('SELECT * FROM mahasiswa');
$db->execute();
$mahasiswa = $db->fetchAll(PDO::FETCH_ASSOC);

$data = json_encode($mahasiswa);
echo $data;

