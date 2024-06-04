--TEST--
Test Table-valued parameter using direct queries and no null values
--DESCRIPTION--
Test Table-valued parameter using direct queries and no null values. This test verifies the fetched results of all types.
--ENV--
PHPT_EXEC=true
--SKIPIF--
<?php require('skipif.inc'); ?>
--FILE--
<?php
require_once('MsCommon.inc');

date_default_timezone_set('America/Los_Angeles');

sqlsrv_configure('LogSeverity', SQLSRV_LOG_SEVERITY_ALL);

$conn = connect(array('ReturnDatesAsStrings' => true));

$tvpType = 'TVPParam';

dropProc($conn, 'TVPOrderEntry');
dropTable($conn, 'TVPOrd');
dropTable($conn, 'TVPItem');

$dropTableType = dropTableTypeSQL($conn, $tvpType);
sqlsrv_query($conn, $dropTableType);

// Create tables
sqlsrv_query($conn, $createTVPOrd);
sqlsrv_query($conn, $createTVPItem);

// Create TABLE type for use as a TVP
sqlsrv_query($conn, $createTVPParam);

// Create procedure with TVP parameters
sqlsrv_query($conn, $createTVPOrderEntry);

// Bind parameters for call to TVPOrderEntry
$custCode = 'SRV_123';

// 2 - Items TVP
$image1 = fopen($tvpIncPath. $gif1, 'rb');
$image2 = fopen($tvpIncPath. $gif2, 'rb');
$image3 = fopen($tvpIncPath. $gif3, 'rb');
$images = [$image1, $image2, $image3];

for ($i = 0; $i < count($items); $i++) {
    array_push($items[$i], $images[$i]);
}

// Create a TVP input array
$tvpInput = array($tvpType => $items);

$ordNo = 0;
$ordDate = null;

$params = array($custCode,
                array($tvpInput, null, null, SQLSRV_SQLTYPE_TABLE),
                array(&$ordNo, SQLSRV_PARAM_OUT),
                array(&$ordDate, SQLSRV_PARAM_OUT, SQLSRV_PHPTYPE_STRING(SQLSRV_ENC_CHAR)));

$stmt = sqlsrv_query($conn, $callTVPOrderEntry, $params);
if (!$stmt) {
    print_r(sqlsrv_errors());
}

sqlsrv_next_result($stmt);

// Verify the results
echo "Order Number: $ordNo" . PHP_EOL;

$today = getTodayDateAsString($conn);
if ($ordDate != $today) {
    echo "Order Date unexpected: ";
    var_dump($ordDate);
}

// Fetch CustID
$tsql = 'SELECT CustID FROM TVPOrd';
$stmt = sqlsrv_query($conn, $tsql);

if ($result = sqlsrv_fetch($stmt, SQLSRV_FETCH_NUMERIC)) {
    $id = sqlsrv_get_field($stmt, 0);
    if ($id != $custCode) {
        echo "Customer ID unexpected: " . PHP_EOL;
        var_dump($id);
    }
} else {
    echo "Failed in fetching from TVPOrd: " . PHP_EOL;
    print_r(sqlsrv_errors());
}

// Fetch other basic types
$stmt = sqlsrv_query($conn, $selectTVPItemQuery);
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_NUMERIC)) {
    print_r($row);
}
sqlsrv_free_stmt($stmt);

// Fetch the inserted images from the table and verify them
$tsql = 'SELECT Photo FROM TVPItem ORDER BY ItemNo';
$stmt = sqlsrv_query($conn, $tsql);
if (!$stmt) {
    print_r(sqlsrv_errors());
}

$index = 0;
while (sqlsrv_fetch($stmt)) {
    $photo = sqlsrv_get_field($stmt, 0, SQLSRV_PHPTYPE_STREAM(SQLSRV_ENC_BINARY));
    if (!verifyBinaryStream($images[$index], $photo)) {
            echo "Image data corrupted for row ". ($index + 1) . PHP_EOL;
    }
    $index++;
}
if ($index == 0) {
    echo 'Failed in fetching binary data' . PHP_EOL;
}
    
sqlsrv_free_stmt($stmt);

fclose($image1);
fclose($image2);
fclose($image3);

dropProc($conn, 'TVPOrderEntry');
dropTable($conn, 'TVPOrd');
dropTable($conn, 'TVPItem');
sqlsrv_query($conn, $dropTableType);

sqlsrv_close($conn);

echo "Done" . PHP_EOL;
?>
--EXPECT--
Order Number: 1
Array
(
    [0] => 1
    [1] => 1
    [2] => 0062836700
    [3] => 367
    [4] => 2009-03-12
    [5] => AWC Tee Male Shirt
    [6] => 20.75
)
Array
(
    [0] => 1
    [1] => 2
    [2] => 1250153272
    [3] => 256
    [4] => 2017-11-07
    [5] => Superlight Black Bicycle
    [6] => 998.45
)
Array
(
    [0] => 1
    [1] => 3
    [2] => 1328781505
    [3] => 260
    [4] => 2010-03-03
    [5] => Silver Chain for Bikes
    [6] => 88.98
)
Done
