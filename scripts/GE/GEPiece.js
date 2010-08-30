/**
 * Generic GameEngine Game Piece
 * Provides for drawing and moving a simple, game piece object
 * 
 * @constructor
 *
 * @param {int} aPieceIdx Game piece index
 */
function GEPiece
	(
	aPieceIdx
	)
{
	// Variables
	this.mPieceIdx = aPieceIdx;
	this.mRect = new rect( 20, 20, 40, 40 );
	this.mBackgroundColor = "red";

}

GEPiece.prototype = new GEObject();
GEPiece.prototype.constructor = GEPiece;
GEPiece.prototype.baseClass = GEObject;
GEPiece.prototype.generate_piece = generate_piece;
GEPiece.prototype.move_piece = move_piece;
GEPiece.prototype.move_piece_to_coords = move_piece_to_coords;
GEPiece.prototype.get_piece_div = get_piece_div;
GEPiece.prototype.get_current_region = get_current_region;
GEPiece.prototype.get_center_coord = get_center_coord;
GEPiece.prototype.move_to_region = move_to_region;

/**
 * Get Game Piece Div ID
 * {return} Piece Div ID
 */
function get_piece_div()
{
	return "d_piece_" + this.mPieceIdx;
}

/**
 * Generate Piece HTML from object properties
 * @return {string} Piece HTML
 */
function generate_piece()
{
	return this.get_div_html( this.get_piece_div(), "" );
}

/**
 * Move piece to position in mRect
 */
function move_piece()
{
	document.getElementById( this.get_piece_div() ).style.left = this.mRect.left + "px";
	document.getElementById( this.get_piece_div() ).style.top = this.mRect.top + "px";
	document.getElementById( this.get_piece_div() ).style.width = this.mRect.w + "px";
	document.getElementById( this.get_piece_div() ).style.height = this.mRect.h + "px";
}

/*
 * Move piece to specific coordinates
 *
 * @param {coord} aCoord Desired piece coordinates
 */
function move_piece_to_coords
	(
	aCoord
	)
{
	this.mRect.left = aCoord.left;
	this.mRect.top = aCoord.top;
	this.move_piece();
}

/**
 * Move game piece to a specific region
 *
 * @param {int} aRegionIdx Region index
 */
function move_to_region
	(
	aRegionIdx
	)
{
	// Get rectangle of region
	var regionRect = gBoard.mRegionList[aRegionIdx].mRect;

	// Find coordinates in the center of the region
	var regionCoords = new coord(
								regionRect.left + regionRect.w / 2,
								regionRect.top + regionRect.h / 2
								);
	regionCoords = gBoard.local_to_global_coord( regionCoords );
	this.mRect.left = regionCoords.left;
	this.mRect.top = regionCoords.top;
			
	// Move game piece
	this.move_piece();
}

/**
 * Get current region of game piece
 * @return {int} Current region of game piece
 */
function get_current_region()
{
	var regionCnt = gBoard.mRegionList.length;
	
	for( var regionIdx = 0; regionIdx < regionCnt; regionIdx++ )
	{
		var globalCoord = gBoard.global_to_local_coord( this.get_center_coord() );
			
		if( is_coord_in_rect( globalCoord, gBoard.mRegionList[regionIdx].mRect ) )
		{
			return regionIdx;
		}
	}
	return -1;
}

/**
 * Get center coordinate of game piece
 * @return {coord} Center coordinate of game piece
 */
function get_center_coord()
{
	var centerX = this.mRect.left + this.mRect.w / 2;
	var centerY = this.mRect.top + this.mRect.h / 2;
	
	return new coord( centerX, centerY );
}