//alert("synth-build js working");
//$(document).ready(function(){alert("synth-build jquery working");});

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
      // note start function
      var noteStart = function(){
        //console.log(isDown);// Check for mousedown
        //console.log(note);// Check pitch
        vco.frequency.value = note;// Set note pitch
        vca.gain.value = 1;// Start note
      };
      if(isDown){
        noteStart();
        $(this).addClass("pressed");
      }
    });

    // Trigger noteStart on mousedown
    key.mousedown(function(){
      var note = $(this).data("pitch");// Find note pitch

      // ### CAN THIS FUNCTION BE CALLED *OUTSIDE* THE "KEY." EVENT AND STILL USE "NOTE" VAR???
      // ### REPETITION FEELS CLUMSY
      // note start function
      var noteStart = function(){
        //console.log(isDown);// Check for mousedown
        //console.log(note);// Check pitch
        vco.frequency.value = note;// Set note pitch
        vca.gain.value = 1;// Start note
      };
      noteStart();
      $(this).addClass("pressed");
    });

    // End note on mouseout or mouseup
    key.on("mouseout mouseup", function(){
      vca.gain.value = 0;// End note
      $(this).removeClass("pressed");
    });

  });



// If the Web Audio API is not available, prompt the user to switch to a supported browser.
} else {
  alert("Audio inactive. This browser does not support the Web Audio API; try Chrome, Safari, or Firefox instead.");
}
