/**
 * Generic GameEngine Rulebook
 * Processes board to determine if moves or
 * board configuration are valid
 */
function GERulebook()
{	

}

GERulebook.prototype.validate_board = validate_board;

/**
 * Process board to determine if current configuration
 * is valid
 * 
 * @return {bool} true if valid
 */
function validate_board()
{
	return true;
}