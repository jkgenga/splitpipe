<?php
require_once 'db-config.php';
require_once 'tools.php';
function findTeamById($teamId) {
 global $mysqli;
 
 $table = "TEAMS";
 $columns = "TEAM_ID, LOGO_URL, TEAM_NAME)";
 $statement = "select * from " . $table . " where TEAM_ID = " . $teamId;
 $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
 $result = $mysqli->affected_rows;
 
 return $result;
}
function addTeam($teamId, $logoUrl, $teamName) {
 global $mysqli;
 $table = "TEAMS";
 $statement = "INSERT INTO " . $table . " " . $columes . "values (" . $teamId . ", '" . $logoUrl . "', '" . $teamName . "')";
 $result = $mysqli->query ( $statement ) or die ( $mysqli->error . __LINE__ );
 $result = $mysqli->affected_rows;
}
?>
				