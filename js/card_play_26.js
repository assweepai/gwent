/////////////////////////////////////////////////

function playDecoy(card) {

	getElm(card).style.opacity = "0.3";
	
	getElm("info").outerHTML = getElm("info").outerHTML.replace("info","dickfo");
	
	nullifyCards(0,1);

	var nmA = ["pl_row1","pl_row2","pl_row3"];				

	for(t=0; t<nmA.length; t++){
		var img = getElm(nmA[t]).getElementsByTagName("img");
		for(i=0; i<img.length; i++){
			pullCard = img[i].id;
			pcA = img[i].getAttribute("ability");
			if( pcA.match("a07") || img[i].id.match("s01") ){
				
			} else {
				img[i].style.opacity = "1";
				img[i].setAttribute("onclick","dropDecoy('"+pullCard+"','"+card+"');");
				img[i].style.cursor = "pointer";
			}
		}
	}
	
	calcPlay();

}

function dropDecoy(a,b){

	cardA = getElm(a).outerHTML;
	cardB = getElm(b).outerHTML;
	
	getElm(b).outerHTML = cardA;
	getElm(a).outerHTML = cardB;
	
	nullifyCards(0,1);
	
	getElm("dickfo").outerHTML = getElm("dickfo").outerHTML.replace("dickfo","info");
	
	nullifyCards(1,1);	
	
	calcPlay();
	
}

/////////////////////////////////////////////////

function playScorch(n){

	var rankArray = [];
	var killArray = [];	
	var discardArray = [];	
	
	var ct = getElm("card_table");
	var ctTr = ct.getElementsByTagName("tr");
	for(t=0; t<ctTr.length; t++){
		row = ctTr[t].getElementsByTagName("td")[1];
		rowName = row.id;
		if( n == 0 ){
			if( rowName != "pl_hand" ){
				var img = row.getElementsByTagName("img");
				for(i=0; i<img.length; i++){
					var mPower = img[i].getAttribute("currPower");
					var ability = img[i].getAttribute("ability");
					if( !ability.match("a07") ){
						rankArray.push(parseInt(mPower));
					}
				}
			} 
		} else {
			var img = getElm("op_row3_n").getElementsByTagName("img");
			for(i=0; i<img.length; i++){
				var mPower = img[i].getAttribute("currPower");
				var ability = img[i].getAttribute("ability");
				if( !ability.match("a07") ){
					rankArray.push(parseInt(mPower));
				}
			}			
		}
	}

	var largest = Math.max.apply(Math, rankArray);
	
	for(t=0; t<ctTr.length; t++){
		row = ctTr[t].getElementsByTagName("td")[1];
		rowName = row.id;
		if( rowName != "pl_hand" ){
			var img = row.getElementsByTagName("img");
			for(i=0; i<img.length; i++){
				var mPower = img[i].getAttribute("currPower");			
				if( parseInt(mPower) == parseInt(largest) ){
					if( rowName.match("pl_row") ){
						discardArray.push(img[i].id);
					} else {
						killArray.push(img[i].id);
					}
				}
			}
		}
	}
	
	var kA = killArray;
	for(a=0; a<kA.length; a++){
		discard(kA[a],1);
	}
	
	var dA = discardArray;
	for(a=0; a<dA.length; a++){
		discard(dA[a],0);
	}	
	
	calcPlay();

}

/////////////////////////////////////////////////

function killOverlays(){

	var pO = document.body.getElementsByClassName("cardOverlay");
	for(o=0; o<pO.length; o++){
		pO[o].parentNode.removeChild(pO[o]);
	}
	
	getElm("overlayHold").innerHTML = "";

}

/////////////////////////////////////////////////

function nullifyCards(n,o){

	var img = getTag("img");

	if( n == 0 ){
		for(t=0; t<img.length; t++){
			if( img[t].src.match("s.png") ){
				if( o == 1 && img[t].style.opacity == "1"){
					img[t].style.opacity = "0.3";
					img[t].removeAttribute("onclick");
					img[t].removeAttribute("onmouseover");
					img[t].removeAttribute("onmouseout");
					img[t].style.cursor = "";
				}
			}
		}		
	} else {
		for(t=0; t<img.length; t++){
			if( img[t].src.match("s.png") ){
				row = img[t].parentNode.parentNode.id;
				card = img[t].id;
				faction = img[t].getAttribute("faction");
				power = img[t].getAttribute("power");
				ability = img[t].getAttribute("ability");
				type = img[t].getAttribute("type");
				if( img[t].style.opacity == "0.3" ){			
					img[t].style.opacity = "1";
				}
				img[t].setAttribute("onmouseover","showInfo('"+card+"');");
				img[t].setAttribute("onmouseout","clearInfo();");
				if( row.match("pl_hand") ){
					img[t].setAttribute("onclick","playCard('"+card+"','"+faction+"','"+power+"','"+ability+"','"+type+"');");
					img[t].style.cursor = "hand";
				}
			}
		}	
	}

}

/////////////////////////////////////////////////

function playChorn(card,faction,power,ability,type) {

	getElm(card).style.opacity = "0.3";
	
	getElm("info").outerHTML = getElm("info").outerHTML.replace("info","dickfo");
	
	nullifyCards(0,0);

	var spA = ["pl_row1_s","pl_row2_s","pl_row3_s"];				

	for(t=0; t<spA.length; t++){
		if( getElm(spA[t]).innerHTML == "" ){
			getElm(spA[t]).style.backgroundColor = "#ffff00";
			getElm(spA[t]).setAttribute("onclick","dropChorn('"+spA[t]+"','"+card+"','"+faction+"','"+power+"','"+ability+"','"+type+"');");
			getElm(spA[t]).style.cursor = "pointer";
		}
	}

}

function dropChorn(el,card,faction,power,ability,type) {

	cih = getElm(card);
	cih.parentNode.removeChild(cih);
	
	var spA = ["pl_row1_s","pl_row2_s","pl_row3_s"];				

	for(t=0; t<spA.length; t++){
		getElm(spA[t]).style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		getElm(spA[t]).removeAttribute("onclick");
		getElm(spA[t]).style.cursor = "";
	}	

	destDiv = getElm(el);				
	
	var newC = document.createElement('img');
	newC.id = card;
	if( card.match("_") ){
		image = card.split("_")[0];
	} else {
		image = card;
	}
	newC.src = 'img/'+image+'s.png';	
	newC.style.height = cH + 'px';
	newC.setAttribute("class", "s_card");
	newC.setAttribute("faction", faction);
	newC.setAttribute("power", power);
	newC.setAttribute("ability", ability);
	newC.setAttribute("type", type);
	newC.setAttribute("onmouseover","showInfo('"+card+"');");
	newC.setAttribute("onmouseout","clearInfo();");
	
	destDiv.appendChild(newC);
	
	nullifyCards(0,0);
	
	if( getElm("dickfo") ){
		getElm("dickfo").outerHTML = getElm("dickfo").outerHTML.replace("dickfo","info");
	}
	
	nullifyCards(1,0);		
	
	calcPlay();

}

/////////////////////////////////////////////////

function discard(card,n){

	cih = getElm(card);
	cih.removeAttribute("onclick");
	cih.removeAttribute("onmouseover");
	cih.removeAttribute("onmouseout");
	cih.style.cursor = "";
	cih.style.position = "";
	cih.style.top = "";
	cih.style.left = "";
	cih.style.zIndex = "";
	
	cih.style.cursor = "";
	
	if( n == 0 ){
		getElm("discardDiv").innerHTML = cih.outerHTML.replace("s.png",".png");
		getElm("ddDiv").innerHTML = getElm("ddDiv").innerHTML + cih.outerHTML.replace("s.png",".png");
	} else {
		getElm("op_discardDiv").innerHTML = cih.outerHTML.replace("s.png",".png");
		getElm("op_discard").innerHTML = getElm("op_discard").innerHTML + cih.outerHTML.replace("s.png",".png");	
	}
	
	cih.parentNode.removeChild(cih);
	
	calcPlay();
	
}

function selectDiscard(n){

	var ddd = getElm("ddDiv");
	var img = ddd.getElementsByTagName("img");
	if( img.length != 0 ){
		for(i=0; i<img.length; i++){
			img[i].style.height = "50%";
			card = img[i].id;
			faction = img[i].getAttribute("faction");
			power = img[i].getAttribute("power");
			ability = img[i].getAttribute("ability");
			type = img[i].getAttribute("type");			
			img[i].setAttribute("onclick","playDiscard('"+card+"','"+faction+"','"+power+"','"+ability+"','"+type+"');");
			img[i].style.cursor = "hand";	
		}
		getElm("discardDeck").style.display = "block";
	}
	
}

function playDiscard(card,faction,power,ability,type){

	cih = getElm(card);
	cih.parentNode.removeChild(cih);

	playCard(card,faction,power,ability,type);
	
	var ddd = getElm("ddDiv");
	var img = ddd.getElementsByTagName("img");
	var lCard = img[img.length-1];
	if( lCard ){
		getElm("discardDiv").innerHTML = lCard.outerHTML;
	} else {
		getElm("discardDiv").innerHTML = '<img id="rDeck" src="img/empty.png">';
	}
	var lCardImg = getElm("discardDiv").getElementsByTagName("img")[0];
	lCardImg.style.height = cH + 'px';
	
	getElm("discardDeck").style.display = "none";
	
	if(ability.match("a02")){
		selectDiscard(1);
	}

}

/////////////////////////////////////////////////

function playLeader(card,faction,power,ability,type){

	if( ability.match("l01") && !getElm("weatherDiv").innerHTML.match("s05") ){
		getElm(card).removeAttribute("onclick");
		getElm(card).style.cursor = "";
		getElm(card).style.opacity = "0.4";
		playCard("s05","Weather","00","l01","");
	}
	
	if( ability.match("l02") && getElm("weatherDiv").innerHTML != "" ){
		getElm(card).removeAttribute("onclick");
		getElm(card).style.cursor = "";
		getElm(card).style.opacity = "0.4";
		playCard("s07","Weather","00","l01","");
	}
	
	if( ability.match("l03") && getElm("pl_row3_s").innerHTML == "" ){
		getElm(card).removeAttribute("onclick");
		getElm(card).style.cursor = "";
		getElm(card).style.opacity = "0.4";
		dropChorn('pl_row3_s','s01_3','Special','00','','');
	}
	
	if( ability.match("l04") && parseInt(getElm("op_row3_sc").innerHTML) >= 10 ){
		getElm(card).removeAttribute("onclick");
		getElm(card).style.cursor = "";
		getElm(card).style.opacity = "0.4";
		playScorch(1);
	}			

}

/////////////////////////////////////////////////

function playCard(card,faction,power,ability,type){
	
	if( !card.match("s01") && card != "s02" && ability != "l01" && ability != "l02" ){
		cih = getElm(card);
		if( cih ){
			cih.parentNode.removeChild(cih);
		}
	}
	
	if(ability.match("a06")){
		side = "op";
	} else {
		side = "pl";
	}
	
	if(type == "Close"){
		tD = side + "_row1_n";
	}
	if(type == "Ranged"){
		tD = side + "_row2_n";
	}
	if(type == "Siege"){
		tD = side + "_row3_n";
	}
	if(faction == "Weather"){
		tD = "weatherDiv";
	}	

	if(faction == "Special") {
		
		if(card.match("s01")){
			playChorn(card,faction,power,ability,type);
		}
		
		if(card == "s02"){
			playDecoy(card);
		}
		
		if(card == "s03"){
			playScorch(0);
		}	
		
	} else {
		
		destDiv = getElm(tD);					
		
		var newC = document.createElement('img');
		newC.id = card;
		if( card.match("_") ){
			image = card.split("_")[0];
		} else {
			image = card;
		}
		newC.src = 'img/'+image+'s.png';		
		newC.style.height = cH + 'px';
		newC.style.opacity = "1";
		if(tD == "weatherDiv"){
			newC.style.position = 'relative';
			newC.style.top = ((getElm(tD).offsetHeight/2)-(cH/2)) + 'px';
		}
		newC.setAttribute("class", "s_card");
		newC.setAttribute("faction", faction);
		newC.setAttribute("power", power);
		newC.setAttribute("ability", ability);
		newC.setAttribute("type", type);
		newC.setAttribute("onmouseover","showInfo('"+card+"');");
		newC.setAttribute("onmouseout","clearInfo();");
		
		destDiv.appendChild(newC);
		
	}
	
	if(ability.match("a06")){
		dealCards(2);
	}	
	
	if(ability.match("a02")){
		selectDiscard(1);
	}	
	
	if(card == "s07"){
		getElm("weatherDiv").innerHTML = "";
	}	
	
	calcPlay();	
	
}

/////////////////////////////////////////////////

function calcPlay() {
	setTimeout(function(){calcPlay2()}, 0);	
}

function calcPlay2() {

	killOverlays();

	var ct = getElm("card_table");
	var ctTr = ct.getElementsByTagName("tr");
	for(t=0; t<ctTr.length; t++){
		row = ctTr[t].getElementsByTagName("td")[1];
		rowName = row.id;
		rowCount = 0;
		if( rowName != "pl_hand" ){
			var spR = getElm(rowName + "_s");
			var mult = 1;
			pC = row.getElementsByTagName("img");
			
			for(p=0; p<pC.length; p++){
				power = pC[p].getAttribute("power");
				pC[p].setAttribute("multiplier",mult);
				pC[p].setAttribute("currpower",parseInt(power));				
				
			}	
			
			////// set weather //////
			for(p=0; p<pC.length; p++){
				
				if( !pC[p].id.match("s01") && !pC[p].getAttribute("ability").match("a07") ){
					if( pC[p].getAttribute("type").match("Close") && getElm("weatherDiv").innerHTML.match("s04") ){
						pC[p].setAttribute("currpower",1);
					}
					if( pC[p].getAttribute("type").match("Ranged") && getElm("weatherDiv").innerHTML.match("s05") ){
						pC[p].setAttribute("currpower",1);
					}
					if( pC[p].getAttribute("type").match("Siege") && getElm("weatherDiv").innerHTML.match("s06") ){
						pC[p].setAttribute("currpower",1);
					}
				}
				
			}
			////// end set weather //////				
			
			////// set tight bond multiplier //////
			
			var nr06_arr = [];
			var nr08_arr = [];
			var nr17_arr = [];
			var nr25_arr = [];			
			
			for(p=0; p<pC.length; p++){
				if( pC[p].id.match("nr06") ){
					nr06_arr.push(pC[p].id);
				}
				if( pC[p].id.match("nr08") ){
					nr08_arr.push(pC[p].id);
				}
				if( pC[p].id.match("nr17") ){
					nr17_arr.push(pC[p].id);
				}
				if( pC[p].id.match("nr25") ){
					nr25_arr.push(pC[p].id);
				}				
			}
			if( nr06_arr.length > 0 ){
				for(a=0; a<nr06_arr.length; a++){
					tbcard = getElm(nr06_arr[a]);
					if( tbcard ){
						tbcurrpower = tbcard.getAttribute("currpower");
						tbcard.setAttribute("currpower",tbcurrpower*nr06_arr.length);
					}
				}
			}
			if( nr08_arr.length > 0 ){
				for(a=0; a<nr08_arr.length; a++){
					tbcard = getElm(nr08_arr[a]);
					if( tbcard ){
						tbcurrpower = tbcard.getAttribute("currpower");
						tbcard.setAttribute("currpower",tbcurrpower*nr08_arr.length);
					}
				}
			}
			if( nr17_arr.length > 0 ){
				for(a=0; a<nr17_arr.length; a++){
					tbcard = getElm(nr17_arr[a]);
					if( tbcard ){
						tbcurrpower = tbcard.getAttribute("currpower");
						tbcard.setAttribute("currpower",tbcurrpower*nr17_arr.length);
					}
				}
			}
			if( nr25_arr.length > 0 ){
				for(a=0; a<nr25_arr.length; a++){
					tbcard = getElm(nr25_arr[a]);
					if( tbcard ){
						tbcurrpower = tbcard.getAttribute("currpower");
						tbcard.setAttribute("currpower",tbcurrpower*nr25_arr.length);
					}
				}
			}			
			////// end set tight bond multiplier  //////
			
			////// set kaedweni + 1 //////
			for(p=0; p<pC.length; p++){
				currpower = pC[p].getAttribute("currpower");
				if( row.innerHTML.match("nr21") && !pC[p].id.match("nr21") ){
					pC[p].setAttribute( "currpower" , parseInt(currpower) + 1 );
				}
			}			
			////// end set kaedweni + 1 //////			
			
			////// set horn multiplier //////
			if( spR.innerHTML.match("s01") ){
				mult = (mult*2);
			}
			if( row.innerHTML.match("a08") ){
				var spNml = row.innerHTML.match("a08");
				for(s=0; s<spNml.length; s++){
					mult = (mult*2);	
				}
			}	
			for(p=0; p<pC.length; p++){
				
				cmult = mult;
				
				if( pC[p].getAttribute("ability").match("a07") ){
					cmult = 1;	
				}
				
				currpower = pC[p].getAttribute("currpower");
				pC[p].setAttribute("multiplier",cmult);
				pC[p].setAttribute("currpower",currpower*cmult);				
				
			}
			////// end set horn multiplier //////		
			
			for(p=0; p<pC.length; p++){
				rowCount = rowCount + parseInt(pC[p].getAttribute("currpower"));
			}
			
			getElm(rowName+"_sc").innerHTML = rowCount;
			
		}
		
	}
	
	p1 = 0;
	for(t=0; t<ctTr.length; t++){
		row = ctTr[t].getElementsByTagName("td")[0];
		rowName = row.id;
		if( rowName.match("pl_") && rowName.match("_sc") && !(rowName.match("pl_hand")) ){
			p1 = (parseInt(p1) + parseInt(row.innerHTML));
			getElm("pl_ttl_f").innerHTML = p1;
		}
	}
	
	p2 = 0;
	for(t=0; t<ctTr.length; t++){
		row = ctTr[t].getElementsByTagName("td")[0];
		rowName = row.id;
		if( rowName.match("op_") && rowName.match("_sc") ){
			p2 = (parseInt(p2) + parseInt(row.innerHTML));
			getElm("op_ttl_f").innerHTML = p2;
		}
	}	
	
	setTimeout(function(){orderHand()}, 20);
	
	clearInfo();
	
	setRowHeight();	
	
}

/////////////////////////////////////////////////

function orderHand(){
	
	var cD = ["handN","pl_row1_n","pl_row2_n","pl_row3_n","op_row1_n","op_row2_n","op_row3_n"]
	
	for(t=0; t<cD.length; t++){
		
		var sA = [];
		
		var oD = getElm(cD[t]);
		var hD = getElm("handHold");
		
		hD.innerHTML = oD.innerHTML;
		oD.innerHTML = "";
		
		var hCard = hD.getElementsByTagName("img");
		
		for(c=0; c<hCard.length; c++){
			card = hCard[c].getAttribute("id");
			power = hCard[c].getAttribute("power");	
			sA.push(power + '-' + card);
		}
		
		sA.sort();
		
		for(n=0; n<sA.length; n++){
			cardName = sA[n].split("-")[1];
			card = getElm(cardName);
			card.setAttribute("order",n);
			oD.appendChild(card);
		}
		
		hD.innerHTML = "";
		
		row = getElm(cD[t]).parentNode;
		rowName = row.id;
		
		zI = 0;
		phW = row.offsetWidth;
		pC = row.getElementsByTagName("img");
		pcW = 0;
		for(p=0; p<pC.length; p++){
			zI = zI + 10;
			pC[p].style.zIndex = zI;
			pC[p].style.position = "relative";
			pC[p].style.left = "0px";		
			pcW = pcW + pC[p].offsetWidth;
		}
		
		if( pcW > phW ){
			
			wDiff = pcW-phW;
			diffOffset = Math.round(wDiff/pC.length);
			
			for(f=0; f<pC.length; f++){	
				cpR = Math.floor(phW/pC[f].offsetWidth);
				cO = pC[f].getAttribute("order");
				cH = pC[f].offsetHeight;
				cW = pC[f].offsetWidth;				
				pC[f].style.left = "-" + (diffOffset+1)*cO + "px";
			}
			
		}
		
		////// set power overlay ////// -keep me last in the chain-
		var bodyRect = document.body.getBoundingClientRect();
		for(p=0; p<pC.length; p++){
			if( !pC[p].id.match("s01") && cD[t] != "handN" ){
				card = pC[p].id;
				if(pC[p].getAttribute("ability").match("a07")){
					fColor = "#ffffff";
					bColor = "#000000";
				} else {
					fColor = "#555555";
					bColor = "#ffffff";
				}				
				var newC = document.createElement('div');
				newC.id = card+'_info';
				newC.style.color = fColor;
				newC.style.backgroundColor = bColor;				
				newC.setAttribute("class","cardOverlay");
				getElm("overlayHold").appendChild(newC);
				
				thisDiv = getElm(card+"_info");
				
				thisDiv.style.opacity = getElm(card).style.opacity;
				
				currPower = parseInt(pC[p].getAttribute("currpower"));
				thisDiv.innerHTML = currPower;
				
				dP = parseInt(thisDiv.innerHTML);
				
				sp = "0.075cm";
				tp = "0.05cm";
				
				if(dP <= 9){
					sp = "0.15cm";
					tp = "0.05cm";
				}
				
				thisDiv.style.paddingTop = tp;
				thisDiv.style.paddingBottom = tp;					
				thisDiv.style.paddingLeft = sp;
				thisDiv.style.paddingRight = sp;						
				
				cardRect = pC[p].getBoundingClientRect();
				cTop = cardRect.top - bodyRect.top;
				cLeft = cardRect.left - bodyRect.left;
				
				thisDiv.style.top = ( cTop+(thisDiv.offsetHeight/2) ) + 'px';
				thisDiv.style.left = ( cLeft+(thisDiv.offsetWidth/(2)) ) + 'px';
				
				powerRect = thisDiv.getBoundingClientRect();
				pTop = powerRect.top - bodyRect.top;
				pLeft = powerRect.left - bodyRect.left;					
				
				adjTop = pTop - cTop;
				adjLeft = pLeft - cLeft;
				
				newTop = thisDiv.style.top.replace('px','') - adjTop;
				newLeft = thisDiv.style.left.replace('px','') - adjLeft;
				
				thisDiv.style.top = newTop + 'px';
				thisDiv.style.left = newLeft + 'px';
				
				if( !getElm(card) ){
					thisDiv.parentNode.removeChild(thisDiv);
				}
				
			}
		}
		////// end set power overlay //////		
		
	}	

}

/////////////////////////////////////////////////
