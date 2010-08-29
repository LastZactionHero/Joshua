//----------------------------------------------------------------
//
//  Utility Function
//
//----------------------------------------------------------------

//
// Get Window Width
//
function getWindowWidth()
{
	return window.innerWidth;
}

//
// Get Window Height
//
function getWindowHeight()
{
	return window.innerHeight;
}

//
// Coordinate Class
//
function coord( a_x, a_y )
{
	// Functions
	this.print = print_coord;
	
	// Variables
	this.x = a_x;
	this.y = a_y;
}

//
//  Print Coordinate
//
function print_coord()
{
	return "(" + this.x + "," + this.y + ")";
}

// Rect Class
function rect( a_x, a_y, a_w, a_h )
{
	// Functions
	this.print = print_rect;
	
	// Variables
	this.x = a_x;
	this.y = a_y;
	this.w = a_w;
	this.h = a_h;
}

//
//  Print Rect Variables
//
function print_rect()
{
	return "(" + this.x + "," + this.y + "," + this.w + "," + this.h + ")";
}

//
//  Is coordinate in rectangle
//
function is_coord_in_rect( aCoord, aRect )
{
	if( aCoord.x >= aRect.x &&
		aCoord.y >= aRect.y &&
		aCoord.x <= aRect.x + aRect.w &&
		aCoord.y <= aRect.y + aRect.h )
	{
		return true;
	}
	return false;
}

//
//  Detect Current Browser
//
function browser_detect()
{
	browser = "Unknown";
	
	if( navigator.userAgent.indexOf( "Firefox" ) != -1 )
	{
		browser = "Firefox";
	}
	else if( navigator.userAgent.indexOf( "Chrome" ) != -1 )
	{
		browser = "Chrome";
	}
	else if( navigator.userAgent.indexOf( "Internet Explorer" ) != -1 )
	{
		browser = "Internet Explorer";
	}
	else if( navigator.userAgent.indexOf( "Safari" ) != -1 )
	{
		browser = "Safari";
	}
	else if( navigator.userAgent.indexOf( "Opera" ) != -1 )
	{
		browser = "Opera";
	}
	return browser;
} // browser_detect()