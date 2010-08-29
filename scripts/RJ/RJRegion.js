/**
 * Rejeweled Game Region
 *
 * @param {int} aRegionIdx Region Index
 */
function RJRegion
	(
	aRegionIdx
	)
{
	this.mRegionIdx = aRegionIdx;
	
	// Variables
	this.mBackgroundColor = "transparent";
	this.mBackgroundImage = "";
	this.mBorderColor = "#AAAAAA";
	this.mBorderWidth = 1;
	this.mArrangeMode = ArrangeType.ARRANGE_HORZ;
}

RJRegion.prototype = new GERegion();
RJRegion.prototype.constructor = RJRegion;
RJRegion.prototype.baseClass = GERegion;
