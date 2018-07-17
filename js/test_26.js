/////////////////////////////////////////////////

function testFunc(a){
	if( gup("mode") == "test" ){
		if( a == "discard" ){
			loadDiscard();
		}
		if( a == "deal" ){
			dealCards(4);
			calcPlay();
		}
	}
}

/////////////////////////////////////////////////

function loadDiscard() {

	getElm("discardDiv").style.backgroundColor = "#ffff00";
	getElm("discardDiv").removeAttribute("onclick");
	getElm("discardDiv").setAttribute("onclick","doneDiscard()");
	
	nullifyCards(0,1);

	var nmA = ["pl_hand"];				

	for(t=0; t<nmA.length; t++){
		var img = getElm(nmA[t]).getElementsByTagName("img");
		for(i=0; i<img.length; i++){
			card = img[i].id;
			img[i].style.opacity = "1";
			img[i].setAttribute("onclick","dropDiscard('"+card+"');");
			img[i].style.cursor = "pointer";
		}
	}
	
	calcPlay();

}

function dropDiscard(card){

	cih = getElm(card);
	cih.removeAttribute("onclick");
	cih.removeAttribute("onmouseover");
	cih.removeAttribute("onmouseout");
	cih.style.cursor = "";
	cih.style.position = "";
	cih.style.top = "";
	cih.style.left = "";
	cih.style.zIndex = "";	
	
	getElm("discardDiv").innerHTML = cih.outerHTML.replace("s.png",".png");
	getElm("ddDiv").innerHTML = getElm("ddDiv").innerHTML + cih.outerHTML.replace("s.png",".png");
	
	cih.parentNode.removeChild(cih);
	
	loadDiscard();
	
	calcPlay();
	
}

function doneDiscard(){

	getElm("discardDiv").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	getElm("discardDiv").removeAttribute("onclick");
	getElm("discardDiv").setAttribute("onclick","loadDiscard()");
	
	nullifyCards(0,1);
	nullifyCards(1,1);
	calcPlay();
	
}

/////////////////////////////////////////////////