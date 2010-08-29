//----------------------------------------------------------------
//
//  Game Piece
//
//----------------------------------------------------------------

//
//  Constructor
//
GEPiece.prototype = new GEObject();
GEPiece.prototype.constructor = GEPiece;
GEPiece.prototype.baseClass = GEObject;
GEPiece.prototype.draw_piece = draw_piece;
GEPiece.prototype.move_piece = move_piece;
GEPiece.prototype.move_piece_to_coords = move_piece_to_coords;
GEPiece.prototype.get_piece_div = get_piece_div;
GEPiece.prototype.get_current_region = get_current_region;
GEPiece.prototype.get_center_coord = get_center_coord;
GEPiece.prototype.move_to_region = move_to_region;

function GEPiece
	(
	pieceIdx
	)
{
	// Parent
	//this.inheritFrom = GEObject;
	
	// Functions
	//this.draw_piece = draw_piece;
	//this.move_piece = move_piece;
	//this.move_piece_to_coords = move_piece_to_coords;
	//this.get_piece_div = get_piece_div;
	//this.get_current_region = get_current_region;
	//this.get_center_coord = get_center_coord;
	//this.move_to_region = move_to_region;
	
	// Variables
	this.mPieceIdx = pieceIdx;
	this.mRect = new rect( 20, 20, 40, 40 );
	this.mBackgroundColor = "transparent";
	this.mBackgroundImage = "url( 'img_piece.gif' )";

}

//
//  Get Piece Div Name
//
function get_piece_div()
{
	return "d_piece_" + this.mPieceIdx;
}

//
//  Draw Piece
//
function draw_piece()
{
	return this.get_div_html( this.get_piece_div(), "" );
}

//
//  Move Piece Div
//
function move_piece()
{
	document.getElementById( this.get_piece_div() ).style.left = this.mRect.x + "px";
	document.getElementById( this.get_piece_div() ).style.top = this.mRect.y + "px";
	document.getElementById( this.get_piece_div() ).style.width = this.mRect.w + "px";
	document.getElementById( this.get_piece_div() ).style.height = this.mRect.h + "px";
}

//
//  Move Piece to Coordinates
//
function move_piece_to_coords
	(
	aCoord
	)
{
	this.mRect.x = aCoord.x;
	this.mRect.y = aCoord.y;
	this.move_piece();
}

//
//  Move to Region
//
function move_to_region
	(
	aRegionIdx
	)
{
	var regionRect = gBoard.mRegionList[aRegionIdx].mRect;

	var regionCoords = new coord(
								regionRect.x + regionRect.w / 2,
								regionRect.y + regionRect.h / 2
								);
	regionCoords = gBoard.local_to_global_coord( regionCoords );
	this.mRect.x = regionCoords.x;
	this.mRect.y = regionCoords.y;
			
	this.move_piece();
}

//
//  Get Current Piece Region
//
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

//
//  Get piece center coordinate
//
function get_center_coord()
{
	var centerX = this.mRect.x + this.mRect.w / 2;
	var centerY = this.mRect.y + this.mRect.h / 2;
	
	return new coord( centerX, centerY );
}