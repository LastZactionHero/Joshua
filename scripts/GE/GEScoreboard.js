/**
 * Generic GameEngine Scoreboard
 * Maintains and draws current score
 *
 * @constructor
 *
 * @param {string} aDivId Scoreboard Div ID
 */
function GEScoreboard
	(
	aDivId
	)
{	
	// Variables
	this.mDivId = aDivId;
	this.mScore = 0;
	this.mBackgroundColor = "white";
	this.mBackgroundImage = "";
	this.mBorderColor = "black";
	this.mBorderWidth = 1;
	
	this.mRect = new rect
		(
		0,
		0,
		200,
		25
		);

}

GEScoreboard.prototype = new GEObject();
GEScoreboard.prototype.constructor = GEScoreboard;
GEScoreboard.prototype.baseClass = GEObject;
GEScoreboard.prototype.draw_scoreboard = draw_scoreboard;
GEScoreboard.prototype.update_scoreboard = update_scoreboard;
GEScoreboard.prototype.increment_scoreboard = increment_scoreboard;

/**
 * Draw scoreboard to scoreboard div
 */
function draw_scoreboard()
{
	var scoreboardHTML = "<center>" + this.mScore + "</center>"
	scoreboardHTML = this.get_div_html( this.mDivId, scoreboardHTML );
	document.getElementById( this.mDivId ).innerHTML = scoreboardHTML;
}

/**
 * Update score and redraw
 *
 * @param {int} aScore Current score
 */
function update_scoreboard
	(
	aScore
	)
{
	this.mScore = aScore;
	this.draw_scoreboard();
}

/**
 * Increment score by value and redraw
 *
 * @param {int} aIncrement Increment amount
 */
function increment_scoreboard
	(
	aIncrement
	)
{
	this.update_scoreboard( this.mScore + aIncrement );
}