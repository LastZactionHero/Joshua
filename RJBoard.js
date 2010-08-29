//----------------------------------------------------------------
//
//  Rejeweled Game Board
//
//----------------------------------------------------------------

//
//  Constructor
//
RJBoard.prototype = new GEBoard();
RJBoard.prototype.constructor = RJBoard;
RJBoard.prototype.baseClass = GEBoard.prototype.constructor;
function RJBoard( aDiv )
{
	this.mDiv = aDiv;
	
	// Override default baord size
	this.boardHeight = 400;
	this.boardWidth = 400;
	this.mRect = new rect( 
			( getWindowWidth() - this.boardWidth ) / 2,
			25,
			this.boardWidth,
			this.boardHeight
			);

	// Board Regions
	this.mRegionWidth = 8;
	this.mRegionHeight = 8;
	this.mRegionWidthPx = this.mRect.w / this.mRegionWidth;
	this.mRegionHeightPx = this.mRect.h / this.mRegionHeight;
	
	this.mRegionList = new Array();
	for( var i = 0; i < this.mRegionWidth * this.mRegionHeight; i++ )
	{
		this.mRegionList[i] = new RJRegion( i );
	}

	// Color
	this.mBackgroundColor = "white";
	this.mBorderColor = "black";
	this.mBorderWidth = 10;
}