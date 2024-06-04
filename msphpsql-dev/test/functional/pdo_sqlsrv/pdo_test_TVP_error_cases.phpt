--TEST--
Test various error cases with invalid Table-valued parameter inputs
--ENV--
PHPT_EXEC=true
--SKIPIF--
<?php require('skipif.inc'); ?>
--FILE--
<?php
require_once('MsSetup.inc');
require_once('MsCommon_mid-refactor.inc');

function invokeProc($conn, $proc, $tvpInput, $caseNo, $inputParam = true)
{
    try {
        $stmt = $conn->prepare($proc);

        // Bind TVP for the stored procedure
        if ($inputParam) {
            $stmt->bindValue(1, $tvpInput, PDO::PARAM_LOB);
        } else {
            $stmt->bindParam(1, $tvpInput, PDO::PARAM_LOB, 100);
        }
        $stmt->execute();
    } catch (PDOException $e) {
        echo "Error $caseNo: ";
        echo $e->getMessage();
        echo PHP_EOL;
    }
}

function cleanup($conn, $schema, $tvpType, $procName, $pre2016)
{
    if ($pre2016) {
        // ignore the errors dropping all these
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
        
        $conn->exec("DROP PROCEDURE [$schema].[$procName]");
        $conn->exec("DROP TYPE [$schema].[$tvpType]");
        $conn->exec("DROP SCHEMA [$schema]");
        
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } else {
        global $dropSchema;
            
        $dropProcedure = dropProcSQL($conn, "[$schema].[$procName]");
        $conn->exec($dropProcedure);

        $dropTableType = dropTableTypeSQL($conn, $tvpType, $schema);
        $conn->exec($dropTableType);
        
        $conn->exec($dropSchema);
    }
}

try {
    $conn = new PDO("sqlsrv:server = $server; database=$databaseName;", $uid, $pwd);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->query("SELECT @@VERSION");
    $result = $stmt->fetch(PDO::FETCH_NUM)[0];
    $version = explode(' ', $result);
    $pre2016 = ($version[3] < '2016');

    // Use a different schema instead of dbo
    $schema = 'Sales DB';
    $tvpTypeName = 'TestTVP3';
    $procName = 'SelectTVP3';
    
    cleanup($conn, $schema, $tvpTypeName, $procName, $pre2016);
    
    // Create the table type and stored procedure
    $conn->exec($createSchema);
    $conn->exec($createTestTVP3);
    $conn->exec($createSelectTVP3);
    
    // Create a TVP input array
    $inputs = [
        ['ABC', 12345, null],
        ['DEF', 6789, null],
        ['GHI', null],
    ];
    $str = 'dummy';

    // Case (1) - do not provide TVP type name 
    $tvpInput = array($inputs);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 1);

    // Case (2) - use an empty string as TVP type name 
    $tvpInput = array("" => array());
    invokeProc($conn, $callSelectTVP3, $tvpInput, 2);
    
    // Case (3) - null inputs
    $tvpInput = array($tvpTypeName => null);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 3);

    // Case (4) - not using array as inputs
    $tvpInput = array($tvpTypeName => 1);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 4);

    // Case (5) - invalid TVP type name
    $tvpInput = array($str => $inputs);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 5);

    // Case (6) - input rows are not the same size
    $tvpInput = array($tvpTypeName => $inputs, $schema);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 6);

    // Case (7) - input row wrong size
    unset($inputs);
    $inputs = [
        ['ABC', 12345, null, null]
    ];
    $tvpInput = array($tvpTypeName => $inputs, $schema);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 7);

    // Case (8) - use string keys
    unset($inputs);
    $inputs = [
        ['A' => null, null, null]
    ];
    $tvpInput = array($tvpTypeName => $inputs, $schema);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 8);

    // Case (9) - a row is not an array
    unset($inputs);
    $inputs = [null];
    $tvpInput = array($tvpTypeName => $inputs, $schema);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 9);

    // Case (10) - a column value used a string key
    unset($inputs);
    $inputs = [
        ['ABC', 12345, "key"=>null]
    ];
    $tvpInput = array($tvpTypeName => $inputs, $schema);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 10);

    // Case (11) - invalid input object for a TVP column
    class foo
    {
        function do_foo(){}
    }
    $bar = new foo;
    unset($inputs);
    $inputs = [
        ['ABC', 1234, $bar],
        ['DEF', 6789, null],
    ];
    $tvpInput = array($tvpTypeName => $inputs, $schema);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 11);

    // Case (12) - invalid input type for a TVP column
    unset($inputs);
    $inputs = [
        ['ABC', &$str, null],
        ['DEF', 6789, null],
    ];
    $tvpInput = array($tvpTypeName => $inputs, $schema);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 12);

    // Case (13) - bind a TVP as an OUTPUT param
    invokeProc($conn, $callSelectTVP3, $tvpInput, 13, false);
    
    // Case (14) - test UTF-8 invalid/corrupt string for a TVP column
    unset($inputs);
    $utf8 = str_repeat("41", 8188);
    $utf8 = $utf8 . "e38395e38395";
    $utf8 = substr_replace($utf8, "fe", 1000, 2);
    $utf8 = pack("H*", $utf8);
    
    $inputs = [
        [$utf8, 1234, null],
        ['DEF', 6789, null],
    ];
    $tvpInput = array($tvpTypeName => $inputs, $schema);
    invokeProc($conn, $callSelectTVP3, $tvpInput, 14);

    cleanup($conn, $schema, $tvpTypeName, $procName, $pre2016);

    unset($conn);
    echo "Done" . PHP_EOL;
    
} catch (PDOException $e) {
    var_dump($e->getMessage());
}
?>
--EXPECTF--
Error 1: SQLSTATE[IMSSP]: Expect a non-empty string for a Type Name for Table-Valued Param 1
Error 2: SQLSTATE[IMSSP]: Expect a non-empty string for a Type Name for Table-Valued Param 1
Error 3: SQLSTATE[IMSSP]: Invalid inputs for Table-Valued Param 1
Error 4: SQLSTATE[IMSSP]: Invalid inputs for Table-Valued Param 1
Error 5: SQLSTATE[IMSSP]: Failed to get metadata for Table-Valued Param 1
Error 6: SQLSTATE[IMSSP]: For Table-Valued Param 1 the number of values in a row is expected to be 3
Error 7: SQLSTATE[IMSSP]: For Table-Valued Param 1 the number of values in a row is expected to be 3
Error 8: SQLSTATE[IMSSP]: Associative arrays not allowed for Table-Valued Param 1
Error 9: SQLSTATE[IMSSP]: Expect an array for each row for Table-Valued Param 1
Error 10: SQLSTATE[IMSSP]: Associative arrays not allowed for Table-Valued Param 1
Error 11: SQLSTATE[IMSSP]: An invalid type for Table-Valued Param 1 Column 3 was specified
Error 12: SQLSTATE[IMSSP]: An invalid type for Table-Valued Param 1 Column 2 was specified
Error 13: SQLSTATE[IMSSP]: You cannot return data in a table-valued parameter. Table-valued parameters are input-only.
Error 14: SQLSTATE[IMSSP]: An error occurred translating a string for Table-Valued Param 1 Column 1 to UTF-16: %a
Done
