/**
 * Generic GameEngine Object
 * Generic game engine object type. Provides for
 * style, placement, and drawing of a standard <div> tag
 *
 * @constructor
 */
function GEObject()
{	
	// Variables
	this.mRect = new rect( 0, 0, 0, 0 ); // Default rectangle
	this.mBorderWidth = 0; // Default border width
	this.mBorderColor = "black"; // Default border color
	this.mBorderStyle = "solid"; // Default border style
	this.mBackgroundColor = "white"; // Default background color
	this.mBackgroundImage = ""; // Default background image
}

// Bind the get_div_html method to the GEObject class
GEObject.prototype.get_div_html = get_div_html;

/**
 * Generate <div> tag for GameEngine object using
 * provided content and stored parameters
 *
 * @param {string} aId Div ID
 * @param {string} aContent HTML div content
 */
function get_div_html
	(
	aID,
	aContent
	)
{	
	var ret = "<div id=\"" + aID + "\" "
				+ "style=\"position:absolute; "
				+ "left:" + this.mRect.left + "px; "
				+ "top:" + this.mRect.top + "px; "
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
