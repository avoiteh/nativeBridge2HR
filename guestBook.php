<?php
class guestBook{
	private $data;

	function __construct (){
		$query = $_POST['query'];
		$this->loadFtomXML();
		if($query){
			//заткнём дыру ут некорректных данных
			try {
			    $json = json_decode($query);
			} catch (Exception $e) {
			    die('{"Error":"uncorrect JSON"}');
			}
			
			// var_dump($json);
			$max_id=-1;
			foreach ($this->data as $key => $value) {
				if($value->id > $max_id){$max_id = $value->id;}
				if($value->id == $json->id){
					//если такой id нашёлся, значит надо сохранить
					$this->data[$key]->mess = $json->mess;
					$this->saveToXML();
					die('[{"id":"'.$value->id.'"}]');
				}
			}
			$max_id++;
			//id не нашёлся, значит надо добавить!
			$json->id = $max_id;
			array_push($this->data, $json);
			$this->saveToXML();
			die('[{"newId":"'.$max_id.'"}]');
		}else{
			echo json_encode($this->data);
		}
	}

	function loadFtomXML(){
		$xml = simplexml_load_string(file_get_contents('xmlData.xml'));
		$json = json_decode(json_encode($xml));
		$this->data = $json->message;
	}
	function saveToXML(){
		$string = "<?xml version='1.0'?> 
<messages>";
foreach ($this->data as $key => $value) {
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
	}
}

new guestBook();
?>