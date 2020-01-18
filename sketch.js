/*

The Game Project 6 - Adding Game Mechanics

*/


// VARIABLE DECLARATION //
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;

var collectables;

var mountains;
var clouds;

var game_score;

var flagpole;

var Lives;

var isDead;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	Lives = 3;
	startGame();
}	

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	push()
	translate(scrollPos, 0)

	// Draw clouds.
	drawClouds();

	// Draw mountains.
	drawMountains();


	// Draw trees.
	drawTrees();

	// Draw canyons.
	for(var i = 0; i < canyons.length; i++)
	{
		checkCanyon(canyons[i]);
		drawCanyon(canyons[i]);
	}

	// Draw collectable items.

	for(var i = 0; i < collectables.length; i++)
	{
		

		if(!collectables[i].isFound)
		{
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	}

	if(!isDead)
	{
		checkPlayerDie();
	}

	//FlagPole
	renderFlasgpole();
	checkFlagPole();

	
	

	pop()

	// Draw game character.
	
	drawGameChar();

	//Game Score Counter
	fill(255);
	noStroke();
	text("Score: " + game_score, 20, 20);

	//Lives Counter
	fill(255);
	noStroke();
	text("Lives ", 80, 20);

	for(var i = 0;i < Lives ; i++)
	{
		fill(255, 0, 120);
		ellipse(160 +  i * 20, 20, 10)
	}

	if(flagpole.isReached)
	{
		push()
		fill(255, 120, 50, 80);
		rect(0, 0, width, height)
		fill(255);
		textSize(50);
		text("Level Complete", width/2, height/2);
		pop()

		return
	}

	if(Lives < 1)
	{
		push()
		fill(255, 0, 255, 100);
		rect(0, 0, width, height);
		fill(255);
		textSize(50);
		text("Game Over.", width/2 - 500, height/2 - 60);
		text("Press Space to continue", width/2 - 500, height/2);
		pop()

		keyPressed()
		{
			if(keyCode == 32)
			{
				Lives = 3;
				startGame();
			}
		}

		return
	}



	// Logic to make the game character move or the background scroll.
	isLeftM()

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 4;
		}
		else
		{
			scrollPos -= 4; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
	// Gravity
	if(gameChar_y < floorPos_y)
	{
		isFalling = true;
		gameChar_y += 3;

	}

	else
	{
		isFalling = false;
	}


	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	if(keyCode == 37)
	{
		isLeft = true;
	}

	if(keyCode == 39)
	{
		isRight = true;
	}

	if(keyCode == 32 && gameChar_y >= floorPos_y)
	{
		isFalling = false;
		gameChar_y -= 100;
	}


}

function keyReleased()
{

	if(keyCode == 37)
	{
		isLeft = false;
	}

	if(keyCode == 39)
	{
		isRight = false;
	}

	if(keyCode == 32)
	{
		isFalling = true;
	}

	console.log(game_score);
}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    if(isLeft && isFalling)
	{
		// add your jumping-left code
        
        //Character Body
        fill(255, 140, 0);
        ellipse(gameChar_x, gameChar_y - 25, 25, 35);

        //Character Legs
        fill(255, 69, 0);
        ellipse(gameChar_x + 8, gameChar_y - 7, 10, 5);

        ellipse(gameChar_x - 10, gameChar_y - 5, 5, 5);

        //Character head
        fill(210, 180, 140);
        ellipse(gameChar_x, gameChar_y - 50, 20, 25);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        
        //Character Body
	   fill(255, 140, 0);
	   ellipse(gameChar_x, gameChar_y - 25, 25, 35);
        
	   //Character Legs
	   fill(255, 69, 0);
	   ellipse(gameChar_x + 8, gameChar_y - 5, 5, 5);

	   ellipse(gameChar_x - 10, gameChar_y - 7, 10, 5);

	   //Character head
	   fill(210, 180, 140);
	   ellipse(gameChar_x, gameChar_y - 50, 20, 25);

	}
	else if(isLeft)
	{
		// add your walking left code
        
        //Character Body
        fill(255, 140, 0);
        ellipse(gameChar_x, gameChar_y - 25, 25, 35);

        //Character Legs
        fill(255, 69, 0);
        ellipse(gameChar_x + 8, gameChar_y - 7, 15, 5);

        ellipse(gameChar_x - 10, gameChar_y - 5, 5, 15);

        //Character head
        fill(210, 180, 140);
        ellipse(gameChar_x, gameChar_y - 50, 20, 25);


	}
	else if(isRight)
	{
		// add your walking right code
        
        //Character Body
        fill(255, 140, 0);
        ellipse(gameChar_x, gameChar_y - 25, 25, 35);

        //Character Legs
        fill(255, 69, 0);
        ellipse(gameChar_x + 8, gameChar_y - 5, 5, 15);

        ellipse(gameChar_x - 10, gameChar_y - 7, 15, 5);

        //Character head
        fill(210, 180, 140);
        ellipse(gameChar_x, gameChar_y - 50, 20, 25);


	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        
        //Character Body
        fill(255, 140, 0);
        ellipse(gameChar_x, gameChar_y - 25, 35);

        //Character Legs
        fill(255, 69, 0);
        ellipse(gameChar_x + 10, gameChar_y - 5, 5, 7);

        ellipse(gameChar_x - 10, gameChar_y - 5, 5, 7);

        //Character head
        fill(210, 180, 140);
        ellipse(gameChar_x, gameChar_y - 50, 25);


	}
	else
	{
		// add your standing front facing code
        
        //Character Body
        fill(255, 140, 0);
        ellipse(gameChar_x, gameChar_y - 25, 35);

        //Character Legs
        fill(255, 69, 0);
        ellipse(gameChar_x + 10, gameChar_y - 5, 5, 15);

        ellipse(gameChar_x - 10, gameChar_y - 5, 5, 15);

        //Character head
        fill(210, 180, 140);
        ellipse(gameChar_x, gameChar_y - 50, 25);


	}

}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
	for(var i = 0; i < clouds.length; i++)
	{
		fill(255, 255, 255, 200);
		ellipse(clouds[i].x_pos, clouds[i].y_pos, 70, 70);
		ellipse(clouds[i].x_pos + 40, clouds[i].y_pos, 55, 55);
		ellipse(clouds[i].x_pos - 40, clouds[i].y_pos, 55, 55);
	}
}

// Function to draw mountains objects.
function drawMountains()
{
	for(var i = 0 ; i < mountains.length ; i++ )
	{

		fill(160, 82, 45);
		triangle(mountains[i].x_pos1 + 30, mountains[i].y_pos1, mountains[i].x_pos2,
			mountains[i].y_pos2, mountains[i].x_pos3 + 30, mountains[i].y_pos3);

		fill(165, 42, 42);
		triangle(mountains[i].x_pos1, mountains[i].y_pos1, mountains[i].x_pos2,
			mountains[i].y_pos2, mountains[i].x_pos3, mountains[i].y_pos3);


		fill(160, 82, 45);
		triangle(mountains[i].x_pos1, mountains[i].y_pos1, mountains[i].x_pos2,
			mountains[i].y_pos2, mountains[i].x_pos3 - 10, mountains[i].y_pos3);
	}
}

// Function to draw trees objects.
function drawTrees()
{
	for(var i = 0; i < trees_x.length ; i++)
		{
			fill(160, 92, 55);
			rect(trees_x[i], floorPos_y - 100, 40, 100);

			fill(0,155,0);
			ellipse(trees_x[i] + 20, floorPos_y - 90, 100, 100);
			ellipse(trees_x[i] + 50, floorPos_y - 90, 80, 80);
			ellipse(trees_x[i] - 10, floorPos_y - 90, 80, 80);
			ellipse(trees_x[i] + 45, floorPos_y - 110, 80, 80);
			ellipse(trees_x[i] + 10, floorPos_y - 100, 100);
		}

}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
	fill(244, 164, 96)
	rect(t_canyon.x_pos + 10, 432, t_canyon.width + 20, 200);
	fill(165, 42, 42);
	rect(t_canyon.x_pos + 20, 432, t_canyon.width, 200);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
	if((gameChar_world_x < t_canyon.x_pos + 100 && gameChar_y >= floorPos_y) && (gameChar_world_x> t_canyon.x_pos && gameChar_y >= floorPos_y ))
	{
		isPlummeting = true;
		gameChar_y += 15;

	}
	else
	{
		isPlummeting = false;
	}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
	fill(255, 215, 0);
	ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size - 30)

	fill(255, 180, 0);
	ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size - 35);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
	distance =  dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos)

	if(distance <= t_collectable.size)
	{
		t_collectable.isFound = true;
		console.log("Triggered")
		game_score += 1;
	}
}

function renderFlasgpole()
{
	push();
	stroke(150);
	strokeWeight(5);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 100);
	pop();

	if(flagpole.isReached)
	{
		noStroke();
		fill(255, 0, 120);
		rect(flagpole.x_pos, floorPos_y - 100, 20, 20);

		return
	}
	else
	{
		noStroke();
		fill(255, 0, 120);
		rect(flagpole.x_pos - 20, floorPos_y - 100, 20, 20);
	}

}

function checkFlagPole()
{

	distance = gameChar_world_x - flagpole.x_pos;
	distance = abs(distance);

	if(distance < 5)
	{
		flagpole.isReached = true;
	}

}

//Function for Left Movement
function isLeftM()
{
	if(isPlummeting)
	{
		return
	}
	if(isLeft)
	{
		
		
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 4;
		}
		else
		{
			scrollPos += 4;
		}
		
	}
}

//Function to Check If player Has died
function checkPlayerDie()
{
	if(gameChar_y > width)
	{
		isDead = true;
		Lives -= 1;
		
		if(Lives > 0)
		{
			startGame();
		}
	}

	
}

//Function to Start The Game
function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
	trees_x = [100, 500, 870, 1350, 1700, 2100, 2500]

	//Collectables
	collectables = [{x_pos: 600, y_pos: 422, size: 50,isFound: false},
					{x_pos: 987, y_pos: 422, size: 50,isFound: false},
					{x_pos: 1242, y_pos: 422, size: 50,isFound: false},
					{x_pos: 1242 + 487, y_pos: 422, size: 50,isFound: false},
					{x_pos: 1242 + 255, y_pos: 422, size: 50,isFound: false}
					]

	//clouds Array
	clouds = [{x_pos: 150, y_pos: 150,}, {x_pos: 450,y_pos: 50,}, {x_pos: 750,y_pos: 100},
			  {x_pos: 1050, y_pos: 150}, {x_pos: 1350,y_pos: 50}, {x_pos: 1650,y_pos: 100}]

	//Mountain Array
	mountains = [{x_pos1: 200, y_pos1: 288, x_pos2: 140, y_pos2: 432, x_pos3: 290, y_pos3:432},
				 {x_pos1: 820, y_pos1: 288, x_pos2: 760, y_pos2: 432, x_pos3: 910, y_pos3:432},
				 {x_pos1: 820 + 620, y_pos1: 288, x_pos2: 760 + 620, y_pos2: 432, x_pos3: 910 + 620, y_pos3:432},]

	//Canyon
	canyons =  [{x_pos: 310, width: 100},
				{x_pos: 610, width: 100},
				{x_pos: 610 + 300, width: 100},
				{x_pos: 610 + 600, width: 100},
				{x_pos: 610 + 900, width: 100},
				{x_pos: 610 + 1300, width: 100}
				]


	game_score = 0;
	isDead = false;

	//Flag Pole
	flagpole = {x_pos: 2500,
				isReached: false
			}
}

