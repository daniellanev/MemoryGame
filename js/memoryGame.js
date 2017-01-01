
var memoryGame = {};

NUM_0F_CARDS = 12;
var imageSource = [];
var selectedCard = [];
var matchedCards = [];
var tries = 0;

memoryGame.start = function(){
	memoryGame.createNavbar();
	memoryGame.createCards();
	memoryGame.createArray();
	memoryGame.shuffle(imageSource);
}

memoryGame.refresh = function(){
	// document.getElementById('containerID').innerHTML = "";
	// memoryGame.createCards();
	// memoryGame.shuffle(imageSource);
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

	// var showTries = document.createElement('div');
	// showTries.textContent = 'Wrong tries: ' + tries;
	// showTries.classList.add('showTries');
	// navbar.appendChild(showTries);
	document.body.appendChild(navbar);
}

// function to check if all the cards are found
memoryGame.checkFinished = function(){
	matchedCards = document.getElementsByClassName('match');
	if (matchedCards.length > 11){

		memoryGame.restart = function(){			
			// document.getElementById('containerID').innerHTML = "";
			// console.log('cleared');
			// memoryGame.createCards();
			// console.log('created cards');
			// memoryGame.shuffle(imageSource);
			// console.log('imageSource');
			// modal.style.display = 'none';
			window.location.reload();
		}
		memoryGame.exitModal = function(){
			modal.style.display = 'none';
		}

		var modal = document.createElement('div');
		modal.classList.add('modal', 'jumbotron');
		modal.textContent = 'YOU WON!';

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
	
	selectedCard = document.getElementsByClassName('selected');
	
	if (selectedCard[0].src !== selectedCard[1].src){

		selectedCard[0].src = './images/texture.jpg';
		selectedCard[1].src = './images/texture.jpg';
		selectedCard[0].classList.remove('selected');
		selectedCard[0].classList.remove('selected');

		tries ++;
	}
	else if (selectedCard[0].src == selectedCard[1].src){
		
		selectedCard[0].removeEventListener('click', memoryGame.turnUp);
		selectedCard[0].classList.add('match');
		selectedCard[1].removeEventListener('click', memoryGame.turnUp);
		selectedCard[1].classList.add('match');
		selectedCard[0].classList.remove('selected');
		selectedCard[0].classList.remove('selected');
		matchedCards = document.getElementsByClassName('match');
		memoryGame.checkFinished();	
	}
}, 1000);}

// turning the card up
memoryGame.turnUp = function(e){
	selectedCard = document.getElementsByClassName('selected');
	if (selectedCard.length < 1){
		var card = e.target;
		card.src = imageSource[card.id - 1];
		card.classList.add('selected');
	}
	else if (selectedCard.length ==1 ){
		var card = e.target;
		card.src = imageSource[card.id - 1];
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

	for (var i = 1; i <= NUM_0F_CARDS; i++){
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
		imageSource.push(source);
		imageSource.push(source);
	}
	console.log(imageSource);
}

// shuffle the array
memoryGame.shuffle = function(o){
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
	console.log(o);
	}





















