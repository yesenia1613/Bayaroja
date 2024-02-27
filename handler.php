<?php

// Verifica si se recibió una solicitud POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  
  // Captura los datos del formulario
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  $recaptchaResponse = $_POST["g-recaptcha-response"];
  
  // Verifica si la respuesta de reCAPTCHA no está vacía
  if (!$recaptchaResponse) {
    echo json_encode(array("success" => false, "message" => "Por favor, verifica que no eres un robot."));
    exit;
  }
  
  // Verifica el reCAPTCHA con el servidor de Google
  $recaptchaSecretKey = "6LfVKoIpAAAAALgBlth8AG4-9QQdKmEMw2W7VaoH"; // Reemplaza con tu clave secreta de reCAPTCHA
  $recaptchaVerifyUrl = "https://www.google.com/recaptcha/api/siteverify";
  $recaptchaData = array(
    "secret" => $recaptchaSecretKey,
    "response" => $recaptchaResponse
  );
  
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => $recaptchaVerifyUrl,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($recaptchaData),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true // Deshabilita la verificación SSL temporalmente (deberías configurar SSL en tu servidor para producción)
  ));
  $response = curl_exec($curl);
  curl_close($curl);
  
  // Analiza la respuesta del servidor de Google
  $recaptchaResult = json_decode($response, true);
  
  // Verifica si la verificación del reCAPTCHA fue exitosa
  if ($recaptchaResult["success"]) {
  
    // Si la verificación del reCAPTCHA fue exitosa, procede a enviar el correo electrónico
  
    $to = "yesi.t.rdz@gmail.com";
    $subject = "Mensaje de formulario TR Sports";
    $body = "Nombre: $name\nCorreo electrónico: $email\nMensaje:\n$message";
  
    // Envía el correo electrónico
    if (mail($to, $subject, $body)) {
      echo json_encode(array("success" => true, "message" => "El correo se envió correctamente."));
    } else {
      echo json_encode(array("success" => false, "message" => "Hubo un error al enviar el correo."));
    }
    
  } else {
    // Si la verificación del reCAPTCHA falló, muestra un mensaje de error
    echo json_encode(array("success" => false, "message" => "La verificación reCAPTCHA falló. Por favor, inténtalo de nuevo."));
  }
  
} else {
  // Si no se recibió una solicitud POST, muestra un mensaje de error
  echo json_encode(array("success" => false, "message" => "Acceso no autorizado."));
}
?>