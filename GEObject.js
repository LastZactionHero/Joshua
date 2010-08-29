//----------------------------------------------------------------
//
//  Generic Game Object
//
//----------------------------------------------------------------

//
//  Constructor
//
GEObject.prototype.get_div_html = get_div_html;

function GEObject()
{
	// Functions
	
	// Variables
	this.mRect = new rect( 0, 0, 0, 0 );
	this.mBorderWidth = 0;
	this.mBorderColor = "black";
	this.mBorderStyle = "solid";
	this.mBackgroundColor = "white";
	this.mBackgroundImage = "";
}

//
//  Get DIV HTML
//
function get_div_html
	(
	aID,
	aContent
	)
{	
	var ret = "<div id=\"" + aID + "\" "
				+ "style=\"position:absolute; "
				+ "left:" + this.mRect.x + "px; "
				+ "top:" + this.mRect.y + "px; "
				+ "width:" + this.mRect.w + "px; "
				+ "height:" + this.mRect.h + "px; "
				+ "background:" + this.mBackgroundColor + "; "
				+ "background-image:" + this.mBackgroundImage + "; "
				+ "border-color:" + this.mBorderColor + "; "
				+ "border-style:" + this.mBorderStyle + "; "
				+ "border-width:" + this.mBorderWidth + "px\">" 
				+ aContent
				+ "</div>";
	return ret;
}
