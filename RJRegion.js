//----------------------------------------------------------------
//
//  Rejeweled Board Region
//
//----------------------------------------------------------------

//
//  Constructor
//
RJRegion.prototype = new GERegion();
RJRegion.prototype.constructor = RJRegion;
RJRegion.prototype.baseClass = GERegion;
function RJRegion
	(
	regionIdx
	)
{
	this.mRegionIdx = regionIdx;
	
	// Variables
	this.mBackgroundColor = "transparent";
	this.mBackgroundImage = "";
	this.mBorderColor = "#AAAAAA";
	this.mBorderWidth = 1;
	
	this.mArrangeMode = ArrangeType.ARRANGE_HORZ;
}
