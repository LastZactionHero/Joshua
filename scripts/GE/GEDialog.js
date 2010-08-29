/** 
 * Generic GameEngine Dialog Box
 * Displays a formatted dialog boxes for in-game messages
 *
 * @constructor
 *
 * @param {string} aDiv Dialog layer Div ID
 */
function GEDialog
	( 
	aDiv 
	)
{
	// Variables
	// Object div
	this.mDiv = aDiv;
	document.getElementById( this.mDiv ).innerHTML = "";
	
	// Object size
	var dialogWidth = 400;
	var dialogHeight = 200;
	this.mRect = new rect( ( getWindowWidth() - dialogWidth ) / 2,
						   ( getWindowHeight() - dialogHeight ) / 2,
						   dialogWidth,
						   dialogHeight
						   );
}

GEDialog.prototype = new GEObject();
GEDialog.prototype.constructor = GEDialog;
GEDialog.prototype.baseClass = GEObject;
GEDialog.prototype.draw_dialog = draw_dialog;
GEDialog.prototype.draw_win = draw_win;
GEDialog.prototype.draw_fail = draw_fail;

/**
 * Write generic dialog message to dialog layer
 * @param {string} aMessage Dialog box message
 */
function draw_dialog
	(
	aMessage
	)
{
	var dialogHTML = this.get_div_html( "d_dialog_message", aMessage );
	document.getElementById( this.mDiv ).innerHTML = dialogHTML;
}

/**
 * Write win dialog message to dialog layer
 * @param {string} aMessage Win string
 */
function draw_win
	(
	aMessage
	)
{
	// Format Message and Add Close Button
	var messageHTML = "<p style=\"text-align:center;\">" + aMessage + "</p>";
	messageHTML += "<p style=\"text-align:center;\"><a onClick=\"javascript:startup()\">Start Over</a></p>";
	
	// Push Message
	this.push_dialog( messageHTML );
}


/**
 * Write fail dialog message to dialog layer
 * @param {string} aMessage Fail string
 */
function draw_fail
	(
	aMessage
	)
{
	// Format Message and Add Close Button
	var messageHTML = "<p style=\"text-align:center;\">" + aMessage + "</p>";
	messageHTML += "<p style=\"text-align:center;\"><a onClick=\"javascript:startup()\">Start Over</a></p>";
	
	// Push Message
	this.push_dialog( messageHTML );
}