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
	var width = 0;
	
	if( browser_detect() == "MSIE" )
	{
		if( document.body )
		{
			width = document.body.clientWidth;
		}
	}
	else
	{
		width = window.innerWidth;
	}
	return Math.floor( width );
}

/**
 * Get Browser Window Height
 * @return {int} Window Height
 */
function getWindowHeight()
{
	var height = 0;
	if( browser_detect() == "MSIE" )
	{
		if( document.body )
		{
			height = document.body.clientHeight;
		}
	}
	else
	{
		height = window.innerHeight;
	}
	return Math.floor( height );
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
	this.left = aX;
	this.top = aY;
}

coord.prototype.print = print_coord;

/**
 * Print formatted coordinates
 * @return {string} Coordinate string
 */
function print_coord()
{
	return "(" + this.left + "," + this.top + ")";
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
	this.left = aX;
	this.top = aY;
	this.w = aW;
	this.h = aH;
}
rect.prototype.print = print_rect;
rect.prototype.floor_rect = floor_rect;

/**
 * Rect floor function
 *
 */
function floor_rect()
{
	this.left = Math.floor( this.left );
	this.top = Math.floor( this.top );
	this.w = Math.floor( this.w );
	this.h = Math.floor( this.h );
}

/**
 * Print Formatted Rectangle Coordinates
 * @return {string} Formatted Rectangle Coordinates
 */
function print_rect()
{
	return "(" + this.left + "," + this.top + "," + this.w + "," + this.h + ")";
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
	if( aCoord.left >= aRect.left &&
		aCoord.top >= aRect.top &&
		aCoord.left <= aRect.left + aRect.w &&
		aCoord.top <= aRect.top + aRect.h )
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
	else if( navigator.userAgent.indexOf( "MSIE" ) != -1 )
	{
		browser = "MSIE";
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

/**
 * Mouse Event Compatibility
 *
 * @param {event} aEvent Mouse event from browser
 * @return {event} Mouse event converted for cross-browser compatibility
 */
function mouse_browser_convert
	(
	aEvent
	)
{
	var ret = aEvent;

	if( ret.pageX == null || ret.pageY == null )
	{
		var doc = document.documentElement, body = document.body;
		ret.pageX = ret.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	  	ret.pageY = ret.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc   && doc.clientTop  || body && body.clientTop  || 0);
	}
		
	return ret;
}