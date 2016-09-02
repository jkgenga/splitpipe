<?php
// require_once 'db-config.php';
require_once 'tools.php';
require_once 'teamDao.php';

// get arguments
$postdata = file_get_contents ( "php://input" );
$json = json_decode ( $postdata );
$action = $json->action;
// $args = $json->args;

if ($action == "importAll") {
  importAll ();
} else if ($action == "loadAll") {
  loadAll ();
} else if ($action == "deleteAll") {
  deleteAll ();
}

error_log ( "action = " . $action );
// loadAll();
function importAll() {
  global $mysqli;
  $league_shortcut = "bl1";
  $league_season = "2016";
  
  $url = "http://www.openligadb.de/api/getmatchdata/" . $league_shortcut . "/" . $league_season;
  
  $table = "MATCHES";
  $columnsPlayed = "(MATCH_ID, MATCH_DATE, GOALS_GUEST, GOALS_HOME, RESULT, MATCH_DAY, TEAM_GUEST_ID, TEAM_HOME_ID)";
  $columnsPending = "(MATCH_ID, MATCH_DATE, MATCH_DAY, TEAM_GUEST_ID, TEAM_HOME_ID)";
  
  // get remote data
  $response = curl_get_file_contents ( $url );
  // $response = file_get_contents ( $url );
  $json = json_decode ( $response );
  
  if (sizeof ( $json ) > 0) {
    // delete all values from table MATCHE
    $statement = "delete from " . $table;
    $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
    $result = $mysqli->affected_rows;
  }
  
  $count = 0;
  foreach ( $json as &$match ) {
    $count += 1;
    
    $matchDay = intval ( $count / 9 ) + 1;
    
    $matchId = $match->MatchID;
    $matchDate = $match->MatchDateTime;
    $homeTeamId = $match->Team1->TeamId;
    $homeTeamName = $match->Team1->TeamName;
    $homeTeamUrlLogo = $match->Team1->TeamIconUrl;
    $guestTeamId = $match->Team2->TeamId;
    $guestTeamName = $match->Team2->TeamName;
    $guestTeamUrlLogo = $match->Team2->TeamIconUrl;
    
    $matchDateTime = strtotime ( $matchDate );
    
    if (sizeof ( $match->MatchResults ) > 0) {
      $matchReslut = $match->MatchResults [0];
      $goalsHome = $matchReslut->PointsTeam1;
      $goalsGuest = $matchReslut->PointsTeam2;
      
      if ($goalsHome == $goalsGuest) {
        $result = 0;
      } else if ($goalsHome > $goalsGuest) {
        $result = 1;
      } else {
        $result = 2;
      }
      $values = "values (" . $matchId . ", '" . date ( "Y-m-d H:i:s", $matchDateTime ) . "', " . $goalsGuest . ", " . $goalsHome . ", " . $result . ", " . $matchDay . ", " . $guestTeamId . ", " . $homeTeamId . ")";
      $columns = $columnsPlayed;
    } else {
      $values = "values (" . $matchId . ", '" . date ( "Y-m-d H:i:s", $matchDateTime ) . "', " . $matchDay . ", " . $guestTeamId . ", " . $homeTeamId . ")";
      $columns = $columnsPending;
    }
    
    if (findTeamById ( $homeTeamId ) == 0) {
      addTeam ( $homeTeamId, $homeTeamUrlLogo, $homeTeamName );
    }
    if (findTeamById ( $guestTeamId ) == 0) {
      addTeam ( $guestTeamId, $guestTeamUrlLogo, $guestTeamName );
    }
    
    $statement = "insert into " . $table . " " . $columns . " " . $values . ";";
    $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
    $result = $mysqli->affected_rows;
  }
}
function loadAll() {
  global $mysqli;
  $statement = "SELECT m.MATCH_ID as matchId, m.MATCH_DAY as matchDay, m.MATCH_DATE as matchDate, m.TEAM_HOME_ID as teamHomeId, m.TEAM_GUEST_ID as teamGuestId,
  m.GOALS_HOME as goalsHome, m.GOALS_GUEST as goalsGuest, m.RESULT as result,
  t1.TEAM_NAME as teamNameHome, t1.LOGO_URL as homeLogoUrl, t2.TEAM_NAME as teamNameGuest, t2.LOGO_URL as guestLogoUrl FROM MATCHES m, TEAMS t1, TEAMS t2 WHERE m.TEAM_HOME_ID = t1.TEAM_ID and m.TEAM_GUEST_ID = t2.TEAM_ID order by m.MATCH_DAY, m.MATCH_ID;";
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $rows = $mysqli->affected_rows;
  
  // $matches = array();
  if ($result) {
    
    while ( $row = $result->fetch_array ( MYSQL_ASSOC ) ) {
      $matches [] = $row;
    }
  }
  error_log ( "size of result: " . sizeof ( $matches ) );
  $result->close ();
  $jsonResult = json_encode ( $matches );
  if ($rows > 0) {
    echo $jsonResult;
  }
}
function deleteAll() {
  global $mysqli;
  $statement = "DELETE FROM MATCHES;";
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $rows = $mysqli->affected_rows;
}

?>
				