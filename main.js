function guestBook(container, myOwnName){
	this.container = container;
	this.gbData = [];
	this.myOwnName = myOwnName;
	this.answerDIV = null;
	this.currentDate = null;
	this.newMess = null;
	this.timeout = true;

	this.currentUser = {"uid":"3", "uname":"Коля"};

	this.initGB = function(){
		GloAJAXquery(window.location.pathname+'guestBook.php', '', this.AJAXresult, this);
	}
	this.AJAXresult = function(str_json){
		this.gbData = eval(str_json);
		if(this.gbData.Error){alert(this.gbData.Error);}
		this.show();
	}
	this.show = function(){
		var s = '<button class="btn btn-success btn-xs" onClick="'+this.myOwnName+'.onClickAddNewMessage(\'newDIV\')">Создать новую запись</button><div id="newDIV" style="display: none;"></div>';;
		s+=this.tree("0");
		s+='<div id="newDIV2" style="display: none;"></div><button class="btn btn-success btn-xs" onClick="'+this.myOwnName+'.onClickAddNewMessage(\'newDIV2\')">Создать новую запись</button>';

		this.container.innerHTML = s;
	}

	this.tree = function(parent){
		var s='';
		for(var i in this.gbData){
			if(this.gbData[i].parent == parent){
				s+='<div class="panel panel-warning"><p>'+this.gbData[i].date+'</p>';
				s+='<p>'+this.gbData[i].uname+(this.gbData[i].uid==0 ? ' (anonymus)':'')+'</p>';
				if(this.gbData[i].uid == this.currentUser.uid){
					s+='<textarea class="form-control" rows="5" cols="50" id="messTEXT'+this.gbData[i].id+'">'+this.gbData[i].mess+'</textarea>';
					s+='<button class="btn btn-success btn-xs" onClick="'+this.myOwnName+'.onClickSaveAnswer('+this.gbData[i].id+')">Сохранить</button>';
				}else{
					s+='<div>'+this.gbData[i].mess+'</div>';
				}
				s+='<button class="btn btn-success btn-xs" onClick="'+this.myOwnName+'.onClickAnswer('+this.gbData[i].id+')">Ответить</button>'+
				'<div id="answerDIV'+this.gbData[i].id+'" style="margin-left:40px; display: none;"></div>';

				ts=this.tree(this.gbData[i].id);
				if(ts!=''){
					s+='<div style="margin-left:40px;">'+ts+'</div>';
				}
				s+='</div>';
			}
		}
		return s;
	}

	this.onClickAddNewMessage = function(id){
		if(!this.timeout){
			alert('Подождите 10 секунд, прежде, чем добавить следующее сообщение');
			return false;
		}
		this.onClickCancelAnswer();
		this.answerDIV=document.getElementById(id);
		this.answerDIV.style.display = 'block';
		this.currentDate = new Date;
		this.answerDIV.innerHTML = '<p>'+this.currentDate+'</p><p>'+this.currentUser.uname+'</p><textarea class="form-control" rows="5" cols="50" id="addAnswer"></textarea>'+
		'<button class="btn btn-success btn-xs" onClick="'+this.myOwnName+'.onClickAddAnswer(\'0\')">Сохранить</button>'+
		'<button class="btn btn-success btn-xs" onClick="'+this.myOwnName+'.onClickCancelAnswer()">Отменить</button>';
		this.timeout=false; setTimeout(10000, this.myOwnName+'.timeout=true');
	}
	this.onClickAnswer = function(id){
		if(!this.timeout){
			alert('Подождите 10 секунд, прежде, чем добавить следующее сообщение');
			return false;
		}
		this.onClickCancelAnswer();
		this.answerDIV=document.getElementById('answerDIV'+id);
		this.answerDIV.style.display = 'block';
		this.currentDate = new Date;
		this.answerDIV.innerHTML = '<p>'+this.currentDate+'</p><p>'+this.currentUser.uname+'</p><textarea class="form-control" rows="5" cols="50" id="addAnswer"></textarea>'+
		'<button class="btn btn-success btn-xs" onClick="'+this.myOwnName+'.onClickAddAnswer('+id+')">Сохранить</button>'+
		'<button class="btn btn-success btn-xs" onClick="'+this.myOwnName+'.onClickCancelAnswer()">Отменить</button>';
		this.timeout=false; setTimeout(10000, this.myOwnName+'.timeout=true');
	}
	this.onClickSaveAnswer = function(id){
		GloAJAXquery(window.location.pathname+'guestBook.php', JSON.stringify({"id":id,"mess":document.getElementById('messTEXT'+id).value}), this.AJAXAfterSave, this);
	}
	this.AJAXAfterSave = function(text) {
		console.log(text);
	}
	this.onClickAddAnswer = function(parent){
		//надо запрашивать сервер на добавление и только тогда сохранять в локале
		this.newMess = {"id":"new","uid":this.currentUser.uid,"uname":this.currentUser.uname,"date":this.currentDate,"mess":document.getElementById('addAnswer').value,"parent":parent};
		GloAJAXquery(window.location.pathname+'guestBook.php', JSON.stringify(this.newMess), this.AJAXAfterAdd, this);
	}
	this.AJAXAfterAdd = function(text){
console.log(text);
		var json = eval(text);
		guestBook.newMess.id=json[0].newId.toString();
		guestBook.gbData.push(guestBook.newMess);
		guestBook.answerDIV.style.display = 'none';
		guestBook.show();
	}
	this.onClickCancelAnswer = function(id){
		if(this.answerDIV){
			this.answerDIV.style.display = 'none';
		}
	}
}

var guestBook;
function startGB(containerName){
	guestBook = new guestBook(document.getElementById(containerName), 'guestBook');
	guestBook.initGB();
}