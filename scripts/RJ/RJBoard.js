/**
 * Rejeweled Game Board
 *
 * @constructor
 *
 * @param {string} aDiv Game board Div ID
 */
function RJBoard
	( 
	aDiv 
	)
{
	this.mDiv = aDiv;
	
	// Set up game board size
	this.boardHeight = 400;
	this.boardWidth = 400;
	this.mRect = new rect( 
			( getWindowWidth() - this.boardWidth ) / 2,
			25,
			this.boardWidth,
			this.boardHeight
			);

	// Set up game board region
	this.mRegionWidth = 8;
	this.mRegionHeight = 8;
	this.mRegionWidthPx = this.mRect.w / this.mRegionWidth;
	this.mRegionHeightPx = this.mRect.h / this.mRegionHeight;
	
	this.mRegionList = new Array();
	for( var i = 0; i < this.mRegionWidth * this.mRegionHeight; i++ )
	{
		this.mRegionList[i] = new RJRegion( i );
	}

	// Set up game board color
	this.mBackgroundColor = "white";
	this.mBorderColor = "black";
	this.mBorderWidth = 10;
}

RJBoard.prototype = new GEBoard();
RJBoard.prototype.constructor = RJBoard;
RJBoard.prototype.baseClass = GEBoard.prototype.constructor;