<?php
function debug_to_console($data) {
 if (is_array ( $data ) || is_object ( $data )) {
  echo ("<script>console.log('PHP: " . json_encode ( $data ) . "');</script>");
 } else {
  echo ("<script>console.log('PHP: " . $data . "');</script>");
 }
}
function curl_get_file_contents($URL) {
 $c = curl_init ();
 curl_setopt ( $c, CURLOPT_RETURNTRANSFER, 1 );
 curl_setopt ( $c, CURLOPT_URL, $URL );
 $contents = curl_exec ( $c );
 curl_close ( $c );
 
 if ($contents)
  return $contents;
 else
  return FALSE;
}
?>