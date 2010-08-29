//----------------------------------------------------------------
//
//  Game Piece Box
//
//----------------------------------------------------------------

//
//  Constructor
//
GEPieceBox.prototype.draw_pieces = draw_pieces;
GEPieceBox.prototype.get_piece_at_coord = get_piece_at_coord;
GEPieceBox.prototype.get_pieces_in_region = get_pieces_in_region;
GEPieceBox.prototype.init_pieces = init_pieces;
GEPieceBox.prototype.handle_mouse_move = handle_mouse_move;
GEPieceBox.prototype.handle_mouse_down = handle_mouse_down;
GEPieceBox.prototype.handle_mouse_up = handle_mouse_up;
function GEPieceBox
	(
	a_div
	)
{
	// Parent
	//this.inheritFrom = GEObject;
	
	// Functions
	//this.draw_pieces = draw_pieces;
	
	// Functions: Piece Management
	//this.get_piece_at_coord = get_piece_at_coord;
	//this.get_pieces_in_region = get_pieces_in_region;
	//this.init_pieces = init_pieces;
	
	// Functions: Mouse Events
	//this.handle_mouse_move = handle_mouse_move;
	//this.handle_mouse_down = handle_mouse_down;
	//this.handle_mouse_up = handle_mouse_up;
	
	
	// Variables
	this.mPieceDiv = a_div;
	this.mPieceList = new Array();
	for( i = 0; i < 10; i++ )
	{
		this.mPieceList[i] = new GEPiece( i );
	}
	
	// Variables: Piece Movement
	this.mSelectedPiece = null;
	this.mSelectedPieceStartCoord = new coord( 0, 0 );
}

//
//  Draw Pieces
//
function draw_pieces()
{
	var pieceHtml = "";

	for( var i = 0; i < this.mPieceList.length; i++ )
	{
		pieceHtml += this.mPieceList[i].draw_piece();
	}
	
	document.getElementById( this.mPieceDiv ).innerHTML = pieceHtml;
}

//
//  Get Piece At Coordinates
//
function get_piece_at_coord( aCoord )
{
	for( var i = 0; i < this.mPieceList.length; i++ )
	{
		var currentPiece = this.mPieceList[i];
		//alert( i + " " + aCoord.x + " " + aCoord.y + " " + this.mPieceList[i].mRect.print() );
		if( is_coord_in_rect( aCoord, currentPiece.mRect ) )
		{
			return currentPiece;
		}
	}
	return null;
}

//
//  Get Piece in Region
//
function get_pieces_in_region( aRegionIdx )
{
	var ret = new Array();
	
	for( var pieceIdx = 0; pieceIdx < this.mPieceList.length; pieceIdx++ )
	{
		if( this.mPieceList[pieceIdx].get_current_region() == aRegionIdx )
		{
			ret[ret.length] = this.mPieceList[pieceIdx];
		}
	}
	
	return ret;
}

//
//  Handle Mouse Move Event
//
function handle_mouse_move(event)
{	
	if( this.mSelectedPiece )
	{
		// Get piece dimensions
		var pieceWidth = this.mSelectedPiece.mRect.w;
		var pieceHeight = this.mSelectedPiece.mRect.h;
		
		// Set piece coordinates
		var moveCoord = new coord(
							event.clientX - pieceWidth / 2,
							event.clientY - pieceHeight / 2
							);
							
		this.mSelectedPiece.move_piece_to_coords( moveCoord );
	}
}

//
//  Handle Mouse Up Event
//
function handle_mouse_up(event)
{	
	// Bail if no piece selected
	if( !this.mSelectedPiece )
	{
		return;
	}
	
	// Validate move
	if( !gRulebook.validate_board() )
	{
		// Move is invalid. Revert to original position
		this.mSelectedPiece.move_piece_to_coords( this.mSelectedPieceStartCoord );
	}
	
	// Arrange pieces
	gBoard.cleanup_board();
	
	// Clear Selected Piece
	this.mSelectedPiece = null;
	this.mSelectedPieceStartCoord = new coord( 0, 0 );
}

//
//  Handle Mouse Down Event
//
function handle_mouse_down(event)
{
	// Get mouse position
	var mouseCoord = new coord( event.clientX, event.clientY );
	
	// Determine selected piece
	this.mSelectedPiece = this.get_piece_at_coord( mouseCoord );
	
	// Store the current piece coordinate incase the 
	// attempted move is invalid
	if( this.mSelectedPiece )
	{
		this.mSelectedPieceStartCoord = new coord( 
												  this.mSelectedPiece.mRect.x, 
												  this.mSelectedPiece.mRect.y 
												  );
	}
}

//
//  Initialize Pieces
//
function init_pieces()
{

}