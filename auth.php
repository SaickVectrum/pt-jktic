<?php
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"];
$password = $data["password"];

if ($email === "victor@email.com" && $password === "123456") {
	echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso"]);
} else {
	echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
}