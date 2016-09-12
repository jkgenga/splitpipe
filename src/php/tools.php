<?php

$proxy_port = 8080;
$proxy = '57.20.4.112';
$proxy_userid = 'U407129';
$proxy_password = 'airline';

function debug_to_console($data) {
 if (is_array ( $data ) || is_object ( $data )) {
  echo ("<script>console.log('PHP: " . json_encode ( $data ) . "');</script>");
 } else {
  echo ("<script>console.log('PHP: " . $data . "');</script>");
 }
}
function curl_get_file_contents($URL) {
  global $proxy_port;
  global $proxy;
  global $proxy_userid;
  global $proxy_password;

 $c = curl_init ();
 curl_setopt ( $c, CURLOPT_RETURNTRANSFER, 1 );
 curl_setopt ( $c, CURLOPT_URL, $URL );
 curl_setopt ( $c, CURLOPT_PROXYPORT, $proxy_port);
 curl_setopt ( $c, CURLOPT_PROXY, $proxy);
 curl_setopt ( $c, CURLOPT_PROXYTYPE, 'HTTP');
 curl_setopt ( $c, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
 curl_setopt ( $c, CURLOPT_PROXYUSERPWD, $proxy_userid.':'.$proxy_password);

 $contents = curl_exec ( $c );
 curl_close ( $c );
 
 if ($contents)
  return $contents;
 else
  return FALSE;
}
?>
