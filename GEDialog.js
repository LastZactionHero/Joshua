//----------------------------------------------------------------
//
//  Game Dialog Message
//
//----------------------------------------------------------------

//
//  Constructor
//
GEDialog.prototype = new GEObject;
function GEDialog( aDiv )
{
	this.mDiv = aDiv;
	document.getElementById( this.mDiv ).innerHTML = "";
	
	// Functions
	this.push_dialog = push_dialog;
	this.push_win = push_win;
	this.push_fail = push_fail;
	
	// Variables
	var dialogWidth = 400;
	var dialogHeight = 200;

	this.mRect = new rect( ( getWindowWidth() - dialogWidth ) / 2,
						   ( getWindowHeight() - dialogHeight ) / 2,
						   dialogWidth,
						   dialogHeight
						   );
}

//
//  Push generic dialog box
//
function push_dialog
	(
	aMessage
	)
{
	var dialogHTML = this.get_div_html( "d_dialog_message", aMessage );
	document.getElementById( this.mDiv ).innerHTML = dialogHTML;
}

//
//  Push win dialog box
//
function push_win
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


//
//  Push lose dialog box
//
function push_fail
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