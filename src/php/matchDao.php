<?php
require_once 'db-config.php';
require_once 'tools.php';

loadAll();

function loadAll() {
  global $mysqli;
 $statement = "SELECT m.MATCH_ID as matchId, m.MATCH_DAY as matchDay, m.MATCH_DATE as matchDate, m.TEAM_HOME_ID as teamHomeId, m.TEAM_GUEST_ID as teamGuestId, 
  m.GOALS_HOME as goalsHome, m.GOALS_GUEST as goalsGuest, m.RESULT as result,
  t1.TEAM_NAME as teamNameHome, t1.LOGO_URL as homeLogoUrl, t2.TEAM_NAME as teamNameGuest, t2.LOGO_URL as guestLogoUrl FROM MATCHES m, TEAMS t1, TEAMS t2 WHERE m.TEAM_HOME_ID = t1.TEAM_ID and m.TEAM_GUEST_ID = t2.TEAM_ID order by m.MATCH_DAY, m.MATCH_ID;";
 $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
 $rows = $mysqli->affected_rows;
 
 if ($result) {
  
  while ( $row = $result->fetch_array ( MYSQL_ASSOC ) ) {
   $matches [] = $row;
  }
 }
 
 $result->close ();
 $jsonResult = json_encode ( $matches );
 echo $jsonResult;
 return $jsonResult;
}
?>
