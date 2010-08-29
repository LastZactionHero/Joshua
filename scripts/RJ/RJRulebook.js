/**
 * Rejeweled Rulebook
 */
function RJRulebook()
{	

}

RJRulebook.prototype = new GERulebook();
RJRulebook.prototype.baseClass = GERulebook;
RJRulebook.prototype.constructor = RJRulebook;
RJRulebook.prototype.detect_moves = detect_moves;

/**
 * Detect if the game board has moves to perform
 *
 * @return {array-RJPiece} List of pieces to move
 */
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
			var curColor = gPieceBox.mPieceList[regionIdx].mColor;
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
						moveList[moveList.length] = gPieceBox.mPieceList[regionIdx - runLen + runIdx + offset];
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
			var curColor = gPieceBox.mPieceList[regionIdx].mColor;
			
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
						moveList[moveList.length] = gPieceBox.mPieceList[regionIdx - ( runLen - runIdx - offset ) * boardWidth];
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