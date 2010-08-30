/**
 * Generic GameEngine Board
 * Contains and organizes regions and draws to board div
 * Inherits from GameObject
 *
 * @constructor
 * @param {string} aDiv Board Div ID
 */
function GEBoard
	( 
	aDiv 
	)
{	
	// Variables
	this.mDiv = aDiv; // Board Div ID
	
	// Variables
	// Board Shape
	this.boardWidth = 600; // Default board width
	this.boardHeight = 400; // Default board height

	this.mRect = new rect( 
			( getWindowWidth() - this.boardWidth ) / 2,
			( getWindowHeight() - this.boardHeight ) / 2,
			this.boardWidth,
			this.boardHeight
			);
	this.mRect.floor_rect();
	
	// Board Regions
	this.mRegionWidth = 6;
	this.mRegionHeight = 4;
	this.mRegionWidthPx = this.mRect.w / this.mRegionWidth;
	this.mRegionHeightPx = this.mRect.h / this.mRegionHeight;	
		
	// Construct region
	this.mRegionList = new Array();
	for( x_idx = 0; x_idx < this.mRegionWidth; x_idx++ )
	{
		for( y_idx = 0; y_idx < this.mRegionHeight; y_idx++ )
		{
			regionIdx = y_idx * this.mRegionWidth + x_idx;
			this.mRegionList[regionIdx] = new GERegion( regionIdx );
		}
	}	

	// Adjust mRect for IE
	if( browser_detect() == "MSIE" )
	{
		this.mRect.w = this.mRect.w + this.mBorderWidth * 2;
		this.mRect.h = this.mRect.h + this.mBorderWidth * 2;
	}	
}

GEBoard.prototype = new GEObject();
GEBoard.prototype.constructor = GEBoard;
GEBoard.prototype.baseClass = GEObject.prototype.constructor;
GEBoard.prototype.draw_board = draw_board;
GEBoard.prototype.build_region_html = build_region_html;
GEBoard.prototype.global_to_local_coord = global_to_local_coord;
GEBoard.prototype.local_to_global_coord = local_to_global_coord;
GEBoard.prototype.cleanup_board = cleanup_board;

/**
 * Draw Game Board
 */
function draw_board()
{
	// Set board position
	document.getElementById( this.mDiv ).style.width = this.mRect.w + "px";
	document.getElementById( this.mDiv ).style.height = this.mRect.h + "px";

	document.getElementById( this.mDiv ).style.left = this.mRect.left + "px";	
	document.getElementById( this.mDiv ).style.top = this.mRect.top + "px";
	
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
			regionHTML += this.build_region_html( x_idx, y_idx );
		}
	}
	document.getElementById( this.mDiv ).innerHTML = regionHTML;
}

/**
 * Build board region html
 *
 * @param {int} aX X coordinate of region
 * @param {int} aY Y coordinate of region
 * @return {string} HTML for region div
 */
function build_region_html
	(
	aX,
	aY
	)
{	
	var regionLeft = aX * this.mRegionWidthPx;
	var regionTop = aY * this.mRegionHeightPx;
		
	var regionIdx = aY * this.mRegionWidth + aX;
	var ret = this.mRegionList[regionIdx].generate_region( new rect( regionLeft, regionTop, this.mRegionWidthPx, this.mRegionHeightPx ) );
	return ret;
}

/**
 * Convert global coordinates into local board coordinates
 *
 * @param {coord} aCoord Global coordinates
 * @return {coord} Local coordinates
 */
function global_to_local_coord
	(
	aCoord
	)
{
	return new coord( aCoord.left - this.mRect.left, aCoord.top - this.mRect.top );
}

/** 
 * Convert local board coordinates into global coordinates
 * 
 * @param {coord} aCoord Local board coordinates
 * @return {coord} Global coordinates
 */
function local_to_global_coord
	(
	aCoord
	)
{
	return new coord( aCoord.left + this.mRect.left, aCoord.top + this.mRect.top );
}

/**
 * Cleanup game board regions
 */
function cleanup_board()
{
	for( var i = 0; i < this.mRegionList.length; i++ )
	{
		// Clean up each region
		this.mRegionList[i].cleanup_region();
	}
}