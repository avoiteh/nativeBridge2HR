<?php
$data = unserialize(file_get_contents('data.xml'));

$saveMess = json_decode($_POST['query']);

foreach ($data as $key => $value) {
	if($value->id == $saveMess->id){
		$data[$key]->mess = $saveMess->mess;
		break;
	}
}

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
//file_put_contents('data.xml', serialize($data));

echo '[{"id":"'.$value->id.'"}]';
?>