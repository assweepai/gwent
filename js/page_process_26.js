function gup(name) {  
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href );  
	if( results == null ) {  
		return ""; 
	} else { 
		return results[1];
	}
}

function getElm(eID) {
	return document.getElementById(eID);
}

function getTag(eID) {
	return document.getElementsByTagName(eID);
}

function getClass(eID) {
	return document.getElementsByClassName(eID);
}				

function init_table(){
	
	plHand = getElm("pl_hand");
	cH = plHand.offsetHeight;
	cW = plHand.offsetWidth;	
	
	var ct = getElm("card_table");
	var ctTd = ct.getElementsByTagName("td");
	for(t=0; t<ctTd.length; t++){
		ctTd[t].setAttribute("valign", "middle");
		ctTd[t].setAttribute("align", "center"); 
		ctTd[t].setAttribute("width", "100%");	
	}
	
	var lt = getElm("left_table");
	var ltTd = lt.getElementsByTagName("td");
	for(t=0; t<ltTd.length; t++){
		ltTd[t].setAttribute("valign", "middle");
		ltTd[t].setAttribute("align", "center"); 
		ltTd[t].setAttribute("width", "100%");	
	}		
	
	getElm("kDeck").src = "img/empty.png";
	getElm("op_kDeck").src = "img/empty.png";	
	getElm("dDeck").src = "img/empty.png";
	getElm("rDeck").src = "img/nrback.png";	
	getElm("op_dDeck").src = "img/empty.png";
	getElm("op_rDeck").src = "img/nrback.png";		

	getElm("pl_sc").style.width = cH/1.5 + 'px';
	getElm("pl_sc").style.height = cH/1.5 + 'px';
	
	var pst = getElm("pl_sc").childNodes[1];
	var scH = getElm("pl_sc").offsetHeight;
	var fH = pst.offsetHeight;
	
	pst.style.position = "relative";
	pst.style.top = (scH/2 - fH/2) + 'px';
	
	getElm("op_sc").style.width = cH/1.5 + 'px';
	getElm("op_sc").style.height = cH/1.5 + 'px';	
	
	var pst = getElm("op_sc").childNodes[1];
	var scH = getElm("op_sc").offsetHeight;
	var fH = pst.offsetHeight;
	
	pst.style.position = "relative";
	pst.style.top = (scH/2 - fH/2) + 'px';	
	
	getElm("pl_hand").style.backgroundColor = "rgba(0, 0, 0, 0.5)";				
	
	generateDeck();	
	
	var sc_td = getTag("td");
	for(t=0; t<sc_td.length; t++){
		var tdClass = sc_td[t].getAttribute("class");
		if( tdClass == "pl_scTD"){
			urlString = 'url(img/pl_circle.png)';
			sc_td[t].style.backgroundImage = urlString;
			sc_td[t].style.backgroundRepeat = "no-repeat";
			sc_td[t].style.backgroundSize = "100% auto";
			sc_td[t].style.backgroundPosition = "center";
			var scWidth = sc_td[t].offsetWidth;
			sc_td[t].style.position = "relative";
			sc_td[t].style.left = cH/5 + 'px';
			sc_td[t].style.zIndex = 10;
		}
		if( tdClass == "pl_ttlTD"){
			urlString = 'url(img/pl_circle.png)';
			sc_td[t].style.backgroundImage = urlString;
			sc_td[t].style.backgroundRepeat = "no-repeat";
			sc_td[t].style.backgroundSize = "auto 100%";
			sc_td[t].style.backgroundPosition = "center";
		}
		if( tdClass == "op_scTD"){
			urlString = 'url(img/op_circle.png)';
			sc_td[t].style.backgroundImage = urlString;
			sc_td[t].style.backgroundRepeat = "no-repeat";
			sc_td[t].style.backgroundSize = "100% auto";
			sc_td[t].style.backgroundPosition = "center";
			var scWidth = sc_td[t].offsetWidth;
			sc_td[t].style.position = "relative";
			sc_td[t].style.left = cH/5 + 'px';
			sc_td[t].style.zIndex = 10;
		}
		if( tdClass == "op_ttlTD"){
			urlString = 'url(img/op_circle.png)';
			sc_td[t].style.backgroundImage = urlString;
			sc_td[t].style.backgroundRepeat = "no-repeat";
			sc_td[t].style.backgroundSize = "auto 100%";
			sc_td[t].style.backgroundPosition = "center";
		}					
	}	
	
	calcPlay();	
	
}

function setRowHeight(){
	
	plHand.style.maxWidth = cW;
	
	rTable = getElm("right_table");
	rTw = rTable.offsetWidth;
	rTable.style.maxWidth = rTw.offsetWidth;
	
	if( getElm("dDeck") ){
		getElm("dDeck").style.height = cH + 'px';
	}
	getElm("rDeck").style.height = cH + 'px';
	
	if( getElm("op_dDeck") ){
		getElm("op_dDeck").style.height = cH + 'px';
	}
	getElm("op_rDeck").style.height = cH + 'px';	
	
	getElm("op_kDeck").style.height = cH + 'px';
	getElm("op_kDeck").style.width = cH*0.75 + 'px';

	getElm("op_bKingTd").style.height = cH + 'px';	
	getElm("bKingTd").style.height = cH + 'px';
	
	getElm("bKingTd").setAttribute("align","left");
	getElm("bKingTd").setAttribute("valign","bottom");
	getElm("op_bKingTd").setAttribute("align","left");
	getElm("op_bKingTd").setAttribute("valign","top");	
	
	wH = cH*1.3;
	
	var wB = getElm("weatherDiv");
	wB.style.height = wH+'px';
	wB.style.width = (wH*2)+'px';
	wB.parentNode.style.height = wH+'px';
	
	getElm("pl_hand_sc").innerHTML = "000";
	getElm("pl_hand_sc").style.visibility = "hidden";			
	
	var cT = getElm("card_table");
	var ctTd = cT.getElementsByTagName("td");
	for	(i=0; i<ctTd.length; i++) {
		ctTd[i].style.height = cH+'px';
		ctTd[i].style.maxHeight = cH+'px';
		ctTd[i].style.overflow = "hidden";
	}
	
	getElm("pl_hand").style.height = cH+'px';
	getElm("pl_hand").style.width = cW+'px';	
	
	var sB = getClass("specDiv");
	for(t=0; t<sB.length; t++){
		sB[t].style.height = cH+'px';
		sB[t].style.maxHeight = cH+'px';
		sB[t].style.width = cH+'px';
		sB[t].style.overflow = 'hidden';
		sB[t].parentNode.style.height = cH+'px';
	}

	var nB = getClass("blarg");
	for(t=0; t<nB.length; t++){
		nB[t].style.height = cH+'px';
		nB[t].style.maxHeight = cH+'px';
		nB[t].style.width = (getElm("pl_hand").offsetWidth-cH)+'px';
		nB[t].style.overflow = 'hidden';
	}		
	
	var nB = getClass("normDiv");
	for(t=0; t<nB.length; t++){
		nB[t].style.height = cH+'px';
		nB[t].style.maxHeight = cH+'px';
		nB[t].style.width = (getElm("pl_hand").offsetWidth-cH)+'px';
		nB[t].style.overflow = 'hidden'
		nB[t].parentNode.style.height = cH+'px';
	}
	
	var img = getTag("img");
	for(t=0; t<img.length; t++){
		img[t].setAttribute("draggable", "false");
	}

	getElm("discardDeck").style.height = document.body.clientHeight;
	getElm("discardDeck").style.width = document.body.clientWidth;
	
}
