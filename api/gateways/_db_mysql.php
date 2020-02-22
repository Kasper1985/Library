<?php
/*
$host = "fdb20.awardspace.net";
$port = 3306;
$username = "3056782_library";
$password = "0A9?THF95PJjS[S!";
$database = "3056782_library";
*/

$host = 'localhost';
$port = 3306;
$username = 'library';
$password = 'cnfhn0';
$database = 'library';

date_default_timezone_set("UTC");

$db = new PDO("mysql:host=$host;port=$port", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec("USE `$database`");
$db->exec('SET NAMES `utf8`');

function tableExists($dbh, $id) {
    $results = $dbh->query("SHOW TABLES LIKE '$id'");
    if ($results && $results->rowCount() > 0) {
        return true;
    }
    return false;
}

?>