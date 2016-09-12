<?php
require_once 'db-config.php';
require_once 'tools.php';
function findQuoteByMatchId($matchId) {
  global $mysqli;
  error_log ( "findQuoteByMatchId" );
  // QUOTE_ID QUOTE_DRAW QUOTE_GUEST_WIN QUOTE_HOME_WIN MATCH_ID
  
  $table = "QUOTES";
  $columns = "QUOTE_ID as quoteId, QUOTE_DRAW as quoteDraw, QUOTE_GUEST_WIN as quoteGuestWin, QUOTE_HOME_WIN as quoteGuestWin, MATCH_ID as matchId";
  $statement = "select " . $columns . " from " . $table . " where MATCH_ID = " . $matchId;
  error_log ( $statement );
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $result = $mysqli->affected_rows;
  
  return $result;
}
function addQuote($matchId, $quoteGuestWin, $quoteDraw, $quoteGuestWin) {
  global $mysqli;
  $table = "QUOTES";
  $columns = "(QUOTE_HOME_WIN, QUOTE_DRAW, QUOTE_GUEST_WIN, MATCH_ID)";
  $statement = "INSERT INTO " . $table . " " . $columns . "values (" . $quoteGuestWin . ", '" . $quoteDraw . "', '" . $quoteGuestWin . "', '" . $matchId . "')";
  
  error_log ( $statement );
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $result = $mysqli->affected_rows;
}
function upadteQuotes($match) {
  global $mysqli;
  $table = "QUOTES";
  $statement = "UPDATE " . $table . " set QUOTE_HOME_WIN = $match->quoteHomeWin, QUOTE_DRAW = $match->quoteDraw, QUOTE_GUEST_WIN = $match->quoteGuestWin where MATCH_ID = $match->matchId;";
  
  error_log ( $statement );
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $result = $mysqli->affected_rows;
}
?>
	