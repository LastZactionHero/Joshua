//----------------------------------------------------------------
//
//  Rejeweled Scoreboard
//
//----------------------------------------------------------------

//
//  Constructor
//
RJScoreboard.prototype = new GEScoreboard();
RJScoreboard.prototype.constructor = RJScoreboard;
RJScoreboard.prototype.baseClass = GEScoreboard;
RJScoreboard.prototype.add_moves = add_moves;

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

//
//  Add Number of Moves to Score
//
function add_moves
	(
	aMoves
	)
{
	if( aMoves == 0 )
		return;

	var power = Math.floor( aMoves / 3 );
	var score = Math.pow( aMoves, power ) * 100;
	
	this.increment_scoreboard( score );
}