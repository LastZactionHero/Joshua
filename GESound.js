//----------------------------------------------------------------
//
//  Game Sound Element
//
//----------------------------------------------------------------

//
//  Constructor
//
GESound.prototype.play_sound_file = play_sound_file;
GESound.prototype.get_file_extension = get_file_extension;
GESound.prototype.construct_sound_table = construct_sound_table;
GESound.prototype.get_audio_player_id = get_audio_player_id;

function GESound
	(
	aDivId
	)
{
	// Types
	SoundExtTypes = 
		{ 
		"SOUND_TYPE_MP3":	0,
		"SOUND_TYPE_WAV":	1,
		"SOUND_TYPE_NONE":	2
		}
		
	SoundExtValues = 
		[
		".mp3",
		".wav"
		];
		
	// Variables
	this.mDivId = aDivId;
	this.audio_player_id = "id_audio_player";
}

//
//  Play a sound by filename
//
function play_sound_file
	(
	aIdx
	)
{
	//alert( this.get_audio_player_id( aIdx ) );
	document.getElementById( this.get_audio_player_id( aIdx ) ).play();
}

//
//  Get the file extension to use with this browser
//
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

//
//  Construct table of audio tags
//
function construct_sound_table
	(
	aFilenameList
	)
{
	var audio_html = "";
	for( var i = 0; i < aFilenameList.length; i++ )
	{
		var filename = aFilenameList[i] + this.get_file_extension();
		audio_html += "<audio id=\"" + this.get_audio_player_id( i ) + "\" src=\"" + filename + "\" controls=\"controls\"></audio>";
	}
	
	document.getElementById( this.mDivId ).innerHTML = audio_html;
}

//
//  Get player of audio player element
//
function get_audio_player_id
	(
	mIdx
	)
{
	return "audio_player_" + mIdx;
}