//----------------------------------------------------------------
//
//  Game Board
//
//----------------------------------------------------------------

//
//  Constructor
//
GEBoard.prototype = new GEObject();
GEBoard.prototype.constructor = GEBoard;
GEBoard.prototype.baseClass = GEObject.prototype.constructor;
GEBoard.prototype.draw = draw;
GEBoard.prototype.buildRegionHtml = buildRegionHtml;
GEBoard.prototype.global_to_local_coord = global_to_local_coord;
GEBoard.prototype.local_to_global_coord = local_to_global_coord;
GEBoard.cleanup_board = cleanup_board;
function GEBoard( aDiv )
{
	// Parent
	//this.inheritFrom( GEObject );
	
	// Functions
	this.draw = draw;
	this.buildRegionHtml = buildRegionHtml;
	this.global_to_local_coord = global_to_local_coord;
	this.local_to_global_coord = local_to_global_coord;
	this.cleanup_board = cleanup_board;
	
	// Variables
	// Board Style
	this.boardHeight = 400;
	this.boardWidth = 600;
	
	this.mDiv = aDiv;
	this.mRect = new rect( 
			( getWindowWidth() - this.boardWidth ) / 2,
			( getWindowHeight() - this.boardHeight ) / 2,
			this.boardWidth,
			this.boardHeight
			);
	//this.mBorderWidth = 0;
	
	// Board Regions
	this.mRegionWidth = 6;
	this.mRegionHeight = 4;
	this.mRegionWidthPx = this.mRect.w / this.mRegionWidth;
	this.mRegionHeightPx = this.mRect.h / this.mRegionHeight;
	
	this.mRegionList = new Array();
	for( x_idx = 0; x_idx < this.mRegionWidth; x_idx++ )
	{
		for( y_idx = 0; y_idx < this.mRegionHeight; y_idx++ )
		{
			regionIdx = y_idx * this.mRegionWidth + x_idx;
			this.mRegionList[regionIdx] = new GERegion( regionIdx );
		}
	}	
}

//
//  Draw
//  Draw Game Board
//
function draw()
{
	// Set board position
	document.getElementById( this.mDiv ).style.width = this.mRect.w + "px";
	document.getElementById( this.mDiv ).style.height = this.mRect.h + "px";

	document.getElementById( this.mDiv ).style.left = this.mRect.x + "px";	
	document.getElementById( this.mDiv ).style.top = this.mRect.y + "px";
	
	// Set board style
	document.getElementById( this.mDiv ).style.background = this.mBackgroundColor;	
	document.getElementById( this.mDiv ).style.borderColor = this.mBorderColor;
	document.getElementById( this.mDiv ).style.borderWidth = this.mBorderWidth + "px";
	document.getElementById( this.mDiv ).style.borderStyle = this.mBorderStyle;
	
	// Draw Board Regions	
	var regionHTML = "";
	for( var x_idx = 0; x_idx < this.mRegionWidth; x_idx++ )
	{
		for( var y_idx = 0; y_idx < this.mRegionHeight; y_idx++ )
		{
			regionHTML += this.buildRegionHtml( x_idx, y_idx );
		}
	}
	document.getElementById( this.mDiv ).innerHTML = regionHTML;
}

//
// Build Region HTML
//
function buildRegionHtml
	(
	x_idx,
	y_idx
	)
{	
	var regionLeft = x_idx * this.mRegionWidthPx;//this.mBorderWidth;
	var regionTop = y_idx * this.mRegionHeightPx;// this.mBorderWidth;
	
	var regionIdx = y_idx * this.mRegionWidth + x_idx;
	var ret = this.mRegionList[regionIdx].draw_region( regionLeft, regionTop, this.mRegionWidthPx, this.mRegionHeightPx );
	return ret;
}

//
//  Global Coord to Board Coord
//
function global_to_local_coord
	(
	aCoord
	)
{
	return new coord( aCoord.x - this.mRect.x, aCoord.y - this.mRect.y );
}

//
//  Board Coord to Global Coord
//
function local_to_global_coord
	(
	aCoord
	)
{
	return new coord( aCoord.x + this.mRect.x, aCoord.y + this.mRect.y );
}

//
//  Clean up board and arrange pieces
//
function cleanup_board()
{
	for( var i = 0; i < this.mRegionList.length; i++ )
	{
		// Clean up each region
		this.mRegionList[i].cleanup_region();
	}
}