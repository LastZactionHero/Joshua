/** 
 * Rejeweled Game Piece
 *
 * @constructor
 *
 * @param {int} aPieceIdx Piece Index
 * @param {int} aColor Piece Colors
 */
function RJPiece
	(
	aPieceIdx,
	aColor
	)
{	
	// Constants
	// Color types
	ColorTypes = 
		{ 
		"COLOR_YELLOW":	0,
		"COLOR_WHITE":	1,
		"COLOR_RED":	2,
		"COLOR_GREEN":	3,
		"COLOR_PURPLE": 4,
		"COLOR_BLUE":	5,
		"COLOR_TEAL":	6,
		"COLOR_COUNT":	7,
		"COLOR_INVALID": 7
		}
	
	// Color types values
	ColorValues = 
		[
		"#FFFF00",	// Yellow
		"#FFFFFF",	// White
		"#FF0000",	// Red
		"#00CC00",	// Green
		"#660099",	// Purple
		"#0000FF",	// Blue
		"#009999",	// Teal
		"#000000",  // Invalid
		];
	
	// Jewel images
	JewelValues = 
		[
		"url( img/rj-jewel-yellow.gif )",
		"url( img/rj-jewel-white.gif )",
		"url( img/rj-jewel-red.gif )",
		"url( img/rj-jewel-green.gif )",
		"url( img/rj-jewel-purple.gif )",
		"url( img/rj-jewel-blue.gif )",
		"url( img/rj-jewel-teal.gif )",
		"url( img/rj-jewel-black.gif )",
		];
		
	// Variables
	this.mPieceIdx = aPieceIdx;
	this.mRect = new rect( 0, 0, 48, 48 );
	this.mBackgroundImage = JewelValues[aColor];
	this.mBackgroundColor = "transparent";
	this.mColor = aColor;
	this.mBorderWidth = 0;
}

RJPiece.prototype = new GEPiece();
RJPiece.prototype.constructor = RJPiece;
RJPiece.prototype.baseClass = GEPiece;
RJPiece.prototype.update_color = update_color;
RJPiece.prototype.randomize_color = randomize_color;
RJPiece.prototype.set_selected = set_selected;

/**
 * Update Piece Color
 *
 * @param {int} Piece Color Index
 */
function update_color
	(
	aColor
	)
{
	this.mColor = aColor;
	this.mBackgroundImage = JewelValues[this.mColor];
}

/**
 * Generate a random color and update piece color
 */
function randomize_color()
{
	var pieceColor = Math.floor( Math.random() * 7 );
	this.update_color( pieceColor );	
}

/**
 * Set piece as the selected piece
 *
 * @param {bool} aSelected Selected state
 */
function set_selected
	(
	aSelected
	)
{
	document.getElementById( this.get_piece_div() ).style.borderWidth = 2;
}
