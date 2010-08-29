//----------------------------------------------------------------
//
//  Game Board Region
//
//----------------------------------------------------------------

//
//  Constructor
//
GERegion.prototype = new GEObject();
GERegion.prototype.constructor = GERegion;
GERegion.prototype.baseClass = GEObject.prototype.constructor;
GERegion.prototype.draw_region = draw_region;
GERegion.prototype.cleanup_region = cleanup_region;
function GERegion
	(
	regionIdx
	)
{
	// Parent
	//this.inheritFrom = GEObject;
	
	// Constants
	ArrangeType = { "ARRANGE_NONE": 0, "ARRANGE_HORZ": 1, "ARRANGE_DIAG": 2 };
	
	// Functions
	//this.draw_region = draw_region;
	//this.cleanup_region = cleanup_region;
	
	// Variables
	this.mRegionIdx = regionIdx;
	this.mBackgroundImage = "url( 'img_region.jpg' )";
	this.mArrangeMode = ArrangeType.ARRANGE_DIAG;
}

//
//  Draw
//
function draw_region
	(
	regionLeft,
	regionTop,
	regionWidth,
	regionHeight
	)
{
	this.mRect = new rect( regionLeft, regionTop, regionWidth, regionHeight );
	
	var ret = this.get_div_html( "", "" );
	return ret;
}

//
//  Cleanup Region
//
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
										   this.mRect.x + ( this.mRect.w - pieceWidth ) * ( i + 1 ) / ( pieceCount + 1 ) + gBoard.mBorderWidth,
										   this.mRect.y + ( this.mRect.h - pieceHeight ) / 2 + gBoard.mBorderWidth
										   );
				newPieceCoords = gBoard.local_to_global_coord( newPieceCoords );
				break;
				
			// Dialog Arrangement
			case ArrangeType.ARRANGE_DIAG:
				newPieceCoords = new coord( 
										   this.mRect.x + ( this.mRect.w - pieceWidth ) * ( i + 1 ) / ( pieceCount + 1 ),
										   this.mRect.y + ( this.mRect.h - pieceHeight ) * ( i + 1 )/ ( pieceCount + 1 )
										   );
				newPieceCoords = gBoard.local_to_global_coord( newPieceCoords );
				break;
				
			// No Arrangement
			case ArrangeType.ARRANGE_NONE:
			default:
				newPieceCoords = new coord( 
										   pieceList[i].mRect.x,
										   pieceList[i].mRect.y
										   );
				break;
		}

		pieceList[i].mRect.x = newPieceCoords.x;
		pieceList[i].mRect.y = newPieceCoords.y;
		pieceList[i].move_piece();		
	}
	
}