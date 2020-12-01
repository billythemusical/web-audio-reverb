
window.addEventListener("load", function() {
  alert("Please use headphones to avoid feedback!!!")
  // This kicks it off
  initCapture();
});

function initCapture() {
  console.log("initCapture");

  let audio = document.getElementById("myaudio");
  let constraints = { audio: true, video: false };

  // Prompt the user for permission, get the stream
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {

        var ac = new AudioContext();
        var audioSource = ac.createMediaStreamSource(stream);

        /* Using Tone.js */
        Tone.setContext(ac);

        var pitchShift = new Tone.PitchShift({ pitch: -5, wet: 0.5 })
        var delay = new Tone.FeedbackDelay({ delayTime: '4n', maxDelay: 2, feedback: 0.45 });
        var reverb = new Tone.Reverb({ decay: 10, wet: 0.3 });
        var volume = new Tone.Volume({ volume: -18 });

        /*

          our effects chain...

          audioSource --> pitchShift -->  delay  -->  volume --> SPEAKERS
                                            \              /
                                            \-> reverb -> /
        */

        Tone.connect(audioSource, pitchShift);
        Tone.connect(pitchShift, delay);
        Tone.connect(delay, volume);
        Tone.connect(delay, reverb);  // connect the delay to the reverb as well
        Tone.connect(reverb, volume);
        Tone.connect(volume, Tone.getContext().destination) // can also use volume.toDestination()

    })
    .catch(function(err) {
      /* Handle the error */
      alert(err);
    });
}
