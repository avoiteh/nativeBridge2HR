<?php
// $data = unserialize(file_get_contents('data.xml'));
// echo json_encode($data);

// echo("<br><hr><br>");

$xml = simplexml_load_string(file_get_contents('xmlData.xml'));
$json = json_decode(json_encode($xml));
echo json_encode($json->message);

die();

$string = "<?xml version='1.0'?> 
<messages>";
foreach ($data as $key => $value) {
	$string .= "<message>
	<id>$value->id</id>
	<uid>$value->uid</uid>
	<uname>$value->uname</uname>
	<date>$value->date</date>
	<mess>$value->mess</mess>
	<parent>$value->parent</parent>
</message>
";
}
$string .= "</messages>";
file_put_contents('xmlData.xml', $string);
?>