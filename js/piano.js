
//		Simon Game
//		created by: Dor Amar
//		Date: 28/10/2015

//Consts
const A_KEY = 1;
const B_KEY = 2;
const C_KEY = 3;
const D_KEY = 4;
const E_KEY = 5;
const LAST_LEVEL = 100;
const STARTING_LIVES = 3;

//Sound Files
var a_key_sound = new Audio('sound/a.mp3');
var b_key_sound = new Audio('sound/b.mp3');
var c_key_sound = new Audio('sound/c.mp3');
var d_key_sound = new Audio('sound/d.mp3');
var e_key_sound = new Audio('sound/e.mp3');

//Global Vars
var lives = STARTING_LIVES;
var noteSeries = "";
var inputSequence = "";
var level = 1;

/* Main */
var ans = confirm("Welcome, to the Simon Game! start to play?");

//start the game
if (ans){
	computerMove(level);
}

/* Functions */

//Generate a compute move - generate random string and play it
function computerMove(level){
	
	//generate a new series with length = 'level'
	generateSeries();
	console.log("Created noteSeries = " + noteSeries);

	//Computer Play Music
	playMusic();
	
	//Message to user
	setTimeout(function(){ message('Now You Try!'); }, level * 1800);
}
	
//on-click this function will run, meaning the user has submmited the string, comparing it to the note series
function userMove(){

	//compare user input to computer string:
	
	//if user is Right:
	if (inputSequence === noteSeries){
		
		message("Great! next level!");
		
		//update level
		level += 1;
		
		//check if end
		if(level > LAST_LEVEL){
			message('Wow! You have won the game!');
		}
		
		//else proceed to next level
		else{
			
			//change level counter:
			document.getElementById("levelN").innerHTML = level;
			
			inputSequence = "";
			computerMove(level);
		}
	}
	//if user is Wrong:
	else{
		
		decreaseLives();
		
		//check if game over
		if(lives === 0){
			message("Game Over! You have reached level " + level);
			
			var shouldRestart = confirm("Restart Game?");
			if (shouldRestart){
				restartGame();
			}
			else{
				message("Ok Bye!");
				//close window
			}
			
		}
		else{
			message("Wrong! Try Again");
			
			//init user sequence
			inputSequence = "";

			//re play music:
			playMusic();
		}
	}
}

//input string from user
function userInput(keyClicked){
	
	//play sound of note
	playNote(parseInt(keyClicked));
	
	//change image ####
	
	//update input sequence
	inputSequence += keyClicked;
}


//var note2Audio = {
//	d : d_key_sound,
//	e:  e_key_sound
//};




//a function for playing a single note
function playNote(noteToPlay){
	
//	note2Audio[noteToPlay].play();
	
	
	switch(noteToPlay){
				
			case (A_KEY):
				a_key_sound.play();
				break;
				
			case (B_KEY):
				b_key_sound.play();
				break;
				
			case (C_KEY):
				c_key_sound.play();
				break;
				
			case (D_KEY):
				d_key_sound.play();
				break;
				
			case (E_KEY):
				e_key_sound.play();
				break;
			
			default:
				console.log('Error: invalid note');	
		}
}

//a function for playing an entire string
function playMusic(){
	
	var seriesLen = noteSeries.length;
		
	for(var i = 0; i < seriesLen; i++){
		
		noteToPlay = parseInt(noteSeries[i]);

		
		//	read about closure
		var func = (function(note){
			return function(){
				playNote(note);
				console.log("Playin Music... " + note);
			}
		})(noteToPlay);
		
		//play the entire series
		setTimeout(func, i * 2000);
	}
}

//a funciton for generatong a random series
function generateSeries(){
		
	//generate num
	var randomNum = parseInt(getRandomArbitrary(A_KEY, E_KEY + 1)); 

	//convert to string
	var note = randomNum.toString();  

	//add to series
	noteSeries += note; 				
}

//decrease one live
function decreaseLives(){

	lives--;
	
	//removes a heart
	if(lives == 2){
		document.getElementById("heart1").style.display = "none";
	}
	else if(lives == 1){
		document.getElementById("heart2").style.display = "none";
	}
	else{
		document.getElementById("heart3").style.display = "none";
	}
	
}

//restarting game
function restartGame(){
	
	message("Restarting Game...");
	
	document.getElementById("heart1").style.display = "";
	document.getElementById("heart2").style.display = "";
	document.getElementById("heart3").style.display = "";
	
	
	//init everything
	lives = STARTING_LIVES;
	noteSeries = "";
	inputSequence = "";
	level = 1;
	computerMove(1);
}

/* Helper functions */

//generates a random num between min and max
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//change the message in the message are
function message(str){
	document.getElementById("messageArea").innerHTML = str;
}