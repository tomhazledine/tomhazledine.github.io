
// console.log('Testing new keyboard JS file.');

var UltimaSynth = function ultimaSynth(controls,keys){

    var // Note Inputs (the keyboard)
        synthKeys = keys.getElementsByClassName('synthKey');
    
    var // Controller Inputs
        masterVolumeSlider = controls.getElementsByClassName('masterVolume'),
        oscOneVolumeSlider = controls.getElementsByClassName('oscOneVolume'),
        oscTwoVolumeSlider = controls.getElementsByClassName('oscTwoVolume'),
        oscOneWaveSlider = controls.getElementsByClassName('oscOneWave'),
        oscTwoWaveSlider = controls.getElementsByClassName('oscTwoWave'),
        oscTwoPitchSlider = controls.getElementsByClassName('oscTwoPitch');

    var // Controller Values
        masterVolume = 0.5,
        currentPitch = null,
        currentNote = null;


    var // Controller Starting Values
        vco2PM = 2,
        vco1wav = 0,
        vco2wav =1;

    var // Utility Variables
        keyIsDown = false;

    var // Test Variables
        testOutput = document.getElementById('testOutput'),
        noteDisplay = testOutput.getElementsByClassName('noteDisplay'),
        volumeDisplay = testOutput.getElementsByClassName('volumeDisplay');

    /**
     * SET UP LISTENERS
     */
    for (var i = 0; i < synthKeys.length; i++) {
        synthKeys[i].addEventListener('mousedown',_notePress,false);
        synthKeys[i].addEventListener('mouseover',_noteMouseover,false);
        synthKeys[i].addEventListener('mouseout',_noteMouseout,false);
        synthKeys[i].addEventListener('mouseup',_noteMouseup,false);
    };
    document.addEventListener('mouseup',_noteMouseup,false);
    masterVolumeSlider[0].addEventListener('change',_volumeChange,false);
    oscOneVolumeSlider[0].addEventListener('change',_testLog,false);
    oscTwoVolumeSlider[0].addEventListener('change',_testLog,false);
    oscOneWaveSlider[0].addEventListener('change',_testLog,false);
    oscTwoWaveSlider[0].addEventListener('change',_testLog,false);
    oscTwoPitchSlider[0].addEventListener('change',_testLog,false);

    /**
     * ------------
     * TEMPORARY UTILITIES
     * _testLog
     * _keyClick
     * _testingDisplay
     * ------------
     */
    
    function _notePress(){
        keyIsDown = true;
        var noteValue = this.getAttribute('data-pitch');
        currentPitch = noteValue;
        _testingDisplay();
    }

    function _noteMouseover(){
        if (keyIsDown) {
            var noteValue = this.getAttribute('data-pitch');
            currentPitch = noteValue;
            _testingDisplay();
        }
    }

    function _noteMouseout(){
        currentPitch = null;
        _testingDisplay();
    }

    function _noteMouseup(){
        keyIsDown = false;
        currentPitch = null;
        _testingDisplay();
    }
    
    function _volumeChange(){
        var newVolumeValue = this.value;
        masterVolume = newVolumeValue;
        // console.log('Master Volume = ' + newVolumeValue);
        _testingDisplay();
    }
    
    function _testLog(){
        var sliderValue = this.value;//('data-num');
        var sliderName = this.getAttribute('data-controlName');
        console.log(sliderName + ': ' + sliderValue);
    }

    function _keyClick(){
        var noteValue = this.getAttribute('data-pitch');
        currentPitch = noteValue;
        // console.log(noteValue);
        _testingDisplay();
    }

    function _testingDisplay(){
        if (currentPitch == null) {
            noteDisplay[0].textContent = '--';    
        } else {
            noteDisplay[0].textContent = currentPitch;
        }
        volumeDisplay[0].textContent = masterVolume;
    }
}

var controlsWrapper = document.getElementById('synthControls');
var keysWrapper = document.getElementById('synthKeys');

var newSynth = UltimaSynth(controlsWrapper,keysWrapper);