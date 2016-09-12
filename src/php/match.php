<?php
// require_once 'db-config.php';
require_once 'tools.php';
require_once 'team.php';
require_once 'quotes.php';
function getAllMatchData() {
  global $mysqli;
  
  $statement = "SELECT m.MATCH_ID as matchId, m.MATCH_DAY as matchDay, m.MATCH_DATE as matchDate, m.TEAM_HOME_ID as teamHomeId, m.TEAM_GUEST_ID as teamGuestId," 
      . " m.GOALS_HOME as goalsHome, m.GOALS_GUEST as goalsGuest, m.RESULT as result," 
      . " t1.TEAM_NAME as teamNameHome, t1.LOGO_URL as homeLogoUrl, t2.TEAM_NAME as teamNameGuest, t2.LOGO_URL as guestLogoUrl,"
      . " q.QUOTE_GUEST_WIN as quoteHomeWin, q.QUOTE_DRAW as quoteDraw, q.QUOTE_GUEST_WIN as quoteGuestWin"
      . " FROM MATCHES m, TEAMS t1, TEAMS t2, QUOTES q" 
      . " WHERE m.TEAM_HOME_ID = t1.TEAM_ID and m.TEAM_GUEST_ID = t2.TEAM_ID and m.MATCH_ID = q.MATCH_ID" 
      . " order by m.MATCH_DAY, m.MATCH_ID;";
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $rows = $mysqli->affected_rows;
  $matches = array ();
  if ($result) {
    
    while ( $row = $result->fetch_array ( MYSQL_ASSOC ) ) {
      $matches [] = $row;
    }
  }
  $result->close ();
  $jsonResult = json_encode ( $matches );
  echo $jsonResult;
}
function getAllMatches() {
  global $mysqli;
  $statement = "DELETE FROM MATCHES;";
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $rows = $mysqli->affected_rows;
}
function deleteAllMatches() {
  global $mysqli;
  $statement = "DELETE FROM MATCHES;";
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $rows = $mysqli->affected_rows;
}
function insertMatch($match) {
  global $mysqli;
  $league_shortcut = "bl1";
  $league_season = "2016";
  
  $table = "MATCHES";
  $columnsPlayed = "(MATCH_ID, MATCH_DATE, GOALS_GUEST, GOALS_HOME, RESULT, MATCH_DAY, TEAM_GUEST_ID, TEAM_HOME_ID)";
  $columnsPending = "(MATCH_ID, MATCH_DATE, MATCH_DAY, TEAM_GUEST_ID, TEAM_HOME_ID)";
  
  $matchId = $match->MatchID;
  $matchDay = $match->MatchDay;
  $matchDate = $match->MatchDateTime;
  $homeTeamId = $match->Team1->TeamId;
  $homeTeamName = $match->Team1->TeamName;
  $homeTeamUrlLogo = $match->Team1->TeamIconUrl;
  $guestTeamId = $match->Team2->TeamId;
  $guestTeamName = $match->Team2->TeamName;
  $guestTeamUrlLogo = $match->Team2->TeamIconUrl;
  
  $matchDateTime = strtotime ( $matchDate );
  
  if (sizeof ( $match->MatchResults ) > 0) {
    $matchResult = $match->MatchResults [0];
    $goalsHome = $matchResult->PointsTeam1;
    $goalsGuest = $matchResult->PointsTeam2;
    
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
  
  $statement = "insert into " . $table . " " . $columns . " " . $values . ";";
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $result = $mysqli->affected_rows;
}
function deleteMatch($match) {
  global $mysqli;
  $statement = "DELETE FROM MATCHES where MATCH_ID = '$match->matchId';";
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  $rows = $mysqli->affected_rows;
  echo $statement;
}
function updateMatch($match) {
  global $mysqli;
  if ($match->goalsHome == $match->goalsGuest) {
    $result = 0;
  } else if ($match->goalsHome > $match->goalsGuest) {
    $result = 1;
  } else {
    $result = 2;
  }
  $statement = "UPDATE MATCHES set MATCH_DAY = $match->matchDay, MATCH_DATE = '$match->matchDate', TEAM_HOME_ID = $match->teamHomeId, TEAM_GUEST_ID = $match->teamGuestId, " . "GOALS_HOME = $match->goalsHome, GOALS_GUEST = $match->goalsGuest, RESULT = $result where MATCH_ID = $match->matchId;";
  
  error_log ( $statement );
  $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
  error_log ( $result );
  $rows = $mysqli->affected_rows;
}
?>
				