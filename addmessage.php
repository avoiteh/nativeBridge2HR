<?php
$data = unserialize(file_get_contents('data.xml'));

$max_id=-1;
foreach ($data as $key => $value) {
	if($value->id > $max_id){$max_id = $value->id;}
}
$max_id++;

//var_dump($_POST);
$newMess = json_decode($_POST['query']);
$newMess->id = $max_id;
array_push($data, $newMess);

file_put_contents('data.xml', serialize($data));

echo '[{"newId":"'.$max_id.'"}]';
?>