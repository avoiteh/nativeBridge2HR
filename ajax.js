/*Post - version*/
function GloAJAXquery(url, query, AJAXresult, obj){// get - version
	var sendParam;
   	// для Mozilla, Safari, Opera:
   	if (window.XMLHttpRequest)
   	{
   	  gloAJAXreq = new XMLHttpRequest();
   	  sendParam = null;
   	}
   	// для IE:
   	else if (window.ActiveXObject)
   	{
   	  gloAJAXreq = new ActiveXObject("Microsoft.XMLHTTP");
   	}
   	else
   	{
   	  return false;
   	}
   	if (gloAJAXreq)
   	{
	   sendParam = 'query='+query;
   	  gloAJAXreq.onreadystatechange = function(){
         //получить объект
         if(gloAJAXreq!=null){
         if (gloAJAXreq.readyState == 4) {
               // для статуса "OK"
               if (gloAJAXreq.status == 200) {
                  // здесь идут всякие штуки с полученным ответом
                  var gettingText = gloAJAXreq.responseText;
                  //отдать данные
                  AJAXresult.call(obj, gettingText);
               }else{
                  alert('error: '+gloAJAXreq.status);//Text);
               }
            }
         }
        };
   	  gloAJAXreq.open("post", url, true);
   	  gloAJAXreq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   	  //alert(sendParam);
   	  //показать часики
   // 	  var x=Math.round(document.body.clientWidth/2-30);
	  // var y=Math.round(document.body.clientHeight/2-30);
	  // var img=document.getElementById('ajax_clock');
	  // img.style.left=x+'px';
	  // img.style.top=y+'px';
	  // img.style.display='block';
//alert(query);
   	  gloAJAXreq.send(sendParam);
   	}
}
