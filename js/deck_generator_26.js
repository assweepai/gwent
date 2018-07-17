function generateDeck(){

	var contDiv = getElm("cardHold");
	var ctDiv = contDiv.getElementsByTagName("div");
	
	function addCard(card,faction,power,ability,type) {
		var newC = document.createElement('div');
		newC.id = card;
		newC.style.cursor = 'pointer';
		newC.style.border = '1px solid #999';
		newC.style.padding = '5px';
		newC.setAttribute("card", card);
		newC.setAttribute("faction", faction);
		newC.setAttribute("type", type);
		newC.setAttribute("power", power);
		newC.setAttribute("ability", ability);
		if( card.match("_") ){
			image = card.split("_")[0];
		} else {
			image = card;
		}		
		newC.setAttribute("image", "img/"+image+".png");
		cInfo = card + "<br>";
		cInfo = cInfo + faction + "<br>";
		cInfo = cInfo + type + "<br>";
		cInfo = cInfo + power + "<br>";
		cInfo = cInfo + ability + "<br>";
		cInfo = cInfo + "img/"+image+".png<br>";
		newC.innerHTML = cInfo;
		contDiv.appendChild(newC);
		
	}
	
	cFact = "Northern Realms";
	
	if(cFact == "Northern Realms"){
		addCard("nr01",cFact,"00","l01","Leader");
		addCard("nr02",cFact,"00","l02","Leader");
		addCard("nr03",cFact,"00","l03","Leader");
		addCard("nr04",cFact,"00","l04","Leader");
		addCard("nr05",cFact,"01","","Close");
		addCard("nr06_0",cFact,"01","a05","Close");
		addCard("nr06_1",cFact,"01","a05","Close");
		addCard("nr06_2",cFact,"01","a05","Close");
		addCard("nr07",cFact,"02","","Close");
		addCard("nr08_0",cFact,"04","a05","Close");
		addCard("nr08_1",cFact,"04","a05","Close");
		addCard("nr08_2",cFact,"04","a05","Close");
		addCard("nr09",cFact,"04","a06","Close");
		addCard("nr10",cFact,"05","a06","Close");
		addCard("nr11",cFact,"05","","Close");
		addCard("nr12",cFact,"05","","Close");
		addCard("nr13",cFact,"10","a07","Close");
		addCard("nr14",cFact,"10","a07","Close");
		addCard("nr15",cFact,"04","","Ranged");
		addCard("nr16",cFact,"04","","Ranged");
		addCard("nr17_0",cFact,"05","a05","Ranged");
		addCard("nr17_1",cFact,"05","a05","Ranged");
		addCard("nr17_2",cFact,"05","a05","Ranged");
		addCard("nr18",cFact,"05","","Ranged");
		addCard("nr19",cFact,"05","","Ranged");
		addCard("nr20",cFact,"06","","Ranged");
		addCard("nr21",cFact,"01","a03","Siege");
		addCard("nr22",cFact,"05","a02","Siege");
		addCard("nr23",cFact,"06","","Siege");
		addCard("nr24",cFact,"06","","Siege");
		addCard("nr25_0",cFact,"08","","Siege");
		addCard("nr25_1",cFact,"08","","Siege");
		addCard("nr26",cFact,"01","a06","Siege");
		addCard("nr27",cFact,"06","","Siege");
	}
	
	cFact = "Special";
	
	addCard("s01_0",cFact,"00","","");
	addCard("s01_1",cFact,"00","","");
	addCard("s01_2",cFact,"00","","");
	addCard("s01_3",cFact,"00","","");
	addCard("s02",cFact,"00","","");
	addCard("s03",cFact,"00","","");
	
	cFact = "Weather";
	
	addCard("s04",cFact,"00","","");
	addCard("s05",cFact,"00","","");
	addCard("s06",cFact,"00","","");
	addCard("s07",cFact,"00","","");
	
	cFact = "Neutral";
	
	addCard("n01",cFact,"06","","Close");
	addCard("n02",cFact,"02","a08","Close");
	addCard("n03",cFact,"07","a07-a02","Ranged");
	addCard("n04",cFact,"15","a07","Close");
	addCard("n05",cFact,"15","a07","Close");
	//addCard("n06",cFact,"00","a06-a07","Close");
	
	dealCards(10);
	
}
	
function dealCards(n){

	var cardArray = [];	
	
	var contDiv = getElm("cardHold");
	var ctDiv = contDiv.getElementsByTagName("div");	

	for(t=0; t<ctDiv.length; t++){
		if(ctDiv[t].getAttribute("type") != "Leader" && ctDiv[t].getAttribute("card") != "s01_3" ){
			cardArray.push(ctDiv[t].getAttribute("card"));
		}
	}	

	shuffle(cardArray);
	
	var sortArray = [];

	for(c=0; c<n; c++){
		card = getElm(cardArray[c]).getAttribute("card");
		power = getElm(cardArray[c]).getAttribute("power");	
		sortArray.push(power + '-' + card);	
	}
	
	sortArray.sort();
	
	for(s=0; s<n; s++){
		card = sortArray[s].split("-")[1];
		faction = getElm(card).getAttribute("faction");
		type = getElm(card).getAttribute("type");
		power = getElm(card).getAttribute("power");
		ability = getElm(card).getAttribute("ability");	
		
		cih = getElm(card);
		cih.parentNode.removeChild(cih);			
		
		newCard(card,faction,power,ability,type);	
	}

	if( n == 10 ){
		
		var leaderArray = [];
		
		for(t=0; t<ctDiv.length; t++){
			if(ctDiv[t].getAttribute("type") == "Leader"){
				leaderArray.push(ctDiv[t].getAttribute("card"));
			}
		}
		
		shuffle(leaderArray);		
		
		card = leaderArray[0];
		faction = getElm(card).getAttribute("faction");
		type = getElm(card).getAttribute("type");
		power = getElm(card).getAttribute("power");
		ability = getElm(card).getAttribute("ability");	
		
		cih = getElm(card);
		cih.parentNode.removeChild(cih);			
		
		leaderCard(card,faction,power,ability,type);
	}	
	
}

function shuffle(array) {
	var m = array.length, t, i;
	
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	
	return array;
}	

function newCard(card,faction,power,ability,type){
	
	var newC = document.createElement('img');
	newC.id = card;
	if( card.match("_") ){
		image = card.split("_")[0];
	} else {
		image = card;
	}
	newC.src = 'img/'+image+'s.png';
	newC.style.height = cH + 'px';
	newC.style.cursor = 'pointer';
	newC.style.opacity = "1";
	newC.setAttribute("class", "s_card");
	newC.setAttribute("faction", faction);
	newC.setAttribute("power", power);
	newC.setAttribute("ability", ability);
	newC.setAttribute("type", type);
	newC.setAttribute("onmouseover","showInfo('"+card+"');");
	newC.setAttribute("onmouseout","clearInfo();");
	newC.setAttribute("onclick","playCard('"+card+"','"+faction+"','"+power+"','"+ability+"','"+type+"');");
	getElm("handN").appendChild(newC);

	plHand.style.height = cH + 'px';
	
}

function leaderCard(card,faction,power,ability,type){
	
	var newC = document.createElement('img');
	newC.id = card;
	if( card.match("_") ){
		image = card.split("_")[0];
	} else {
		image = card;
	}
	newC.src = 'img/'+image+'s.png';
	newC.style.height = cH + 'px';
	newC.style.cursor = 'pointer';
	newC.style.opacity = "1";
	newC.setAttribute("class", "s_card");
	newC.setAttribute("faction", faction);
	newC.setAttribute("power", power);
	newC.setAttribute("ability", ability);
	newC.setAttribute("type", type);
	newC.setAttribute("onmouseover","showInfo('"+card+"');");
	newC.setAttribute("onmouseout","clearInfo();");
	newC.setAttribute("onclick","playLeader('"+card+"','"+faction+"','"+power+"','"+ability+"','"+type+"');");
	getElm("kingDiv").innerHTML = "";
	getElm("kingDiv").appendChild(newC);
	
	plHand.style.height = cH + 'px';
	
}

function showInfo(card) {

	infoDiv = getElm("info");
	infoDiv.style.display = "";
	
	if( card.match("_") ){
		image = card.split("_")[0];
	} else {
		image = card;
	}
	
	infoDiv.style.height = "100%";
	infoDiv.style.width = "100%";

	cardInfo = '<img src="img/' + image + '.png" style="max-width:' + infoDiv.offsetWidth*0.9 + 'px;max-height:' + infoDiv.offsetHeight*0.9 + 'px"></img>';
	
	infoDiv.innerHTML = cardInfo;
	
	//infoDiv.style.height = rH + "px";
	
}

function clearInfo() {
	if( getElm("info") ){
		getElm("info").style.display = "none";
	}
}		
