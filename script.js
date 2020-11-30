
window.addEventListener("load", function() {
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
      /* Use the stream */

      // Attach to our video object
      audio.srcObject = stream;

      // Wait for the stream to load enough to play
      audio.onloadedmetadata = function(e) {

        var audioCtx = new (window.AudioContext || window.webkitAudioContext);
        var audioSource = audioCtx.createMediaElementSource(audio); // No longer playable by the normal audio tag

        /* Using Tone.js */
        Tone.setContext(audioCtx);

        var reverb = new Tone.Reverb({
          decay: 10,
          wet: 0.5
        });

        Tone.connect(audioSource, reverb);
        Tone.connect(reverb, Tone.getContext().destination);

        // // Play the element
        audio.play();

      };
    })
    .catch(function(err) {
      /* Handle the error */
      alert(err);
    });
}
