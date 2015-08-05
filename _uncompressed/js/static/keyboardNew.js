/**
 * ------------------------------------------
 * UltimaSynth
 *
 * Creates sounds. Requires UltimaSynthInputs
 * module to provide inputs.
 * ------------------------------------------
 */
var UltimaSynth = function ultimaSynth(contextClass){

    var // Set up audio context
        context = new contextClass();

    var // Controller Values
        masterVolume = 0.5,
        currentPitch = null,
        currentNote = null;

    var // Controller Starting Values
        vco2PM = 2,
        vco1wav = 'sine',
        vco2wav = 'square';

    /**
     * --------------------------------------
     * SETTING UP AUDIO
     * "V.C.O." = voltage controlled oscillator
     * "V.C.A." = voltage controlled amplifier
     *
     * V.C.O.1
     * V.C.O.2
     * V.C.A.
     * Osc.1 vol.
     * Osc.2 vol.
     * Master V.C.A.
     * Connecting VCO and VCA
     * --------------------------------------
     */
    
    // V.C.O.1
    var vco1 = context.createOscillator();
    vco1.type = vco1wav;// 0=sine, 1=square, 2=sawtooth, 3=triangle
    vco1.frequency.value = 440.00;//this.frequency;
    vco1.start(0);

    // V.C.O.2
    var vco2 = context.createOscillator();
    vco2.type = vco2wav;// 0=sine, 1=square, 2=sawtooth, 3=triangle
    vco2.frequency.value = 440.00;//this.frequency;
    vco2.start(0);

    // V.C.A. (voltage controlled amplifier)
    var vca = context.createGain();
    vca.gain.value = 0;

    // Osc.1 vol.
    var vco1vol = context.createGain();
    vco1vol.gain.value = 1;

    // Osc.2 vol.
    var vco2vol = context.createGain();
    vco2vol.gain.value = 1;

    // Master V.C.A.
    var master = context.createGain();
    master.gain.value = 0.1;

    // Connecting VCO and VCA
    vco1.connect(vco1vol);
    vco1vol.connect(vca);
    vco2.connect(vco2vol);
    vco2vol.connect(vca);
    vca.connect(master);
    master.connect(context.destination);

    /**
     * -------------
     * NOTE CONTROLS
     *
     * noteStart
     * noteEnd
     * -------------
     */

    function noteStart(note){
        // console.log('the note is: ' + note);
        vco1.frequency.value = note;// Set note pitch
        vco2.frequency.value = (note / vco2PM);// Set note pitch
        vca.gain.value = 1;// Start note
        addPressedClass(note);
    }

    function noteEnd(note){
        removePressedClass(note);
        // console.log('The note has ended.');
        vca.gain.value = 0;// End note
    }

    /**
     * -------------------
     * OSCILLATOR CONTROLS
     *
     * masterVolumeControl
     * oscOneVolumeControl
     * oscTwoVolumeControl
     * oscOneWaveControl
     * oscTwoWaveControl
     * vcoTwoPitchControl
     * -------------------
     */
    
    function masterVolumeControl(volume){
        master.gain.value = volume;
    }
    
    function oscOneVolumeControl(osc1volume){
        vco1vol.gain.value = osc1volume;
    }
    
    function oscTwoVolumeControl(osc2volume){
        vco2vol.gain.value = osc2volume;
    }
    
    function oscOneWaveControl(oscOneWaveType){
        vco1wav = _handleWaveType(oscOneWaveType);
        vco1.type = vco1wav;
    }
    
    function oscTwoWaveControl(oscTwoWaveType){
        vco2wav = _handleWaveType(oscTwoWaveType);
        vco2.type = vco2wav;
    }
    
    function vcoTwoPitchControl(pitchMultiplier){
        vco2PM = pitchMultiplier;
    }

    /**
     * -------------------
     * CONTROL ROUTER
     *
     * Handles incoming
     * control changes and
     * directs them to the
     * correct controler.
     * -------------------
     */
    function _controlRouter(name,value){
        console.log('the ' + name + ' control has been set to ' + value);
        switch (name) {
            case 'masterVolume':
                masterVolumeControl(value);
                break;
            case 'oscOneVolume':
                oscOneVolumeControl(value);
                break;
            case 'oscTwoVolume':
                oscTwoVolumeControl(value);
                break;
            case 'oscOneWave':
                oscOneWaveControl(value);
                break;
            case 'oscTwoWave':
                oscTwoWaveControl(value);
                break;
            case 'vcoTwoPitch':
                vcoTwoPitch(value);
                break;
        }

    }

    /**
     * --------------------------------------------------------------
     * HANDLE WAVE TYPES
     * 
     * @param  {integer} int Raw value from range input
     * @return {string}      Correct string value for oscillator type
     * --------------------------------------------------------------
     */
    function _handleWaveType(int){
        var rawWaveValue = parseInt(int);
        switch (rawWaveValue) {
            case 0:
                stringWaveValue = 'sine';
                break;
            case 1:
                stringWaveValue = 'square';
                break;
            case 2:
                stringWaveValue = 'sawtooth';
                break;
            case 3:
                stringWaveValue = 'triangle';
                break;
        }
        return stringWaveValue;
    }

    /**
     * ----------------------------
     * TOGGLE CLASSES TO STYLE KEYS
     *
     * Requires "noQuery" module
     * ----------------------------
     */
    
    function addPressedClass(note){
        targetPitch = Math.floor(note);
        targetClass = 'pitchClass' + targetPitch;
        targetKey = document.getElementsByClassName(targetClass);
        noQuery.addClass(targetKey[0],'pressed');
    }

    function removePressedClass(note){
        targetPitch = Math.floor(note);
        targetClass = 'pitchClass' + targetPitch;
        targetKey = document.getElementsByClassName(targetClass);
        noQuery.removeClass(targetKey[0],'pressed');
    }

    /**
     * ------------------------------
     * Public API
     *
     * This is what UltimaSynthInputs
     * taps into to control the synth
     * ------------------------------
     */
    var publicAPI = {
        controlChanged: _controlRouter,
        noteStart: noteStart,
        noteEnd: noteEnd
    };
    
    return publicAPI;

}

/**
 * ---------------------------------------------------
 * UltimaSynthInputs
 * 
 * handles event- and data-input for UltimaSynth.
 * 
 * @param {element} controls Wrapper ID for controls
 * @param {element} keys     Wrapper ID for piano keys
 * ---------------------------------------------------
 */
var UltimaSynthInputs = function ultimaSynthInputs(controls,keys){

    var // Note Inputs (the keyboard)
        synthKeys = keys.getElementsByClassName('synthKey');
    
    var // Controller Inputs
        masterVolumeSlider = controls.getElementsByClassName('masterVolume'),
        oscOneVolumeSlider = controls.getElementsByClassName('oscOneVolume'),
        oscTwoVolumeSlider = controls.getElementsByClassName('oscTwoVolume'),
        oscOneWaveSlider = controls.getElementsByClassName('oscOneWave'),
        oscTwoWaveSlider = controls.getElementsByClassName('oscTwoWave'),
        oscTwoPitchSlider = controls.getElementsByClassName('oscTwoPitch');

    var // Utility Variables
        keyIsDown = false,
        keysDown = [];

    var // Map keys as array
        keyToKey = {
             65: '261.63',//'Cl',
             87: '277.18',//'C#l',
             83: '293.66',//'Dl',
             69: '311.13',//'D#l',
             68: '329.63',//'El',
             70: '349.23',//'Fl',
             84: '369.99',//'F#l',
             71: '392.00',//'Gl',
             89: '415.30',//'G#l',
             72: '440.00',//'Al',
             85: '466.16',//'A#l',
             74: '493.88',//'Bl',
             75: '523.25',//'Cu',
             79: '554.37',//'C#u',
             76: '587.33',//'Du',
             80: '622.25',//'D#u',
             59: '659.26',//'Eu',
            186: '698.46',//'Eu',
            222: '739.99',//'Fu',
            221: '783.99',//'F#u',
            220: '830.61'//'Gu'
        };

    /**
     * ---------------------
     * SETUP EVENT LISTENERS
     * ---------------------
     */
    for (var i = 0; i < synthKeys.length; i++) {
        synthKeys[i].addEventListener('mousedown',_notePress,false);
        synthKeys[i].addEventListener('mouseover',_noteMouseover,false);
        synthKeys[i].addEventListener('mouseout',_noteMouseout,false);
        synthKeys[i].addEventListener('mouseup',_noteMouseup,false);
    };
    document.addEventListener('keydown',_noteKeydown,false);
    document.addEventListener('keyup',_noteKeyup,false);
    masterVolumeSlider[0].addEventListener('change',_controlPress,false);
    oscOneVolumeSlider[0].addEventListener('change',_controlPress,false);
    oscTwoVolumeSlider[0].addEventListener('change',_controlPress,false);
    oscOneWaveSlider[0].addEventListener('change',_controlPress,false);
    oscTwoWaveSlider[0].addEventListener('change',_controlPress,false);
    oscTwoPitchSlider[0].addEventListener('change',_controlPress,false);

    /**
     * ----------------------------
     * HANDLE LISTENER ROUTING
     * Different types of event
     * trigger the same end-results
     * but require different paths
     * (e.g. mousedown and
     * mouseover)
     *
     * _notePress
     * _noteMouseover
     * _noteMouseout
     * _noteMouseup
     * ----------------------------
     */
    
    function _notePress(){
        keyIsDown = true;
        var noteValue = this.getAttribute('data-pitch');
        newSynth.noteStart(noteValue);
    }

    function _noteMouseover(){
        if (keyIsDown) {
            var noteValue = this.getAttribute('data-pitch');
            newSynth.noteStart(noteValue);
        }
    }

    function _noteMouseout(){
        if (keyIsDown) {
            var noteValue = this.getAttribute('data-pitch');
            newSynth.noteEnd(noteValue);
        }
    }

    function _noteMouseup(){
        keyIsDown = false;
        var noteValue = this.getAttribute('data-pitch');
        newSynth.noteEnd(noteValue);
    }

    /**
     * ---------------------
     * CONTROLLER ROUTING
     * Sends controller data
     * to controller
     * ---------------------
     */
    function _controlPress(){
        var sliderValue = this.value;
        var sliderName = this.getAttribute('data-controlName');
        newSynth.controlChanged(sliderName,sliderValue);
    }

    /**
     * ------------
     * KEY BINDINGS
     * ------------
     */
    function _noteKeydown(key){
        // If the key is already being held down, abort function.
        if (key.keyCode in keysDown){
            key.preventDefault();
            return;
        }
        // Log the key in keysDown
        keysDown[key.keyCode] = true;
        if (typeof keyToKey[key.keyCode] !== 'undefined'){
            key.preventDefault();
            noteValue = keyToKey[key.keyCode];
            //console.log(noteValue);
            newSynth.noteStart(noteValue);
        }
    }

    function _noteKeyup(key){
        delete keysDown[key.keyCode];
        if (typeof keyToKey[key.keyCode] !== 'undefined'){
            key.preventDefault();
            noteValue = keyToKey[key.keyCode];
            //console.log(noteValue);
            newSynth.noteEnd(noteValue);
        }
    }

    
}

/**
 * ------------------------------------
 * noQuery
 * 
 * These are basic utilities that allow
 * for cross-browser support, replacing
 * the need to use jQuery.
 *
 * Has Class
 * Add Class
 * Remove Class
 * ------------------------------------
 */
var noQuery = (function(){
    
    /**
     * Has Class:
     * Does the target element have the target class?
     * @param  {object}  el        The target element.
     * @param  {string}  className The target class.
     * @return {Boolean}           If the el has the class, output 'true'. Otherwise 'false'.
     */
    function _hasClass(el, className){
        if (el.classList) {
            var result = el.classList.contains(className);
        } else {
            var result = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }
        return result;
    }

    /**
     * Add Class:
     * Add a class to the target element.
     * @param {object} el        The target element.
     * @param {string} className The target class.
     */
    function _addClass(el, className){
        if (el.classList) {
            el.classList.add(className);
        }
        else {
            el.className += ' ' + className;
        }
    }

    /**
     * Remove Class:
     * Remove a class from the target element.
     * @param  {object} el        The target element.
     * @param  {string} className The target class.
     */
    function _removeClass(el, className){
        if (el.classList) {
            el.classList.remove(className);
        }
        else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }


    var publicAPI = {
        hasClass: _hasClass,
        addClass: _addClass,
        removeClass: _removeClass
    };
    return publicAPI;
})();

var controlsWrapper = document.getElementById('synthControls');
var keysWrapper = document.getElementById('synthKeys');

var // determine if Web Audio API is available
    contextClass = (window.AudioContext || window.webkitAudioContext);

if (contextClass) {
    var newSynth = UltimaSynth(contextClass);
    var newSynthInputs = UltimaSynthInputs(controlsWrapper,keysWrapper);
}