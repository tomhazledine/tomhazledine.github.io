//alert("synth-build js working");
//$(document).ready(function(){alert("keyboard jquery working");});

// determine if Web Audio API is available
var contextClass = (window.AudioContext || window.webkitAudioContext);
if (contextClass) {
  // Web Audio API is available.

  var context = new contextClass();// Set up audio context

  // V.C.O. (voltage controlled oscillator)
  var vco = context.createOscillator();
  vco.type = 2;// 0=sine, 1=square, 2=sawtooth, 3=triangle
  vco.frequency.value = 440.00;//this.frequency;
  vco.start(0);

  // V.C.A. (voltage controlled amplifier)
  var vca = context.createGain();
  vca.gain.value = 0;

  // Connectong VCO and VCA
  vco.connect(vca);
  vca.connect(context.destination);

  // Start the note
  function noteStart(note){
    vco.frequency.value = note;// Set note pitch
    vca.gain.value = 1;// Start note
  }
  // End the note
  function noteEnd(note){
    if(vco.frequency.value == note){
      vca.gain.value = 0;// End note
    }
  }

  // Use jQuery to trigger events, as I'm a js noob.
  $(document).ready(function(){

    var note = 440;// note fallback incase undefined

    // Find Keys
    var key = $(".piano-key");

    // Detect if mouse is down
    var isDown = false;
    $(document).mousedown(function(){
      isDown = true;
    })
    .mouseup(function(){
      isDown = false;
    });

    // Trigger noteStart on mouseover AND mousedown (for glissando effect)
    key.mouseover(function(){
      var note = $(this).data("pitch");// Find note pitch
      if(isDown){
        noteStart(note);
        $(this).addClass("pressed");
      }
    });

    // Trigger noteStart on mousedown
    key.mousedown(function(){
      var note = $(this).data("pitch");// Find note pitch
      noteStart(note);
      $(this).addClass("pressed");
    });

    // End note on mouseout or mouseup
    key.on("mouseout mouseup", function(){
      noteEnd();
      $(this).removeClass("pressed");
    });

  });

  // Map keys as array [for english and german keyboard layouts]
  // Find out how to detect keyboard layout, then set as var here.
  //var keyboardLayout = "en";

  //if (keyboardLayout == "en") {
    var keyToKey = {
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

  var keysDown = [];

  function keyboardDown(){
    // If the key is already being held down, abort function.
    if (key.keyCode in keysDown){
      key.preventDefault();
      //console.log('this key has been pressed before');
      return;
    }
    // Log the key in keysDown
    keysDown[key.keyCode] = true;
    // set pitch value as a var
    if (typeof keyToKey[key.keyCode] !== 'undefined'){
      key.preventDefault();
      key_pressed = keyToKey[key.keyCode];
    }
    noteStart(key_pressed);
    $('[data-pitch="'+key_pressed+'"]').addClass('pressed');
  };

  function keyboardUp(){
    //console.log('keyboard up');
    key_released = key.keyCode;
    delete keysDown[key.keyCode];
    if(key_released == key_pressed){
      noteEnd(key_pressed);
    }
    $('[data-pitch="'+key_released+'"]').removeClass('pressed');
  };

  window.onkeydown = keyboardDown;
  window.onkeyup = keyboardUp;



// If the Web Audio API is not available, prompt the user to switch to a supported browser.
} else {
  alert("Audio inactive. This browser does not support the Web Audio API; try Chrome, Safari, or Firefox instead.");
}
