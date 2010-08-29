/**
 * Generic Utitlity Functions
 */

/**
 * Get Browser Window Width
 * 
 * @return {int} Window Width
 */
function getWindowWidth()
{
	return window.innerWidth;
}

/**
 * Get Browser Window Height
 * @return {int} Window Height
 */
function getWindowHeight()
{
	return window.innerHeight;
}

/**
 * Coordinate Object
 *
 * @constructor
 *
 * @param {int} aX X coordinate
 * @param {int} aY Y coordinate
 */
function coord
	( 
	aX, 
	aY 
	)
{	
	// Variables
	this.x = aX;
	this.y = aY;
}

coord.prototype.print = print_coord;

/**
 * Print formatted coordinates
 * @return {string} Coordinate string
 */
function print_coord()
{
	return "(" + this.x + "," + this.y + ")";
}

/**
 * Rectangle Class
 *
 * @constructor
 *
 * @param {int} aX Rectangle X Coordinate
 * @param {int} aY Rectangle Y Coordinate
 * @param {int} aW Rectangle Width
 * @param {int} aH Rectangle Height
 */
function rect
	( 
	aX, 
	aY, 
	aW, 
	aH 
	)
{	
	// Variables
	this.x = aX;
	this.y = aY;
	this.w = aW;
	this.h = aH;
}
rect.prototype.print = print_rect;

/**
 * Print Formatted Rectangle Coordinates
 * @return {string} Formatted Rectangle Coordinates
 */
function print_rect()
{
	return "(" + this.x + "," + this.y + "," + this.w + "," + this.h + ")";
}

/**
 * Determine if a coordinate is in a rectangle
 * 
 * @param {coord} aCoord Coordinates to check
 * @param {rect} aRect Rectangle to check
 *
 * @return {bool} true if coordinates are within rectangle, including boundary
 */
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

/**
 * Determine current browser
 *
 * @return {string} Browser Type
 */
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
}