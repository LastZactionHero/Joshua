//----------------------------------------------------------------
//
//  ReJeweled Sound Element
//
//----------------------------------------------------------------

//
//  Constructor
//
RJSound.prototype = new GESound();
RJSound.prototype.constructor = RJSound;
RJSound.prototype.baseClass = GESound;
RJSound.prototype.play_sound = play_sound;

function RJSound
	(
	aDivId
	)
{
	GESound( aDivId );
	
	// Constants
	SoundTypes = 
		{ 
		"SOUND_SUCCESS":	0,
		"SOUND_ERROR":		1,
		"SOUND_COUNT":		2
		}
		
	SoundValues = 
		[
		"RJ-success",
		"RJ-error"
		];
		
	// Variables
	this.mDivId = aDivId;
	
	this.construct_sound_table( SoundValues );
}

//
//  Play a sound by filename
//
function play_sound
	(
	aSound
	)
{
	if( aSound >=0 && aSound < SoundTypes.SOUND_COUNT )
	{
		this.play_sound_file( aSound );
	}
}
