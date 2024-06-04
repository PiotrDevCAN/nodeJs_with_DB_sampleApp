--TEST--
returns the number of rows added to a table; returns the number of rows in a result set when you specify a scrollable cursor
--SKIPIF--
<?php require('skipif.inc'); ?>
--FILE--
<?php
require('connect.inc');
$conn = new PDO("sqlsrv:Server=$server; Database = $databaseName", $uid, $pwd);

$tableName = "pdoRowCount";
dropTable($conn, $tableName);
$conn->exec("CREATE TABLE $tableName(col1 VARCHAR(15), col2 VARCHAR(15)) ");
   
$col1 = 'a';
$col2 = 'b';

$query = "INSERT INTO $tableName(col1, col2) values(?, ?)";
$stmt = $conn->prepare( $query );
$stmt->execute( array( $col1, $col2 ) );
print $stmt->rowCount();
print " rows affected.";

echo "\n\n";

//revert the insert
$conn->exec("DELETE FROM $tableName where col1 = 'a' AND col2 = 'b'");

dropTable($conn, $tableName, false);

$conn = null;

$conn = new PDO("sqlsrv:Server=$server; Database = $databaseName", $uid, $pwd);

$query = "SELECT * FROM Person.ContactType";
$stmt = $conn->prepare( $query, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
$stmt->execute();
print $stmt->rowCount();
print " rows in result set.";


//free the statement and connection
$stmt = null;
$conn = null;
?>
--EXPECT--
1 rows affected.

20 rows in result set.