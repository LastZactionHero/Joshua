/**
 * Generic GameEngine Region Class
 * Rectangular region for holding and ordering game pieces
 *
 * @constructor
 *
 * @param {int} aRegionIdx Region Index
 */
function GERegion
	(
	aRegionIdx
	)
{
	// Constants
	// Arrangement Types
	ArrangeType = 
		{ 
		"ARRANGE_NONE": 0 
		,"ARRANGE_HORZ": 1
		,"ARRANGE_DIAG": 2 
		};
	
	// Variables
	this.mRegionIdx = aRegionIdx;
	this.mBorderWidth = 2;
	this.mArrangeMode = ArrangeType.ARRANGE_DIAG;
}

GERegion.prototype = new GEObject();
GERegion.prototype.constructor = GERegion;
GERegion.prototype.baseClass = GEObject.prototype.constructor;
GERegion.prototype.generate_region = generate_region;
GERegion.prototype.cleanup_region = cleanup_region;


/**
 * Generate Region HTML
 *
 * @param {rect} aRect Region rect
 *
 * @return {string} Region HTML
 */
function generate_region
	(
	aRect
	)
{
	this.mRect = new rect( aRect.left, aRect.top, aRect.w, aRect.h );
	var ret = this.get_div_html( "", "" );
	return ret;
}

/**
 * Cleanup and Organize Region Pieces
 */
function cleanup_region()
{	
	// Get all pieces in region
	var pieceList = gPieceBox.get_pieces_in_region( this.mRegionIdx );
	var pieceCount = pieceList.length;

	// Align pieces in region
	for( var i = 0; i < pieceList.length; i++ )
	{
		var pieceWidth = pieceList[i].mRect.w;
		var pieceHeight = pieceList[i].mRect.h;
		
		
		var newPieceCoords;
		
		switch( this.mArrangeMode )
		{
			// Horizontal Arrangement
			case ArrangeType.ARRANGE_HORZ:	
				newPieceCoords = new coord( 
										   this.mRect.left + ( this.mRect.w - pieceWidth ) * ( i + 1 ) / ( pieceCount + 1 ) + gBoard.mBorderWidth,
										   this.mRect.top + ( this.mRect.h - pieceHeight ) / 2 + gBoard.mBorderWidth
										   );
				newPieceCoords = gBoard.local_to_global_coord( newPieceCoords );
				break;
				
			// Dialog Arrangement
			case ArrangeType.ARRANGE_DIAG:
				newPieceCoords = new coord( 
										   this.mRect.left + ( this.mRect.w - pieceWidth ) * ( i + 1 ) / ( pieceCount + 1 ),
										   this.mRect.top + ( this.mRect.h - pieceHeight ) * ( i + 1 )/ ( pieceCount + 1 )
										   );
				newPieceCoords = gBoard.local_to_global_coord( newPieceCoords );
				break;
				
			// No Arrangement
			case ArrangeType.ARRANGE_NONE:
			default:
				newPieceCoords = new coord( 
										   pieceList[i].mRect.left,
										   pieceList[i].mRect.top
										   );
				break;
		}

		pieceList[i].mRect.left = newPieceCoords.left;
		pieceList[i].mRect.top = newPieceCoords.top;
		pieceList[i].move_piece();		
	}	
}