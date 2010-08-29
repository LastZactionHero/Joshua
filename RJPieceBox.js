//----------------------------------------------------------------
//
//  Rejeweled Piece Box
//
//----------------------------------------------------------------

//
//  Constructor
//
RJPieceBox.prototype = new GEPieceBox();
RJPieceBox.prototype.constructor = RJPieceBox;;
RJPieceBox.prototype.baseClass = GEPieceBox;
RJPieceBox.prototype.init_pieces = init_pieces;
RJPieceBox.prototype.handle_mouse_down = handle_mouse_down;
RJPieceBox.prototype.handle_mouse_up = handle_mouse_up;
RJPieceBox.prototype.handle_mouse_move = handle_mouse_move;
RJPieceBox.prototype.are_regions_adjacent = are_regions_adjacent;
RJPieceBox.prototype.detect_moves = detect_moves;
RJPieceBox.prototype.perform_drop = perform_drop;
RJPieceBox.prototype.undo_swap = undo_swap;

//
//  Constructor
//
function RJPieceBox
	(
	a_div
	)
{
	this.mPieceDiv = a_div;

	// Functions
	
	// Variables: Movement
	this.mSelectedIdx1 = -1;
	this.mSelectedIdx2 = -1;
	this.mUndoIdx1 = -1;
	this.mUndoIdx2 = -1;
	this.mClickable = true;
	this.mFirstMove = true;
	
	// Variables: Pieces
	this.mPieceList = new Array();
	for( var i = 0; i < gBoard.mRegionWidth * gBoard.mRegionHeight; i++ )
	{
		var pieceColor = Math.floor( Math.random() * 7 );
		this.mPieceList[i] = new RJPiece( i, pieceColor );
	}
}

//
//  Initialize Pieces
//
function init_pieces()
{
	for( var i = 0; i < this.mPieceList.length; i++ )
	{
		this.mPieceList[i].move_to_region( i );
	}
	gBoard.cleanup_board();
	this.perform_drop();
}

//
//  Handle Mouse Up Event
//
function handle_mouse_up(event)
{	

}

//
//  Handle Mouse Down Event
//
function handle_mouse_down(event)
{	
	// Bail out if we are not in clickable state, like animation
	if( !this.mClickable )
		return;
		
	// Get mouse coordinates
	var mouseCoord = new coord( event.clientX, event.clientY );
	
	// Get piece at coordinates, bail if invalid
	var selectedPiece = this.get_piece_at_coord( mouseCoord );
	if( !selectedPiece )
		return;
		
	// Get the region of the selected piece, bail if invalid
	var selectedRegionIdx = selectedPiece.get_current_region();
	if( selectedRegionIdx < 0 || selectedRegionIdx >= 	gBoard.mRegionWidth * gBoard.mRegionHeight )
		return;
		
	// Store selected region
	if( this.mSelectedIdx1 == -1 )
	{
		this.mSelectedIdx1 = selectedRegionIdx;
		this.mPieceList[this.mSelectedIdx1].set_selected( true );
	}
	else if( this.mSelectedIdx2 == -1 )
	{
		this.mSelectedIdx2 = selectedRegionIdx;
		this.mPieceList[this.mSelectedIdx2].set_selected( true );
	}
	else
	{
		alert( "ASSERT: Both regions selected." );
		this.mSelectedIdx1 = -1;
		this.mSelectedIdx2 = -1;
	}
	
	// If a start and end region were selected, determine if
	// they are adjacent
	if( this.mSelectedIdx1 >= 0 && this.mSelectedIdx2 >= 0 )
	{
		this.mFirstMove = false;
		
		if( this.are_regions_adjacent( this.mSelectedIdx1, this.mSelectedIdx2 ) )
		{
			// No longer clickable until animations have completed
			this.mClickable = false;
			
			// Swap regions
			var pieceIdx1 = this.get_pieces_in_region( this.mSelectedIdx1 )[0].mPieceIdx;
			var pieceIdx2 = this.get_pieces_in_region( this.mSelectedIdx2 )[0].mPieceIdx;
			var color1 = this.get_pieces_in_region( this.mSelectedIdx1 )[0].mColor;
			var color2 = this.get_pieces_in_region( this.mSelectedIdx2 )[0].mColor;
			this.mPieceList[pieceIdx1].update_color( color2 );
			this.mPieceList[pieceIdx2].update_color( color1 );
			
			// Redraw
			this.draw_pieces();
			
			// Determine if moves were formed
			var moveList = this.detect_moves();
			if( moveList.length > 0 )
			{
				setTimeout( "gPieceBox.perform_drop()", 200 );
			}
			else
			{
				// Undo swap
				this.mUndoIdx1 = this.mSelectedIdx1;
				this.mUndoIdx2 = this.mSelectedIdx2;
				setTimeout( "gPieceBox.undo_swap()", 200 );
			}
		}
		else
		{
			this.draw_pieces();
		}

		this.mSelectedIdx1 = -1;
		this.mSelectedIdx2 = -1;
	}
}

//
//  Handle Mouse Move Event
//
function handle_mouse_move(event)
{

}

//
//  Undo Piece Swap
//
function undo_swap()
{
	// Swap
	var pieceIdx1 = this.get_pieces_in_region( this.mUndoIdx1 )[0].mPieceIdx;
	var pieceIdx2 = this.get_pieces_in_region( this.mUndoIdx2 )[0].mPieceIdx;
	var color1 = this.get_pieces_in_region( this.mUndoIdx1 )[0].mColor;
	var color2 = this.get_pieces_in_region( this.mUndoIdx2 )[0].mColor;
	this.mPieceList[pieceIdx1].update_color( color2 );
	this.mPieceList[pieceIdx2].update_color( color1 );
	
	// Draw and activate clicking
	this.draw_pieces();
	this.mClickable = true;
	
	// Play error sound
	gSound.play_sound( SoundTypes.SOUND_ERROR );
}

//
//  Determine if regions are adjacent
//
function are_regions_adjacent
	(
	aRegionIdx1,
	aRegionIdx2
	)
{
	var boardWidth = gBoard.mRegionWidth;
	
	if( ( aRegionIdx1 == aRegionIdx2 + 1 && aRegionIdx1 % boardWidth != 0 ) ||
		( aRegionIdx1 == aRegionIdx2 - 1 && aRegionIdx2 % boardWidth != 0 ) ||
		( aRegionIdx1 == aRegionIdx2 + boardWidth ) ||
		( aRegionIdx1 == aRegionIdx2 - boardWidth ) )
	{
		return true;
	}
	else
	{
		return false;
	}
}

//
//  Detect if the board has any valid moves
//
function detect_moves()
{
	var moveList = new Array();
	
	var boardWidth = gBoard.mRegionWidth;
	var boardHeight = gBoard.mRegionHeight;
	
	// Search board for horizontal runs
	for( var rowIdx = 0; rowIdx < boardHeight; rowIdx++ )
	{
		var runColor = -1;
		var runLen = 1;
		for( var colIdx = 0; colIdx < boardWidth; colIdx++ )
		{
			// Get piece in the current region
			var regionIdx = rowIdx * boardWidth + colIdx;
			//var pieceInRegion = this.get_pieces_in_region( regionIdx );
			
			// Get the piece color
			var curColor = this.mPieceList[regionIdx].mColor;
			//var curColor = pieceInRegion[0].mColor;
			
			// If the piece color matches the current run, increment
			if( curColor == runColor )
			{
				runLen++;
			}
			// If not, kill the run. Determine if a move exists
			
			if( curColor != runColor ||
				colIdx == boardWidth - 1 )
			{
				// Determine if last run was long enough for a move 
				if( runLen >= 3 )
				{
					var offset = ( colIdx == boardWidth - 1 ) ? 1 : 0;
						
					// Add pieces from this run into the move list
					for( var runIdx = 0; runIdx < runLen; runIdx++ )
					{
						moveList[moveList.length] = this.mPieceList[regionIdx - runLen + runIdx + offset];
						//moveList[moveList.length] = this.get_pieces_in_region( regionIdx - runLen + runIdx + offset )[0];
					}
				}
				
				// Reset run
				runLen = 1;
				runColor = curColor;
			}
		}
	}
	
	// Search board for vertical runs
	for( var colIdx = 0; colIdx < boardWidth; colIdx++ )
	{
		var runColor = -1;
		var runLen = 1;
		for( var rowIdx = 0; rowIdx < boardHeight; rowIdx++ )
		{
			// Get piece in the current region
			var regionIdx = rowIdx * boardWidth + colIdx;
			//var pieceInRegion = this.get_pieces_in_region( regionIdx );
			
			// Get the piece color
			//var curColor = pieceInRegion[0].mColor;
			var curColor = this.mPieceList[regionIdx].mColor;
			
			// If the piece color matches the current run, increment
			if( curColor == runColor )
			{
				runLen++;
			}
			// If not, kill the run. Determine if a move exists
			
			if( curColor != runColor ||
				rowIdx == boardHeight - 1 )
			{
				// Determine if last run was long enough for a move 
				if( runLen >= 3 )
				{
					var offset = ( rowIdx == boardHeight - 1 ) ? 1 : 0;
					
					// Add pieces from this run into the move list
					for( var runIdx = 0; runIdx < runLen; runIdx++ )
					{
						//moveList[moveList.length] = this.get_pieces_in_region( regionIdx - ( runLen - runIdx - offset ) * boardWidth )[0];
						moveList[moveList.length] = this.mPieceList[regionIdx - ( runLen - runIdx - offset ) * boardWidth];
					}
				}
				
				// Reset run
				runLen = 1;
				runColor = curColor;
			}
		}
	}
	
	// Return total move list
	return moveList;
}

//
//  Perform Drop
//
function perform_drop()
{
	var boardWidth = gBoard.mRegionWidth;

	var moveList = this.detect_moves();

	// For each piece in the list, move
	// every piece above it down one
	for( var moveIdx = 0; moveIdx < moveList.length; moveIdx++ )
	{
		// Get index of removed piece and the piece above it
		var pieceIdx = moveList[moveIdx].mPieceIdx;
		var pieceAboveIdx = pieceIdx - boardWidth;
		var count = 0;
		while( pieceAboveIdx >= 0 )
		{
			// Get color of above piece
			var aboveColor = this.mPieceList[pieceAboveIdx].mColor;

			// Move color down
			this.mPieceList[pieceIdx].update_color( aboveColor );
			
			pieceIdx = pieceAboveIdx;
			pieceAboveIdx = pieceAboveIdx - boardWidth;
		}
		
		this.mPieceList[pieceIdx].randomize_color();
	}

	// Increment Score. Do not count the first move
	if( !this.mFirstMove )
	{
		gScoreboard.add_moves( moveList.length );
		gSound.play_sound( SoundTypes.SOUND_SUCCESS );
	}
	
	this.draw_pieces();
	
	// Look for new moves
	moveList = this.detect_moves();
	if( moveList.length > 0 )
	{	
		setTimeout( "gPieceBox.perform_drop()", 200 );
	}
	else
	{
		this.mClickable = true;
	}
}
