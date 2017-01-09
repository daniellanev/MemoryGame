var memoryGame = {};

memoryGame.NUM_0F_CARDS = 12;
memoryGame.imageSource = [];
memoryGame.selectedCard = [];
memoryGame.matchedCards = [];
memoryGame.tries = 0;

memoryGame.start = function(){
	memoryGame.createNavbar();
	memoryGame.createCards();
	memoryGame.createArray();
	memoryGame.shuffle(memoryGame.imageSource);
}

memoryGame.refresh = function(){
	window.location.reload();
}

// create nabar
memoryGame.createNavbar = function(){
	var navbar = document.createElement('nav');
	navbar.classList.add('navbar', 'navbar-default', 'myNav');
	
	var newGame = document.createElement('button');
	newGame.classList.add('newGame');
	newGame.textContent = 'NEW GAME';
	newGame.addEventListener('click', memoryGame.refresh);
	navbar.appendChild(newGame);

	var showTries = document.createElement('div');
	showTries.textContent = 'Wrong tries: ' + memoryGame.tries;
	showTries.classList.add('showTries');
	navbar.appendChild(showTries);
	memoryGame.updateTries = function(){
		showTries.textContent = 'Wrong tries: ' + memoryGame.tries;
	}
	document.body.appendChild(navbar);
}

// function to check if all the cards are found
memoryGame.checkFinished = function(){
	memoryGame.matchedCards = document.getElementsByClassName('match');
	if (memoryGame.matchedCards.length > 11){

		memoryGame.restart = function(){			
			window.location.reload();
		}
		memoryGame.exitModal = function(){
			modal.style.display = 'none';
		}

		var modal = document.createElement('div');
		modal.classList.add('modal', 'jumbotron');
		modal.textContent = 'YOU WON! With only ' + memoryGame.tries + ' tries!';

		var exit = document.createElement('div');
		exit.textContent = 'x';
		exit.classList.add('exit');
		exit.addEventListener('click', memoryGame.exitModal);
		modal.appendChild(exit);
		
		var playButton = document.createElement('div');
		playButton.textContent = 'PLAY AGAIN!';
		playButton.classList.add('playButton', 'btn', 'btn-primary' ,'btn-lg');
		playButton.addEventListener('click', memoryGame.restart);
		modal.appendChild(playButton);
		
		document.body.appendChild(modal);
		modal.style.display = 'block';
	} 
}

// function to check the two clicked cards are the same
memoryGame.checkSame = function(){setTimeout(function(){
	
	memoryGame.selectedCard = document.getElementsByClassName('selected');
	
	if (memoryGame.selectedCard[0].src !== memoryGame.selectedCard[1].src){

		memoryGame.selectedCard[0].src = './images/texture.jpg';
		memoryGame.selectedCard[1].src = './images/texture.jpg';
		memoryGame.selectedCard[0].classList.remove('selected');
		memoryGame.selectedCard[0].classList.remove('selected');

		memoryGame.tries ++;
		memoryGame.updateTries();
	}
	else if (memoryGame.selectedCard[0].src == memoryGame.selectedCard[1].src){
		
		memoryGame.selectedCard[0].removeEventListener('click', memoryGame.turnUp);
		memoryGame.selectedCard[0].classList.add('match');
		memoryGame.selectedCard[1].removeEventListener('click', memoryGame.turnUp);
		memoryGame.selectedCard[1].classList.add('match');
		memoryGame.selectedCard[0].classList.remove('selected');
		memoryGame.selectedCard[0].classList.remove('selected');
		memoryGame.matchedCards = document.getElementsByClassName('match');
		memoryGame.checkFinished();	
	}
}, 1000);}

// turning the card up
memoryGame.turnUp = function(e){
	memoryGame.selectedCard = document.getElementsByClassName('selected');
	if (memoryGame.selectedCard.length < 1){
		var card = e.target;
		card.src = memoryGame.imageSource[card.id - 1];
		card.classList.add('selected');
	}
	else if (memoryGame.selectedCard.length == 1){
		var card = e.target;
		card.src = memoryGame.imageSource[card.id - 1];
		card.classList.add('selected');
		memoryGame.checkSame();
	}
}

// create cards
memoryGame.createCards = function(){

	var container = document.createElement('div');
	container.classList.add('container');
	container.id = 'containerID';

	var row = document.createElement('div');
	row.classList.add('row');

	for (var i = 1; i <= memoryGame.NUM_0F_CARDS; i++){
		var card= document.createElement('img');
		card.src = './images/texture.jpg'
		card.classList.add('col-lg-2', 'col-sm-2', 'col-xs-2', 'column', 'card', 'clickable');	
		card.id = i;
		card.addEventListener('click', memoryGame.turnUp);
		row.appendChild(card);
	}
	container.appendChild(row);
	document.body.appendChild(container);
}

// create array of image sources
memoryGame.createArray = function(){
	for (var i = 1; i <= 6; i++){
		var cardImage = document.createElement('img');
		cardImage.src = './images/' + i + '.jpg';
		var source = cardImage.src;
		cardImage.classList.add('cardImage');
		source.id = "source" + i;
		memoryGame.imageSource.push(source);
		memoryGame.imageSource.push(source);
	}
}

// shuffle the array
memoryGame.shuffle = function(o){
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}










