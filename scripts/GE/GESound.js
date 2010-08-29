/**
 * Generic GameEngine Sound Class
 * Support for initializing and playing sound effects
 *
 * @constructor
 * 
 * @param {string} aDivId Sound layer Div ID
 */
function GESound
	(
	aDivId
	)
{
	// Constants
	// Sound types
	SoundExtTypes = 
		{ 
		"SOUND_TYPE_MP3":	0,
		"SOUND_TYPE_WAV":	1,
		"SOUND_TYPE_NONE":	2
		}
		
	// Sound extension values
	SoundExtValues = 
		[
		".mp3",
		".wav"
		];
		
	// Sound file directory
	this.mSoundDirectory = "sounds";
	
	// Variables
	this.mDivId = aDivId;
	this.audio_player_id = "id_audio_player";
}

GESound.prototype.play_sound_file = play_sound_file;
GESound.prototype.get_file_extension = get_file_extension;
GESound.prototype.draw_sound_table = draw_sound_table;
GESound.prototype.get_audio_player_id = get_audio_player_id;

/**
 * Play sound by index
 *
 * @param {int} Index of sound file
 */
function play_sound_file
	(
	aIdx
	)
{
	document.getElementById( this.get_audio_player_id( aIdx ) ).play();
}

/**
 * Get sound extension to use with this browser
 *
 * @return {string} Sound file extension
 */
function get_file_extension()
{
	var ext = "";
	
	var browser = browser_detect();

	if( browser == "Firefox" ||
		browser == "Opera" )
	{
		ext = SoundExtValues[SoundExtTypes.SOUND_TYPE_WAV];
	}
	else if( browser == "Safari" ||
			 browser == "Chrome" )
	{
		ext = SoundExtValues[SoundExtTypes.SOUND_TYPE_MP3];
	}

	return ext;
}

/**
 * Draw table of <audio> tags
 *
 * @param {string[]} aFilenameList List of sound filenames without extensions
 */
function draw_sound_table
	(
	aFilenameList
	)
{
	var audio_html = "";
	for( var i = 0; i < aFilenameList.length; i++ )
	{
		var filename = this.mSoundDirectory + "/" + aFilenameList[i] + this.get_file_extension();
		audio_html += "<audio id=\"" + this.get_audio_player_id( i ) + "\" src=\"" + filename + "\" controls=\"controls\"></audio>";
	}
	
	document.getElementById( this.mDivId ).innerHTML = audio_html;
}

/**
 * Get Element ID of Audio Player by Audio Id
 *
 * @param {int} aIdx Audio index
 * @return {string} Audio player id
 */
function get_audio_player_id
	(
	aIdx
	)
{
	return "audio_player_" + aIdx;
}