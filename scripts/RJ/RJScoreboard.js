/**
 * Rejeweled Scoreboard
 *
 * @constructor
 *
 * @param {int} aDivId Scoreboard Div ID
 */
function RJScoreboard
	(
	aDivId
	)
{	
	// Variables
	this.mDivId = aDivId;
	this.mScore = 0;
	
	this.mRect = new rect
		(
		gBoard.mRect.x - gBoard.mBorderWidth + 2,
		gBoard.mRect.y + gBoard.mRect.h + gBoard.mBorderWidth + 20,
		gBoard.mRect.w,
		50		
		)
		
	this.mBorderWidth = gBoard.mBorderWidth;
}

RJScoreboard.prototype = new GEScoreboard();
RJScoreboard.prototype.constructor = RJScoreboard;
RJScoreboard.prototype.baseClass = GEScoreboard;
RJScoreboard.prototype.add_moves = add_moves;

/**
 * Increment score with new moves
 *
 * @param {int} aMoves Count of new moves
 */
function add_moves
	(
	aMoves
	)
{
	if( aMoves == 0 )
		return;

	var power = aMoves / 3;
	var score = Math.pow( aMoves, power ) * 100;
	score = Math.floor( score );
	
	this.increment_scoreboard( score );
}