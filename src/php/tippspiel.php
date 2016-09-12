<?php
// require_once 'db-config.php';
require_once 'tools.php';
require_once 'team.php';
require_once 'match.php';
require_once 'quotes.php';

// get arguments
$postdata = file_get_contents ( "php://input" );
$json = json_decode ( $postdata );
$action = $json->action;
$args = $json->args;

if ($action == "loadAll") {
  getAllMatchData ();
} else if ($action == "upadteQuotes") {
  upadteUserQuotes ( $args->match );
}
error_log ( "action = " . $action );
?>
				