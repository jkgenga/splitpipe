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
} else if ($action == "importAll") {
  importAll ();
} else if ($action == "deleteAll") {
  deleteAll ();
} else if ($action == "upadteMatch") {
  upadteMatch ( $args->match );
} else if ($action == "upadteQuotes") {
  upadteQuotes ( $args->match );
} else if ($action == "add") {
  add ( $args->match );
} else if ($action == "remove") {
  remove ( $args->match );
}
error_log ( "action = " . $action );
function importAll() {
  global $mysqli;
  $league_shortcut = "bl1";
  $league_season = "2016";
  
  $url = "http://www.openligadb.de/api/getmatchdata/" . $league_shortcut . "/" . $league_season;
  
  $table = "MATCHES";
  $columnsPlayed = "(MATCH_ID, MATCH_DATE, GOALS_GUEST, GOALS_HOME, RESULT, MATCH_DAY, TEAM_GUEST_ID, TEAM_HOME_ID)";
  $columnsPending = "(MATCH_ID, MATCH_DATE, MATCH_DAY, TEAM_GUEST_ID, TEAM_HOME_ID)";
  
  // get remote data
  // $response = file_get_contents( $url );
  $response = curl_get_file_contents ( $url );
  if ($response == FALSE) {
    error_log("unuable to fetch " . $url);
  }
  // $response = file_get_contents ( $url );
  $json = json_decode ( $response );
  
  if (sizeof ( $json ) > 0) {
    // delete all values from table MATCHE
    deleteAllMatches ();
  }
  $count = 0;
  foreach ( $json as &$match ) {
    $count += 1;
    $match->MatchDay = ceil ( $count / 9 );
    
    if (findTeamById ( $match->Team1->TeamId ) == 0) {
      addTeam ( $match->Team1->TeamId, $match->Team1->TeamIconUrl, $match->Team1->TeamName );
    }
    if (findTeamById ( $match->Team2->TeamId ) == 0) {
      addTeam ( $match->Team2->TeamId, $match->Team2->TeamIconUrl, $match->Team2->TeamName );
    }

    insertMatch ( $match );
      
    if (findQuoteByMatchId ( $match->MatchID ) == 0) {
      addQuote($match->MatchID, 0, 0, 0);
    }
  }
}

?>
