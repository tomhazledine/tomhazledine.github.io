//alert("synth-build js working");
//$(document).ready(function(){alert("keyboard jquery working");});

// determine if Web Audio API is available
var contextClass = (window.AudioContext || window.webkitAudioContext);
if (contextClass) {
  // Web Audio API is available.

  var context = new contextClass();// Set up audio context

  //* // Simple VCO
  // V.C.O. (voltage controlled oscillator)
  var vco = context.createOscillator();
  vco.frequency.value = 440.00;
  vco.type = "sine";
  vco.start(0);
  //*/

  /* // Complex VCO module
  var VCO = (function(context){
    function VCO(){
      this.oscillator = context.createOscillator();
      this.oscillator.type = 'sawtooth';
      this.setFrequency(440);
      this.oscillator.start(0);

      this.input = this.oscillator;
      this.output = this.oscillator;

      var that = this;
      $(document).bind('frequency',function(_,frequency){
        that.setFrequency(frequency);
      });
    };
  })(context);
  //*/

  // V.C.A. (voltage controlled amplifier)
  var vca = context.createGain();
  vca.gain.value = 0;

  // Connectong VCO and VCA
  vco.connect(vca);
  vca.connect(context.destination);

  // Start the note
  function noteStart($note){
    //console.log(isDown);// Check for mousedown
    //console.log(note);// Check pitch
    vco.frequency.value = $note;// Set note pitch
    vca.gain.value = 1;// Start note
  }
  // End the note
  function noteEnd(){
    vca.gain.value = 0;// End note
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

  // Key logging
  function keyLog(){
    console.log(event.which);
  }

  $(document).keydown(function(e){
    switch(e.which){

    //naturals
    case 65:
      console.log('a');
      break;
    case 83:
      console.log('s');
      break;
    case 68:
      console.log('d');
      break;
    case 70:
      console.log('f');
      break;
    case 71:
      console.log('g');
      break;
    case 72:
      console.log('h');
      break;
    case 74:
      console.log('j');
      break;
    case 75:
      console.log('k');
      break;
    case 76:
      console.log('l');
      break;
    case 59:
      console.log(';');
      break;
    case 222:
      console.log('\'');
      break;
    case 220:
      console.log('\\');
      break;

    //accidentals
    case 87:
      console.log('w');
      break;
    case 69:
      console.log('e');
      break;
    case 82:
      console.log('r');
      break;
    case 84:
      console.log('t');
      break;
    case 89:
      console.log('y');
      break;
    case 85:
      console.log('u');
      break;
    case 79:
      console.log('o');
      break;
    case 80:
      console.log('p');
      break;
    case 219:
      console.log('\[');
      break;

    default: return;
    }
    e.preventDefault();
  });



// If the Web Audio API is not available, prompt the user to switch to a supported browser.
} else {
  alert("Audio inactive. This browser does not support the Web Audio API; try Chrome, Safari, or Firefox instead.");
}
