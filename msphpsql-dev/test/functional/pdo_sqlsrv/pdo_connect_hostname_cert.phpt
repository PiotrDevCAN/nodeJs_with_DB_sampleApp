--TEST--
Test HostNameInCertificate keyword
--DESCRIPTION--
This test does not test if any connection is successful but mainly test if the HostNameInCertificate keyword is recognized.
--SKIPIF--
<?php require('skipif.inc');?>
--FILE--
<?php
require_once 'MsSetup.inc';

try {
    $connectionInfo = "HostNameInCertificate = dummy;";
    $conn1 = new PDO("sqlsrv:server = $server; $connectionInfo", $uid, $pwd);
} catch (PDOException $e) {
    // do nothing
}

unset($conn1);
echo 'Done' . PHP_EOL;

?>
--EXPECT--
Done
